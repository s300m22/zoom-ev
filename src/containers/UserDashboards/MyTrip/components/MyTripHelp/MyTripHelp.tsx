import {
  SettingsCardWrapper,
  SettingsContent,
  SettingsCardHeader,
  Heading,
  CollapsibleList,
} from '../../../../../elements';
import { getInstructionsByType } from '../../../../../utils';
import { IInstructionsSectionFields } from '../../../../../interfaces/contentful.types.generated';
import { CarRentalRequestRenterQuery } from '../../../../../hooks/api/carRentalRequestRenter/carRentalRequestRenter.generated';

interface MyTripPaymentProps {
  rental?: CarRentalRequestRenterQuery['carRentalRequest'];
  instructions: IInstructionsSectionFields;
}

const MyTripHelp = ({ rental, instructions }: MyTripPaymentProps) => {
  if (!rental) return null;

  const elementsList = getInstructionsByType(instructions.sections, ['Help']);
  if (!elementsList.length) return null;

  return (
    <SettingsCardWrapper>
      <SettingsCardHeader>
        <Heading variant="h4">Help</Heading>
      </SettingsCardHeader>
      <SettingsContent>
        <CollapsibleList elementsList={elementsList} />
      </SettingsContent>
    </SettingsCardWrapper>
  );
};

export default MyTripHelp;
