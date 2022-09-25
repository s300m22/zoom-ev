import { Button, Heading } from '../../../../elements';
import { OutroParagraph, OutroInnerWrapper, OutroWrapper } from './Outro.styled';

const Outro = () => {
  return (
    <OutroWrapper>
      <OutroInnerWrapper>
        <Heading variant="h1">Thank you for submitting your form</Heading>
        <OutroParagraph>
          We will verify your form as soon as possible, usually within 12 hours. You can check the
          status of your application in your dashboard.{' '}
        </OutroParagraph>
        <Button href="/dashboard" withArrow>
          Take me to my dashboard
        </Button>
      </OutroInnerWrapper>
    </OutroWrapper>
  );
};

export default Outro;
