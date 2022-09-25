import {
  useEffect,
  ChangeEvent,
  forwardRef,
  DetailedHTMLProps,
  InputHTMLAttributes,
  useState,
  MutableRefObject,
  Dispatch,
  SetStateAction,
} from 'react';

import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { FieldErrors } from 'react-hook-form';
import {
  Label,
  PlacesAutoCompleteWrapper,
  LabelInputWrapper,
  CurrentLocationLoader,
} from './PlacesAutoComplete.styled';
import { LocationIcon } from '../../../icons';
import PlacesList from './components/PlacesList/PlacesList';
import { logError } from '../../../utils';
import { useNextQueryParam } from '../../../hooks';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  maxWidth?: string;
  errors?: FieldErrors;
  name: string;
  liveMode?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mapRef?: MutableRefObject<any>;
  setZoom?: Dispatch<SetStateAction<number>>;
  onValueChanged?: (str: string) => void;
}

type IInputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> &
  InputProps &
  HTMLInputElement;

const PlacesAutoComplete = forwardRef<IInputProps, InputProps>(
  (
    {
      name,
      errors,
      label,
      required,
      liveMode,
      mapRef,
      setZoom,
      onChange,
      onValueChanged,
      value: mval,
      ...rest
    },
    ref,
  ) => {
    const [currentLocationLoading, setCurrentLocationLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const fieldError = errors && errors[name];
    const [prefilledLat, prefilledLng] = useNextQueryParam(['lat', 'lng']);

    const {
      ready,
      value,
      suggestions: { status, data },
      setValue,
      clearSuggestions,
    } = usePlacesAutocomplete({
      initOnMount: true,
      requestOptions: {
        componentRestrictions: {
          country: ['uk'],
        },
      },
      debounce: 300,
    });

    const handleInput = (val: string) => {
      setShowSuggestions(true);
      setValue(val);

      if (onChange !== undefined)
        onChange({ target: { value: val } } as ChangeEvent<HTMLInputElement>);
    };

    useEffect(() => {
      if (liveMode) {
        try {
          const items = localStorage.getItem('recentSearches');
          if (typeof items === 'string') {
            if (prefilledLat && prefilledLng) {
              const previousSearches = JSON.parse(items);
              const lastSearch = previousSearches.length ? previousSearches[0] : undefined;
              lastSearch && setValue(lastSearch);
            } else {
              setValue('United Kingdom');
            }
          }
        } catch (error: any) {
          logError(error);
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [liveMode, setValue]);

    const handleSelect = async (val: string) => {
      if (onValueChanged !== undefined) onValueChanged(val);
      setValue(val, false);
      setShowSuggestions(false);
      const LatLngResults = await getGeocode({ address: val });
      const { lat, lng } = await getLatLng(LatLngResults[0]);
      const hasCoordinates = lat !== 55.378051 && lng !== -3.435973;
      setZoom && setZoom(hasCoordinates ? 10 : 6);
      mapRef?.current.panTo({ lat, lng });
    };

    return (
      <>
        {/* {mval} */}

        <PlacesAutoCompleteWrapper>
          <LocationIcon />
          <LabelInputWrapper>
            {label && (
              <Label htmlFor={name} isError={Boolean(fieldError)} required={required}>
                {label}
              </Label>
            )}
            {currentLocationLoading && <CurrentLocationLoader />}

            <input
              autoComplete="off"
              defaultValue={value}
              disabled={!ready}
              name={name}
              onChange={(e) => handleInput(e.target.value ?? '')}
              onClick={() => setShowSuggestions(true)}
              onKeyPress={({ key, currentTarget }) => {
                key === 'Enter' && handleSelect(currentTarget.value);
              }}
              placeholder="Enter post code or address"
              ref={ref}
              spellCheck="false"
              value={mval}
              {...rest}
            />

            {showSuggestions && (
              <PlacesList
                clearSuggestions={clearSuggestions}
                mapRef={mapRef}
                places={data}
                searchStatus={status}
                setCurrentLocationLoading={setCurrentLocationLoading}
                setShowSuggestions={setShowSuggestions}
                setValue={handleSelect}
                setZoom={setZoom}
              />
            )}
          </LabelInputWrapper>
        </PlacesAutoCompleteWrapper>
      </>
    );
  },
);
export default PlacesAutoComplete;
