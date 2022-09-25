import { NextPage } from 'next';
import Skeleton from 'react-loading-skeleton';
import { CancelBooking } from '../../../elements';
import { useCarRentalRequestQuery } from '../../../hooks/api/carRentalRequest/carRentalRequest.generated';
import {
  IGlobalSettings,
  IInstructionsSection,
} from '../../../interfaces/contentful.types.generated';
import { CarRentalRequestStatusEnum } from '../../../hooks/api/getCar/getCar.generated';
import { DashboardsLayout } from '../../../layouts';
import {
  MyBookingDetails,
  MyBookingGuest,
  MyBookingEv,
  MyBookingPayment,
  MyBookingHelp,
  MyBookingThingsToKnow,
} from './components';
import { MyBookingWrapper } from './MyBooking.styled';
import { MyTripHowToGetThere } from '../MyTrip/components';

interface MyBookingProps {
  globalSettings: IGlobalSettings;
  instructions: IInstructionsSection;
  id: string;
  title: string;
}

const MyBookingSkeleton = () => (
  <MyBookingWrapper>
    <div>
      <Skeleton
        count={1}
        height={339}
        style={{
          marginBottom: '32px',
          borderRadius: '12px',
          boxShadow: '0 10px 34px rgba(23, 75, 83, 0.1)',
        }}
      />
      <Skeleton
        count={1}
        height={259}
        style={{
          marginBottom: '32px',
          borderRadius: '12px',
          boxShadow: '0 10px 34px rgba(23, 75, 83, 0.1)',
        }}
      />
      <Skeleton
        count={1}
        height={259}
        style={{
          marginBottom: '32px',
          borderRadius: '12px',
          boxShadow: '0 10px 34px rgba(23, 75, 83, 0.1)',
        }}
      />
      <Skeleton
        count={1}
        height={259}
        style={{
          marginBottom: '32px',
          borderRadius: '12px',
          boxShadow: '0 10px 34px rgba(23, 75, 83, 0.1)',
        }}
      />
      <Skeleton
        count={1}
        height={259}
        style={{
          marginBottom: '32px',
          borderRadius: '12px',
          boxShadow: '0 10px 34px rgba(23, 75, 83, 0.1)',
        }}
      />
    </div>
    <div>
      <Skeleton
        count={1}
        height={316}
        style={{
          marginBottom: '32px',
          borderRadius: '12px',
          boxShadow: '0 10px 34px rgba(23, 75, 83, 0.1)',
        }}
      />
    </div>
  </MyBookingWrapper>
);
const MyBooking: NextPage<MyBookingProps> = ({ globalSettings, id, title, instructions }) => {
  const { fields: instructionFields } = instructions;
  const {
    data: carRentalData,
    loading: carRentalLoading,
    refetch: refetchCarRental,
  } = useCarRentalRequestQuery({
    variables: {
      id,
    },
  });
  const carRental = carRentalData?.carRentalRequest;

  const isFullyVisible =
    carRental?.status === CarRentalRequestStatusEnum.Accepted ||
    carRental?.status === CarRentalRequestStatusEnum.Incidented ||
    carRental?.status === CarRentalRequestStatusEnum.Finished;

  return (
    <DashboardsLayout
      globalSettings={globalSettings}
      pageActions={
        carRental?.status &&
        [CarRentalRequestStatusEnum.Accepted, CarRentalRequestStatusEnum.Incidented].includes(
          carRental.status,
        ) && (
          <CancelBooking
            id={id}
            onCanceled={() => {
              refetchCarRental();
            }}
          />
        )
      }
      pageTitle={title}
      parentLink={{ url: '/dashboard/bookings', label: 'Back' }}
    >
      {!carRentalLoading ? (
        <MyBookingWrapper>
          <div>
            <MyBookingDetails rental={carRental} />
            <MyBookingEv rental={carRental} />
            <MyBookingPayment rental={carRental} />
            <MyBookingThingsToKnow instructions={instructionFields} rental={carRental} />
            <MyBookingHelp instructions={instructionFields} rental={carRental} />
          </div>
          <div>
            <MyBookingGuest rental={carRental} />
            {isFullyVisible && carRental && (
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
        </MyBookingWrapper>
      ) : (
        <MyBookingSkeleton />
      )}
    </DashboardsLayout>
  );
};

export default MyBooking;
