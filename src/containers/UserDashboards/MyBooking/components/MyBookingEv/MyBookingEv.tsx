import {
  SettingsCardWrapper,
  SettingsContent,
  SettingsCardHeader,
  Heading,
  SubText,
  BoldText,
} from '../../../../../elements';
import { CarRentalRequestQuery } from '../../../../../hooks/api/carRentalRequest/carRentalRequest.generated';
import { SpaceBetweenRow } from '../SharedStyles.styled';

interface MyBookingHostProps {
  rental?: CarRentalRequestQuery['carRentalRequest'];
}

const MyBookingEv = ({ rental }: MyBookingHostProps) => {
  if (!rental) return null;

  const {
    car: { details: carDetails },
  } = rental;
  const carName = `${carDetails.maker?.name} ${carDetails.model?.name}, ${carDetails.registration}`;

  return (
    <SettingsCardWrapper>
      <SettingsCardHeader>
        <Heading variant="h4">EV Details</Heading>
      </SettingsCardHeader>
      <SettingsContent>
        <SpaceBetweenRow>
          <SubText>EV</SubText>
          <BoldText>{carName}</BoldText>
        </SpaceBetweenRow>
        <SpaceBetweenRow>
          <SubText>Location</SubText>
          <BoldText>{rental.car.addressPrivate}</BoldText>
        </SpaceBetweenRow>
      </SettingsContent>
    </SettingsCardWrapper>
  );
};

export default MyBookingEv;
