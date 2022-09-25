import { SetStateAction, Dispatch, useState, useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import Skeleton from 'react-loading-skeleton';
import {
  SimpleCard,
  Heading,
  PhoneInput,
  TextField,
  CreatableSelect,
  DoubleInputWrapper,
  DateInput,
} from '../../../../elements';
import { numberValidator } from '../../../../utils';
import DetailsWrapper from './Details.styled';
import { checkoutBundleLoadingAtom, userDetailsAtom } from '../../../../recoil';
import { useCarMakersQuery } from '../../../../hooks/api/carMakers/carMakers.generated';
import { useResellerDiscountAdditionalDataQuery } from '../../../../hooks/api/resellerDiscountAdditionalData/resellerDiscountAdditionalData.generated';

interface DetailsProps {
  selectedCallingCode: string;
  setSelectedCallingCode: Dispatch<SetStateAction<string>>;
}

const Details = ({ selectedCallingCode, setSelectedCallingCode }: DetailsProps) => {
  const userDetails = useRecoilValue(userDetailsAtom);
  const loading = useRecoilValue(checkoutBundleLoadingAtom);
  const {
    register,
    control,
    formState: { errors },
    setValue,
  } = useFormContext();
  const [carModels, setCarModels] = useState<any>(undefined);
  const { data: prefilledData, loading: loadingPrefilledData } =
    useResellerDiscountAdditionalDataQuery();
  const { data: carMakersData } = useCarMakersQuery();
  const carMakers = carMakersData?.carMakers.map((maker) => ({
    value: maker.name,
    label: maker.name,
  }));

  const selectedCarMaker = useWatch<any>({
    control,
    name: 'carMakerName',
  });

  const preffiled = prefilledData?.resellerDiscountAdditionalData;

  useEffect(() => {
    selectedCarMaker && setValue('carModelName', null);
    setCarModels(
      carMakersData?.carMakers
        .filter((maker) => maker.name === selectedCarMaker?.value)[0]
        ?.models.map((model) => ({
          value: model.name,
          label: model.name,
        })),
    );
  }, [carMakersData?.carMakers, selectedCarMaker, setValue]);

  useEffect(() => {
    if (preffiled?.carModelName) {
      setValue('carModelName', {
        label: preffiled.carModelName,
        value: preffiled.carModelName,
      });
    }

    if (preffiled?.addressLine1) {
      setValue('addressLine1', preffiled?.addressLine1);
    }
    if (preffiled?.addressLine2) {
      setValue('addressLine2', preffiled?.addressLine2);
    }
    if (preffiled?.city) {
      setValue('town', preffiled?.city);
    }
    if (preffiled?.county) {
      setValue('county', preffiled?.county);
    }
    if (preffiled?.postcode) {
      setValue('postCode', preffiled?.postcode);
    }
    if (preffiled?.estimatedCarDeliveryDate) {
      setValue('estimatedCarDeliveryDate', preffiled?.estimatedCarDeliveryDate);
    }
  }, [preffiled, carModels, setValue]);

  const getPreFilledPhoneNumber = () => {
    return userDetails?.details?.phoneNumber ?? preffiled?.granteePhoneNumber ?? null;
  };

  return userDetails && !loadingPrefilledData ? (
    <>
      <SimpleCard>
        <DetailsWrapper>
          <Heading variant="h4">Your Details</Heading>
          <PhoneInput
            customStyles={{ maxWidth: '100%' }}
            defaultValue={getPreFilledPhoneNumber()?.split('|')[1] ?? ''}
            disabled={loading}
            errors={errors}
            label="Phone number"
            readOnly={Boolean(getPreFilledPhoneNumber())}
            {...register('phoneNumber', {
              pattern: numberValidator('Phone'),
              required: true,
            })}
            required
            selectedCallingCode={
              selectedCallingCode ??
              getPreFilledPhoneNumber()?.split('|')[0]?.replace('+', '') ??
              ''
            }
            setSelectedCallingCode={setSelectedCallingCode}
          />

          <TextField
            defaultValue={userDetails?.details.addressLine1 || ''}
            disabled={loading}
            errors={errors}
            label="Address 1"
            placeholder="eg. 50 Birmingham Street"
            readOnly={Boolean(preffiled?.addressLine1)}
            {...register('addressLine1', { required: true })}
            required
          />
          <TextField
            defaultValue={userDetails?.details.addressLine2 || ''}
            disabled={loading}
            errors={errors}
            label="Address 2"
            placeholder="eg. apartment, floor, building (optional)"
            readOnly={Boolean(preffiled?.addressLine2)}
            {...register('addressLine2')}
          />
          <DoubleInputWrapper>
            <TextField
              defaultValue={userDetails?.details.city || ''}
              disabled={loading}
              errors={errors}
              label="Town"
              placeholder="eg. Bristol"
              readOnly={Boolean(preffiled?.city)}
              {...register('town', { required: true })}
              required
            />
            <TextField
              defaultValue={userDetails?.details.county || ''}
              disabled={loading}
              errors={errors}
              label="County"
              placeholder="eg. Avon"
              readOnly={Boolean(preffiled?.county)}
              {...register('county')}
            />
          </DoubleInputWrapper>
          <DoubleInputWrapper>
            <TextField
              defaultValue={userDetails?.details.postCode || ''}
              disabled={loading}
              errors={errors}
              label="Postcode"
              placeholder="X11 Y11"
              readOnly={Boolean(preffiled?.postcode)}
              {...register('postCode', { required: true })}
              required
            />
          </DoubleInputWrapper>
        </DetailsWrapper>
      </SimpleCard>
      <SimpleCard>
        <DetailsWrapper>
          <Heading variant="h4">Your EV</Heading>

          <DoubleInputWrapper>
            <CreatableSelect
              control={control}
              defaultValue={
                preffiled?.carMakerName
                  ? {
                      label: preffiled.carMakerName,
                      value: preffiled.carMakerName,
                    }
                  : null
              }
              errors={errors}
              label="EV make"
              name="carMakerName"
              options={carMakers}
              readOnly={Boolean(preffiled?.carMakerName)}
              required
            />
            <CreatableSelect
              control={control}
              errors={errors}
              label="EV model"
              name="carModelName"
              options={carModels}
              readOnly={Boolean(preffiled?.carModelName)}
              required
            />
          </DoubleInputWrapper>

          <DateInput
            control={control}
            disablePastDates={false}
            disabled={loading}
            errors={errors}
            label="Estimated delivery date (optional)"
            name="estimatedCarDeliveryDate"
            prefilledDate={
              preffiled?.estimatedCarDeliveryDate
                ? parseInt(preffiled.estimatedCarDeliveryDate as string, 10)
                : null
            }
            readOnly={Boolean(preffiled?.estimatedCarDeliveryDate || preffiled?.carModelName)}
            tooltip="If you are getting a new EV, telling us the date you expect to receive the vehicle will help us know when you might need things like a home charger in place by. If you don't know, please leave it blank."
          />
        </DetailsWrapper>
      </SimpleCard>
    </>
  ) : (
    <Skeleton
      count={1}
      height={892}
      style={{
        marginBottom: '10px',
        borderRadius: '12px',
        boxShadow: '0 10px 34px rgba(23, 75, 83, 0.1)',
      }}
    />
  );
};

export default Details;
