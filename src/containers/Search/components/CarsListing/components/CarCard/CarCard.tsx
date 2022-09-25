import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { BoldText, Button, CarPhoto, Heading, Image, SubText } from '../../../../../../elements';
import { PartnerLogo } from '../../../../../../elements/CarCard/CarCard.styled';
import { CarsInRadiusQuery } from '../../../../../../hooks/api/carsInRadius/carsInRadius.generated';
import { StarIcon } from '../../../../../../icons';
import { formatPrice } from '../../../../../../utils';
import {
  CarCardWrapper,
  CarCardContent,
  AvarageRatings,
  CarReviewsCountsWrapper,
  CarCardFooter,
  CarCardPhotoWrapper,
} from './CarCard.styled';

interface CarCardProps {
  car: CarsInRadiusQuery['carsInRadius']['cars'][0];
  isEmbedded?: boolean;
}
const CarCard = ({ car, isEmbedded = false }: CarCardProps) => {
  const router = useRouter();
  const { end: timeEnd, start: timeStart } = router.query;
  const partnerLogo = car.business?.logoImage?.url;

  const navigationLink = useMemo((): string => {
    if (timeStart && timeEnd) {
      return `/car/${car.id}?start=${timeStart}&end=${timeEnd}`;
    }
    if (timeStart) {
      return `/car/${car.id}?start=${timeStart}`;
    }
    if (timeEnd) {
      return `/car/${car.id}?end=${timeEnd}`;
    }
    return `/car/${car.id}`;
  }, [car.id, timeEnd, timeStart]);

  return (
    <CarCardWrapper isEmbedded={isEmbedded}>
      <CarCardPhotoWrapper>
        <CarPhoto height="191px" photoUrl={car.mainImageUrl} width="100%" />
        {partnerLogo && (
          <PartnerLogo>
            <Image asset={partnerLogo} />
          </PartnerLogo>
        )}
      </CarCardPhotoWrapper>
      <CarCardContent>
        <Heading variant="h4">
          {car.makerName} {car.modelName}
        </Heading>
        <SubText style={{ fontSize: '16px', marginTop: 0 }}>{car.addressPublic}</SubText>
        <CarCardFooter>
          <Link href={navigationLink}>
            <Button>{formatPrice(car.pricePerDay / 100)} / day</Button>
          </Link>
          <AvarageRatings>
            <StarIcon /> <BoldText>{car.reviewsAverageScore || '-'}/5</BoldText>
            <CarReviewsCountsWrapper>({car.reviewsCount || '-'})</CarReviewsCountsWrapper>
          </AvarageRatings>
        </CarCardFooter>
      </CarCardContent>
    </CarCardWrapper>
  );
};

export default CarCard;
