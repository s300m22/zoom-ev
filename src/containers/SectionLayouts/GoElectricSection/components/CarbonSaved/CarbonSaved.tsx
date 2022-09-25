import { CarbonSavedWhiteIcon } from '../../../../../icons';
import { CarbonSavedWrapper, CarIconWrapper, TextWrapper, Paragraph } from './CaronSaved.styled';
import { Heading } from '../../../../../elements';

interface CarbonSavedProps {
  carbonSaved: number;
}

const CarbonSaved = ({ carbonSaved }: CarbonSavedProps) => (
  <CarbonSavedWrapper>
    <CarIconWrapper>
      <CarbonSavedWhiteIcon />
    </CarIconWrapper>
    <TextWrapper>
      <Heading superscriptTitle="CO2" variant="h1">
        {carbonSaved}
      </Heading>
      <Paragraph>Carbon saved (tonnes)</Paragraph>
    </TextWrapper>
  </CarbonSavedWrapper>
);

export default CarbonSaved;
