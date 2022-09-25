import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useRecoilValue } from 'recoil';
import {
  Button,
  Heading,
  InputContainer,
  PhoneInput,
  TextArea,
  TextField,
  FormRadioInput,
} from '../../elements';
import { useSubmitContactFormRequestMutation } from '../../hooks/api/submitContactForm/submitContactForm.generated';
import {
  ContactContainer,
  Title,
  BaseInfoContainer,
  BaseInfoCommunicatorsContainer,
  TopicTitle,
  TopicsContainer,
  SuccessView,
  SuccessViewContent,
  SuccessViewTitle,
  SuccessViewDescription,
} from './Contact.styled';
import { useSnackbar } from '../../hooks';
import { numberValidator, emailValidator, logError } from '../../utils';
import { ContactFormRequestInput } from '../../interfaces/api.types.generated';
import { userDetailsAtom } from '../../recoil';

interface ContactProps {
  title: string;
  topics: Array<string>;
}

const Contact = ({ title, topics }: ContactProps) => {
  const userDetails = useRecoilValue(userDetailsAtom);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [selectedCallingCode, setSelectedCallingCode] = useState('44');
  const [submitContactForm] = useSubmitContactFormRequestMutation();
  const showSnackbar = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(topics[0]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
    setValue,
    watch,
  } = useForm<ContactFormRequestInput>({
    mode: 'onBlur',
  });

  useEffect(() => {
    if (userDetails) {
      const {
        details: { firstName, lastName, phoneNumber },
        email,
      } = userDetails;
      phoneNumber && setSelectedCallingCode(phoneNumber.split('|')[0].replace('+', ''));
      firstName && lastName && setValue('name', `${firstName} ${lastName}`);
      setValue('email', email);
      phoneNumber && setValue('telephone', phoneNumber.split('|')[1]);
    }
  }, [setValue, userDetails]);

  const topicWatch = watch('topic');
  useEffect(() => {
    setSelectedTopic(topicWatch);
  }, [topicWatch]);

  const onSubmit = async (input: ContactFormRequestInput) => {
    const isValid = await trigger();
    if (!isValid || !executeRecaptcha) {
      return;
    }

    setLoading(true);
    try {
      const captchaToken = await executeRecaptcha('contactForm');
      if (!captchaToken) {
        return;
      }

      await submitContactForm({
        variables: {
          input: {
            ...input,
            telephone: `+${selectedCallingCode}${input.telephone}`,
            topic: input.topic || selectedTopic,
          },
        },
      });

      window.scrollTo({
        top: 100,
        left: 0,
        behavior: 'smooth',
      });
      reset();
      setIsSent(true);
    } catch (error: any) {
      logError(error);
      showSnackbar({ message: 'Oops, Something went wrong.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  if (isSent) {
    return (
      <SuccessView>
        <SuccessViewContent>
          <SuccessViewTitle>Thank you for contacting us!</SuccessViewTitle>
          <SuccessViewDescription>
            We will try to reply as quickly as we can. In the meantime, you can take a look at FAQs,
            to find out more about our services.
          </SuccessViewDescription>
          <Button href="/faqs" withArrow>
            Go to FAQs
          </Button>
        </SuccessViewContent>
      </SuccessView>
    );
  }

  return (
    <ContactContainer>
      <Title>
        <Heading variant="h1">{title}</Heading>
      </Title>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <BaseInfoContainer>
          <TextField
            autoFocus // eslint-disable-line
            disabled={loading}
            errors={errors}
            label="Contact Name"
            placeholder="eg. Mary Green"
            {...register('name', { required: true })}
            required
          />
          <BaseInfoCommunicatorsContainer>
            <PhoneInput
              disabled={loading}
              errors={errors}
              label="Phone number"
              {...register('telephone', {
                pattern: numberValidator('Phone'),
              })}
              selectedCallingCode={selectedCallingCode}
              setSelectedCallingCode={setSelectedCallingCode}
            />
            <TextField
              disabled={loading}
              errors={errors}
              label="Email"
              placeholder="example@mail.com"
              {...register('email', {
                required: true,
                pattern: emailValidator(),
              })}
              required
            />
          </BaseInfoCommunicatorsContainer>
        </BaseInfoContainer>
        <div>
          <InputContainer>
            <TopicTitle>Select a topic</TopicTitle>
            <TopicsContainer>
              {topics?.map((topic) => (
                <FormRadioInput
                  key={topic}
                  {...register('topic')}
                  // onClick={() => setSelectedTopic(getValues('topic'))}
                  selected={selectedTopic === topic}
                  value={topic}
                />
              ))}
            </TopicsContainer>
          </InputContainer>
          <TextArea
            disabled={loading}
            errors={errors}
            label="Your message"
            maxLength={750}
            maxWidth="736px"
            noResize
            {...register('message', { required: true })}
            required
          />
          <Button disabled={loading} type="submit" withArrow>
            Send
          </Button>
        </div>
      </form>
    </ContactContainer>
  );
};

export default Contact;
