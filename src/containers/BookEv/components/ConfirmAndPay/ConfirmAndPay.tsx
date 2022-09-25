/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import dateFnsFormat from 'date-fns/format';
import GoogleMapReact from 'google-map-react';
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import Skeleton from 'react-loading-skeleton';

import { BoldText, CreatableSelect, Heading, SimpleCard, SubText } from '../../../../elements';
import AddPaymentMethodPopup from '../../../../elements/Popups/AddPaymentMethodPopup';
import { GetPublicCarQuery } from '../../../../hooks/api/getPublicCarInformation/getPublicCarInformation.generated';
import { useStripeSetupIntentsQuery } from '../../../../hooks/api/stripeSetupIntents/stripeSetupIntents.generated';
import {
  AddPaymentMethodWrapper,
  BookingDatesWrapper,
  CancelationContentBox,
  ConfirmAndPayWrapper,
  LocationCardMapWrapper,
  LocationText,
  LocationWrapper,
  MapMarkRadius,
  PaywithWrapper,
} from './ConfirmAndPay.styled';
import { useNextQueryParam } from '../../../../hooks';
import { AddressTextNotice } from '../../../Car/components/LocationCard/LocationCard.styled';
import { QuestionIcon } from '../../../../icons';

interface SelectOption {
  value: string;
  label: string;
}
interface ConfirmAndPayProps {
  car: GetPublicCarQuery['car'];
  setSelectedPaymentMethodId: Dispatch<SetStateAction<string>>;
}

const DEFAULT_ZOOM = 10;

const ConfirmAndPay = ({ car, setSelectedPaymentMethodId }: ConfirmAndPayProps) => {
  const [timeStart, timeEnd] = useNextQueryParam(['ts', 'te']);
  const FORMAT = 'dd/MM/yyyy hh:mm aa';
  const pickUpDate = typeof timeStart === 'string' ? new Date(parseInt(timeStart, 10)) : Date.now();
  const dropOffDate = typeof timeEnd === 'string' ? new Date(parseInt(timeEnd, 10)) : Date.now();
  const carLocation = car?.addressPublic;
  const fakeLocation = car?.fakeLocation;
  const [mapZoom, setMapZoom] = useState(DEFAULT_ZOOM);

  const {
    data: setupIntentsData,
    loading: setupIntentLoading,
    refetch: refetchSetupIntents,
  } = useStripeSetupIntentsQuery({
    notifyOnNetworkStatusChange: true,
  });

  const DEFAULT_LAT_LNG = {
    lat: fakeLocation?.lat || 51.509865,
    lng: fakeLocation?.lon || -0.118092,
  };

  const markerSize = useMemo(() => {
    const zoomRatio =
      mapZoom - DEFAULT_ZOOM <= 0 ? mapZoom / DEFAULT_ZOOM : mapZoom - DEFAULT_ZOOM || 1;
    return 60 * zoomRatio;
  }, [mapZoom]);

  const methods = setupIntentsData?.stripeSetupIntents;
  const methodsOptions = useMemo(() => {
    return methods?.map((method) => ({
      value: method.id,
      label: `**** **** **** ${method.cardLast4}`,
      paymentMethod: {
        brand: method.cardBrand,
        last4: method.cardLast4,
      },
    }));
  }, [methods]);

  const {
    control,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  const selectedMethod = useWatch<SelectOption>({
    // @ts-ignore
    control,
    name: 'paymentMethods',
  });

  useEffect(() => {
    if (methodsOptions && methodsOptions.length) {
      setSelectedPaymentMethodId(methodsOptions[0].value);
    }
  }, [methodsOptions, setSelectedPaymentMethodId]);

  useEffect(() => {
    if (selectedMethod) {
      setSelectedPaymentMethodId(selectedMethod.value as string);
    }
  }, [selectedMethod, setSelectedPaymentMethodId]);

  return pickUpDate && dropOffDate ? (
    <SimpleCard>
      <Heading variant="h4">Confirm and pay</Heading>
      <ConfirmAndPayWrapper>
        <Heading variant="h5">Booking dates</Heading>
        <BookingDatesWrapper>
          <SubText>Pick up</SubText>
          <BoldText>{dateFnsFormat(pickUpDate, FORMAT)}</BoldText>
        </BookingDatesWrapper>
        <BookingDatesWrapper>
          <SubText>Drop off</SubText>
          <BoldText>{dateFnsFormat(dropOffDate, FORMAT)}</BoldText>
        </BookingDatesWrapper>
        <LocationWrapper>
          <Heading variant="h5">Pick-up and drop-off location</Heading>
          <LocationText>{carLocation}</LocationText>
          {!car?.business && (
            <AddressTextNotice>
              <QuestionIcon height={12} width={12} />
              <span>Full address will become available after booking.</span>
            </AddressTextNotice>
          )}
          <LocationCardMapWrapper>
            <GoogleMapReact
              bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || '' }}
              defaultCenter={DEFAULT_LAT_LNG}
              defaultZoom={DEFAULT_ZOOM}
              onChange={({ zoom }) => {
                setMapZoom(zoom);
              }}
              options={{
                fullscreenControl: false,
                zoomControl: false,
                maxZoom: 18,
              }}
            >
              {fakeLocation?.lat && fakeLocation?.lon ? (
                <MapMarkRadius
                  /* @ts-ignore */
                  lat={fakeLocation.lat}
                  lng={fakeLocation.lon}
                  markerSize={markerSize}
                />
              ) : null}
            </GoogleMapReact>
          </LocationCardMapWrapper>
        </LocationWrapper>
        <PaywithWrapper>
          <Heading variant="h5">Pay with</Heading>
          <br />
          {setupIntentLoading ? (
            <Skeleton
              count={1}
              height={56}
              style={{
                marginBottom: '23px',
                marginTop: '35px',
                borderRadius: '12px',
                boxShadow: '0 10px 34px rgba(23, 75, 83, 0.1)',
              }}
            />
          ) : methodsOptions && methodsOptions.length ? (
            <CreatableSelect
              control={control}
              defaultValue={methodsOptions[0]}
              errors={errors}
              isCardsSelector
              isCreatable={false}
              label="Credit or debit card"
              name="paymentMethods"
              options={methodsOptions}
              required
            />
          ) : null}
          <AddPaymentMethodWrapper>
            <AddPaymentMethodPopup getStripeSetupIntents={refetchSetupIntents} />
          </AddPaymentMethodWrapper>
        </PaywithWrapper>

        <CancelationContentBox>
          <Heading variant="h5">Breakdown and Insurance</Heading>
          {car?.business?.id
            ? 'Includes breakdown and insurance cover'
            : 'Includes breakdown cover only. Insurance is not included and must be organised separately by the Guest.'}
        </CancelationContentBox>
        <br />
        <CancelationContentBox>
          <Heading variant="h5">Cancellation rules</Heading>
          <br />
          Free cancellation up to 48 hours before rental.
          <br />
          <br />
          After 48 hours to rental: <br />
          £10 per day of the Rental Period (up to a maximum of £100) + Admin Fee
        </CancelationContentBox>
      </ConfirmAndPayWrapper>
    </SimpleCard>
  ) : (
    <Skeleton
      count={1}
      height={996}
      style={{
        marginBottom: '10px',
        borderRadius: '12px',
        boxShadow: '0 10px 34px rgba(23, 75, 83, 0.1)',
      }}
    />
  );
};

export default ConfirmAndPay;
