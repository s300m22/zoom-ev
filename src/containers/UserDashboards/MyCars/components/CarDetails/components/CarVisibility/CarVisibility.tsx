import { useState } from 'react';
import Switch from 'react-switch';
import { Heading, SubText } from '../../../../../../../elements';
import { useSnackbar } from '../../../../../../../hooks';
import { useSetCarVisibleMutation } from '../../../../../../../hooks/api/setCarVisible/setCarVisible.generated';
import { logError } from '../../../../../../../utils';
import CarVisibilityWrapper from './CarVisibility.styled';

interface CarVisibilityProps {
  carId: string;
  carVisibility: boolean;
}

const CarVisibility = ({ carId, carVisibility }: CarVisibilityProps) => {
  const [isVisible, setIsVisible] = useState(Boolean(carVisibility));
  const showSnackbar = useSnackbar();
  const [setCarVisible, { loading }] = useSetCarVisibleMutation();

  const handleVisibility = async (visible: boolean) => {
    try {
      setIsVisible(!isVisible);
      await setCarVisible({
        variables: {
          visible: !visible,
          carId,
        },
      });
      showSnackbar({
        message: `Vehicle visibility status changed successfully to ${
          !visible ? 'visible' : 'hidden'
        }.`,
        type: 'success',
      });
    } catch (error: any) {
      logError(error);
      showSnackbar({ message: 'Oops, Something went wrong.', type: 'error' });
      setIsVisible(!isVisible);
    }
  };
  return (
    <CarVisibilityWrapper isBlocked={loading}>
      <Heading variant="h4">
        Hide listing
        <SubText>
          When hidden, your car will not be visible to other users and they will not be able to book
          your car.
        </SubText>
      </Heading>
      <Switch
        borderRadius={100}
        checked={!isVisible}
        checkedIcon={false}
        handleDiameter={32}
        height={40}
        offColor="#ECECEC"
        offHandleColor="#fff"
        onChange={handleVisibility}
        onColor="#ECECEC"
        onHandleColor="#54C0EF"
        uncheckedIcon={false}
        width={76}
      />
    </CarVisibilityWrapper>
  );
};

export default CarVisibility;
