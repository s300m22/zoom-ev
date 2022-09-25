import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../..';
import { useNextQueryParam } from '../../../../hooks';
import { formatPrice, logError } from '../../../../utils';
import { RangeSlider } from '../../../Inputs';
import { FilterWrapper, FilterFooter } from '../SharedStyles.styled';

interface RangePriceFilterProps {
  setActiveButton: Dispatch<SetStateAction<string>>;
  setSelectedText: Dispatch<SetStateAction<string | null>>;
}

interface RangePriceProps {
  range: number;
}

const RangePriceFilter = ({ setActiveButton, setSelectedText }: RangePriceFilterProps) => {
  const router = useRouter();
  const [range] = useNextQueryParam(['range']);
  const [maxPriceRange, setMaxPriceRange] = useState<number>(range ? parseInt(range, 10) : 0);
  const { register, handleSubmit, trigger, setValue } = useForm<RangePriceProps>({
    mode: 'onBlur',
  });

  register('range', {
    required: 'Required',
  });

  useEffect(() => {
    setValue('range', maxPriceRange);
  }, [maxPriceRange, setValue]);

  const onSubmit = async (input: RangePriceProps) => {
    try {
      const isValid = await trigger();
      if (!isValid) {
        return;
      }
      const { range: rangeInput } = input;
      setSelectedText(`up to ${formatPrice(rangeInput)}/day`);
      setActiveButton('');
      router.push(
        {
          pathname: '/search',
          query: {
            ...router.query,
            range: rangeInput,
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
    if (range) {
      setSelectedText(null);
      router.replace(
        {
          pathname: '/search',
          query: {
            ...router.query,
            range: undefined,
          },
        },
        undefined,
        { shallow: true },
      );
    }
  };

  return (
    <FilterWrapper>
      <form id="price-range-form" onSubmit={handleSubmit(onSubmit)}>
        <RangeSlider
          initValue={maxPriceRange}
          label="Up to"
          labelPriceFormat
          maxValue={1000}
          minValue={0}
          onChange={setMaxPriceRange}
          unit="/ day"
        />
      </form>
      <FilterFooter style={{ marginTop: '60px' }}>
        <Button onClick={handleCancel} variant="outlined">
          Clear
        </Button>
        <Button form="price-range-form">Apply</Button>
      </FilterFooter>
    </FilterWrapper>
  );
};

export default RangePriceFilter;
