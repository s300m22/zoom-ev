import { useEffect, ReactNode } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import { Preloader } from '../elements';
import { useGetCurrentUserQuery } from '../hooks/api/getCurrentUser/getCurrentUser.generated';
import { userDetailsAtom } from '../recoil';
import mixpanel from 'mixpanel-browser';

interface UserIdentityProviderProps {
  children: ReactNode;
  isProtected: boolean;
}

const AuthProvider = ({ children, isProtected }: UserIdentityProviderProps) => {
  const router = useRouter();
  const { data, loading, error } = useGetCurrentUserQuery({});
  const userDetails = useRecoilValue(userDetailsAtom);
  const setUserDetails = useSetRecoilState(userDetailsAtom);

  useEffect(() => {
    if (data) {
      setUserDetails(data.me);
      mixpanel.identify(data.me.id);
      mixpanel.people.set_once({ email: data.me.email });
    }
  }, [data, setUserDetails]);

  if (!isProtected) return <>{children}</>;

  if (loading && !data) {
    return <Preloader />;
  }

  if (error) {
    window.location.href = `/auth/login?returnTo=${router.pathname}`;
  }

  return userDetails ? <>{children}</> : <Preloader />;
};

export default AuthProvider;
