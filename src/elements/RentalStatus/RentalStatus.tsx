import { CarRentalRequestStatusEnum } from '../../interfaces/api.types.generated.d';
import { StatusEnum, StatusLabel } from '../StatusLabel';

export interface RentalStatusProps {
  rentalStatus: CarRentalRequestStatusEnum;
  isInProgress: boolean;
  ommitPending?: boolean;
}

const RentalStatus = ({ rentalStatus, isInProgress, ommitPending }: RentalStatusProps) => {
  switch (true) {
    case rentalStatus === CarRentalRequestStatusEnum.WaitingForAcceptance && Boolean(ommitPending):
      return null;
    case rentalStatus === CarRentalRequestStatusEnum.WaitingForAcceptance:
      return <StatusLabel status={StatusEnum.Pending}>Pending</StatusLabel>;
    case rentalStatus === CarRentalRequestStatusEnum.Accepted && isInProgress:
      return <StatusLabel status={StatusEnum.InProgress}>In Progress</StatusLabel>;
    case rentalStatus === CarRentalRequestStatusEnum.Accepted:
      return <StatusLabel status={StatusEnum.Approved}>Accepted</StatusLabel>;
    case rentalStatus === CarRentalRequestStatusEnum.Rejected:
      return <StatusLabel status={StatusEnum.Rejected}>Rejected</StatusLabel>;
    case rentalStatus === CarRentalRequestStatusEnum.Finished:
      return <StatusLabel status={StatusEnum.Completed}>Completed</StatusLabel>;
    case rentalStatus === CarRentalRequestStatusEnum.Incidented:
      return <StatusLabel status={StatusEnum.Rejected}>Problem reported</StatusLabel>;
    case rentalStatus === CarRentalRequestStatusEnum.Cancelled:
      return <StatusLabel status={StatusEnum.Rejected}>Cancelled</StatusLabel>;
    default:
      return null;
  }
};

export default RentalStatus;
