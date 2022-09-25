/* eslint-disable no-nested-ternary */
import Link from 'next/link';
import { Button, CarPhoto, Heading, StatusEnum, StatusLabel } from '../../../../../elements';
import ContinueSetupCarPopup from '../../../../../elements/Popups/ContinueSetupCarPopup';
import { MyCarsQuery } from '../../../../../hooks/api/myCars/myCars.generated';
import { EditIcon, StarIcon, EyeWhiteIcon } from '../../../../../icons';
import { CarDetailsApproveStatusEnum } from '../../../../../interfaces/api.types.generated.d';
import { formatPrice, getCarPhotos } from '../../../../../utils';
import {
  CarCardWrapper,
  CarCardPhotoLabel,
  CarCardPhotoWrapper,
  CarCardDetails,
  CarCardAction,
  CarCardTextDetailsWrapper,
  CarCardTextRow,
  ReviewsRating,
  NavigationButton,
  CarCardStatCellDetails,
  CarCardStatCellTitle,
  CarCardStatCell,
} from './CarCard.styled';

interface CarCardProps {
  car: MyCarsQuery['myCars'][0];
}

const CarCard = ({ car }: CarCardProps) => {
  const { id, reviewsAverageScore, details, detailsRequested, pricePerDay, addressPrivate } = car;
  const isCarHidden = !car.visible;
  const isCarApproved = details.approveStatus === CarDetailsApproveStatusEnum.Approved;
  const isCarRejected = detailsRequested?.approveStatus === CarDetailsApproveStatusEnum.Rejected;
  const carName = `${details?.maker?.name || detailsRequested?.maker?.name || ''} ${
    details?.model?.name || detailsRequested?.model?.name || ''
  }`;
  const carImage = getCarPhotos(details.images, details.mainImageId);
  const { registration } = car.details;

  return (
    <CarCardWrapper isHidden={isCarHidden}>
      <CarCardDetails>
        <CarCardPhotoWrapper>
          <CarPhoto photoUrl={carImage.mainImage?.url} />
          {isCarHidden && (
            <CarCardPhotoLabel>
              <span>LISTING HIDDEN</span>
            </CarCardPhotoLabel>
          )}
        </CarCardPhotoWrapper>
        <CarCardTextDetailsWrapper>
          <CarCardTextRow>
            <Heading variant="h5">
              {carName.length > 1 && `${carName}, `} {registration}
              {isCarApproved ? (
                <ReviewsRating>
                  <StarIcon />
                  {reviewsAverageScore || '-'}/5
                </ReviewsRating>
              ) : null}
            </Heading>
          </CarCardTextRow>
          <CarCardTextRow>
            <CarCardStatCell>
              <CarCardStatCellTitle>Daily rate</CarCardStatCellTitle>
              <CarCardStatCellDetails>
                {pricePerDay ? formatPrice(pricePerDay / 100) : '-'}
              </CarCardStatCellDetails>
            </CarCardStatCell>
            <CarCardStatCell>
              <CarCardStatCellTitle>Address</CarCardStatCellTitle>
              <CarCardStatCellDetails>{addressPrivate || '-'}</CarCardStatCellDetails>
            </CarCardStatCell>
          </CarCardTextRow>
          {isCarApproved ? (
            <CarCardTextRow>
              <Link href={`../car/${id}`}>
                <NavigationButton>
                  <EyeWhiteIcon /> Show listing
                </NavigationButton>
              </Link>
              <Link href={`/dashboard/car/${id}`}>
                <NavigationButton>
                  <EditIcon /> Edit listing
                </NavigationButton>
              </Link>
            </CarCardTextRow>
          ) : null}
        </CarCardTextDetailsWrapper>
      </CarCardDetails>
      <CarCardAction>
        {isCarApproved ? (
          <Link href={`/dashboard/car/availability/${id}`}>
            <Button variant="outlined" withArrow>
              Availability
            </Button>
          </Link>
        ) : isCarRejected ? (
          <StatusLabel status={StatusEnum.Rejected}>Rejected</StatusLabel>
        ) : car.isDraft ? (
          <ContinueSetupCarPopup carId={id} />
        ) : (
          <StatusLabel status={StatusEnum.Pending}>Pending</StatusLabel>
        )}
      </CarCardAction>
    </CarCardWrapper>
  );
};

export default CarCard;
