import { useState, useCallback, useRef, Dispatch, SetStateAction } from 'react';
import { SortByPriceFilter, RangePriceFilter, AllFilters } from '..';
import { useOnClickOutside } from '../../../../hooks';
import { SelectArrowsIcon } from '../../../../icons';
import { FiltersTypeEnum } from '../../FiltersEnum';
import { FilterButtonWrapper, FilterBodyWrapper, LabelWrapper } from './FilterButton.styled';
import { BoldText } from '../../..';

interface FilterButtonProps {
  name: FiltersTypeEnum;
  activeButton: string;
  setActiveButton: Dispatch<SetStateAction<string>>;
}

const FilterButton = ({ activeButton, setActiveButton, name }: FilterButtonProps) => {
  const [selectedText, setSelectedText] = useState<string | null>(null);
  const elementRef = useRef(null);
  const isActive = activeButton === name;
  const closeFilter = useCallback(() => {
    setActiveButton('');
  }, [setActiveButton]);

  useOnClickOutside(elementRef, closeFilter);

  const getFilterComponent = (filterName: string) => {
    switch (filterName) {
      case FiltersTypeEnum.sortBy:
        return (
          <SortByPriceFilter setActiveButton={setActiveButton} setSelectedText={setSelectedText} />
        );
      case FiltersTypeEnum.price:
        return (
          <RangePriceFilter setActiveButton={setActiveButton} setSelectedText={setSelectedText} />
        );
      case FiltersTypeEnum.all:
        return <AllFilters setActiveButton={setActiveButton} setSelectedText={setSelectedText} />;
      default:
        return null;
    }
  };

  return (
    <FilterButtonWrapper
      isActive={isActive}
      onClick={(e) => {
        if (e.target !== e.currentTarget) return;
        setActiveButton(name);
      }}
    >
      <LabelWrapper>
        {selectedText ? (
          <>
            {name}: <BoldText style={{ display: 'inline' }}>{selectedText}</BoldText>
          </>
        ) : (
          name
        )}
      </LabelWrapper>
      <SelectArrowsIcon />
      {isActive && (
        <FilterBodyWrapper ref={elementRef}>{getFilterComponent(name)}</FilterBodyWrapper>
      )}
    </FilterButtonWrapper>
  );
};

export default FilterButton;
