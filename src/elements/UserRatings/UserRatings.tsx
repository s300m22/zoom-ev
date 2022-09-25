import { StarIcon } from '../../icons';
import { UserRatingsWrapper, UserRatingsSvgWrapper, UserRatingsTotal } from './UserRatings.styled';

export interface UserRatingsProps {
  avgScore: number | null | undefined;
  totalReviews: number | null | undefined;
}

const UserRatings = ({ avgScore, totalReviews }: UserRatingsProps) => (
  <UserRatingsWrapper>
    <UserRatingsSvgWrapper>
      <StarIcon />
    </UserRatingsSvgWrapper>{' '}
    {avgScore || '-'}/5 <UserRatingsTotal>({totalReviews || 0})</UserRatingsTotal>
  </UserRatingsWrapper>
);

export default UserRatings;
