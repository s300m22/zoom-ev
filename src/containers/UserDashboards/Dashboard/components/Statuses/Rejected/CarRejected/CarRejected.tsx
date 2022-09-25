import { useState } from 'react';
import { Button, Heading, Popup, StatusEnum, StatusLabel } from '../../../../../../../elements';
import { useSnackbar } from '../../../../../../../hooks';
import { useDeleteCarMutation } from '../../../../../../../hooks/api/deleteCar/deleteCar.generated';
import { encodeString, logError } from '../../../../../../../utils';
import {
  StatusesActionsWrapper,
  StatusesCardWrapper,
  StatusesTextWrapper,
  StatusesParagraph,
  StatusesButtonsWrapper,
} from '../../StatusesShared';
import { CarRejectedPopupWrapper, ButtonsWrapper } from './CarRejected.styled';

interface CarRejectedProps {
  carId: string;
}

interface DeletePopupConfirmProps {
  carId: string;
}

const DeletePopupConfirm = ({ carId }: DeletePopupConfirmProps) => {
  const [openPopup, setOpenPopup] = useState(false);
  const showSnackbar = useSnackbar();
  const [deleteCar, { loading }] = useDeleteCarMutation({
    variables: {
      carId,
    },
    refetchQueries: ['myCars'],
  });

  const handleDelete = async () => {
    try {
      await deleteCar();
      showSnackbar({ message: 'Car removed successfully.', type: 'success' });
    } catch (error: any) {
      logError(error);
      showSnackbar({ message: 'Oops, Something went wrong.', type: 'error' });
    }
  };

  return (
    <Popup
      isOpen={openPopup}
      setIsOpen={setOpenPopup}
      trigger={<Button variant="text">Delete</Button>}
    >
      <CarRejectedPopupWrapper>
        <Heading variant="h3">
          Are you sure that you want to <br /> remove this car?
        </Heading>
        <ButtonsWrapper>
          <Button isLoading={loading} onClick={() => setOpenPopup(false)} variant="outlined">
            Dismiss
          </Button>
          <Button isLoading={loading} onClick={handleDelete}>
            Confirm
          </Button>
        </ButtonsWrapper>
      </CarRejectedPopupWrapper>
    </Popup>
  );
};

export const CarRejected = ({ carId }: CarRejectedProps) => (
  <StatusesCardWrapper style={{ padding: '20px 30px' }}>
    <StatusesTextWrapper>
      <Heading variant="h4">EV application rejected</Heading>
      <StatusesParagraph>
        Unfortunately your form was rejected. You can correct and send your application once again.
      </StatusesParagraph>
    </StatusesTextWrapper>
    <StatusesActionsWrapper>
      <StatusLabel status={StatusEnum.Rejected}>Rejected</StatusLabel>
      <StatusesButtonsWrapper>
        <DeletePopupConfirm carId={carId} />
        <Button href={`/vehicle-setup?id=${encodeString(carId)}`} variant="outlined" withArrow>
          Start again
        </Button>
      </StatusesButtonsWrapper>
    </StatusesActionsWrapper>
  </StatusesCardWrapper>
);

export default CarRejected;
