/* eslint-disable no-nested-ternary */
import { CarRentalRequestQuery } from './api/carRentalRequest/carRentalRequest.generated';

interface CarOwnerDetailsProps {
  data?: CarRentalRequestQuery['carRentalRequest']['car'];
}

const useCarOwnerDetails = ({ data }: CarOwnerDetailsProps) => {
  if (!data)
    return {
      avatar: undefined,
      name: null,
      avgScore: null,
      totalReviews: 0,
    };
  const { business, user } = data;
  const avatar = business?.logoImage?.url || user?.details.avatarImage?.url;
  const name = business?.displayName
    ? business?.displayName
    : user?.details.firstName && user?.details.lastName
    ? `${user?.details.firstName} ${user?.details.lastName}`
    : null;
  const avgScore = business?.reviewsAverageScore || user?.reviewsAverageScore;
  const totalReviews = business?.reviewsCount || user?.reviewsCount;
  const phone = business?.phoneNumber || user?.details.phoneNumber;

  return {
    avatar,
    name,
    avgScore,
    totalReviews,
    phone,
  };
};

export default useCarOwnerDetails;
