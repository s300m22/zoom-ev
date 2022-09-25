/* eslint-disable no-unused-vars */
import { Dispatch, MutableRefObject, SetStateAction, useRef } from 'react';
import { getGeocode, getLatLng } from 'use-places-autocomplete';
import Geocode from 'react-geocode';
import RecentSearches from '../RecentSearches';
import {
  PlacesListWrapper,
  PlaceRow,
  UseCurrentLocation,
  MainText,
  SecondaryText,
} from './PlacesList.styled';
import { useOnClickOutside, useSnackbar } from '../../../../../hooks';
import { TargetIcon } from '../../../../../icons';

// @ts-expect-error maps key set for geocoding
Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY);

// Geocode.enableDebug();
// @ts-expect-error maps key set for geocoding
Geocode.setLocationType('APPROXIMATE');
interface PlacesListProps {
  places: google.maps.places.AutocompletePrediction[];
  clearSuggestions: () => void;
  setValue: (val: string, shouldFetchData?: boolean) => void;
  searchStatus: string;
  setShowSuggestions: Dispatch<SetStateAction<boolean>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mapRef?: MutableRefObject<any>;
  setZoom?: Dispatch<SetStateAction<number>>;
  setCurrentLocationLoading: Dispatch<SetStateAction<boolean>>;
}

const PlacesList = ({
  places,
  clearSuggestions,
  searchStatus,
  setValue,
  setShowSuggestions,
  mapRef,
  setZoom,
  setCurrentLocationLoading,
}: PlacesListProps) => {
  const placesRef = useRef<HTMLUListElement>(null);
  const showSnackbar = useSnackbar();

  const handleSelect = async (description: string) => {
    setValue(description, false);
    setShowSuggestions(false);
    (document.getElementsByName('location')[0] as HTMLInputElement).value = description;
    const LatLngResults = await getGeocode({ address: description });
    const { lat, lng } = await getLatLng(LatLngResults[0]);
    const hasCoordinates = lat !== 55.378051 && lng !== -3.435973;
    setZoom && setZoom(hasCoordinates ? 10 : 6);
    mapRef?.current.panTo({ lat, lng });
  };

  const getMyLocation = () => {
    if (navigator.geolocation) {
      setCurrentLocationLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const {
            coords: { latitude, longitude },
          } = position;

          Geocode.fromLatLng(String(latitude), String(longitude)).then(
            (response) => {
              const address = response.results[0].formatted_address;
              handleSelect(address);
            },
            (error) => {
              console.error(error);
            },
          );
          setCurrentLocationLoading(false);
        },
        () => {
          setCurrentLocationLoading(false);
        },
      );
    } else {
      showSnackbar({ message: 'Geolocation is not supported by this browser.', type: 'warning' });
    }
  };

  const handleClose = () => {
    clearSuggestions();
    setShowSuggestions(false);
  };

  useOnClickOutside(placesRef, handleClose);

  return (
    <PlacesListWrapper ref={placesRef}>
      <UseCurrentLocation
        onClick={() => {
          getMyLocation();
          handleClose();
        }}
      >
        <TargetIcon /> Use my current location
      </UseCurrentLocation>
      {searchStatus === 'OK' ? (
        places.map((place) => {
          const {
            place_id,
            structured_formatting: { main_text, secondary_text },
          } = place;
          return (
            <PlaceRow key={place_id} onClick={() => handleSelect(place.description)}>
              <MainText>{main_text},</MainText> <SecondaryText>{secondary_text}</SecondaryText>
            </PlaceRow>
          );
        })
      ) : (
        <RecentSearches handleClose={handleClose} handleSelect={handleSelect} />
      )}
    </PlacesListWrapper>
  );
};
export default PlacesList;
