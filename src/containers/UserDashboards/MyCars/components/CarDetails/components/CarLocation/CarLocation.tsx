/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { useForm } from 'react-hook-form';
import Skeleton from 'react-loading-skeleton';
import { ApolloQueryResult } from '@apollo/client';
import {
  Button,
  Heading,
  SettingsCardWrapper,
  SettingsCardHeader,
  SettingsEditLink,
  SettingsCardFooter,
  SettingsForm,
  SubText,
  Error,
  TextArea,
} from '../../../../../../../elements';
import { useCarLocationTipsQuery } from '../../../../../../../hooks/api/carLocationTips/carLocationTips.generated';
import { useCarRealLocationQuery } from '../../../../../../../hooks/api/carRealLocation/carRealLocation.generated';
import { useUpdateCarLocationMutation } from '../../../../../../../hooks/api/updateCarLocation/updateCarLocation.generated';
import { useUpdateCarLocationTipsMutation } from '../../../../../../../hooks/api/updateCarLocationTips/updateCarLocationTips.generated';
import { logError, parseGeocodeResults } from '../../../../../../../utils';
import { AddressHolder, MapMarkWrapper, MapWrapper, LocationNotes } from './CarLocation.styled';
import PersonalDetailsEnum from '../../CarDetailsActiveFormEnum';
import { GetCarQuery } from '../../../../../../../hooks/api/getCar/getCar.generated';
import { MarkIcon } from '../../../../../../../icons';

interface CarLocationProps {
  car: GetCarQuery['car'];
  activeForm?: PersonalDetailsEnum;
  setActiveForm: Dispatch<SetStateAction<PersonalDetailsEnum | undefined>>;
  refetchCarDetails: () => Promise<ApolloQueryResult<GetCarQuery>>;
}

interface LocationInputsProps {
  lon: number;
  lat: number;
  locationTips: string;
}

const MapMark = () => (
  <MapMarkWrapper>
    <MarkIcon />
  </MapMarkWrapper>
);

const CarLocation = ({ car, activeForm, setActiveForm, refetchCarDetails }: CarLocationProps) => {
  const carId = car?.id as string;
  const isFormActive = activeForm === PersonalDetailsEnum.Location;
  const isFormBlurred = activeForm && activeForm !== PersonalDetailsEnum.Location;
  const [locationTipsText, setLocationTipsText] = useState('');
  const [addressPrivate, setAddressPrivate] = useState(car?.addressPrivate || '');
  const [addressPublic, setAddressPublic] = useState(car?.addressPublic || '');
  const { data: locationTipsData, loading: locationTipsLoading } = useCarLocationTipsQuery({
    variables: {
      carId,
    },
  });

  const { data: realLocationData, loading: realLocationLoading } = useCarRealLocationQuery({
    variables: {
      carId,
    },
  });

  const locationTips = locationTipsData?.carLocationTips;
  const realLocation = realLocationData?.carRealLocation;
  const DEFAULT_LATLNG = {
    lat: realLocation?.lat || 51.509865,
    lng: realLocation?.lon || -0.118092,
  };
  const [latitude, setLatitude] = useState(realLocation?.lat);
  const [longtitude, setLongtitude] = useState(realLocation?.lon);
  const [updateCarLocation, { loading: carLocationLoading }] = useUpdateCarLocationMutation();
  const [updateCarLocationTips, { loading: carTipsLoading }] = useUpdateCarLocationTipsMutation();

  const {
    formState,
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
    setValue,
  } = useForm<LocationInputsProps>({
    mode: 'onBlur',
  });

  register('lat', { required: 'Required' });
  register('lon', { required: 'Required' });

  useEffect(() => {
    if (locationTips) {
      setLocationTipsText(locationTips);
    }
  }, [locationTips]);

  const geocodeLatLng = (lat: number, lng: number) => {
    const latlng = {
      lat,
      lng,
    };
    new google.maps.Geocoder().geocode(
      { location: latlng, region: 'uk' },
      (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {
        if (status === 'OK') {
          if (results[0]) {
            parseGeocodeResults(results[0].address_components);
            const { home, postal_code, street, city, country } = parseGeocodeResults(
              results[0].address_components,
            );

            const privateAdr = `${home && street ? `${home} ${street}, ` : ''}${
              city ? `${city}, ` : ''
            }${country ? `${country}, ` : ''}${postal_code ? `${postal_code}` : ''}`;

            const publicAdr = `${country ? `${country}, ` : ''}${
              postal_code ? `${postal_code}` : ''
            }`;

            setAddressPrivate(privateAdr);
            setAddressPublic(publicAdr);
          }
        }
      },
    );
  };

  useEffect(() => {
    if (realLocation) {
      setLatitude(realLocation?.lat);
      setLongtitude(realLocation?.lon);
      setValue('lat', realLocation?.lat);
      setValue('lon', realLocation?.lon);
    }
  }, [realLocation, setValue]);

  const onSubmit = useCallback(
    async (input: LocationInputsProps) => {
      try {
        const isValid = await trigger();

        if (!isValid) {
          return;
        }
        const { lon, lat, locationTips: inputLocationTips } = input;

        await updateCarLocation({
          variables: {
            addressPrivate,
            addressPublic,
            lon,
            lat,
            carId,
          },
        });

        await updateCarLocationTips({
          variables: {
            locationTips: inputLocationTips,
            carId,
          },
        });
        setLocationTipsText(inputLocationTips);
        await refetchCarDetails();
        setActiveForm(undefined);
      } catch (error: any) {
        logError(error);
      }
    },
    [
      trigger,
      updateCarLocation,
      addressPrivate,
      addressPublic,
      carId,
      updateCarLocationTips,
      setActiveForm,
      refetchCarDetails,
    ],
  );

  return !locationTipsLoading && !realLocationLoading ? (
    <SettingsCardWrapper isFormBlurred={Boolean(isFormBlurred)}>
      <SettingsCardHeader>
        <Heading variant="h4">
          Location
          <SubText>
            The exact location is only shown to the Guest once you have approved their booking.
          </SubText>
        </Heading>
        <SettingsEditLink onClick={() => setActiveForm(PersonalDetailsEnum.Location)}>
          Edit
        </SettingsEditLink>
      </SettingsCardHeader>
      <SettingsForm noValidate onSubmit={handleSubmit(onSubmit)}>
        <MapWrapper
          isError={Boolean(formState.errors.lat || formState.errors.lon)}
          isReadOnly={!isFormActive}
        >
          <AddressHolder>{addressPrivate}</AddressHolder>
          <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || '' }}
            defaultCenter={DEFAULT_LATLNG}
            defaultZoom={10}
            onClick={({ lat, lng }) => {
              if (isFormActive) {
                setValue('lon', lng);
                setValue('lat', lat);
                setLatitude(lat);
                setLongtitude(lng);
                geocodeLatLng(lat, lng);
              }
            }}
            options={{
              fullscreenControl: false,
            }}
          >
            {/* @ts-ignore */}
            <MapMark lat={latitude} lng={longtitude} />
          </GoogleMapReact>
          <Error>{(formState.errors.lat || formState.errors.lon) && 'Required'}</Error>
        </MapWrapper>
        {isFormActive ? (
          <TextArea
            {...register('locationTips')}
            defaultValue={locationTipsData?.carLocationTips || ''}
            errors={errors}
            label="Location notes"
            maxLength={500}
            noResize
          />
        ) : (
          <LocationNotes>
            <Heading variant="h5">Location notes</Heading>
            <SubText>{locationTipsText}</SubText>
          </LocationNotes>
        )}
        {isFormActive ? (
          <SettingsCardFooter style={{ marginTop: '20px' }}>
            <Button
              isLoading={carLocationLoading || carTipsLoading}
              onClick={(e) => {
                e.preventDefault();
                reset({
                  locationTips: locationTipsData?.carLocationTips ?? undefined,
                });
                setActiveForm(undefined);
              }}
              variant="outlined"
            >
              Cancel
            </Button>
            <Button isLoading={carLocationLoading || carTipsLoading}>Save changes</Button>
          </SettingsCardFooter>
        ) : null}
      </SettingsForm>
    </SettingsCardWrapper>
  ) : (
    <Skeleton
      count={1}
      height={611}
      style={{
        marginBottom: '30px',
        borderRadius: '12px',
        boxShadow: '0 10px 34px rgba(23, 75, 83, 0.1)',
      }}
    />
  );
};

export default CarLocation;
