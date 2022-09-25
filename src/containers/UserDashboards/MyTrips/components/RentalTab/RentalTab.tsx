import NoTrips from '../NoTrips';
import RentalCard from '../RentalCard';
import { CarRentalRequestsQuery } from '../../../../../hooks/api/carRentalRequests/carRentalRequests.generated';

interface RentalTabProps {
  carRentals?: CarRentalRequestsQuery['carRentalRequests']['rentalRequests'];
}

const RentalTab = ({ carRentals }: RentalTabProps) => {
  return carRentals && carRentals.length ? (
    <>
      {carRentals.map((rental) => (
        <RentalCard key={rental.id} rental={rental} />
      ))}
    </>
  ) : (
    <NoTrips />
  );
};

export default RentalTab;
