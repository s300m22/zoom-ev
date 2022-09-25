import { Dispatch, SetStateAction, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { StepRow, StepParagraph } from '../../../StepsShared.styled';
import { BoldText, Bubble, Heading, SimpleCard, TextEditorInput } from '../../../../../../elements';
import { LocationGuideWrapper } from './LocationGuide.styled';
import { logError } from '../../../../../../utils';
import { useUpdateCarGuideMutation } from '../../../../../../hooks/api/updateCarGuide/updateCarGuide.generated';
import { vehicleSetupAtom } from '../../../../../../recoil';
import { useIsBusiness, useSnackbar } from '../../../../../../hooks';
import { useGetCarGuideQuery } from '../../../../../../hooks/api/getCarGuide/getCarGuide.generated';

interface LocationGuideProps {
  setActiveStep: Dispatch<SetStateAction<number>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setActiveNavStep: Dispatch<SetStateAction<number>>;
}

interface InputProps {
  guide: string;
}

const LocationGuide = ({ setActiveStep, setIsLoading, setActiveNavStep }: LocationGuideProps) => {
  const showSnackbar = useSnackbar();
  const isBusiness = useIsBusiness();
  const carDetails = useRecoilValue(vehicleSetupAtom);
  const setCarDetails = useSetRecoilState(vehicleSetupAtom);
  const [updateCarGuide] = useUpdateCarGuideMutation();
  const {
    data: carGuide,
    loading: carGuideLoading,
    refetch: refetchCarGuide,
  } = useGetCarGuideQuery({
    variables: {
      // @ts-expect-error this id will never be null so this error is invalid
      carId: carDetails?.id,
    },
  });
  const {
    handleSubmit,
    trigger,
    formState: { errors },
    setValue,
    control,
  } = useForm<InputProps>({
    mode: 'onChange',
  });

  useEffect(() => {
    setValue('guide', carGuide?.carGuide ?? '');
  }, [carGuide, setValue]);

  useEffect(() => {
    setActiveNavStep(3);
  }, [setActiveNavStep]);

  const onSubmit = useCallback(
    async (input: InputProps) => {
      try {
        setIsLoading(true);
        const isValid = await trigger();

        if (!isValid) {
          return;
        }

        if (!carDetails) {
          showSnackbar({ message: 'Oops, Something went wrong.', type: 'error' });
          return;
        }

        const { guide } = input;
        if (!isBusiness) {
          if (carDetails.id) {
            await updateCarGuide({
              variables: {
                guide,
                carId: carDetails.id,
              },
            });
          } else {
            showSnackbar({ message: 'Oops, Something went wrong.', type: 'error' });
            return;
          }
        }
        setCarDetails({
          ...carDetails,
          details: {
            ...carDetails.details,
          },
          guide,
        });
        await refetchCarGuide();
        setActiveStep(9);
      } catch (error: any) {
        logError(error);
      } finally {
        setIsLoading(false);
      }
    },
    [
      setIsLoading,
      trigger,
      carDetails,
      isBusiness,
      setCarDetails,
      setActiveStep,
      showSnackbar,
      updateCarGuide,
      refetchCarGuide,
    ],
  );

  if (carGuideLoading) return <div></div>;

  return (
    <LocationGuideWrapper>
      <StepRow>
        <SimpleCard customStyles={{ width: '100%', textAlign: 'left' }}>
          <Heading variant="h4">EV Guide for your Guest</Heading>
          <StepParagraph>
            If you&apos;d like to provide extra information about your EV to your Guests, you can
            add it here.
          </StepParagraph>
          <form id="submit-form-8" noValidate onSubmit={handleSubmit(onSubmit)}>
            <TextEditorInput
              control={control}
              defaultValue={carGuide?.carGuide || ''}
              errors={errors}
              name="guide"
              required={false}
            />
          </form>
        </SimpleCard>
      </StepRow>
      <StepRow>
        <Bubble>
          <BoldText>Tips</BoldText>• Make sure to provide details about what&lsquo;s special about
          your EV. Mention any advantages of your EV that might interest your guests.
        </Bubble>
      </StepRow>
    </LocationGuideWrapper>
  );
};

export default LocationGuide;
