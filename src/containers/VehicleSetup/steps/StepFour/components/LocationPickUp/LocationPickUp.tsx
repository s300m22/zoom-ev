/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { useWatch, useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { StepRow, StepParagraph } from '../../../StepsShared.styled';
import { Label, Error, LocationMarker, MapWrapper, MapMarkWrapper } from './LocationPickUp.styled';
import { BoldText, Bubble, Heading, SimpleCard, TextArea } from '../../../../../../elements';
import { parseGeocodeResults, logError } from '../../../../../../utils';
import { useUpdateCarLocationMutation } from '../../../../../../hooks/api/updateCarLocation/updateCarLocation.generated';
import { useUpdateCarLocationTipsMutation } from '../../../../../../hooks/api/updateCarLocationTips/updateCarLocationTips.generated';
import { MarkIcon } from '../../../../../../icons';
import { useCarRecentlyCreatedQuery } from '../../../../../../hooks/api/carRecentlyCreated/carRecentlyCreated.generated';
import { vehicleSetupAtom } from '../../../../../../recoil';
import { useIsBusiness, useSnackbar } from '../../../../../../hooks';
import { useCarLocationTipsQuery } from '../../../../../../hooks/api/carLocationTips/carLocationTips.generated';

interface LocationPickUpProps {
  setActiveStep: Dispatch<SetStateAction<number>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setActiveNavStep: Dispatch<SetStateAction<number>>;
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

const LocationPickUp = ({ setActiveStep, setIsLoading, setActiveNavStep }: LocationPickUpProps) => {
  const { data: carRecentlyCreatedData } = useCarRecentlyCreatedQuery();
  const [addressPrivate, setAddressPrivate] = useState('');
  const [addressPublic, setAddressPublic] = useState('');
  const isBusiness = useIsBusiness();
  const showSnackbar = useSnackbar();
  const carDetails = useRecoilValue(vehicleSetupAtom);
  const setCarDetails = useSetRecoilState(vehicleSetupAtom);
  const realLocation = carDetails?.realLocation;
  const tips = carDetails?.tips;
  const carRecentlyCreated = carRecentlyCreatedData?.carRecentlyCreated;

  const [updateCarLocation] = useUpdateCarLocationMutation();
  const [updateCarLocationTips] = useUpdateCarLocationTipsMutation();
  const { data: carLocationTips } = useCarLocationTipsQuery({
    variables: {
      // @ts-expect-error this id will never be null so this error is invalid
      carId: carDetails?.id,
    },
  });

  const {
    control,
    formState,
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    setValue,
  } = useForm<LocationInputsProps>({
    mode: 'onBlur',
  });

  register('lat', { required: 'Required' });
  register('lon', { required: 'Required' });

  const latitude = useWatch<any>({
    control,
    name: 'lat',
    defaultValue: realLocation?.lat || carRecentlyCreated?.realLocation?.lat,
  });

  const longtitude = useWatch<any>({
    control,
    name: 'lon',
    defaultValue: realLocation?.lon || carRecentlyCreated?.realLocation?.lon,
  });

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
    setValue('locationTips', carLocationTips?.carLocationTips ?? '');
  }, [carLocationTips, setValue]);

  const onSubmit = useCallback(
    async (input: LocationInputsProps) => {
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

        const { lon, lat, locationTips } = input;
        if (!isBusiness) {
          if (carDetails?.id) {
            await updateCarLocation({
              variables: {
                addressPrivate,
                addressPublic,
                lon,
                lat,
                carId: carDetails.id,
              },
            });
            if (locationTips) {
              await updateCarLocationTips({
                variables: {
                  locationTips,
                  carId: carDetails.id,
                },
              });
            }
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
          realLocation: {
            addressPrivate,
            addressPublic,
            lon,
            lat,
          },
          tips: locationTips,
        });
        setActiveStep(8);
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
      addressPrivate,
      addressPublic,
      setActiveStep,
      showSnackbar,
      updateCarLocation,
      updateCarLocationTips,
    ],
  );

  useEffect(() => {
    setActiveNavStep(3);
  }, [setActiveNavStep]);

  useEffect(() => {
    if (realLocation && realLocation.lat && realLocation.lon) {
      const { lat, lon } = realLocation;
      setValue('lat', lat);
      setValue('lon', lon);
      geocodeLatLng(lat, lon);
    }
  }, [realLocation, setValue]);

  useEffect(() => {
    if (isBusiness && carRecentlyCreated && carRecentlyCreated.realLocation && !realLocation) {
      const { lat, lon } = carRecentlyCreated.realLocation;
      if (lat && lon) {
        setValue('lat', lat);
        setValue('lon', lon);
        geocodeLatLng(lat, lon);
      }
    }
  }, [carRecentlyCreated, isBusiness, realLocation, setValue]);

  useEffect(() => {
    if (tips) {
      setValue('locationTips', tips);
    }
  }, [tips, setValue]);

  const LONDON_LATLNG = {
    lat: latitude || 51.509865,
    lng: longtitude || -0.118092,
  };

  return (
    <>
      <StepRow>
        <SimpleCard customStyles={{ width: '100%', textAlign: 'left' }}>
          <Heading variant="h4">Where can your Guest pick up your EV?</Heading>
          <StepParagraph>
            We will not share the exact location of your EV to other Members. Only Members whose
            booking is approved will see the exact location.
          </StepParagraph>
          <MapWrapper isError={Boolean(formState.errors.lat || formState.errors.lon)}>
            <Label isError={Boolean(formState.errors.lat || formState.errors.lon)} required>
              Car location
            </Label>
            <GoogleMapReact
              bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || '' }}
              defaultCenter={LONDON_LATLNG}
              defaultZoom={10}
              onClick={({ lat, lng }) => {
                setValue('lon', lng);
                setValue('lat', lat);
                geocodeLatLng(lat, lng);
              }}
              options={{
                fullscreenControl: false,
              }}
            >
              {(realLocation?.lat || latitude) && (realLocation?.lon || longtitude) ? (
                <MapMark
                  /* @ts-ignore */
                  lat={latitude}
                  lng={longtitude}
                />
              ) : null}
            </GoogleMapReact>
            {addressPrivate && (
              <>
                <LocationMarker>{addressPrivate}</LocationMarker>
              </>
            )}
            <Error>{(formState.errors.lat || formState.errors.lon) && 'Required'}</Error>
          </MapWrapper>
          <Label isError={Boolean(formState.errors.lat || formState.errors.lon)}>
            Location tips
          </Label>
          <StepParagraph>
            Help the user find your EV. Mention some specific landmarks to make the search quicker.
          </StepParagraph>
          <form id="submit-form-7" noValidate onSubmit={handleSubmit(onSubmit)}>
            <TextArea
              {...register('locationTips')}
              defaultValue={tips || ''}
              errors={errors}
              maxLength={500}
              noResize
            />
          </form>
        </SimpleCard>
      </StepRow>
      <StepRow>
        <Bubble>
          <BoldText>Tips</BoldText>• Use buttons on the right or your mouse + alt to zoom the map.
          Then grab it and pin your location!
        </Bubble>
      </StepRow>
    </>
  );
};

export default LocationPickUp;
