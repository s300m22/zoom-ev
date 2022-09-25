import { useEffect, useState } from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { NextPage } from 'next';
import { Entry } from 'contentful';
import { useRouter } from 'next/router';
import { IGlobalSettingsFields } from '../../interfaces/contentful.types.generated';
import { ActionsLayout } from '../../layouts';
import MultistepForm, { MultistepFormFooter } from '../../elements/MultistepForm';
import { Intro, Outro, StepOne, StepTwo, StepThree, StepFour, StepFive } from './steps';
import { Heading, StepsLine } from '../../elements';
import { userDetailsAtom, vehicleSetupAtom } from '../../recoil';
import {
  CarSalesInfoInputType,
  UserDetailsApprovalStatusEnum,
} from '../../interfaces/api.types.generated.d';
import { useGetCarLazyQuery } from '../../hooks/api/getCar/getCar.generated';
import { useIsBusiness, useNextQueryParam } from '../../hooks';
import { decodeString } from '../../utils';

interface PageProps {
  globalSettings: Entry<IGlobalSettingsFields>;
  title: string;
}

const IntroPageLeadContent = () => (
  <>
    <Heading variant="h2">Vehicle Setup</Heading>
    <p>
      List your vehicle in a few simple steps. It will take 5 to 10 minutes. <br /> You will be able
      to edit it later.
    </p>
  </>
);

const stepsText = [
  'EV details',
  'Photos',
  'Pricing & Availability ',
  'Location & Guide ',
  'Agreements',
];

const VehicleSetup: NextPage<PageProps> = ({ globalSettings, title }) => {
  const isBusiness = useIsBusiness();
  const router = useRouter();
  const userDetails = useRecoilValue(userDetailsAtom);
  const setCarDetails = useSetRecoilState(vehicleSetupAtom);
  const [continuedCarId] = useNextQueryParam(['id']);
  const [activeStep, setActiveStep] = useState(0);
  const [activeNavStep, setActiveNavStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [getCar, { data: carDetailsData }] = useGetCarLazyQuery();

  useEffect(() => {
    if (
      userDetails &&
      userDetails.details.approvalStatus !== UserDetailsApprovalStatusEnum.Approved &&
      !isBusiness
    ) {
      router.push('/introduce-yourself');
    }
  }, [isBusiness, router, userDetails]);

  useEffect(() => {
    if (continuedCarId && !isBusiness) {
      getCar({
        variables: {
          id: decodeString(continuedCarId),
        },
      });
    }
  }, [continuedCarId, getCar, isBusiness]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const alertUser = (e: any) => {
      e.preventDefault();
      e.returnValue = '';
    };

    if (isBusiness && window) {
      window.addEventListener('beforeunload', alertUser);
    }
    return () => {
      setCarDetails(undefined);
      if (isBusiness) {
        window.removeEventListener('beforeunload', alertUser);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setCarDetails]);

  useEffect(() => {
    const car = carDetailsData?.car;
    if (car) {
      const { details, detailsRequested, salesInfo } = car;
      setCarDetails({
        ...car,
        details: {
          ...details,
          motor: details.motor || detailsRequested?.motor,
          carMakerName: details.maker?.name || detailsRequested?.maker?.name,
          carMakerId: details.maker?.id || detailsRequested?.maker?.id,
          carModelName: details.model?.name || detailsRequested?.model?.name,
          carModelId: details.model?.id || detailsRequested?.model?.id,
          images: details.images.map((i) => i.id),
          value: details.value || detailsRequested?.value,
          type: details.type || detailsRequested?.type,
          vin: details.vin || detailsRequested?.vin,
          year: details.year || detailsRequested?.year,
        },
        images: details.images,
        mainImageId: details.mainImageId,
        availabilityPeriods: [...car.availabilityPeriods.map((a) => ({ ...a, carId: a.id }))],
        realLocation: {
          addressPrivate: car.addressPrivate,
          addressPublic: car.addressPublic,
          lon: car?.realLocation?.lon,
          lat: car?.realLocation?.lat,
        },
        salesInfo: salesInfo as CarSalesInfoInputType,
      });
    }
  }, [carDetailsData, setCarDetails]);

  const steps = [
    {
      name: 'Intro',
      component: <Intro isBusiness={isBusiness} setActiveStep={setActiveStep} />,
      subStepsCounter: [0],
    },
    {
      name: 'EV details',
      component: (
        <StepOne
          activeStep={activeStep}
          isBusiness={isBusiness}
          setActiveNavStep={setActiveNavStep}
          setActiveStep={setActiveStep}
          setIsLoading={setIsLoading}
        />
      ),
      subStepsCounter: [1, 2, 3],
    },
    {
      name: 'Photos',
      component: (
        <StepTwo
          setActiveNavStep={setActiveNavStep}
          setActiveStep={setActiveStep}
          setIsLoading={setIsLoading}
        />
      ),
      subStepsCounter: [4],
    },
    {
      name: 'Pricing & Availability ',
      component: (
        <StepThree
          activeStep={activeStep}
          setActiveNavStep={setActiveNavStep}
          setActiveStep={setActiveStep}
          setIsLoading={setIsLoading}
        />
      ),
      subStepsCounter: [5, 6],
    },
    {
      name: 'Location & Guide ',
      component: (
        <StepFour
          activeStep={activeStep}
          setActiveNavStep={setActiveNavStep}
          setActiveStep={setActiveStep}
          setIsLoading={setIsLoading}
        />
      ),
      subStepsCounter: [7, 8],
    },
    {
      name: 'Agreements',
      component: (
        <StepFive
          setActiveNavStep={setActiveNavStep}
          setActiveStep={setActiveStep}
          setIsLoading={setIsLoading}
        />
      ),
      subStepsCounter: [9],
    },
    {
      name: 'Outro',
      component: <Outro isBusiness={isBusiness} />,
      subStepsCounter: [10],
    },
  ];

  const StepsLinePageLeadContent = () => <StepsLine activeStep={activeNavStep} steps={stepsText} />;

  return (
    <ActionsLayout
      customWidth="1120px"
      isCustomLogoAction={isBusiness}
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
      pageLeadContent={activeStep === 0 ? <IntroPageLeadContent /> : <StepsLinePageLeadContent />}
      pageTitle={title}
      showBackButton={false}
    >
      <MultistepForm activeStep={activeStep} steps={steps} />
    </ActionsLayout>
  );
};

export default VehicleSetup;
