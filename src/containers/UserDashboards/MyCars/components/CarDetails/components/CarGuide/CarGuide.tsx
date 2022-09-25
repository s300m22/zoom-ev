import { Dispatch, SetStateAction, useState, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Skeleton from 'react-loading-skeleton';
import PersonalDetailsEnum from '../../CarDetailsActiveFormEnum';
import {
  Button,
  Heading,
  SettingsCardWrapper,
  SettingsCardHeader,
  SettingsEditLink,
  SettingsCardFooter,
  SettingsForm,
  TextEditorInput,
} from '../../../../../../../elements';
import { useGetCarGuideQuery } from '../../../../../../../hooks/api/getCarGuide/getCarGuide.generated';
import { logError } from '../../../../../../../utils';
import { GetCarQuery } from '../../../../../../../hooks/api/getCar/getCar.generated';
import { useUpdateCarGuideMutation } from '../../../../../../../hooks/api/updateCarGuide/updateCarGuide.generated';

interface CarGuideProps {
  car: GetCarQuery['car'];
  activeForm?: PersonalDetailsEnum;
  setActiveForm: Dispatch<SetStateAction<PersonalDetailsEnum | undefined>>;
}

interface InputProps {
  guide: string;
}

const CarGuide = ({ car, activeForm, setActiveForm }: CarGuideProps) => {
  const carId = car?.id as string;
  const isFormActive = activeForm === PersonalDetailsEnum.Guide;
  const isFormBlurred = activeForm && activeForm !== PersonalDetailsEnum.Guide;
  const { data: carGuideData, loading: carGuideLoading } = useGetCarGuideQuery({
    variables: {
      carId,
    },
  });
  const carGuide = carGuideData?.carGuide;
  const [updateCarGuide, { loading: updateCarGuideLoading }] = useUpdateCarGuideMutation();
  const [restoreValue, setRestoreValue] = useState({
    restore: false,
    value: '',
  });
  const {
    control,
    handleSubmit,
    reset,
    trigger,
    formState: { errors },
  } = useForm<InputProps>({
    mode: 'onChange',
  });

  const onSubmit = useCallback(
    async (input: InputProps) => {
      try {
        const isValid = await trigger();

        if (!isValid) {
          return;
        }

        const { guide } = input;

        await updateCarGuide({
          variables: {
            guide,
            carId,
          },
        });
        setRestoreValue({
          value: guide,
          restore: false,
        });
        setActiveForm(undefined);
      } catch (error: any) {
        logError(error);
      }
    },
    [carId, setActiveForm, trigger, updateCarGuide],
  );

  useEffect(() => {
    if (carGuide) {
      setRestoreValue({
        value: carGuide,
        restore: false,
      });
    }
  }, [carGuide]);

  return carGuideLoading ? (
    <Skeleton
      count={1}
      height={500}
      style={{
        marginBottom: '30px',
        borderRadius: '12px',
        boxShadow: '0 10px 34px rgba(23, 75, 83, 0.1)',
      }}
    />
  ) : (
    <SettingsCardWrapper isFormBlurred={Boolean(isFormBlurred)}>
      <SettingsCardHeader>
        <Heading variant="h4">Host&apos;s EV Guide</Heading>
        <SettingsEditLink
          onClick={() => {
            setRestoreValue({
              ...restoreValue,
              restore: false,
            });
            setActiveForm(PersonalDetailsEnum.Guide);
          }}
        >
          Edit
        </SettingsEditLink>
      </SettingsCardHeader>
      <SettingsForm noValidate onSubmit={handleSubmit(onSubmit)}>
        <TextEditorInput
          control={control}
          defaultValue={carGuide || undefined}
          errors={errors}
          label="Description"
          name="guide"
          readOnly={!isFormActive}
          required={false}
          restoreValue={restoreValue}
        />
        {isFormActive ? (
          <SettingsCardFooter style={{ marginTop: '20px' }}>
            <Button
              isLoading={updateCarGuideLoading}
              onClick={(e) => {
                e.preventDefault();
                reset({
                  guide: carGuide ?? undefined,
                });
                setRestoreValue({
                  ...restoreValue,
                  restore: true,
                });
                setActiveForm(undefined);
              }}
              variant="outlined"
            >
              Cancel
            </Button>
            <Button isLoading={updateCarGuideLoading}>Save changes</Button>
          </SettingsCardFooter>
        ) : null}
      </SettingsForm>
    </SettingsCardWrapper>
  );
};

export default CarGuide;
