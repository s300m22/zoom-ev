import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import { Popup, PhoneInput, Button } from '../..';
import { useSnackbar } from '../../../hooks';
import { useUpdateMyPhoneNumberMutation } from '../../../hooks/api/updateMyPhoneNumber/updateMyPhoneNumber.generated';
import { EditIcon } from '../../../icons';
import { userDetailsAtom } from '../../../recoil';
import { logError, numberValidator } from '../../../utils';
import ButtonsWrapper from './EditContactNumberPopup.styled';

interface ContactNumberFormProps {
  phoneNumber: string;
}

const PopupTrigger = () => <EditIcon />;

const EditContactNumberPopup = () => {
  const userDetails = useRecoilValue(userDetailsAtom);
  const showSnackbar = useSnackbar();
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedCallingCode, setSelectedCallingCode] = useState('44');
  const userCallingCode = userDetails?.details?.phoneNumber?.split('|')[0].replace('+', '');
  const userPhoneNumber = userDetails?.details?.phoneNumber?.split('|')[1];
  const [updateMyPhone, { loading }] = useUpdateMyPhoneNumberMutation({
    refetchQueries: ['getCurrentUser'],
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<ContactNumberFormProps>({
    mode: 'onBlur',
  });

  const onSubmit = async (input: ContactNumberFormProps) => {
    try {
      const isValid = await trigger();

      if (!isValid) {
        return;
      }

      await updateMyPhone({
        variables: {
          phoneNumber: `+${selectedCallingCode}|${input.phoneNumber}`,
        },
      });
      showSnackbar({ message: 'Successfully updated contact number.', type: 'success' });
      setOpenPopup(false);
    } catch (error: any) {
      logError(error);
      showSnackbar({ message: 'Oops, Something went wrong.', type: 'error' });
    }
  };

  return (
    <Popup isOpen={openPopup} maxHeight="auto" setIsOpen={setOpenPopup} trigger={<PopupTrigger />}>
      <form id="edit-contact-number" noValidate onSubmit={handleSubmit(onSubmit)}>
        <PhoneInput
          {...register('phoneNumber', {
            required: true,
            pattern: numberValidator('Phone'),
          })}
          defaultValue={userPhoneNumber}
          errors={errors}
          label="Phone number"
          required
          selectedCallingCode={userCallingCode || selectedCallingCode}
          setSelectedCallingCode={setSelectedCallingCode}
        />
      </form>
      <ButtonsWrapper>
        <Button isLoading={loading} onClick={() => setOpenPopup(false)} variant="outlined">
          Dismiss
        </Button>
        <Button form="edit-contact-number" isLoading={loading} withArrow>
          Save
        </Button>
      </ButtonsWrapper>
    </Popup>
  );
};

export default EditContactNumberPopup;
