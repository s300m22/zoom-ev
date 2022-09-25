import { useRouter } from 'next/router';
import { useState } from 'react';
import { Button, Heading, Popup } from '../..';
import { useSnackbar } from '../../../hooks';
import { useDeleteCarMutation } from '../../../hooks/api/deleteCar/deleteCar.generated';
import { encodeString, logError } from '../../../utils';
import { ContinueSetupCarPopupWrapper, ButtonsWrapper } from './ContinueSetupCarPopup.styled';

interface ContinueSetupCarPopupProps {
  carId: string;
}

const ContinueSetupCarPopup = ({ carId }: ContinueSetupCarPopupProps) => {
  const router = useRouter();
  const [openPupup, setOpenPopup] = useState(false);
  const showSnackbar = useSnackbar();
  const [deleteCar] = useDeleteCarMutation();

  const handleReset = async () => {
    try {
      await deleteCar({
        variables: {
          carId,
        },
      });
      showSnackbar({ message: 'Car removed successfully.', type: 'success' });
      router.push('/vehicle-setup');
    } catch (error: any) {
      logError(error);
      showSnackbar({ message: 'Oops, Something went wrong.', type: 'error' });
    } finally {
      setOpenPopup(false);
    }
  };

  return (
    <Popup
      isOpen={openPupup}
      setIsOpen={setOpenPopup}
      trigger={
        <Button variant="outlined" withArrow>
          Continue setup
        </Button>
      }
    >
      <ContinueSetupCarPopupWrapper>
        <Heading variant="h3">
          Continue with your previously <br /> started setup?
        </Heading>
        <ButtonsWrapper>
          <Button onClick={handleReset} variant="outlined">
            Start again
          </Button>
          <Button href={`/vehicle-setup?id=${encodeString(carId)}`}>Continue</Button>
        </ButtonsWrapper>
      </ContinueSetupCarPopupWrapper>
    </Popup>
  );
};

export default ContinueSetupCarPopup;
