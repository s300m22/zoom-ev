import { NextPage } from 'next';
import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { StandaloneTabs } from '../../../elements';
import { useCarRentalRequestsQuery } from '../../../hooks/api/carRentalRequests/carRentalRequests.generated';
import { CarRentalRequestStatusEnum } from '../../../interfaces/api.types.generated.d';
import { IGlobalSettings } from '../../../interfaces/contentful.types.generated';
import { DashboardsLayout } from '../../../layouts';
import { RentalTab } from './components';
import MyBookingsWrapper from './MyBookings.styled';

interface MyBookingsProps {
  globalSettings: IGlobalSettings;
  title: string;
  at: string | null;
}

const TabLoadingSkeleton = () => (
  <Skeleton
    count={4}
    height={226}
    style={{
      marginBottom: '10px',
      borderRadius: '12px',
      boxShadow: '0 10px 34px rgba(23, 75, 83, 0.1)',
    }}
  />
);

const MyBookings: NextPage<MyBookingsProps> = ({ globalSettings, title, at }) => {
  const [sAt, setSAt] = useState(at);

  const {
    data: carRentalData,
    loading: carRentalLoading,
    refetch: refetchRentals,
  } = useCarRentalRequestsQuery({
    variables: {
      params: {
        limit: 1000,
        requestingAsRenter: false,
      },
    },
    notifyOnNetworkStatusChange: true,
  });

  const carRentals = carRentalData?.carRentalRequests.rentalRequests;

  const requestedCarRentals = carRentals?.filter(
    (rental) => rental.status === CarRentalRequestStatusEnum.WaitingForAcceptance,
  );

  const activeCarRentals = carRentals?.filter(
    (rental) => rental.status === CarRentalRequestStatusEnum.Accepted,
  );

  const inactiveCarRentals = carRentals?.filter(
    (rental) =>
      rental.status !== CarRentalRequestStatusEnum.WaitingForAcceptance &&
      rental.status !== CarRentalRequestStatusEnum.Accepted,
  );

  const switchTo = (tab: 'active' | 'inactive') => {
    setSAt(tab);
  };

  const tabs = [
    {
      title: 'Requests',
      children: !carRentalLoading ? (
        <RentalTab
          carRentals={requestedCarRentals}
          refetchRentals={refetchRentals}
          switchTo={switchTo}
        />
      ) : (
        <TabLoadingSkeleton />
      ),
    },
    {
      title: 'Active',
      children: !carRentalLoading ? (
        <RentalTab
          carRentals={activeCarRentals}
          refetchRentals={refetchRentals}
          switchTo={switchTo}
        />
      ) : (
        <TabLoadingSkeleton />
      ),
    },
    {
      title: 'Inactive',
      children: !carRentalLoading ? (
        <RentalTab
          carRentals={inactiveCarRentals}
          refetchRentals={refetchRentals}
          showFilters
          switchTo={switchTo}
        />
      ) : (
        <TabLoadingSkeleton />
      ),
    },
  ];

  return (
    <DashboardsLayout globalSettings={globalSettings} pageTitle={title}>
      <MyBookingsWrapper>
        <StandaloneTabs at={sAt} tabs={tabs} />
      </MyBookingsWrapper>
    </DashboardsLayout>
  );
};

export default MyBookings;
