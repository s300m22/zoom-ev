import { Dispatch, SetStateAction, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { NextPage } from 'next';
import { Entry } from 'contentful';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Button, Heading, SimpleCard, TextField } from '../../../../elements';
import { ActionsLayout } from '../../../../layouts';
import Wrapper from './TellUsMore.styled';
import { useSnackbar } from '../../../../hooks';
import { IGlobalSettingsFields } from '../../../../interfaces/contentful.types.generated';
import { useUpdateMyDetailsMutation } from '../../../../hooks/api/updateMyDetails/updateMyDetails.generated';
import { userDetailsAtom } from '../../../../recoil';
import { logError } from '../../../../utils';

interface PageProps {
  globalSettings: Entry<IGlobalSettingsFields>;
  title: string;
}

interface TellUsMoreComponentProps {
  setActiveStep?: Dispatch<SetStateAction<number>>;
  setActiveNavStep?: Dispatch<SetStateAction<number>>;
}
interface TellUsMoreProps {
  firstName: string;
  lastName: string;
}

const PageLeadContent = () => <Heading variant="h2">Tell us more about yourself</Heading>;

export const TellUsMoreComponent = ({
  setActiveStep,
  setActiveNavStep,
}: TellUsMoreComponentProps) => {
  const [updateMyDetails] = useUpdateMyDetailsMutation();
  const showSnackbar = useSnackbar();
  const router = useRouter();
  const userDetails = useRecoilValue(userDetailsAtom);
  const setUserDetails = useSetRecoilState(userDetailsAtom);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm<TellUsMoreProps>({
    mode: 'onBlur',
  });

  const onSubmit = async (input: TellUsMoreProps) => {
    const isValid = await trigger();

    if (!isValid) {
      return;
    }
    setLoading(true);
    try {
      await updateMyDetails({
        variables: {
          isDraft: true,
          update: {
            ...input,
          },
        },
      });
      showSnackbar({
        message: `Nice to meet you ${input.firstName} ${input.lastName}!`,
        type: 'success',
      });

      userDetails &&
        setUserDetails({
          ...userDetails,
          details: {
            ...userDetails.details,
            firstName: input.firstName,
            lastName: input.lastName,
          },
        });
      reset();
      if (setActiveStep && setActiveNavStep) {
        setActiveStep(5);
        setActiveNavStep(2);
      } else if (router.query.returnTo) {
        router.push(`${router.query.returnTo}`);
      } else {
        router.push('/dashboard');
      }
    } catch (error: any) {
      logError(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {setActiveStep && <Heading variant="h2">Tell us more about yourself</Heading>}
      <SimpleCard>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register('firstName', {
              required: true,
            })}
            disabled={loading}
            errors={errors}
            label="First name"
            name="firstName"
            placeholder="eg. Mary"
            type="text"
          />
          <TextField
            {...register('lastName', {
              required: true,
            })}
            disabled={loading}
            errors={errors}
            label="Last name"
            name="lastName"
            placeholder="eg. Green"
            type="text"
          />
          <Button
            customStyles={{ width: '100%', margin: '30px 0 0' }}
            isLoading={loading}
            withArrow
          >
            Continue
          </Button>
        </form>
      </SimpleCard>
    </>
  );
};

export const TellUsMorePage: NextPage<PageProps> = ({ globalSettings, title }) => (
  <ActionsLayout
    logo={globalSettings.fields.topBarLogo}
    pageLeadContent={<PageLeadContent />}
    pageTitle={title}
    showBackButton={false}
  >
    <Wrapper>
      <TellUsMoreComponent />
    </Wrapper>
  </ActionsLayout>
);
