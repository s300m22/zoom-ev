import {
  Heading,
  SettingsCardHeader,
  SettingsCardWrapper,
  UserAvatar,
  UserRatings,
  CallButton,
} from '../../../../../elements';
import { CarRentalRequestQuery } from '../../../../../hooks/api/carRentalRequest/carRentalRequest.generated';
import {
  MyBookingGuestAvatar,
  MyBookingGuestDescription,
  MyBookingGuestWrapper,
} from './MyBookingGuest.styled';

interface MyBookingHostProps {
  rental?: CarRentalRequestQuery['carRentalRequest'];
}

const MyBookingGuest = ({ rental }: MyBookingHostProps) => {
  if (!rental) {
    return null;
  }

  const {
    user: { details: userDetails },
  } = rental;
  const userAvatar = userDetails.avatarImage?.url;
  const userName = `${userDetails.firstName} ${userDetails.lastName}`;
  const avgScore = rental.user.reviewsAverageScore;
  const totalReview = rental.user.reviewsCount;

  return rental ? (
    <SettingsCardWrapper>
      <SettingsCardHeader>
        <Heading variant="h4">Guest</Heading>
      </SettingsCardHeader>
      <MyBookingGuestWrapper>
        <MyBookingGuestAvatar>
          <UserAvatar avatarUrl={userAvatar} />
        </MyBookingGuestAvatar>
        <MyBookingGuestDescription>
          <Heading variant="h6">{userName}</Heading>
          <UserRatings avgScore={avgScore} totalReviews={totalReview} />
        </MyBookingGuestDescription>
      </MyBookingGuestWrapper>
      <div style={{ marginTop: '20px' }}>
        <CallButton buttonText="Call Guest" phoneNumber={userDetails.phoneNumber} />
      </div>
    </SettingsCardWrapper>
  ) : null;
};

export default MyBookingGuest;
