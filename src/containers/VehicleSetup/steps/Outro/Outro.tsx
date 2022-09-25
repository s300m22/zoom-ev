import { Button, Heading } from '../../../../elements';
import { OutroParagraph, OutroInnerWrapper, OutroWrapper } from './Outro.styled';

interface OutroProps {
  isBusiness: boolean;
}

const Outro = ({ isBusiness }: OutroProps) => (
  <OutroWrapper>
    <OutroInnerWrapper>
      <Heading variant="h1">Thanks for submitting your car application </Heading>
      <OutroParagraph>
        {isBusiness
          ? 'Your EV is approved. You can check your vehicle details in My EVs section in your dashboard.'
          : `We will verify your form as soon as possible, usually within 12 hours. You can check the
          status of your application in your dashboard.`}
      </OutroParagraph>
      <Button href="/dashboard" withArrow>
        Take me to my dashboard
      </Button>
    </OutroInnerWrapper>
  </OutroWrapper>
);

export default Outro;
