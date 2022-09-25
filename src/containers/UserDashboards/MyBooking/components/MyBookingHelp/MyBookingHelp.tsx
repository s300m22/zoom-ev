import {
  SettingsCardWrapper,
  SettingsContent,
  SettingsCardHeader,
  Heading,
  CollapsibleList,
} from '../../../../../elements';
import { getInstructionsByType } from '../../../../../utils';
import { CarRentalRequestQuery } from '../../../../../hooks/api/carRentalRequest/carRentalRequest.generated';
import { IInstructionsSectionFields } from '../../../../../interfaces/contentful.types.generated';

interface MyBookingPaymentProps {
  rental?: CarRentalRequestQuery['carRentalRequest'];
  instructions: IInstructionsSectionFields;
}

const MyBookingHelp = ({ rental, instructions }: MyBookingPaymentProps) => {
  const elementsList = getInstructionsByType(instructions.sections, ['Help']);
  if (!rental || !elementsList.length) return null;

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

export default MyBookingHelp;
