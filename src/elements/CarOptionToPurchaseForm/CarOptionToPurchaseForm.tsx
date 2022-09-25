import React, { useCallback, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { StepParagraph } from '../../containers/VehicleSetup/steps/StepsShared.styled';
import { useIsBusiness, useSnackbar } from '../../hooks';
import { useDeleteCarSalesInfoMutation } from '../../hooks/api/deleteCarSalesInfo/deleteCarSalesInfo.generated';
import { useUpdateCarSalesInfoMutation } from '../../hooks/api/updateCarSalesInfo/updateCarSalesInfo.generated';
import { CarSalesInfoInputType } from '../../interfaces/api.types.generated';
import { userDetailsAtom, vehicleSetupAtom } from '../../recoil';
import { logError } from '../../utils';
import { Checkbox, PhoneInput, TextArea, TextField } from '../Inputs';
import { Tooltip } from '../index';

const CarOptionToPurchaseForm: React.FC<any> = ({ setIsLoading, onSavedCompleted }) => {
  const showSnackbar = useSnackbar();
  const isBusiness = useIsBusiness();
  const userDetails = useRecoilValue(userDetailsAtom);
  const carDetails = useRecoilValue(vehicleSetupAtom);
  const setCarDetails = useSetRecoilState(vehicleSetupAtom);
  const [updateCarSalesInfo] = useUpdateCarSalesInfoMutation();
  const [deleteCarSalesInfo] = useDeleteCarSalesInfoMutation();
  const [selectedCallingCode, setSelectedCallingCode] = useState('44');
  const userCallingCode = userDetails?.details?.phoneNumber?.split('|')[0].replace('+', '');
  const userPhoneNumber = userDetails?.details?.phoneNumber?.split('|')[1];

  const methods = useForm<CarSalesInfoInputType>({
    mode: 'onChange',
    defaultValues: carDetails?.salesInfo ?? {},
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = methods;

  const onSubmit = useCallback(
    async (input: CarSalesInfoInputType) => {
      const isValid = await trigger();

      if (!isValid) {
        return;
      }
      setIsLoading && setIsLoading(true);

      if (!carDetails) {
        showSnackbar({ message: 'Oops, Something went wrong.', type: 'error' });
        return;
      }

      try {
        if (carDetails?.isAvailableToBuy) {
          if (!isBusiness) {
            await updateCarSalesInfo({
              variables: {
                salesInfoInput: {
                  ...input,
                  phoneNumber: `+${selectedCallingCode}|${input.phoneNumber}`,
                },
                carId: carDetails.id as string,
              },
            });
          }

          setCarDetails({
            ...carDetails,
            salesInfo: {
              ...input,
              phoneNumber: `+${selectedCallingCode}|${input.phoneNumber}`,
            },
          });
        } else {
          if (!isBusiness) {
            await deleteCarSalesInfo({
              variables: {
                carId: carDetails.id as string,
              },
            });
          }
          setCarDetails({
            ...carDetails,
            salesInfo: null,
          });
        }

        onSavedCompleted();
      } catch (error) {
        logError(error);
      } finally {
        setIsLoading && setIsLoading(false);
      }
    },
    [
      carDetails,
      setIsLoading,
      showSnackbar,
      trigger,
      updateCarSalesInfo,
      onSavedCompleted,
      deleteCarSalesInfo,
      setCarDetails,
      selectedCallingCode,
    ],
  );

  return (
    <FormProvider {...methods}>
      <form id="submit-form-5" noValidate onSubmit={handleSubmit(onSubmit)}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: carDetails?.isAvailableToBuy ? 20 : 0,
          }}
        >
          <p>Would you also like to advertise this EV for sale?</p>
          <Checkbox
            checked={carDetails?.isAvailableToBuy ?? false}
            label=""
            name="isAvailableToBuy"
            onChange={(e) => {
              setCarDetails({
                ...carDetails!,
                isAvailableToBuy: e.target.checked,
              });
            }}
          />
        </div>
        {carDetails?.isAvailableToBuy && (
          <div>
            <StepParagraph>
              All EVs added to the platform are available for car sharing, but you can also
              advertise yours for sale if you wish to.
            </StepParagraph>
            <br />
            <br />

            <div>
              <TextField
                {...register('price', {
                  required: true,
                  valueAsNumber: true,
                })}
                errors={errors}
                label="What is the price of the EV?"
                min="0"
                placeholder=""
                required
                showCurrency
                step="0.1"
                type="number"
              />
            </div>

            <div>
              <TextField
                {...register('url', {
                  required: false,
                })}
                errors={errors}
                label={
                  <div>
                    {' '}
                    <span>Link (optional)</span>{' '}
                    <Tooltip
                      content={
                        'This link will direct our customers from our website to a website where your EV is listed for sale'
                      }
                    />
                    <StepParagraph>
                      Please provide the URL to the vehicle on your website
                    </StepParagraph>
                  </div>
                }
                min="0"
                placeholder=""
                type="text"
              />
            </div>

            <div>
              <PhoneInput
                {...register('phoneNumber', {
                  required: true,
                })}
                defaultValue={userPhoneNumber}
                errors={errors}
                label={
                  <>
                    <span>Contact Number</span>
                    <Tooltip
                      content={
                        'This is the phone number that will be provided to prospective buyers to contact.'
                      }
                    />
                  </>
                }
                min="0"
                placeholder=""
                required
                selectedCallingCode={userCallingCode || selectedCallingCode}
                setSelectedCallingCode={setSelectedCallingCode}
                type="text"
              />
            </div>

            <div>
              <TextField
                {...register('email', {
                  required: true,
                })}
                defaultValue={userDetails?.email}
                errors={errors}
                label={
                  <>
                    <span>Contact Email</span>
                    <Tooltip
                      content={
                        'This is the email address that will be provided to prospective buyers to contact.'
                      }
                    />
                  </>
                }
                placeholder=""
                required
                type="email"
              />
            </div>

            <div>
              <TextArea
                {...register('description', {
                  required: false,
                })}
                errors={errors}
                label="Description"
                min="0"
                placeholder="Share this EV for a weekend. If you like and buy it, the Host is offering to give you your rental money back! *up to the value of £500."
                required
                tooltip="Describe the terms of your offer to the prospective buyer. Offering to refund them part of the value of the sharing session is recommended"
                type="textarea"
              />
            </div>
          </div>
        )}
      </form>
    </FormProvider>
  );
};

export default CarOptionToPurchaseForm;
