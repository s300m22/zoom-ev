/* eslint-disable react-hooks/exhaustive-deps */
import { Dispatch, SetStateAction, useEffect, MutableRefObject } from 'react';
import { useForm } from 'react-hook-form';
import { getGeocode, getLatLng } from 'use-places-autocomplete';
import add from 'date-fns/add';
import compareAsc from 'date-fns/compareAsc';
import { useRouter } from 'next/router';
import {
  CarSearchBarForm,
  LocationInputWrapper,
  PickUpInputWrapper,
  DropOffWrapper,
  SubmitButton,
} from './CarSearchBar.styled';
import { useNextQueryParam, useSnackbar } from '../../hooks';
import { PlacesAutoComplete, DateInput } from '../Inputs';
import { SubmitIcon } from '../../icons';
import { convertToTimestamp, storeRecentSearches, logError } from '../../utils';

interface FormProps {
  location: string;
  availabilityTimeStart: string;
  availabilityTimeEnd: string;
}

interface CarSearchBarProps {
  isSearch?: boolean;
  loading?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mapRef?: MutableRefObject<any>;
  setZoom?: Dispatch<SetStateAction<number>>;
}

const CarSearchBar = ({ isSearch, loading, mapRef, setZoom }: CarSearchBarProps) => {
  const router = useRouter();
  const [timeStart, timeEnd, term] = useNextQueryParam(['start', 'end', 'term']);
  const showSnackbar = useSnackbar();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    trigger,
    watch,
    formState,
    setValue,
  } = useForm<FormProps>({
    mode: 'onSubmit',
    defaultValues: {
      location: term ?? '',
    },
  });

  const onSubmit = async (input: FormProps) => {
    try {
      const isValid = await trigger();
      if (!isValid) {
        return;
      }
      let latitude;
      let longitude;
      const { location, availabilityTimeStart, availabilityTimeEnd } = input;
      // Check if location include latitude, longitude
      if (
        location.match(
          /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/,
        )
      ) {
        [latitude, longitude] = location.split(',');
      } else {
        storeRecentSearches(location);
      }

      const LatLngResults = await getGeocode({ address: location });
      const { lat, lng } = await getLatLng(LatLngResults[0]);

      router.push(
        {
          pathname: '/search',
          query: {
            ...router.query,
            lat: typeof latitude === 'string' ? parseInt(latitude, 10) : lat,
            lng: typeof longitude === 'string' ? parseInt(longitude, 10) : lng,
            start: convertToTimestamp(availabilityTimeStart),
            end: convertToTimestamp(availabilityTimeEnd),
            term: input.location,
          },
        },
        undefined,
        { shallow: true },
      );
    } catch (error: any) {
      logError(error);
      showSnackbar({ message: 'Oops, Something went wrong.', type: 'error' });
    }
  };

  const availabilityTimeStart = watch('availabilityTimeStart');

  const availabilityTimeEnd = watch('availabilityTimeEnd');

  useEffect(() => {
    if (isSearch) {
      if (
        (availabilityTimeStart || availabilityTimeEnd) &&
        (formState.dirtyFields.availabilityTimeStart || formState.dirtyFields.availabilityTimeEnd)
      ) {
        if (availabilityTimeStart && availabilityTimeEnd) {
          // @ts-ignore
          if (compareAsc(availabilityTimeStart, availabilityTimeEnd) > 0) {
            // @ts-ignore
            setValue('availabilityTimeEnd', add(availabilityTimeStart, { hours: 1 }));
          } else {
            router.replace(
              {
                pathname: '/search',
                query: {
                  ...router.query,
                  // @ts-ignore
                  ...(availabilityTimeStart && { start: availabilityTimeStart.getTime() }),
                  // @ts-ignore
                  ...(availabilityTimeEnd && { end: availabilityTimeEnd.getTime() }),
                },
              },
              undefined,
              { shallow: true },
            );
          }
        }
      }
    }
  }, [availabilityTimeStart, availabilityTimeEnd, formState.dirtyFields]);

  useEffect(() => {
    // @ts-ignore
    if (formState.isDirty && compareAsc(availabilityTimeStart, availabilityTimeEnd) > 0) {
      // @ts-ignore
      setValue('availabilityTimeEnd', add(availabilityTimeStart, { hours: 1 }));
    }
  }, [availabilityTimeStart]);

  return (
    <>
      <CarSearchBarForm noValidate onSubmit={handleSubmit(onSubmit)}>
        <LocationInputWrapper>
          <PlacesAutoComplete
            {...register('location', { required: true })}
            errors={errors}
            label="Location"
            liveMode={isSearch}
            mapRef={mapRef}
            onValueChanged={(st) => {
              setValue('location', st);
            }}
            setZoom={setZoom}
          />
        </LocationInputWrapper>
        <PickUpInputWrapper>
          <DateInput
            alternative
            control={control}
            disabled={loading}
            // @ts-ignore
            endDate={availabilityTimeEnd}
            errors={errors}
            label="Pick up"
            name="availabilityTimeStart"
            prefilledDate={
              typeof timeStart === 'string'
                ? parseInt(timeStart, 10)
                : add(Date.now(), { days: 1 }).getTime()
            }
            showClock
          />
        </PickUpInputWrapper>
        <DropOffWrapper>
          <DateInput
            alternative
            control={control}
            disabled={loading}
            errors={errors}
            label="Drop Off"
            name="availabilityTimeEnd"
            prefilledDate={
              typeof timeEnd === 'string'
                ? parseInt(timeEnd, 10)
                : add(Date.now(), { days: 3 }).getTime()
            }
            showClock
            // @ts-ignore
            startDate={availabilityTimeStart}
          />
        </DropOffWrapper>

        {!isSearch && (
          <SubmitButton type="submit">
            <SubmitIcon />
          </SubmitButton>
        )}
      </CarSearchBarForm>
    </>
  );
};
export default CarSearchBar;
