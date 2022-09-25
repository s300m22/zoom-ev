import { useState, useMemo } from 'react';
import Skeleton from 'react-loading-skeleton';
import { EventsLog } from '../../../../../elements';
import { useTheme } from '../../../../../hooks';
import { useCarRentalOverviewQuery } from '../../../../../hooks/api/carRentalOverview/carRentalOverview.generated';
import { CarRentalOverviewRowKindEnum } from '../../../../../interfaces/api.types.generated.d';
import { Theme } from '../../../../../layouts/Theme';
import {
  BusinessDashboardWrapper,
  FilterButtonWrapper,
  FilterButton,
} from './BusinessDashboard.styled';

const getTitleAndColor = (kind: CarRentalOverviewRowKindEnum | undefined, theme: Theme) => {
  switch (kind) {
    case undefined:
      return {
        color: theme.palette.success,
        text: 'Bookings overview  for today',
      };
    case CarRentalOverviewRowKindEnum.WaitingForAcceptance:
      return {
        color: theme.palette.success,
        text: 'Bookings requests for today',
      };
    case CarRentalOverviewRowKindEnum.AcceptedUpcoming:
      return {
        color: theme.palette.success,
        text: 'Upcoming bookings for today',
      };
    case CarRentalOverviewRowKindEnum.AcceptedPendingClosure:
      return {
        color: theme.palette.success,
        text: 'Pending closure bookings for today',
      };
    default:
      return null;
  }
};

const BusinessDashboard = () => {
  const { data: carRentalOverviewData, loading: carRentalOverviewLoading } =
    useCarRentalOverviewQuery();
  const theme = useTheme();
  const [activeFilter, setActiveFilter] = useState<CarRentalOverviewRowKindEnum | undefined>();
  const filterOptions = [
    { name: 'All activities ', status: undefined },
    { name: 'Requests', status: CarRentalOverviewRowKindEnum.WaitingForAcceptance },
    { name: 'Upcoming bookings', status: CarRentalOverviewRowKindEnum.AcceptedUpcoming },
    { name: 'Pending Closure', status: CarRentalOverviewRowKindEnum.AcceptedPendingClosure },
  ];

  const carRentalOverview = carRentalOverviewData?.carRentalOverview.rows;

  const filteredCarRentalsOverview = useMemo(() => {
    if (!carRentalOverview)
      return {
        ...getTitleAndColor(undefined, theme),
        total: 0,
        eventsLog: undefined,
      };

    if (!activeFilter)
      return {
        ...getTitleAndColor(undefined, theme),
        total: carRentalOverview?.length,
        eventsLog: carRentalOverview.map((rental) => ({
          ...rental,
          id: rental.rentalRequestId,
        })),
      };

    const rentals = carRentalOverview
      .filter((carRental) => carRental.kind === activeFilter)
      .map((rental) => ({
        ...rental,
        id: rental.rentalRequestId,
      }));

    return {
      ...getTitleAndColor(activeFilter, theme),
      total: rentals.length,
      eventsLog: rentals,
    };
  }, [activeFilter, carRentalOverview, theme]);

  return (
    <BusinessDashboardWrapper>
      <FilterButtonWrapper>
        {filterOptions.map((filter) => (
          <FilterButton
            counter={
              carRentalOverview
                ? carRentalOverview.filter(
                    (r) => r.kind === filter.status || filter.status === undefined,
                  ).length
                : 0
            }
            isActive={activeFilter === filter.status}
            key={filter.name}
            onClick={() => setActiveFilter(filter.status)}
          >
            {filter.name}
          </FilterButton>
        ))}
      </FilterButtonWrapper>
      {!carRentalOverviewLoading ? (
        <EventsLog
          eventsLog={filteredCarRentalsOverview.eventsLog}
          noEventsText={filteredCarRentalsOverview.text}
          title={filteredCarRentalsOverview.text}
          toHighlight={[
            'pending',
            'accepted',
            'cancelled by a host',
            'completed',
            'requested',
            'upcoming',
          ]}
        />
      ) : (
        <Skeleton
          count={1}
          height={320}
          style={{
            marginTop: '38px',
            marginBottom: '10px',
            borderRadius: '12px',
            boxShadow: '0 10px 34px rgba(23, 75, 83, 0.1)',
          }}
        />
      )}
    </BusinessDashboardWrapper>
  );
};

export default BusinessDashboard;
