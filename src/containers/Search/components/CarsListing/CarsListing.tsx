/* eslint-disable no-nested-ternary */
import { MouseEventHandler, useMemo } from 'react';
import Skeleton from 'react-loading-skeleton';
import NoResults from '../NoResults';
import { CarsListingWrapper, CarsWrapper } from './CarsListing.styled';
import CarCard from './components/CarCard';
import { CarsInRadiusQuery } from '../../../../hooks/api/carsInRadius/carsInRadius.generated';
import { SearchFilters } from '../../../../elements';

interface CarsListingProps {
  searchResults?: CarsInRadiusQuery['carsInRadius']['cars'];
  loading: boolean;
  findingCars: boolean;
  handleClick: MouseEventHandler<HTMLButtonElement>;
}

const CarsListing = ({ searchResults, loading, findingCars, handleClick }: CarsListingProps) => {
  const cars = useMemo(() => searchResults, [searchResults]);
  return (
    <CarsListingWrapper>
      <SearchFilters />
      <CarsWrapper>
        {loading ? (
          [1, 2, 3, 4, 5, 6, 7, 8].map((e) => (
            <Skeleton
              count={1}
              height={374}
              key={e}
              style={{
                marginTop: '10px',
                marginBottom: '10px',
                borderRadius: '12px',
                boxShadow: '0 10px 34px rgba(23, 75, 83, 0.1)',
              }}
            />
          ))
        ) : cars && cars.length ? (
          cars.map((car) => <CarCard car={car} key={car.id} />)
        ) : (
          <NoResults findingCars={findingCars} handleClick={handleClick} />
        )}
      </CarsWrapper>
    </CarsListingWrapper>
  );
};

export default CarsListing;
