import { useState } from 'react';
import SearchFiltersWrapper from './SearchFilters.styled';
import { FilterButton } from './components';
import { FiltersTypeEnum } from './FiltersEnum';

const FILTERS = Object.values(FiltersTypeEnum).map((value) => value);

const SearchFilters = () => {
  const [activeButton, setActiveButton] = useState('');
  return (
    <SearchFiltersWrapper>
      {FILTERS.map((filter) => (
        <FilterButton
          activeButton={activeButton}
          key={filter}
          name={filter}
          setActiveButton={setActiveButton}
        />
      ))}
    </SearchFiltersWrapper>
  );
};

export default SearchFilters;
