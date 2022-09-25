/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useSnackbar } from '../../../hooks';
import {
  Button,
  DateInput,
  Heading,
  Popup,
  TextField,
  StyledLink,
  Checkbox,
  CreatableSelect,
  DoubleInputWrapper,
  PhoneInput,
} from '../..';
import {
  SubscribeCustomerBody,
  SubscribeCustomerForm,
  PopupFooterAction,
  CheckboxWrapper,
  TermsCheckboxWrapper,
  NotificationText,
  InputWrapper,
} from './SubscribeCustomerPopup.styled';
import { customerBundlesAtom, userDetailsAtom } from '../../../recoil';
import { GrantBundleSubscriptionResellerDiscountInput } from '../../../interfaces/api.types.generated';
import { useGrantBundleSubscriptionResellerDiscountMutation } from '../../../hooks/api/grantBundleSubscriptionResellerDiscount/grantBundleSubscriptionResellerDiscount.generated';
import { useBundleTypesThatMyBusinessCanGrantQuery } from '../../../hooks/api/bundleTypesThatMyBusinessCanGrant/bundleTypesThatMyBusinessCanGrant.generated';
import { useCarMakersQuery } from '../../../hooks/api/carMakers/carMakers.generated';
import { convertToTimestamp, emailValidator, logError, numberValidator } from '../../../utils';

interface GrantBundleInput
  extends Omit<GrantBundleSubscriptionResellerDiscountInput, 'carMakerName' | 'carModelName'> {
  carMakerName: {
    value: string;
    name: string;
  };
  carModelName?: {
    value: string;
    name: string;
  };
  confirmTerms: boolean;
}

const PopupTrigger = () => <Button>Invite customer</Button>;

const TermsLabel = () => (
  <>
    I confirm that this customer has accepted Zoom EV&apos;s&nbsp;
    <StyledLink color="blue" externalLink href="/terms-and-conditions">
      Terms & Conditions
    </StyledLink>{' '}
    and has given us permission to contact them
  </>
);

const SubscribeCustomerPopup = () => {
  const userDetails = useRecoilValue(userDetailsAtom);
  const [openPopup, setOpenPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const customerBundles = useRecoilValue(customerBundlesAtom);
  const setCustomerBundles = useSetRecoilState(customerBundlesAtom);
  const [carModels, setCarModels] = useState<any>(undefined);
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
    trigger,
    control,
    setValue,
    getValues,
  } = useForm<GrantBundleInput>({
    mode: 'onBlur',
    defaultValues:
      window !== undefined
        ? JSON.parse(window.localStorage.getItem('inviteCustomerFormUnsubmitted') ?? '{}')
        : {},
  });

  const showSnackbar = useSnackbar();
  const [addCustomer] = useGrantBundleSubscriptionResellerDiscountMutation();
  const { data: bundleTypes } = useBundleTypesThatMyBusinessCanGrantQuery();

  const bundleTypeId =
    bundleTypes?.bundleTypesThatMyBusinessCanGrant &&
    bundleTypes.bundleTypesThatMyBusinessCanGrant[0]?.id;
  const { data: carMakersData } = useCarMakersQuery();
  const carMakers = carMakersData?.carMakers.map((maker) => ({
    value: maker.name,
    label: maker.name,
  }));

  const selectedCarMaker = useWatch<any>({
    control,
    name: 'carMakerName',
  });

  const [selectedCallingCode, setSelectedCallingCode] = useState('44');

  useEffect(() => {
    selectedCarMaker && setValue('carModelName', undefined);
    setCarModels(
      carMakersData?.carMakers
        .filter((maker) => maker.name === selectedCarMaker?.value)[0]
        ?.models.map((model) => ({
          value: model.name,
          label: model.name,
        })),
    );
  }, [selectedCarMaker]);

  const onSubmit = async (input: GrantBundleInput) => {
    try {
      setLoading(true);
      const isValid = await trigger();

      if (!isValid) {
        return;
      }

      if (!bundleTypeId) {
        setOpenPopup(false);
        showSnackbar({
          message:
            'You have no rights to grant bundles to others. Please contact website administrator.',
          type: 'error',
        });
        return;
      }

      const {
        userEmail,
        userFirstName,
        userLastName,
        userPhoneNumber,
        carMakerName: { value: carMakerName },
        carModelName,
        estimatedCarDeliveryDate,
        isCarPartOfFleet,
      } = input;

      const convertedPhoneNumber = `+${selectedCallingCode}|${userPhoneNumber}`;

      await addCustomer({
        variables: {
          input: {
            bundleTypeId,
            userEmail,
            userFirstName,
            userLastName,
            userPhoneNumber: convertedPhoneNumber,
            carMakerName,
            carModelName: carModelName?.value,
            estimatedCarDeliveryDate: estimatedCarDeliveryDate
              ? `${convertToTimestamp(estimatedCarDeliveryDate)}`
              : null,
            isCarPartOfFleet,
          },
        },
      });

      customerBundles &&
        setCustomerBundles([
          ...customerBundles,
          {
            id: `${Date.now()}`,
            carMakerName,
            carModelName: carModelName?.value,
            isCarPartOfFleet,
            estimatedCarDeliveryDate: estimatedCarDeliveryDate
              ? `${convertToTimestamp(estimatedCarDeliveryDate)}`
              : undefined,
            grantee: {
              firstName: userFirstName,
              lastName: userLastName,
              email: userEmail,
              phoneNumber: convertedPhoneNumber,
            },
            status: 'PENDING',
            createdBy: {
              details: {
                firstName: userDetails?.details.firstName,
                lastName: userDetails?.details.lastName,
              },
            },
            createdAt: Date.now(),
          },
        ]);
      showSnackbar({
        message: `User ${userFirstName} ${userLastName} invited successfully.`,
        type: 'success',
      });
      setOpenPopup(false);
      reset();
      window.localStorage.removeItem('inviteCustomerFormUnsubmitted');
    } catch (error: any) {
      logError(error.message);
      const errorMsg =
        error?.message === 'User is already granted with BundleSubscriptionResellerDiscount'
          ? 'This customer has already been invited or already has another Bundle'
          : 'Oops, Something went wrong.';
      showSnackbar({ message: errorMsg, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const saveFormDataInBrowserIfDirty = () => {
    if (isDirty) {
      window.localStorage.setItem('inviteCustomerFormUnsubmitted', JSON.stringify(getValues()));
    }
  };
  return (
    <Popup
      handleCloseEvent={saveFormDataInBrowserIfDirty}
      isOpen={openPopup}
      maxHeight="unset"
      setIsOpen={setOpenPopup}
      trigger={<PopupTrigger />}
    >
      <SubscribeCustomerBody>
        <Heading variant="h3">Subscribe customer</Heading>
        <SubscribeCustomerForm noValidate onSubmit={handleSubmit(onSubmit)}>
          <DoubleInputWrapper>
            <TextField
              {...register('userFirstName', {
                required: true,
              })}
              disabled={loading}
              errors={errors}
              label="First name"
              placeholder="Mary"
              required
            />
            <TextField
              {...register('userLastName', {
                required: true,
              })}
              disabled={loading}
              errors={errors}
              label="Last name"
              placeholder="Green"
              required
            />
            <NotificationText>
              Please enter a name exactly as it appears on a drivers license
            </NotificationText>
          </DoubleInputWrapper>
          <DoubleInputWrapper>
            <TextField
              {...register('userEmail', {
                required: true,
                pattern: emailValidator(),
              })}
              disabled={loading}
              errors={errors}
              label="Customer's email"
              placeholder="example@email.com"
              required
            />
            <CheckboxWrapper>
              <Checkbox
                {...register('isCarPartOfFleet')}
                customStyles={{
                  fontSize: '16px',
                }}
                errors={errors}
                label="Fleet car"
              />
            </CheckboxWrapper>
          </DoubleInputWrapper>
          <PhoneInput
            {...register('userPhoneNumber', {
              required: true,
              pattern: numberValidator('Phone'),
            })}
            errors={errors}
            label="Phone number"
            required
            selectedCallingCode={selectedCallingCode}
            setSelectedCallingCode={setSelectedCallingCode}
          />
          <DoubleInputWrapper>
            {carMakers && (
              <CreatableSelect
                control={control}
                errors={errors}
                label="EV make"
                name="carMakerName"
                options={carMakers}
                required
              />
            )}
            <CreatableSelect
              control={control}
              errors={errors}
              label="EV model"
              name="carModelName"
              options={carModels}
              required
            />
          </DoubleInputWrapper>
          <InputWrapper>
            <DateInput
              control={control}
              disablePastDates={false}
              disabled={loading}
              errors={errors}
              label="Estimated delivery date"
              name="estimatedCarDeliveryDate"
            />
          </InputWrapper>
          <TermsCheckboxWrapper>
            <Checkbox
              {...register('confirmTerms', {
                required: true,
              })}
              customStyles={{
                fontSize: '16px',
              }}
              errors={errors}
              label={<TermsLabel />}
              required
            />
          </TermsCheckboxWrapper>
          <PopupFooterAction>
            <Button
              isLoading={loading}
              onClick={(e) => {
                e.preventDefault();
                setOpenPopup(false);
                reset();
                window.localStorage.removeItem('inviteCustomerFormUnsubmitted');
              }}
              type="button"
              variant="outlined"
            >
              Cancel
            </Button>
            <Button isLoading={loading} type="submit" withArrow>
              Send invite
            </Button>
          </PopupFooterAction>
        </SubscribeCustomerForm>
      </SubscribeCustomerBody>
    </Popup>
  );
};

export default SubscribeCustomerPopup;
