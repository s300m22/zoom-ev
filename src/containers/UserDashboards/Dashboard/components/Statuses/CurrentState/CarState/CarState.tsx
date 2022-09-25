import Skeleton from 'react-loading-skeleton';
import { CarSetup } from '../../Setup';
import { CarPending } from '../../Pending';
import { useMyCarsQuery } from '../../../../../../../hooks/api/myCars/myCars.generated';
import { CarDetailsApproveStatusEnum } from '../../../../../../../hooks/api/stripeSetupIntents/stripeSetupIntents.generated';
import { CarApproved } from '../../Approved';
import { CarRejected } from '../../Rejected';

const CarState = () => {
  const { data: carsData, loading: carsLoading } = useMyCarsQuery();
  const cars = carsData?.myCars;

  const CarStateComponent = () => {
    const car = cars && cars.slice(-1)[0];
    if (car) {
      const carStatus = car.details.approveStatus;
      const carUpdateStatus = car.detailsRequested?.approveStatus;
      switch (true) {
        case carStatus === CarDetailsApproveStatusEnum.Approved && car.detailsRequested === null:
          return <CarApproved />;
        case carUpdateStatus === CarDetailsApproveStatusEnum.Rejected:
          return <CarRejected carId={car.id} />;
        case !car.isDraft:
          return <CarPending />;
        default:
          return <CarSetup carId={car.id} shouldContinue />;
      }
    } else {
      return <CarSetup />;
    }
  };

  return carsLoading ? (
    <Skeleton
      count={1}
      height={140}
      style={{
        marginTop: '10px',
        marginBottom: '10px',
        borderRadius: '12px',
        boxShadow: '0 10px 34px rgba(23, 75, 83, 0.1)',
      }}
    />
  ) : (
    <CarStateComponent />
  );
};

export default CarState;
