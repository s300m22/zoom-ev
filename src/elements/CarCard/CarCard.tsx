import { Button, CarPhoto, Heading, Image } from '..';
import { StarIcon } from '../../icons';
import { formatPrice } from '../../utils';
import {
  CarDescriptionWrapper,
  CarImageWrapper,
  CarCardWrapper,
  PartnerLogo,
  Paragraph,
  CarFooterWrapper,
  CarRatingWrapper,
  CarAvailableToBuyNotice,
} from './CarCard.styled';

export interface CarProps {
  id: string;
  modelName?: string;
  partnerLogo?: string;
  carImage?: string;
  location?: string | null;
  pricePerDay?: number | null;
  reviewsAverageScore?: number | null;
  isAvailableToBuy: boolean;
}

const CarCard = ({
  id,
  modelName,
  partnerLogo,
  carImage,
  location,
  pricePerDay,
  reviewsAverageScore,
  isAvailableToBuy,
}: CarProps) => (
  <CarCardWrapper>
    <CarImageWrapper>
      <CarPhoto height="191px" photoUrl={carImage} width="100%" />
      {partnerLogo && (
        <PartnerLogo>
          <Image asset={partnerLogo} />
        </PartnerLogo>
      )}
      {isAvailableToBuy && <CarAvailableToBuyNotice>Available to buy</CarAvailableToBuyNotice>}
    </CarImageWrapper>
    <CarDescriptionWrapper>
      <Heading variant="h4">{modelName}</Heading>
      <Paragraph>{location}</Paragraph>
    </CarDescriptionWrapper>
    <CarFooterWrapper>
      <Button href={`/car/${id}`} variant="outlined" withArrow>
        {pricePerDay && formatPrice(pricePerDay / 100, 2)} / day
      </Button>
      <CarRatingWrapper>
        <StarIcon /> {reviewsAverageScore || '-'}/5
      </CarRatingWrapper>
    </CarFooterWrapper>
  </CarCardWrapper>
);

export default CarCard;
