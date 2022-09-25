import { Dispatch, SetStateAction } from 'react';
import { useRecoilValue } from 'recoil';
import {
  Heading,
  TextField,
  SettingsCardWrapper,
  SettingsCardHeader,
  SettingsForm,
  DoubleInputWrapper,
} from '../../../../../../../elements';
import { userDetailsAtom } from '../../../../../../../recoil';
import AccountSettingsEnum from '../../AccountSettingsEnum';

interface EmailProps {
  activeForm?: AccountSettingsEnum;
  setActiveForm: Dispatch<SetStateAction<AccountSettingsEnum | undefined>>;
}

const Email = ({ activeForm }: EmailProps) => {
  const userDetails = useRecoilValue(userDetailsAtom);
  const isFormActive = activeForm === AccountSettingsEnum.Email;
  const isFormBlurred = activeForm === AccountSettingsEnum.ChangePassword;

  return (
    <SettingsCardWrapper isFormBlurred={Boolean(isFormBlurred)}>
      <SettingsCardHeader>
        <Heading variant="h4">Email</Heading>
      </SettingsCardHeader>
      <SettingsForm noValidate>
        <DoubleInputWrapper>
          <TextField
            defaultValue={userDetails?.email || ''}
            disabled
            label="Email address"
            name="email"
            placeholder="example@mail.com"
            readOnly={!isFormActive}
          />
        </DoubleInputWrapper>
      </SettingsForm>
    </SettingsCardWrapper>
  );
};

export default Email;
