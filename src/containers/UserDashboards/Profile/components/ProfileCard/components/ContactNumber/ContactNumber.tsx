import { useRecoilValue } from 'recoil';
import { EditContactNumberPopup } from '../../../../../../../elements';
import { userDetailsAtom } from '../../../../../../../recoil';
import { ContactNumberWrapper, ContactNumberHolder } from './ContactNumber.styled';

const ContactNumber = () => {
  const userDetails = useRecoilValue(userDetailsAtom);
  return userDetails ? (
    <ContactNumberWrapper>
      Contact number <br />
      <ContactNumberHolder>
        {userDetails.details.phoneNumber ? userDetails.details.phoneNumber.replace('|', ' ') : '-'}{' '}
        <EditContactNumberPopup />
      </ContactNumberHolder>
    </ContactNumberWrapper>
  ) : null;
};

export default ContactNumber;
