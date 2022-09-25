import isPast from 'date-fns/isPast';
import Link from 'next/link';
import {
  BoldText,
  Heading,
  SubText,
  RentalStatus,
  CarPhoto,
  AddHostCarReviewPopup,
  Image,
} from '../../../../../elements';
import { CarRentalRequestsQuery } from '../../../../../hooks/api/carRentalRequests/carRentalRequests.generated';
import {
  ActionNeeded,
  RentalCardAvatarWrapper,
  RentalCardBody,
  RentalCardWrapper,
  RentalCarHeader,
  RentalCarDescription,
  RentalCarCell,
  RentalStatusWrapper,
  RentalCardFooter,
  MyTripsPartnerLogo,
} from './RentalCard.styled';
import { convertToReadableDateFormat } from '../../../../../utils';
import getCarPhotos from '../../../../../utils/getCarPhotos';
import {
  CarRentalRequestStatusEnum,
  CarRentalRequestPaymentStatusEnum,
} from '../../../../../interfaces/api.types.generated.d';

interface RentalCardProps {
  rental: CarRentalRequestsQuery['carRentalRequests']['rentalRequests'][0];
}

const RentalCard = ({ rental }: RentalCardProps) => {
  const {
    car: { details: carDetails },
    car,
  } = rental;
  const isInProgress = isPast(rental.timeStart);
  const isActionRequired =
    rental.paymentStatus === CarRentalRequestPaymentStatusEnum.RequiresAction;
  const carName = `${carDetails.maker?.name} ${carDetails.model?.name}`;
  const carImage = getCarPhotos(carDetails.images, carDetails.mainImageId);
  const bussinessImage = rental.car?.business?.logoImage?.url;

  const hostDetails = car?.business
    ? {
        isBusiness: true,
        name: car.business.displayName,
        avatar: car.business.logoImage?.url || '',
      }
    : {
        isBusiness: false,
        name: `${car?.user?.details.firstName} ${car?.user?.details.lastName}`,
        avatar: car?.user?.details.avatarImage?.url || '',
      };

  const carDetailsForReview = {
    name: `${car?.details.maker?.name} ${car?.details.model?.name}`,
    avatar: getCarPhotos(car?.details.images, car?.details.mainImageId).mainImage,
    plate: car?.details.registration,
  };

  return (
    <RentalCardWrapper>
      <Link href={`/dashboard/trips/details/${rental.id}`}>
        <RentalCardAvatarWrapper>
          {bussinessImage ? (
            <MyTripsPartnerLogo>
              <Image asset={bussinessImage} />
            </MyTripsPartnerLogo>
          ) : null}
          <CarPhoto photoUrl={carImage.mainImage?.url} />
        </RentalCardAvatarWrapper>
      </Link>
      <Link href={`/dashboard/trips/details/${rental.id}`}>
        <RentalCardBody>
          <RentalCarHeader>
            <Heading variant="h5">{carName}</Heading>
            <RentalStatusWrapper>
              {isActionRequired && <ActionNeeded>Action needed</ActionNeeded>}
              <RentalStatus isInProgress={isInProgress} rentalStatus={rental.status} />
            </RentalStatusWrapper>
          </RentalCarHeader>
          <RentalCarDescription>
            <RentalCarCell>
              <SubText style={{ fontSize: '14px', margin: '0 0 5px' }}>Booking no.</SubText>
              <BoldText style={{ fontSize: '14px' }}>{rental.id}</BoldText>
            </RentalCarCell>
            <RentalCarCell>
              <SubText style={{ fontSize: '14px', margin: '0 0 5px' }}>Vehicle</SubText>
              <BoldText style={{ fontSize: '14px' }}>{carName}</BoldText>
            </RentalCarCell>
            <RentalCarCell>
              <SubText style={{ fontSize: '14px', margin: '0 0 5px' }}>From</SubText>
              <BoldText style={{ fontSize: '14px' }}>
                {convertToReadableDateFormat({ date: rental.timeStart, showTime: true })}
              </BoldText>
            </RentalCarCell>
            <RentalCarCell>
              <SubText style={{ fontSize: '14px', margin: '0 0 5px' }}>To</SubText>
              <BoldText style={{ fontSize: '14px' }}>
                {convertToReadableDateFormat({ date: rental.timeEnd, showTime: true })}
              </BoldText>
            </RentalCarCell>
          </RentalCarDescription>
        </RentalCardBody>
      </Link>
      <RentalCardFooter>
        {(rental.status === CarRentalRequestStatusEnum.Finished ||
          rental.status === CarRentalRequestStatusEnum.Incidented) && (
          <AddHostCarReviewPopup
            carDetails={carDetailsForReview}
            hostDetails={hostDetails}
            rentalId={rental.id}
          />
        )}
      </RentalCardFooter>
    </RentalCardWrapper>
  );
};
export default RentalCard;
