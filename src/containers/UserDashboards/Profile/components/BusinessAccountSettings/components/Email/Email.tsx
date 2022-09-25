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
import BusinessAccountSettingsEnum from '../../BusinessAccountSettingsEnum';

interface EmailProps {
  activeForm?: BusinessAccountSettingsEnum;
  setActiveForm: Dispatch<SetStateAction<BusinessAccountSettingsEnum | undefined>>;
}

const Email = ({ activeForm }: EmailProps) => {
  const userDetails = useRecoilValue(userDetailsAtom);
  const isFormActive = activeForm === BusinessAccountSettingsEnum.Email;
  const isFormBlurred = activeForm === BusinessAccountSettingsEnum.ChangePassword;

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
