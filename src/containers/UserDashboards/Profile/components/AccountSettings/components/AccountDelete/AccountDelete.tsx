import Link from 'next/link';
import { Heading, SubText, Button, BoldText } from '../../../../../../../elements';
import { AccountDeleteContentBox, AccountDeleteWrapper } from './AccountDelete.styled';

const AccountDelete = () => (
  <AccountDeleteWrapper>
    <Heading variant="h4">Delete account</Heading>
    <AccountDeleteContentBox>
      <div>
        <BoldText>Do you want to delete your account?</BoldText>
        <SubText>
          This account will no longer be available, and all your saved data will be permanently
          deleted.
        </SubText>
      </div>
      <Link href="/contact">
        <Button variant="outlined">Contact us</Button>
      </Link>
    </AccountDeleteContentBox>
  </AccountDeleteWrapper>
);

export default AccountDelete;
