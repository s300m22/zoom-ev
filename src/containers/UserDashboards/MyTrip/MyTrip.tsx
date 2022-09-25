/* eslint-disable no-nested-ternary */
import { NextPage } from 'next';
import Skeleton from 'react-loading-skeleton';
import { AddHostCarReviewPopup, CancelBooking } from '../../../elements';
import { useCarRentalRequestRenterQuery } from '../../../hooks/api/carRentalRequestRenter/carRentalRequestRenter.generated';
import { CarRentalRequestStatusEnum } from '../../../interfaces/api.types.generated.d';
import {
  IGlobalSettings,
  IInstructionsSection,
} from '../../../interfaces/contentful.types.generated';
import { DashboardsLayout } from '../../../layouts';
import { convertToReadableDateFormat, getCarPhotos } from '../../../utils';
import {
  MyTripDetails,
  MyTripEv,
  MyTripHost,
  MyTripPayment,
  MyTripHowToGetThere,
  MyTripStuffToKnow,
  MyTripHelp,
} from './components';
import { MyTripWrapper } from './MyTrip.styled';
import { CarAvailableForSaleWrapper } from '../../Car/Car.styled';
import { OptionToBuyDetails } from '../../Car/components';

interface MyTripProps {
  globalSettings: IGlobalSettings;
  instructions: IInstructionsSection;
  id: string;
}

const MyTripSkeleton = () => (
  <MyTripWrapper>
    <div>
      <Skeleton
        count={1}
        height={434}
        style={{
          marginBottom: '30px',
          borderRadius: '12px',
          boxShadow: '0 10px 34px rgba(23, 75, 83, 0.1)',
        }}
      />
      <Skeleton
        count={1}
        height={226}
        style={{
          marginBottom: '30px',
          borderRadius: '12px',
          boxShadow: '0 10px 34px rgba(23, 75, 83, 0.1)',
        }}
      />
      <Skeleton
        count={1}
        height={272}
        style={{
          marginBottom: '30px',
          borderRadius: '12px',
          boxShadow: '0 10px 34px rgba(23, 75, 83, 0.1)',
        }}
      />
      <Skeleton
        count={1}
        height={320}
        style={{
          marginBottom: '30px',
          borderRadius: '12px',
          boxShadow: '0 10px 34px rgba(23, 75, 83, 0.1)',
        }}
      />
      <Skeleton
        count={1}
        height={235}
        style={{
          marginBottom: '30px',
          borderRadius: '12px',
          boxShadow: '0 10px 34px rgba(23, 75, 83, 0.1)',
        }}
      />
    </div>
    <div>
      <Skeleton
        count={1}
        height={501}
        style={{
          marginBottom: '30px',
          borderRadius: '12px',
          boxShadow: '0 10px 34px rgba(23, 75, 83, 0.1)',
        }}
      />
      <Skeleton
        count={1}
        height={574}
        style={{
          marginBottom: '32px',
          borderRadius: '12px',
          boxShadow: '0 10px 34px rgba(23, 75, 83, 0.1)',
        }}
      />
    </div>
  </MyTripWrapper>
);

const MyTrip: NextPage<MyTripProps> = ({ globalSettings, id, instructions }) => {
  const { fields: instructionFields } = instructions;
  const {
    data: carRentalData,
    loading: carRentalLoading,
    refetch: refetchCarRental,
  } = useCarRentalRequestRenterQuery({
    variables: {
      id,
    },
  });
  const carRental = carRentalData?.carRentalRequest;

  const timeStart = convertToReadableDateFormat({ date: carRental?.timeStart, withWords: true });

  const isCancellable =
    carRental?.status === CarRentalRequestStatusEnum.WaitingForAcceptance ||
    carRental?.status === CarRentalRequestStatusEnum.Accepted;

  // const isFullyVisible =
  //   carRental?.status === CarRentalRequestStatusEnum.Accepted ||
  //   carRental?.status === CarRentalRequestStatusEnum.Incidented ||
  //   carRental?.status === CarRentalRequestStatusEnum.Finished;

  const car = carRental?.car;

  const carDetails = {
    name: `${car?.details.maker?.name} ${car?.details.model?.name}`,
    avatar: getCarPhotos(car?.details.images, car?.details.mainImageId).mainImage,
    plate: car?.details.registration,
  };

  const hostDetails = car?.business
    ? {
        isBusiness: true,
        name: car.business.displayName,
        avatar: car.business.logoImage?.url || '',
      }
    : {
        isBusiness: false,
        name: `${car?.user?.details.firstName} ${car?.user?.details.lastName}`,
        avatar: car?.user?.details.avatarImage?.url || '',
      };

  const PageActions = () => {
    switch (true) {
      case carRental?.status === CarRentalRequestStatusEnum.Finished:
      case carRental?.status === CarRentalRequestStatusEnum.Incidented:
        return (
          <AddHostCarReviewPopup carDetails={carDetails} hostDetails={hostDetails} rentalId={id} />
        );
      case isCancellable:
        return (
          <CancelBooking
            id={id}
            onCanceled={() => {
              refetchCarRental();
            }}
          />
        );
      default:
        return null;
    }
  };
  return (
    <DashboardsLayout
      globalSettings={globalSettings}
      pageActions={<PageActions />}
      pageTitle={carRentalLoading ? 'Trip' : timeStart ? `Trip ${timeStart}` : 'My trip'}
      parentLink={{ url: '/dashboard/trips', label: 'Back' }}
    >
      {!carRentalLoading ? (
        <MyTripWrapper>
          <div>
            <MyTripDetails rental={carRental} />
            <MyTripHost rental={carRental} />
            <MyTripPayment refetchCarRental={refetchCarRental} rental={carRental} />
            <MyTripStuffToKnow instructions={instructionFields} rental={carRental} />
            <MyTripHelp instructions={instructionFields} rental={carRental} />
            {carRental && carRental.car.salesInfo && (
              <CarAvailableForSaleWrapper>
                <OptionToBuyDetails car={carRental.car} />
              </CarAvailableForSaleWrapper>
            )}
          </div>
          <div>
            <MyTripEv rental={carRental} />
            {carRental && (
              <MyTripHowToGetThere
                businessName={carRental.car.business?.displayName}
                fakeLocation={carRental.car.fakeLocation}
                id={carRental.car.id}
                isBusinessCar={Boolean(carRental.car?.business?.displayName)}
                privateLocation={carRental.car.addressPrivate}
                publicLocation={carRental.car.addressPublic}
                status={carRental.status}
              />
            )}
          </div>
        </MyTripWrapper>
      ) : (
        <MyTripSkeleton />
      )}
    </DashboardsLayout>
  );
};

export default MyTrip;
