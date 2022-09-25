import React from 'react';
import { Heading, SimpleCard, Tooltip } from '../../../../elements';
import { GetPublicCarQuery } from '../../../../hooks/api/getPublicCarInformation/getPublicCarInformation.generated';
import { HeadingWrapper, TooltipHolder, ValueWrapper } from './TradingHoursCard.styled';

interface TradingHoursCardProps {
  car: GetPublicCarQuery['car'];
}

const TradingHoursCard: React.FC<TradingHoursCardProps> = ({ car }) => {
  const hours = car?.business?.tradingHours.split('\\n');
  return (
    <>
      {car?.business && car.business?.tradingHours && (
        <SimpleCard>
          <HeadingWrapper>
            <Heading variant="h4">Open hours for pick up/drop off</Heading>
            <TooltipHolder>
              <Tooltip
                content={`You will need to return the vehicle in person to this business. Please make sure the pick up and drop off day / time you have selected match the opening hours of this business`}
              />
            </TooltipHolder>
          </HeadingWrapper>
          <ValueWrapper>
            {hours?.map((hour) => (
              <>
                {hour} <br />
              </>
            ))}
          </ValueWrapper>
        </SimpleCard>
      )}
    </>
  );
};

export default TradingHoursCard;
