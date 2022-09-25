import { useState, useMemo } from 'react';
import styled from 'styled-components';
import NoBookings from '../NoBookings';
import RentalCard from '../RentalCard';
import { CarRentalRequestsQuery } from '../../../../../hooks/api/carRentalRequests/carRentalRequests.generated';
import { CarRentalRequestStatusEnum } from '../../../../../interfaces/api.types.generated.d';

interface RentalTabProps {
  carRentals?: CarRentalRequestsQuery['carRentalRequests']['rentalRequests'];
  showFilters?: boolean;
  refetchRentals: () => void;
  switchTo: (tab: 'active' | 'inactive') => void;
}

const FilterButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 30px;
  flex-wrap: wrap;
`;

const FilterButton = styled.button<{ isActive: boolean }>`
  cursor: pointer;
  color: #718096;
  background: ${({ isActive }) => (isActive ? '##dfe5e9' : 'none')};
  padding: 10px 20px;
  border-radius: 37px;
  font-weight: 500;
  font-size: 14px;
  border: none;
  margin-right: 10px;

  &:last-of-type {
    margin-right: 0;
  }
`;

const RentalTab = ({ carRentals, showFilters, refetchRentals, switchTo }: RentalTabProps) => {
  const filterOptions = [
    { name: 'All inactive', status: undefined },
    { name: 'Completed', status: CarRentalRequestStatusEnum.Finished },
    { name: 'Rejected', status: CarRentalRequestStatusEnum.Rejected },
    { name: 'Cancelled', status: CarRentalRequestStatusEnum.Cancelled },
    { name: 'Problem reported', status: CarRentalRequestStatusEnum.Incidented },
  ];

  const [activeFilter, setActiveFilter] = useState<CarRentalRequestStatusEnum | undefined>();

  const filteredCarRentals = useMemo(() => {
    if (!showFilters || !activeFilter) return carRentals;
    return (carRentals || []).filter((carRental) => carRental.status === activeFilter);
  }, [carRentals, showFilters, activeFilter]);

  return carRentals && carRentals.length ? (
    <>
      {showFilters && (
        <FilterButtonWrapper>
          {filterOptions.map((filter) => (
            <FilterButton
              isActive={activeFilter === filter.status}
              key={filter.status}
              onClick={() => setActiveFilter(filter.status)}
            >
              {filter.name}
            </FilterButton>
          ))}
        </FilterButtonWrapper>
      )}
      {filteredCarRentals?.map((rental) => (
        <RentalCard
          key={rental.id}
          refetchRentals={refetchRentals}
          rental={rental}
          switchTo={switchTo}
        />
      ))}
    </>
  ) : (
    <NoBookings />
  );
};

export default RentalTab;
