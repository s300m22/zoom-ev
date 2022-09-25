import { atom } from 'recoil';

interface CredentialsProps {
  username: string;
  password: string;
}

const credentialsAtom = atom<CredentialsProps | undefined>({
  key: 'credentialsAtom',
  default: undefined,
});

export default credentialsAtom;
