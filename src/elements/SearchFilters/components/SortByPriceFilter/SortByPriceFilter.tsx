import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../..';
import { useNextQueryParam } from '../../../../hooks';
import { logError } from '../../../../utils';
import { FormRadioInput } from '../../../Inputs';
import { SortByEnum } from '../../FiltersEnum';
import { FilterWrapper, FilterFooter } from '../SharedStyles.styled';

interface SortByPriceFilterProps {
  setActiveButton: Dispatch<SetStateAction<string>>;
  setSelectedText: Dispatch<SetStateAction<string | null>>;
}

interface SortByProps {
  sortBy: string;
}

const SortByPriceFilter = ({ setActiveButton, setSelectedText }: SortByPriceFilterProps) => {
  const router = useRouter();
  const [sort] = useNextQueryParam(['sort']);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(sort || null);
  const { register, handleSubmit, trigger } = useForm<SortByProps>({
    mode: 'onBlur',
  });

  const onSubmit = async (input: SortByProps) => {
    try {
      const isValid = await trigger();
      if (!isValid) {
        return;
      }
      const { sortBy } = input;
      const selectedInputFilter = {
        label: sortBy?.replace('Price: ', '') || null,
        value: sortBy?.replace('Price: ', '').replaceAll(' ', '') || null,
      };
      setSelectedText(selectedInputFilter.label);
      setActiveButton('');
      router.replace(
        {
          pathname: '/search',
          query: {
            ...router.query,
            sort: selectedInputFilter.value,
          },
        },
        undefined,
        { shallow: true },
      );
    } catch (error: any) {
      logError(error);
    }
  };

  const handleCancel = () => {
    setActiveButton('');
    if (sort) {
      setSelectedText(null);
      router.push(
        {
          pathname: '/search',
          query: {
            ...router.query,
            sort: undefined,
          },
        },
        undefined,
        { shallow: true },
      );
    }
  };

  return (
    <FilterWrapper>
      <form id="price-form" onSubmit={handleSubmit(onSubmit)}>
        <FormRadioInput
          {...register('sortBy')}
          onChange={() => setSelectedFilter(SortByEnum.lowToHigh)}
          selected={selectedFilter === SortByEnum.lowToHigh}
          value="Price: low to high"
          variant="borderless"
        />
        <FormRadioInput
          {...register('sortBy')}
          onChange={() => setSelectedFilter(SortByEnum.highToLow)}
          selected={selectedFilter === SortByEnum.highToLow}
          value="Price: high to low"
          variant="borderless"
        />
      </form>
      <FilterFooter>
        <Button onClick={handleCancel} variant="outlined">
          Clear
        </Button>
        <Button form="price-form">Apply</Button>
      </FilterFooter>
    </FilterWrapper>
  );
};

export default SortByPriceFilter;
