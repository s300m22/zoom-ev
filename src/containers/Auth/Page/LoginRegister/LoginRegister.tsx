import { NextPage } from 'next';
import { Entry } from 'contentful';
import { useState, useEffect, useMemo, Dispatch, SetStateAction, useCallback } from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { useRouter } from 'next/router';
import { IGlobalSettingsFields } from '../../../../interfaces/contentful.types.generated';
import { ActionsLayout } from '../../../../layouts';
import { TabsWrapper, TabsBar, TabLink } from '../../../../elements/Tabs/Tabs.styled';
import Register from '../../components/Register';
import Login from '../../components/Login';
import TabsBarLinksWrapperLoginRegister from './LoginRegister.styled';
import { Auth } from '@aws-amplify/auth';

interface LoginRegisterComponentProps {
  setActiveStep?: Dispatch<SetStateAction<number>>;
  setActiveNavStep?: Dispatch<SetStateAction<number>>;
  activePage?: string;
}

interface PageProps {
  globalSettings: Entry<IGlobalSettingsFields>;
  title: string;
}

const tabs = ['register', 'login'];

export const LoginRegisterComponent = ({
  setActiveStep,
  setActiveNavStep,
  activePage,
}: LoginRegisterComponentProps) => {
  const router = useRouter();
  const isEmbedded = Boolean(setActiveStep);
  const getActiveTab = useMemo(() => router.route.split('/')[2], [router.route]);
  const [activeTab, setActiveTab] = useState(activePage || getActiveTab);

  const checkAuth = useCallback(async () => {
    try {
      await Auth.currentAuthenticatedUser();

      router.push((router.query.returnTo as string) ?? '/', undefined);

      return true;
    } catch {
      return false;
    }
  }, [router]);

  useEffect(() => {
    // make sure that there is no logged in user on this page
    checkAuth();
  }, [checkAuth]);

  const handleClick = (tab: string) => {
    setActiveTab(tab);
    !isEmbedded &&
      router.push(
        `/auth/${tab}${router.query.returnTo ? `?returnTo=${router.query.returnTo}` : ''}`,
        undefined,
        {
          shallow: true,
        },
      );
  };

  useEffect(() => {
    !isEmbedded && setActiveTab(getActiveTab);
  }, [getActiveTab, isEmbedded, router]);

  return (
    <>
      <TabsWrapper>
        <TabsBar>
          <TabsBarLinksWrapperLoginRegister>
            {tabs.map((tab) => (
              <TabLink
                className={activeTab === tab ? 'active' : ''}
                key={tab}
                onClick={() => handleClick(tab)}
                width="50%"
              >
                {tab}
              </TabLink>
            ))}
          </TabsBarLinksWrapperLoginRegister>
        </TabsBar>
      </TabsWrapper>
      {activeTab === 'register' && <Register setActiveStep={setActiveStep} />}
      {activeTab === 'login' && (
        <Login setActiveNavStep={setActiveNavStep} setActiveStep={setActiveStep} />
      )}
    </>
  );
};

export const LoginRegisterPage: NextPage<PageProps> = ({ globalSettings, title }) => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY}>
      <ActionsLayout logo={globalSettings.fields.topBarLogo} pageTitle={title}>
        <LoginRegisterComponent />
      </ActionsLayout>
    </GoogleReCaptchaProvider>
  );
};
