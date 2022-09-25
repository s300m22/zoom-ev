import { useState } from 'react';
import { Button } from '..';
import { useSnackbar } from '../../hooks';
import { useCancelCarRentalRequestMutation } from '../../hooks/api/cancelCarRentalRequest/cancelCarRentalRequest.generated';
import { logError } from '../../utils';
import { CancelBookingWrapper, CancelBookingConfirm } from './CancelBooking.styled';

export interface CancelBookingProps {
  id: string;
  onCanceled: () => void;
}

const CancelBooking = ({ id, onCanceled }: CancelBookingProps) => {
  const showSnackbar = useSnackbar();
  const [showConfirm, setShowConfirm] = useState(false);
  const [cancelRentalRequest, { loading }] = useCancelCarRentalRequestMutation({
    variables: {
      id,
    },
  });

  const handleCancel = async () => {
    try {
      await cancelRentalRequest();
      showSnackbar({ message: 'Booking canceled successfully.', type: 'success' });
    } catch (error: any) {
      logError(error);
      showSnackbar({ message: 'Oops, Something went wrong.', type: 'error' });
    }
    onCanceled();
  };

  return (
    <CancelBookingWrapper>
      {showConfirm ? (
        <CancelBookingConfirm>
          <Button onClick={() => setShowConfirm(false)} variant="outlined">
            Dismiss
          </Button>
          <Button onClick={handleCancel}>Confirm</Button>
        </CancelBookingConfirm>
      ) : (
        <Button
          className="delete"
          customStyles={{ color: '#F05828', borderColor: 'transparent' }}
          isLoading={loading}
          onClick={() => setShowConfirm(true)}
          variant="outlined"
        >
          Cancel booking
        </Button>
      )}
    </CancelBookingWrapper>
  );
};

export default CancelBooking;
