import { useEffect, useState } from 'react';
import { useWatch, useFormContext } from 'react-hook-form';
import { logError, formatPrice } from '../../utils';
import { EarningsCell, TripleInputWrapper, EarningsSummary } from './CarPricingForm.styled';
import { useSnackbar } from '../../hooks';
import { useCalculateCarEarningsMutation } from '../../hooks/api/calculateCarEarnings/calculateCarEarnings.generated';

interface EarningsSummaryProps {
  marginTop?: string;
}

interface CalculatedEarningsProps {
  hourly?: number;
  daily?: number;
  weekly?: number;
}

const EarningsSummaryComponent = ({ marginTop = '20px' }: EarningsSummaryProps) => {
  const showSnackbar = useSnackbar();
  const { control } = useFormContext();
  const [calculatedEarnings, setCalculatedEarnings] = useState<CalculatedEarningsProps>({
    hourly: undefined,
    daily: undefined,
    weekly: undefined,
  });
  const [calculateCarEarnings, { data: calculateCarEarningsData }] =
    useCalculateCarEarningsMutation();
  const calculatedCarEarnings = calculateCarEarningsData?.calculateCarEarnings;

  const formatEarnings = (earnings: number | undefined) =>
    earnings ? formatPrice(Number((earnings / 100).toFixed(2))) : null;

  const perHour = useWatch<any>({
    control,
    name: 'pricePerHour',
  });

  const perDay = useWatch<any>({
    control,
    name: 'pricePerDay',
  });

  const perWeek = useWatch<any>({
    control,
    name: 'pricePerWeek',
  });

  useEffect(() => {
    if (perDay && perHour && perWeek) {
      const calculateEarnings = async (hourly: number, daily: number, weekly: number) => {
        try {
          await calculateCarEarnings({
            variables: {
              input: {
                hourly,
                daily,
                weekly,
              },
            },
          });
        } catch (error: any) {
          showSnackbar({
            message: 'We are unable to calculate your earnings right now.',
            type: 'error',
          });
          logError(error);
        }
      };

      calculateEarnings(
        Math.trunc(perHour * 100),
        Math.trunc(perDay * 100),
        Math.trunc(perWeek * 100),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calculateCarEarnings, perDay, perHour, perWeek, showSnackbar]);

  useEffect(() => {
    if (calculatedCarEarnings) {
      setCalculatedEarnings({
        ...calculatedCarEarnings,
      });
    }
  }, [calculatedCarEarnings]);

  return (
    <EarningsSummary style={{ marginTop }}>
      How much I will be earning?
      <TripleInputWrapper>
        <EarningsCell>{formatEarnings(calculatedEarnings?.hourly)}</EarningsCell>
        <EarningsCell>{formatEarnings(calculatedEarnings?.daily)}</EarningsCell>
        <EarningsCell>{formatEarnings(calculatedEarnings?.weekly)}</EarningsCell>
      </TripleInputWrapper>
    </EarningsSummary>
  );
};

export default EarningsSummaryComponent;
