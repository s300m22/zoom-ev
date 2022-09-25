import { CarbonSavedIcon, PlasticImpactIcon, TreesSavedIcon } from '../../../icons';
import { IEcologicalFootprintSectionFields } from '../../../interfaces/contentful.types.generated';
import {
  EcologicalFootprintSectionContainer,
  EcologicalFootprintSectionWrapper,
  FootprintCell,
  FootprintCellParagraph,
} from './EcologicalFootprintSection.styled';
import { Heading, NumberCounter } from '../../../elements';

const EcologicalFootprintSection = ({
  carbonSaved,
  treesSaved,
  plasticImpact,
}: IEcologicalFootprintSectionFields) => (
  <EcologicalFootprintSectionWrapper>
    <EcologicalFootprintSectionContainer>
      <FootprintCell>
        <CarbonSavedIcon />
        <Heading superscriptTitle="CO2" variant="h1">
          <NumberCounter countTo={carbonSaved} />
        </Heading>
        <FootprintCellParagraph>
          Carbon saved <br />
          (tonnes)
        </FootprintCellParagraph>
      </FootprintCell>
      <FootprintCell>
        <TreesSavedIcon />
        <Heading variant="h1">
          <NumberCounter countTo={treesSaved} duration={1000} />
        </Heading>
        <FootprintCellParagraph>Trees planted</FootprintCellParagraph>
      </FootprintCell>
      <FootprintCell>
        <PlasticImpactIcon />
        <Heading variant="h1">
          <NumberCounter countTo={plasticImpact} />
        </Heading>
        <FootprintCellParagraph>
          Plastic impact <br />
          (kgs)
        </FootprintCellParagraph>
      </FootprintCell>
    </EcologicalFootprintSectionContainer>
  </EcologicalFootprintSectionWrapper>
);
export default EcologicalFootprintSection;
