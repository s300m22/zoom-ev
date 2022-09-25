import GoogleMapReact from 'google-map-react';
import { useMemo, useState } from 'react';
import { Heading, SimpleCard } from '../../../../elements';
import { GetPublicCarQuery } from '../../../../hooks/api/getPublicCarInformation/getPublicCarInformation.generated';
import { QuestionIcon } from '../../../../icons';
import {
  MapMarkRadius,
  LocationCardSubtitle,
  LocationCardMapWrapper,
  AddressTextNotice,
} from './LocationCard.styled';

interface LocationCardProps {
  car: GetPublicCarQuery['car'];
}

const DEFAULT_ZOOM = 10;

const LocationCard = ({ car }: LocationCardProps) => {
  const fakeLocation = car?.fakeLocation;
  const [mapZoom, setMapZoom] = useState(DEFAULT_ZOOM);

  const DEFAULT_LAT_LNG = {
    lat: fakeLocation?.lat || 51.509865,
    lng: fakeLocation?.lon || -0.118092,
  };

  const markerSize = useMemo(() => {
    const zoomRatio =
      mapZoom - DEFAULT_ZOOM <= 0 ? mapZoom / DEFAULT_ZOOM : mapZoom - DEFAULT_ZOOM || 1;
    return 60 * zoomRatio;
  }, [mapZoom]);

  return fakeLocation ? (
    <SimpleCard>
      <Heading variant="h4">Pick up and drop off location</Heading>
      <LocationCardSubtitle>{car?.addressPublic}</LocationCardSubtitle>
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
            zoomControl: false,
            maxZoom: 18,
          }}
        >
          {fakeLocation?.lat && fakeLocation?.lon ? (
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            /* @ts-ignore */
            <MapMarkRadius lat={fakeLocation.lat} lng={fakeLocation.lon} markerSize={markerSize} />
          ) : null}
        </GoogleMapReact>
      </LocationCardMapWrapper>
    </SimpleCard>
  ) : null;
};

export default LocationCard;
