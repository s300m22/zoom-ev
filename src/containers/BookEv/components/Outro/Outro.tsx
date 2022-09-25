import { Button, Heading, SubText } from '../../../../elements';
import {
  ThanksForBookingCard,
  OutroParagraph,
  OutroInnerWrapper,
  OutroWrapper,
  ButtonFooter,
  SingleOutroParagraph,
  OutroContainer,
} from './Outro.styled';

const Outro = () => (
  <OutroWrapper>
    <OutroContainer>
      <OutroInnerWrapper>
        <Heading variant="h1">Thanks for booking your trip with Zoom EV!</Heading>
        <ThanksForBookingCard>
          <Heading variant="h3">What happens next?</Heading>
          <OutroParagraph>
            <SingleOutroParagraph>
              <Heading variant="h4">Host reviews and approves your booking</Heading>
              <SubText style={{ fontSize: '16px' }}>
                We will notify you when your Host approves your booking. You&apos;ll receive all the
                information needed for your trip
              </SubText>
            </SingleOutroParagraph>
            <SingleOutroParagraph>
              <Heading variant="h4">Zoom EV takes your payment securely </Heading>
              <SubText style={{ fontSize: '16px' }}>
                We will take the booking amount from you only once your Host approves your booking,
                not before. We are able to take further payment from your account should there be
                any issues or accidents during your trip
              </SubText>
            </SingleOutroParagraph>
          </OutroParagraph>
          <ButtonFooter>
            <Button href="/dashboard/trips" withArrow>
              Dismiss
            </Button>
          </ButtonFooter>
        </ThanksForBookingCard>
      </OutroInnerWrapper>
    </OutroContainer>
  </OutroWrapper>
);

export default Outro;
