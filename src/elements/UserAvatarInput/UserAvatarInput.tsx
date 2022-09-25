/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect } from 'react';
import { useWatch, useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import { useSnackbar } from '../../hooks';
import { useUpdateMyAvatarMutation } from '../../hooks/api/updateMyAvatar/updateMyAvatar.generated';
import { ImagePurposeEnum } from '../../interfaces/api.types.generated.d';
import { userDetailsAtom } from '../../recoil';
import { logError } from '../../utils';
import { UserAvatarInputWrapper } from './UserAvatarInput.styled';

import dynamic from 'next/dynamic';
const DropZoneInput = dynamic(() => import('../DropZoneInput'), { ssr: false });

interface UserAvatarFormProps {
  avatarImageId: string;
}

const UserAvatarInput = () => {
  const showSnackbar = useSnackbar();
  const [updateMyAvatar] = useUpdateMyAvatarMutation({
    refetchQueries: ['getCurrentUser'],
  });
  const userDetails = useRecoilValue(userDetailsAtom);
  const avatar = userDetails?.details.avatarImage;
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    trigger,
    setValue,
    clearErrors,
  } = useForm<UserAvatarFormProps>({
    mode: 'onBlur',
  });

  register('avatarImageId', { required: 'Required' });

  const imageId = useWatch<any>({
    control,
    name: 'avatarImageId',
  });

  const onSubmit = useCallback(
    async (input: UserAvatarFormProps) => {
      try {
        const isValid = await trigger();
        if (!isValid) {
          return;
        }
        const { avatarImageId } = input;
        await updateMyAvatar({
          variables: {
            avatarImageId,
          },
        });
        showSnackbar({ message: 'Successfully updated avatar image.', type: 'success' });
      } catch (err) {
        logError(err);
        showSnackbar({ message: 'Oops, Something went wrong.', type: 'error' });
      }
    },
    [showSnackbar, trigger],
  );

  useEffect(() => {
    if (imageId && imageId !== avatar?.id) {
      handleSubmit(onSubmit)();
    }
  }, [imageId]);

  return (
    <UserAvatarInputWrapper>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DropZoneInput
          clearErrors={clearErrors}
          currentImage={avatar}
          errors={errors}
          imagePurpose={ImagePurposeEnum.UserAvatar}
          isAvatar
          name="avatarImageId"
          setFieldValue={setValue}
          showTakePhoto={false}
        />
      </form>
    </UserAvatarInputWrapper>
  );
};

export default UserAvatarInput;
