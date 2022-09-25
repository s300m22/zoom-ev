import {
  SettingsCardWrapper,
  SettingsContent,
  SettingsCardHeader,
  Heading,
  CollapsibleList,
} from '../../../../../elements';
import { useIsBusiness } from '../../../../../hooks';
import { CarRentalRequestQuery } from '../../../../../hooks/api/carRentalRequest/carRentalRequest.generated';
import { IInstructionsSectionFields } from '../../../../../interfaces/contentful.types.generated';
import { getInstructionsByType } from '../../../../../utils';

interface MyBookingStuffToKnowProps {
  rental?: CarRentalRequestQuery['carRentalRequest'];
  instructions: IInstructionsSectionFields;
}

const MyBookingThingsToKnow = ({ rental, instructions }: MyBookingStuffToKnowProps) => {
  const isBusiness = useIsBusiness();
  if (!rental) return null;

  const elementsList = getInstructionsByType(instructions.sections, [
    isBusiness ? 'Business' : 'Peer-to-peer',
    'Business or Peer-to-peer',
  ]);

  return (
    <SettingsCardWrapper>
      <SettingsCardHeader>
        <Heading variant="h4">Things you need to know</Heading>
      </SettingsCardHeader>
      <SettingsContent>
        <CollapsibleList elementsList={elementsList} />
      </SettingsContent>
    </SettingsCardWrapper>
  );
};

export default MyBookingThingsToKnow;
