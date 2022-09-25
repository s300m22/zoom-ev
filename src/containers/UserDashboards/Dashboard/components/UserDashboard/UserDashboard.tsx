import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { DefaultSetupProfile, StripeFinalizePayment } from '..';
import { Heading } from '../../../../../elements';
import { useCarRentalRequestsQuery } from '../../../../../hooks/api/carRentalRequests/carRentalRequests.generated';
import { useCarRentalRequestsStatusQuery } from '../../../../../hooks/api/carRentalRequestsStatus/carRentalRequestsStatus.generated';
import {
  CarDetailsApproveStatusEnum,
  UserDetailsApprovalStatusEnum,
} from '../../../../../hooks/api/getCurrentUser/getCurrentUser.generated';
import { CarRentalRequestPaymentStatusEnum } from '../../../../../hooks/api/getUsersCount/getUsersCount.generated';
import { useMyCarsQuery } from '../../../../../hooks/api/myCars/myCars.generated';
import { CarRentalRequestStatusEnum } from '../../../../../interfaces/api.types.generated.d';
import { userDetailsAtom } from '../../../../../recoil';
import { NotificationsWrapper, NotificationItem } from './UserDashboard.styled';

const UserDashboard: React.FC = () => {
  const router = useRouter();
  const userDetails = useRecoilValue(userDetailsAtom);

  const { data: carRentalData } = useCarRentalRequestsQuery({
    variables: {
      params: {
        limit: 1000,
        requestingAsRenter: false,
      },
    },
    notifyOnNetworkStatusChange: true,
  });

  const { data: rentalRequestData } = useCarRentalRequestsStatusQuery({
    variables: {
      params: {
        limit: 1000,
        requestingAsRenter: true,
      },
    },
  });

  const carRentals = carRentalData?.carRentalRequests.rentalRequests;

  const requestedCarRentals = carRentals?.filter(
    (rental) => rental.status === CarRentalRequestStatusEnum.WaitingForAcceptance,
  );

  const rentalRequiredAction = rentalRequestData?.carRentalRequests.rentalRequests?.find(
    (request) => request.paymentStatus === CarRentalRequestPaymentStatusEnum.RequiresAction,
  );

  const { data: carsData } = useMyCarsQuery();
  const cars = carsData?.myCars;

  const showNotificationsDash = useMemo<boolean>(() => {
    if (userDetails?.isOwnerProfileSetupFlowInitiated !== false) return false;

    const detailsRequestedStatus = userDetails?.detailsRequested?.approvalStatus;

    switch (true) {
      case detailsRequestedStatus === UserDetailsApprovalStatusEnum.Rejected:
        return false;
      case detailsRequestedStatus === UserDetailsApprovalStatusEnum.Pending:
        return false;
      default:
        break;
    }

    const car = cars && cars.slice(-1)[0];

    if (car) {
      const carStatus = car.details.approveStatus;
      const carUpdateStatus = car.detailsRequested?.approveStatus;

      switch (true) {
        case carStatus === CarDetailsApproveStatusEnum.Approved && car.detailsRequested === null:
          return false;
        case carUpdateStatus === CarDetailsApproveStatusEnum.Rejected:
          return false;
        default:
          break;
      }
    }

    const stripeAccountSetupRequired = userDetails?.stripeConnectedAccountSetupRequired;
    if (stripeAccountSetupRequired !== false) return false;

    return true;
  }, [userDetails, cars]);

  return (
    <div>
      {!showNotificationsDash && <DefaultSetupProfile />}
      {rentalRequiredAction?.stripePaymentIntentClientSecret && (
        <>
          <StripeFinalizePayment />
          <br />
        </>
      )}
      {showNotificationsDash && (
        <>
          <Heading variant="h6">Latest Activity</Heading>

          <NotificationsWrapper>
            {requestedCarRentals?.map((req) => (
              <NotificationItem key={req.id} onClick={() => router.push('/dashboard/bookings')}>
                {req.user.details.firstName} {req.user.details.lastName} <strong>requested</strong>{' '}
                to book {req.car.details.maker?.name} {req.car.details.model?.name}{' '}
                {req.car.details.registration}
              </NotificationItem>
            ))}
          </NotificationsWrapper>
        </>
      )}
    </div>
  );
};

export default UserDashboard;
