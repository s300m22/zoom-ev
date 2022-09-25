import { CarState, ProfileState, StripeState } from '../../CurrentState';

const CarOwnerSetupStatus = () => {
  return (
    <>
      <ProfileState />
      <CarState />
      <StripeState />
    </>
  );
};

export default CarOwnerSetupStatus;
