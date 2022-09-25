import ImageGallery from 'react-image-gallery';
import { BoldText, Heading, Image, SimpleCard, SubText } from '../../../../elements';
import { StarIcon } from '../../../../icons';
import 'react-image-gallery/styles/css/image-gallery.css';
import { GalleryWrapper, CarSummaryGrid, RatingWrapper, RatingsCount } from './CarSummary.styled';
import { getCarPhotos } from '../../../../utils';
import { GetPublicCarQuery } from '../../../../hooks/api/getPublicCarInformation/getPublicCarInformation.generated';
import { PartnerLogo } from '../../../../elements/CarCard/CarCard.styled';

interface CarSummaryCardProps {
  car: GetPublicCarQuery['car'];
}

const CarSummaryCard = ({ car }: CarSummaryCardProps) => {
  const carImages = getCarPhotos(car?.details.images, car?.details.mainImageId);

  const images = carImages?.secondaryImages?.map((image) => ({
    original: image.url,
    thumbnail: image.url,
  }));

  if (carImages.mainImage) {
    images?.unshift({
      original: carImages.mainImage.url,
      thumbnail: carImages.mainImage.url,
    });
  }

  const partnerLogo = car?.business?.logoImage?.url;

  return car ? (
    <SimpleCard>
      <Heading variant="h2">
        {car.details.maker?.name} {car.details.model?.name}
      </Heading>
      <CarSummaryGrid>
        <RatingWrapper>
          <StarIcon /> <BoldText>{car.reviewsAverageScore || '-'}/5</BoldText>
          <RatingsCount>({car.reviewsCount})</RatingsCount>
        </RatingWrapper>
        <SubText style={{ fontWeight: 500, fontSize: '16px' }}>{car.details.year}</SubText>
        <SubText style={{ fontWeight: 500, fontSize: '16px' }}>{car.details.doors} doors</SubText>
        <SubText style={{ fontWeight: 500, fontSize: '16px' }}>{car.details.seats} seats</SubText>
        <SubText style={{ fontWeight: 500, fontSize: '16px' }}>{car.details.transmission}</SubText>
      </CarSummaryGrid>
      {images ? (
        <GalleryWrapper>
          <ImageGallery
            items={images}
            showFullscreenButton={false}
            showNav={false}
            showPlayButton={false}
          />
          {partnerLogo && (
            <PartnerLogo>
              <Image asset={partnerLogo} />
            </PartnerLogo>
          )}
        </GalleryWrapper>
      ) : null}
    </SimpleCard>
  ) : null;
};

export default CarSummaryCard;
