import {
  SettingsCardWrapper,
  SettingsContent,
  SettingsCardHeader,
  Heading,
  SubText,
  BoldText,
  StyledLink,
  CarPhoto,
} from '../../../../../elements';
import { CarRentalRequestRenterQuery } from '../../../../../hooks/api/carRentalRequestRenter/carRentalRequestRenter.generated';
import getCarPhotos from '../../../../../utils/getCarPhotos';
import { TableLikeRow } from '../SharedStyles.styled';
import { CarCardPhotoWrapper } from './MyTripEv.styled';

interface MyTripPaymentProps {
  rental?: CarRentalRequestRenterQuery['carRentalRequest'];
}

const MyTripEv = ({ rental }: MyTripPaymentProps) => {
  if (!rental) return null;

  const {
    car: { details: carDetails },
  } = rental;

  const carImage = getCarPhotos(carDetails.images, carDetails.mainImageId);
  const carMake = carDetails.maker?.name;
  const carModel = carDetails.model?.name;
  const carListingUrl = `/car/${rental.car.id}`;

  return (
    <SettingsCardWrapper>
      <SettingsCardHeader>
        <Heading variant="h4">Ev Details</Heading>
      </SettingsCardHeader>
      <SettingsContent>
        <CarCardPhotoWrapper>
          <CarPhoto height="auto" photoUrl={carImage.mainImage?.url} width="100%" />
        </CarCardPhotoWrapper>
        <TableLikeRow style={{ borderBottom: 'none' }}>
          <div>
            <SubText style={{ fontSize: '14px', margin: '0 0 5px' }}>Make</SubText>
            <BoldText style={{ margin: '0 0 5px' }}>{carMake}</BoldText>
          </div>
          <div>
            <SubText style={{ fontSize: '14px', margin: '0 0 5px' }}>Model</SubText>
            <BoldText style={{ margin: '0 0 5px' }}>{carModel}</BoldText>
          </div>
        </TableLikeRow>
        <TableLikeRow style={{ borderBottom: 'none', margin: '0', padding: '0' }}>
          <div>
            <SubText style={{ fontSize: '14px', margin: '0 0 5px' }}>Vehicle Reg.</SubText>
            <BoldText style={{ margin: '0 0 5px' }}>{rental.car.details.registration}</BoldText>
          </div>
          <div>
            <BoldText style={{ fontSize: '16px', margin: '21px 0 5px' }}>
              <StyledLink color="blue" href={carListingUrl}>
                Show car listing
              </StyledLink>
            </BoldText>
          </div>
        </TableLikeRow>
      </SettingsContent>
    </SettingsCardWrapper>
  );
};

export default MyTripEv;
