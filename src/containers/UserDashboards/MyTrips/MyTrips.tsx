import { NextPage } from 'next';
import { useMemo } from 'react';
import Skeleton from 'react-loading-skeleton';
import { StandaloneTabs } from '../../../elements';
import { IGlobalSettings } from '../../../interfaces/contentful.types.generated';
import { useCarRentalRequestsQuery } from '../../../hooks/api/carRentalRequests/carRentalRequests.generated';
import { DashboardsLayout } from '../../../layouts';
import { RentalTab } from './components';
import MyTripsWrapper from './MyTrips.styled';
import { CarRentalRequestStatusEnum } from '../../../interfaces/api.types.generated.d';

interface MyTripsProps {
  globalSettings: IGlobalSettings;
  title: string;
  at: string | null;
}

const TabLoadingSkeleton = () => (
  <Skeleton
    count={1}
    height={175}
    style={{
      marginBottom: '10px',
      borderRadius: '12px',
      boxShadow: '0 10px 34px rgba(23, 75, 83, 0.1)',
    }}
  />
);

const MyTrips: NextPage<MyTripsProps> = ({ globalSettings, title, at }) => {
  const { data: carRentalData, loading: carRentalLoading } = useCarRentalRequestsQuery({
    variables: {
      params: {
        limit: 1000,
        requestingAsRenter: true,
      },
    },
  });

  const carRentals = carRentalData?.carRentalRequests.rentalRequests;

  const activeCarRentals = useMemo(
    () =>
      carRentals?.filter(
        (rental) =>
          rental.status === CarRentalRequestStatusEnum.WaitingForAcceptance ||
          rental.status === CarRentalRequestStatusEnum.Accepted,
      ),
    [carRentals],
  );

  const inactiveCarRentals = useMemo(
    () =>
      carRentals?.filter(
        (rental) =>
          rental.status !== CarRentalRequestStatusEnum.WaitingForAcceptance &&
          rental.status !== CarRentalRequestStatusEnum.Accepted,
      ),
    [carRentals],
  );

  const tabs = useMemo(
    () => [
      {
        title: 'Active',
        children: !carRentalLoading ? (
          <RentalTab carRentals={activeCarRentals} />
        ) : (
          <TabLoadingSkeleton />
        ),
      },
      {
        title: 'Inactive',
        children: !carRentalLoading ? (
          <RentalTab carRentals={inactiveCarRentals} />
        ) : (
          <TabLoadingSkeleton />
        ),
      },
    ],
    [activeCarRentals, carRentalLoading, inactiveCarRentals],
  );

  return (
    <DashboardsLayout globalSettings={globalSettings} pageTitle={title}>
      <MyTripsWrapper>
        <StandaloneTabs at={at} tabs={tabs} />
      </MyTripsWrapper>
    </DashboardsLayout>
  );
};

export default MyTrips;
