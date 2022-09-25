import { useRouter } from 'next/router';
import { useState } from 'react';
import { Heading, SubText, Button } from '../../../../../../../elements';
import { useSnackbar } from '../../../../../../../hooks';
import { useDeleteCarMutation } from '../../../../../../../hooks/api/deleteCar/deleteCar.generated';
import { logError } from '../../../../../../../utils';
import { CarDeleteConfirm, CarDeleteWrapper } from './CarDelete.styled';

interface CarDeleteProps {
  carId: string;
}

const CarDelete = ({ carId }: CarDeleteProps) => {
  const showSnackbar = useSnackbar();
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteCar, { loading: deleteCarLoading }] = useDeleteCarMutation();

  const handleDelete = async () => {
    try {
      await deleteCar({
        variables: {
          carId,
        },
      });
      showSnackbar({ message: 'Vehicle deleted successfully.', type: 'success' });
      router.push('/dashboard/cars');
    } catch (error: any) {
      logError(error);
      let errorMsg = 'Oops, Something went wrong.';
      if (
        error.message.includes('Cannot delete car') &&
        error.message.includes('blocking RentalRequests')
      ) {
        errorMsg = 'Cannot delete car due to blocking rental requests';
      }
      showSnackbar({ message: errorMsg, type: 'error' });
    }
  };

  return (
    <CarDeleteWrapper>
      <Heading variant="h4">
        Delete vehicle
        <SubText>By deleting your car you will lose all the data associated with your car</SubText>
      </Heading>
      {showConfirm ? (
        <CarDeleteConfirm>
          <Button onClick={() => setShowConfirm(false)} variant="outlined">
            Dismiss
          </Button>
          <Button onClick={handleDelete}>Confirm</Button>
        </CarDeleteConfirm>
      ) : (
        <Button
          className="delete"
          customStyles={{ color: '#F05828', borderColor: 'transparent' }}
          isLoading={deleteCarLoading}
          onClick={() => setShowConfirm(true)}
          variant="outlined"
        >
          Delete vehicle
        </Button>
      )}
    </CarDeleteWrapper>
  );
};

export default CarDelete;
