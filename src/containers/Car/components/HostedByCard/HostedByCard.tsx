import { BoldText, Heading, List, SimpleCard, SubText, UserAvatar } from '../../../../elements';
import { GetPublicCarQuery } from '../../../../hooks/api/getPublicCarInformation/getPublicCarInformation.generated';
import { StarIcon } from '../../../../icons';
import { CarFeatureTypeEnum } from '../../../../interfaces/api.types.generated.d';
import {
  HostedByImageWrapper,
  HostedByHeader,
  HostedByDescriptionWrapper,
  HostedByFeaturesWrapper,
  RatingWrapper,
  RatingsCount,
} from './HostByCard.styled';

interface HostedByCardProps {
  car: GetPublicCarQuery['car'];
}

const HostedByCard = ({ car }: HostedByCardProps) => {
  const carOwner = car?.business
    ? {
        isBusiness: true,
        name: car.business.displayName,
        avatar: car.business.logoImage?.url || '',
        reviewsAverageScore: car.business.reviewsAverageScore,
        reviewsCount: car.business.reviewsCount,
      }
    : {
        isBusiness: false,
        name: car?.user?.details.firstName,
        avatar: car?.user?.details.avatarImage?.url || '',
        reviewsAverageScore: car?.user?.reviewsAverageScore,
        reviewsCount: car?.business?.reviewsCount,
      };

  const extrasFeatures = car?.features
    .filter((featureItem) => featureItem.type === CarFeatureTypeEnum.Extra)
    .map((feature) => feature.name);
  const otherFeatures = car?.features
    .filter((featureItem) => featureItem.type === CarFeatureTypeEnum.Other)
    .map((feature) => feature.name);

  return car ? (
    <SimpleCard>
      <Heading variant="h4">Hosted by</Heading>
      <HostedByHeader>
        <HostedByImageWrapper>
          <UserAvatar avatarUrl={carOwner.avatar} height="128px" width="128px" />
        </HostedByImageWrapper>
        <div>
          <Heading variant="h6">{carOwner.name}</Heading>
          <RatingWrapper>
            <StarIcon /> <BoldText>{carOwner.reviewsAverageScore || '-'}/5</BoldText>
            <RatingsCount>({carOwner.reviewsCount || 0})</RatingsCount>
          </RatingWrapper>
        </div>
      </HostedByHeader>
      <HostedByDescriptionWrapper>
        <Heading variant="h5">Description</Heading>
        <SubText style={{ fontSize: '16px' }}>{car.details.description}</SubText>
      </HostedByDescriptionWrapper>
      <HostedByFeaturesWrapper>
        {extrasFeatures && extrasFeatures.length ? (
          <List listColumns={2} listItems={extrasFeatures} listTitle="Extras" />
        ) : null}
        {otherFeatures && otherFeatures.length ? (
          <List listColumns={2} listItems={otherFeatures} listTitle="Other" />
        ) : null}
      </HostedByFeaturesWrapper>
    </SimpleCard>
  ) : null;
};

export default HostedByCard;
