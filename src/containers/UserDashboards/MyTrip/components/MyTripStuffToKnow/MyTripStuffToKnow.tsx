import { useForm } from 'react-hook-form';
import {
  SettingsCardWrapper,
  SettingsContent,
  SettingsCardHeader,
  Heading,
  CollapsibleList,
  TextEditorInput,
} from '../../../../../elements';
import { CarRentalRequestRenterQuery } from '../../../../../hooks/api/carRentalRequestRenter/carRentalRequestRenter.generated';
import { useGetCarGuideQuery } from '../../../../../hooks/api/getCarGuide/getCarGuide.generated';
import { IInstructionsSectionFields } from '../../../../../interfaces/contentful.types.generated';
import { getInstructionsByType } from '../../../../../utils';

interface MyTripPaymentProps {
  rental?: CarRentalRequestRenterQuery['carRentalRequest'];
  instructions: IInstructionsSectionFields;
}

const MyTripStuffToKnow = ({ rental, instructions }: MyTripPaymentProps) => {
  const isBusinessCar = Boolean(rental?.car.business);
  const carId = rental?.car.id as string;
  const { data: carGuideData, loading: carGuideLoading } = useGetCarGuideQuery({
    variables: {
      carId,
    },
  });
  const carGuide = carGuideData?.carGuide;
  const { control } = useForm();
  const instructionFromContentful = getInstructionsByType(instructions.sections, [
    isBusinessCar ? 'Business' : 'Peer-to-peer',
    'Business or Peer-to-peer',
  ]);

  const elementsList = [
    carGuide
      ? {
          title: "Host's EV Guide ",
          content: !carGuideLoading ? (
            <TextEditorInput control={control} defaultValue={carGuide} name="guide" readOnly />
          ) : null,
        }
      : null,
    ...instructionFromContentful,
  ];

  return rental ? (
    <SettingsCardWrapper>
      <SettingsCardHeader>
        <Heading variant="h4">Stuff you need to know</Heading>
      </SettingsCardHeader>
      <SettingsContent>
        <CollapsibleList elementsList={elementsList} />
      </SettingsContent>
    </SettingsCardWrapper>
  ) : null;
};

export default MyTripStuffToKnow;
