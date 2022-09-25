import {
  SettingsCardWrapper,
  SettingsCardHeader,
  Heading,
  UserRatings,
  UserAvatar,
  CallButton,
} from '../../../../../elements';
import { useCarOwnerDetails } from '../../../../../hooks';
import { CarRentalRequestRenterQuery } from '../../../../../hooks/api/carRentalRequestRenter/carRentalRequestRenter.generated';
import {
  MyTripHostWrapper,
  MyTripHostAvatar,
  MyTripHostDescription,
  CallButtonWrapper,
} from './MyTripHost.styled';

interface MyTripHostProps {
  rental?: CarRentalRequestRenterQuery['carRentalRequest'];
}

const MyTripHost = ({ rental }: MyTripHostProps) => {
  const { avatar, name, avgScore, totalReviews, phone } = useCarOwnerDetails({ data: rental?.car });
  if (!rental) return null;
  return (
    <SettingsCardWrapper>
      <SettingsCardHeader>
        <Heading variant="h4">Your host</Heading>
      </SettingsCardHeader>
      <MyTripHostWrapper>
        <MyTripHostAvatar>
          <UserAvatar avatarUrl={avatar} />
        </MyTripHostAvatar>
        <MyTripHostDescription>
          <Heading variant="h6">{name}</Heading>
          <UserRatings avgScore={avgScore} totalReviews={totalReviews} />
        </MyTripHostDescription>
        <CallButtonWrapper>
          <CallButton buttonText="Call Host" phoneNumber={phone} />
        </CallButtonWrapper>
      </MyTripHostWrapper>
    </SettingsCardWrapper>
  );
};

export default MyTripHost;
