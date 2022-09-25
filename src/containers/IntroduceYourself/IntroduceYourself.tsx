import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { Entry } from 'contentful';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { IGlobalSettingsFields } from '../../interfaces/contentful.types.generated';
import { ActionsLayout } from '../../layouts';
import MultistepForm, { MultistepFormFooter } from '../../elements/MultistepForm';
import { Intro, Outro, StepOne, StepTwo, StepThree, StepFour, StepFive } from './steps';
import { Heading, StepsLine, StyledLink } from '../../elements';
import { userDetailsAtom } from '../../recoil';
import { UserDetailsApprovalStatusEnum } from '../../interfaces/api.types.generated.d';
import { useGetCurrentUserLazyQuery } from '../../hooks/api/getCurrentUser/getCurrentUser.generated';

interface PageProps {
  globalSettings: Entry<IGlobalSettingsFields>;
  title: string;
}

const IntroPageLeadContent = () => (
  <>
    <Heading variant="h2">Zoom EV profile Setup</Heading>
    <p>Setup your account in 5 minutes with 5 simple steps: </p>
  </>
);

const stepsText = [
  'Personal data',
  'Contact data',
  'License data',
  'ID verification',
  'Agreements',
];

const IntroduceYourself: NextPage<PageProps> = ({ globalSettings, title }) => {
  const userDetails = useRecoilValue(userDetailsAtom);
  const setUserDetails = useSetRecoilState(userDetailsAtom);
  const [getCurrentUser, { data: currentUserData }] = useGetCurrentUserLazyQuery({
    fetchPolicy: 'network-only',
  });
  const [activeStep, setActiveStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const AlreadyIntroduced = () => (
    <>
      <Heading variant="h2">We already met each other {userDetails?.details.firstName}</Heading>
      <p>
        You could update your profile <StyledLink href="/dashboard/profile">there</StyledLink>
      </p>
    </>
  );

  const steps = [
    {
      name: 'Intro',
      component: <Intro setActiveStep={setActiveStep} steps={stepsText} />,
    },
    {
      name: 'Personal data',
      component: <StepOne setActiveStep={setActiveStep} setIsLoading={setIsLoading} />,
    },
    {
      name: 'Contact data',
      component: <StepTwo setActiveStep={setActiveStep} setIsLoading={setIsLoading} />,
    },
    {
      name: 'License data',
      component: <StepThree setActiveStep={setActiveStep} setIsLoading={setIsLoading} />,
    },
    {
      name: 'ID verification',
      component: <StepFour setActiveStep={setActiveStep} setIsLoading={setIsLoading} />,
    },
    {
      name: 'Agreements',
      component: <StepFive setActiveStep={setActiveStep} setIsLoading={setIsLoading} />,
    },
    {
      name: 'Outro',
      component: <Outro />,
    },
  ];

  const StepsLinePageLeadContent = () => (
    <StepsLine activeStep={activeStep - 1} steps={stepsText} />
  );

  useEffect(() => {
    getCurrentUser();
  }, [activeStep, getCurrentUser]);

  useEffect(() => {
    if (currentUserData) {
      setUserDetails(currentUserData.me);
    }
  }, [currentUserData, setUserDetails]);

  return (
    <ActionsLayout
      customWidth="1120px"
      logo={globalSettings.fields.topBarLogo}
      pageFooterContent={
        activeStep !== 0 ? (
          <MultistepFormFooter
            activeStep={activeStep}
            isLoading={isLoading}
            setActiveStep={setActiveStep}
            totalSteps={steps.length - 1}
          />
        ) : null
      }
      {...(userDetails?.details.approvalStatus !== UserDetailsApprovalStatusEnum.Approved && {
        pageLeadContent: activeStep === 0 ? <IntroPageLeadContent /> : <StepsLinePageLeadContent />,
      })}
      pageTitle={title}
      showBackButton={false}
    >
      {userDetails?.details.approvalStatus === UserDetailsApprovalStatusEnum.Approved ? (
        <AlreadyIntroduced />
      ) : (
        <MultistepForm activeStep={activeStep} steps={steps} />
      )}
    </ActionsLayout>
  );
};

export default IntroduceYourself;
