import { useMemo, useState } from 'react';
import { formatPrice } from '../../../utils';
import {
  Card,
  Summary,
  Form,
  SummaryPrice,
  InputContainer,
  SummaryParagraph,
  SummaryItem,
  HeaderWrapper,
} from './CompactSavingsCalculator.styled';
import { Select } from '../../Inputs';
import { getKeyValueItemForValue, getHiringFrequencySelectOptions } from './utils';
import { ICalculatorSectionFields } from '../../../interfaces/contentful.types.generated';
import Heading from '../../Heading';
import Tooltip from '../../Tooltip';
import { useCarRentalMarginSplitQuery } from '../../../hooks/api/carRentalMarginsSplit/carRentalMarginsSplit.generated';

export type CompactSavingsCalculatorProps = ICalculatorSectionFields;

const CompactSavingsCalculator = ({
  title,
  maxHiringFrequency = 7, // for listing select options
  defaultHiringFrequency = 2,
  defaultCarAge,
  discountedOffPrice,
  rentPricing,
  defaultRentPricing,
  carAgeTooltip,
  carValueTooltip,
}: CompactSavingsCalculatorProps) => {
  const [carAge, setCarAge] = useState<string | undefined>(defaultCarAge?.fields.value);
  const [carValue, setCarValue] = useState<string | undefined>(defaultRentPricing?.fields.value);
  const [hiringFrequency, setHiringFrequency] = useState(defaultHiringFrequency.toString());
  const { data: carRentalmarginSplitData } = useCarRentalMarginSplitQuery();
  const carRentalmarginSplit = carRentalmarginSplitData?.carRentalMarginSplit;
  const split = (carRentalmarginSplit?.owner || 70) / 100;

  const calculatedPrice = useMemo(() => {
    const carAgeDiscountedOff = getKeyValueItemForValue(carAge, discountedOffPrice);
    const rentalPrice = getKeyValueItemForValue(carValue, rentPricing);
    const frequency = parseInt(hiringFrequency, 10); // per week

    const price = rentalPrice * carAgeDiscountedOff * frequency;
    const monthly = price * 4 * split; // 4 weeks per month
    const yearly = formatPrice(monthly * 12); // 12 months per year
    return {
      monthly: formatPrice(monthly),
      yearly,
    };
  }, [carAge, discountedOffPrice, carValue, rentPricing, hiringFrequency, split]);

  const CarAgeTooltip = () =>
    carAgeTooltip ? <Tooltip content={carAgeTooltip} direction="left" /> : null;
  const CarValueTooltip = () =>
    carValueTooltip ? <Tooltip content={carValueTooltip} direction="left" /> : null;

  return (
    <Card>
      <Form>
        <HeaderWrapper>
          <Heading variant="h5">{title}</Heading>
        </HeaderWrapper>
        <InputContainer>
          <Select
            label="Car age"
            onChange={(value) => setCarAge(value)}
            tooltip={<CarAgeTooltip />}
            value={carAge}
          >
            {discountedOffPrice?.map(({ fields }) => (
              <div data-value={fields.value} key={fields.value}>
                {fields.key}
              </div>
            ))}
          </Select>
        </InputContainer>
        <InputContainer>
          <Select
            label="Car value when new"
            onChange={(value) => setCarValue(value)}
            tooltip={<CarValueTooltip />}
            value={carValue}
          >
            {rentPricing?.map(({ fields }) => (
              <div data-value={fields.value} key={fields.value}>
                {fields.key}
              </div>
            ))}
          </Select>
        </InputContainer>
        <InputContainer>
          <Select
            label="Hiring frequency"
            onChange={(value) => setHiringFrequency(value)}
            value={hiringFrequency}
          >
            {getHiringFrequencySelectOptions(maxHiringFrequency)}
          </Select>
        </InputContainer>
      </Form>
      <Summary>
        <SummaryItem>
          <SummaryParagraph>up to</SummaryParagraph>
          <SummaryPrice>{calculatedPrice.monthly}</SummaryPrice>
          <SummaryParagraph>per month</SummaryParagraph>
        </SummaryItem>
        <SummaryItem>
          <SummaryParagraph>up to</SummaryParagraph>
          <SummaryPrice>{calculatedPrice.yearly}</SummaryPrice>
          <SummaryParagraph>per year</SummaryParagraph>
        </SummaryItem>
      </Summary>
    </Card>
  );
};

export default CompactSavingsCalculator;
