import { Button, Container, Heading, Image } from '../../../elements';
import { CupIcon, TrustpilotIcon } from '../../../icons';
import { IAwardsTrustpilotSectionFields } from '../../../interfaces/contentful.types.generated';
import {
  AwardsListWrapper,
  AwardsTrustpilotSectionWrapper,
  AwardsTrustpilotSectionTitle,
  AwardsListItemImage,
  AwardsListItemText,
  ButtonWrapper,
  TrustpilotWrapper,
  TrustpilotScore,
  AwardsListItem,
} from './AwardsTrustpilotSection.styled';

const AwardsTrustpilotSection = ({
  title,
  awardsList,
  callToAction,
  trustScore,
  trustpilotReviews,
}: IAwardsTrustpilotSectionFields) => (
  <AwardsTrustpilotSectionWrapper>
    <Container>
      <AwardsTrustpilotSectionTitle>
        <Heading variant="h2">{title}</Heading>
      </AwardsTrustpilotSectionTitle>
      {awardsList?.length && (
        <AwardsListWrapper>
          {awardsList?.map((item) => (
            <AwardsListItem key={item}>
              <AwardsListItemImage>
                <CupIcon />
              </AwardsListItemImage>
              <AwardsListItemText>{item}</AwardsListItemText>
            </AwardsListItem>
          ))}
        </AwardsListWrapper>
      )}
      <TrustpilotWrapper>
        <TrustpilotIcon />
        <Image
          asset={`https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-${
            Math.round(trustScore * 2) / 2
          }.svg`}
        />
        <TrustpilotScore>
          TrustScore &nbsp; <strong>{trustScore}</strong> &nbsp; | &nbsp;{' '}
          <strong>{trustpilotReviews}</strong> &nbsp; reviews
        </TrustpilotScore>
      </TrustpilotWrapper>
      <ButtonWrapper>
        <Button link={callToAction} withArrow />
      </ButtonWrapper>
    </Container>
  </AwardsTrustpilotSectionWrapper>
);

export default AwardsTrustpilotSection;
