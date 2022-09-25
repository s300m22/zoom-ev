/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useRef } from 'react';
import GoogleMapReact from 'google-map-react';
import {
  SettingsCardWrapper,
  SettingsContent,
  SettingsCardHeader,
  Heading,
  SubText,
  BoldText,
} from '../../../../../elements';
import { useCarRealLocationLazyQuery } from '../../../../../hooks/api/carRealLocation/carRealLocation.generated';
import { MarkIcon, QuestionIcon } from '../../../../../icons';
import { CarRentalRequestStatusEnum, Maybe } from '../../../../../interfaces/api.types.generated.d';
import { logError } from '../../../../../utils';
import {
  MyTripHowToGetThereMapWrapper,
  MapMarkWrapper,
  LocationTipsWrapper,
  Copy,
  PickUpAddressWrapper,
} from './MyTripHowToGetThere.styled';
import { useCarLocationTipsLazyQuery } from '../../../../../hooks/api/carLocationTips/carLocationTips.generated';
import { useCopyToClipboard } from '../../../../../hooks';
import { AddressTextNotice } from '../../../../Car/components/LocationCard/LocationCard.styled';

type Location = {
  lat: number;
  lon: number;
};

type Props = {
  status: CarRentalRequestStatusEnum;
  id: string;
  privateLocation?: Maybe<string>;
  publicLocation?: Maybe<string>;
  fakeLocation?: Maybe<Location>;
  isBusinessCar: boolean;
  businessName?: Maybe<string>;
};

const MapMark = () => (
  <MapMarkWrapper>
    <MarkIcon />
  </MapMarkWrapper>
);

const MyTripHowToGetThere = ({
  status,
  id,
  privateLocation,
  publicLocation,
  fakeLocation,
  isBusinessCar,
  businessName,
}: Props) => {
  const copyToClipboard = useCopyToClipboard();
  const locationRef = useRef(null);

  const [getRealCarLocation, { data: realCarLocationData }] = useCarRealLocationLazyQuery();
  const [getCarLocationTips, { data: carLocationTipsData }] = useCarLocationTipsLazyQuery();
  const shouldShowRealLocation = status === CarRentalRequestStatusEnum.Accepted || isBusinessCar;
  const carId = id;
  const realCarLocation = realCarLocationData?.carRealLocation;
  const carLocationTips = carLocationTipsData?.carLocationTips;
  const pickUpLocation = shouldShowRealLocation ? privateLocation : publicLocation;

  useEffect(() => {
    if (shouldShowRealLocation && carId) {
      try {
        getRealCarLocation({
          variables: {
            carId,
          },
        });
        getCarLocationTips({
          variables: {
            carId,
          },
        });
      } catch (error: any) {
        logError(error);
      }
    }
  }, [carId, getCarLocationTips, getRealCarLocation, shouldShowRealLocation]);

  const DEFAULT_LATLNG = {
    lat: realCarLocation?.lat || fakeLocation?.lat || 51.509865,
    lng: realCarLocation?.lon || fakeLocation?.lon || -0.118092,
  };

  return (
    <SettingsCardWrapper>
      <SettingsCardHeader>
        <Heading variant="h4">How to get there</Heading>
      </SettingsCardHeader>
      <SettingsContent>
        <MyTripHowToGetThereMapWrapper>
          <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || '' }}
            center={DEFAULT_LATLNG}
            defaultZoom={10}
            options={{
              zoomControl: false,
            }}
          >
            <MapMark
              /* @ts-ignore */
              lat={DEFAULT_LATLNG.lat}
              lng={DEFAULT_LATLNG.lng}
            />
          </GoogleMapReact>
        </MyTripHowToGetThereMapWrapper>
        <SubText style={{ fontSize: '14px', margin: '0 0 5px' }}>Pick-up addresss</SubText>
        <PickUpAddressWrapper>
          <BoldText ref={locationRef} style={{ margin: '0 0 5px' }}>
            {businessName ? `${businessName}, ` : ''}
            {pickUpLocation || '-'}
          </BoldText>
          <Copy onClick={() => copyToClipboard(locationRef)}>Copy</Copy>
        </PickUpAddressWrapper>

        {!isBusinessCar && !shouldShowRealLocation && (
          <AddressTextNotice>
            <QuestionIcon height={12} width={12} />
            <span>Full address will become available after booking.</span>
          </AddressTextNotice>
        )}
        <SubText style={{ fontSize: '14px', margin: '0 0 5px' }}>Directions from your host</SubText>
        <LocationTipsWrapper>{carLocationTips || '-'}</LocationTipsWrapper>
      </SettingsContent>
    </SettingsCardWrapper>
  );
};

export default MyTripHowToGetThere;
