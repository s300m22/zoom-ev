import { Dispatch, SetStateAction } from 'react';
import { Button, Heading, StepsLine } from '../../../../elements';
import { MessagesIcon } from '../../../../icons';
import { CardIntroWrapper, IntroWrapper, StepsIntroWrapper, CardParagraph } from './Intro.styled';

interface IntroProps {
  steps: Array<string>;
  setActiveStep: Dispatch<SetStateAction<number>>;
}

const Intro = ({ steps, setActiveStep }: IntroProps) => (
  <IntroWrapper>
    <StepsIntroWrapper>
      <StepsLine steps={steps} />
      <Button onClick={() => setActiveStep(1)} withArrow>
        Get started
      </Button>
    </StepsIntroWrapper>
    <CardIntroWrapper>
      <MessagesIcon />
      <Heading variant="h3">Why do we need to verify you?</Heading>
      <CardParagraph>
        We really care about building community of trusted EV enthusiasts. Because you are using
        Zoom EV for the first time, we need to ask you for some information to verify you. <br />
        You will need to fill in this form only once.
      </CardParagraph>
    </CardIntroWrapper>
  </IntroWrapper>
);

export default Intro;
