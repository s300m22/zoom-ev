/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useMemo,
  useState,
  useRef,
  useEffect,
  Dispatch,
  SetStateAction,
  MutableRefObject,
  useCallback,
  memo,
} from 'react';
import useSupercluster from 'use-supercluster';
import GoogleMapReact from 'google-map-react';
import RelativePortal from 'react-relative-portal';
import { CarsInRadiusQuery } from '../../../../hooks/api/carsInRadius/carsInRadius.generated';
import { MapMarkWrapper, MapWrapper, MapMarkTooltip, ClusterMarker } from './MapWithResults.styled';
import { MarkIcon } from '../../../../icons';
import { formatPrice } from '../../../../utils';
import CarCard from '../CarsListing/components/CarCard';
import { useMediaDevice, useNextQueryParam, useOnClickOutside } from '../../../../hooks';

interface MapWithResultsProps {
  cars?: CarsInRadiusQuery['carsInRadius']['cars'];
  loading: boolean;
  zoom: number;
  setZoom: Dispatch<SetStateAction<number>>;
  setVisibleCars: Dispatch<SetStateAction<CarsInRadiusQuery['carsInRadius']['cars'] | undefined>>;
  mapRef: MutableRefObject<any>;
}

interface MapMarkProps {
  car: CarsInRadiusQuery['carsInRadius']['cars'][0];
  isCluster: boolean;
  pointCount: number;
  pointsCount: number;
  onClusterClick: () => void;
  mapRef: MutableRefObject<any>;
  lat: string;
  lng: string;
  isFullScreenEnabled: boolean;
}

interface HandleMapChangeProps {
  zoom: number;
  bounds: GoogleMapReact.Bounds;
}

const BOUNDS = [-14.86988765625, 47.85945269986817, 8.11351078125, 60.13208505458519];

const MapMark = ({
  car,
  isCluster,
  pointsCount,
  pointCount,
  onClusterClick,
  mapRef,
  lat,
  lng,
  isFullScreenEnabled,
}: MapMarkProps) => {
  const { isMobile } = useMediaDevice();
  const [showTooltip, setShowTooltip] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const markRef = useRef<HTMLDivElement>(null);
  const closeCard = useCallback(() => setShowCard(false), []);

  useOnClickOutside(markRef, isFullScreenEnabled || isMobile ? closeCard : () => null);

  const handleMarkerClick = useCallback(() => {
    mapRef.current.panTo({ lat, lng });
    if (!isMobile) {
      setTimeout(() => {
        setShowCard(true);
      }, 300);
    } else {
      setShowCard(true);
    }
  }, [isMobile, lat, lng, mapRef]);

  if (isCluster) {
    return (
      <ClusterMarker
        onClick={() => {
          setShowCard(true);
          onClusterClick();
        }}
        style={{
          width: `${10 + (pointCount / pointsCount) * 40}px`,
          height: `${10 + (pointCount / pointsCount) * 40}px`,
        }}
      >
        {pointCount}
      </ClusterMarker>
    );
  }

  const CardWithCar = () => {
    if (isFullScreenEnabled || isMobile) {
      return showCard ? <CarCard car={car} isEmbedded /> : null;
    }
    return showCard ? (
      <RelativePortal
        className="car-map-card"
        component="div"
        left={0}
        onOutClick={closeCard}
        top={0}
      >
        <CarCard car={car} isEmbedded />
      </RelativePortal>
    ) : null;
  };

  return (
    <MapMarkWrapper
      onClick={handleMarkerClick}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      ref={markRef}
      style={{
        zIndex: showCard ? 2 : 1,
      }}
    >
      <MarkIcon />
      {showTooltip && !showCard && (
        <MapMarkTooltip>{formatPrice(car.pricePerDay / 100)}</MapMarkTooltip>
      )}
      <CardWithCar />
    </MapMarkWrapper>
  );
};

const MemoizedMapMark = memo(MapMark);

const MapWithResults = ({
  cars,
  loading,
  zoom,
  setZoom,
  setVisibleCars,
  mapRef,
}: MapWithResultsProps) => {
  const { isMobile } = useMediaDevice();
  const [pageOffset, setPageOffset] = useState(0);
  const [isFullScreenEnabled, setIsFullScreenEnabled] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [prefilledLat, prefilledLng] = useNextQueryParam(['lat', 'lng']);
  const mapWrapperRef = useRef<HTMLDivElement>(null);
  const mapChild = mapRef?.current?.getDiv().firstChild;

  const points = useMemo(
    () =>
      cars?.map((car) => ({
        type: 'Feature',
        properties: {
          cluster: false,
          car,
        },
        geometry: {
          type: 'Point',
          coordinates: [car?.location?.lon, car?.location?.lat],
        },
      })),
    [cars],
  );

  const CENTER_LATLNG = {
    lat: prefilledLat ? parseFloat(prefilledLat) : 54.093409,
    lng: prefilledLng ? parseFloat(prefilledLng) : -2.89479,
  };

  const { clusters, supercluster } = useSupercluster({
    points: points || [],
    bounds: BOUNDS,
    zoom,
    options: { radius: 85, maxZoom: 20 },
  });

  const handleScroll = () => {
    const position = window.pageYOffset;
    setPageOffset(position > 242 ? 242 : position);
  };

  const handleMapChange = ({ zoom: mapZoom, bounds: mapBounds }: HandleMapChangeProps) => {
    const { ne, nw, se, sw } = mapBounds;

    if (zoom !== mapZoom) {
      setZoom(mapZoom);
    }

    if (
      mapChild &&
      mapChild.clientHeight === window.innerHeight &&
      mapChild.clientWidth === window.innerWidth
    ) {
      setIsFullScreenEnabled(true);
    } else {
      setIsFullScreenEnabled(false);
    }

    const foundMarkers = cars?.filter((marker) => {
      const { lat, lon } = marker.location;
      if (
        lat > se.lat &&
        sw.lat &&
        lat < ne.lat &&
        nw.lat &&
        lon > nw.lng &&
        sw.lng &&
        lon < ne.lng &&
        se.lng
      ) {
        return marker;
      }
      return undefined;
    });

    setVisibleCars(foundMarkers);

    if (isMobile) {
      if (isChanged) {
        mapWrapperRef?.current?.scrollIntoView();
      } else {
        setIsChanged(true);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const renderMarkers = useCallback(() => {
    return clusters.map((cluster) => {
      const [markerLongitude, markerLatitude] = cluster.geometry.coordinates;
      const { cluster: isCluster, cluster_id, point_count: pointCount, car } = cluster.properties;

      const onClusterClick = () => {
        const expansionZoom = Math.min(supercluster.getClusterExpansionZoom(cluster.id), 20);
        mapRef.current.setZoom(expansionZoom);
        mapRef.current.panTo({ lat: markerLatitude, lng: markerLongitude });
      };

      return (
        <MemoizedMapMark
          car={car}
          isCluster={isCluster}
          isFullScreenEnabled={isFullScreenEnabled}
          key={cluster_id || car.id}
          lat={markerLatitude}
          lng={markerLongitude}
          mapRef={mapRef}
          onClusterClick={onClusterClick}
          pointCount={pointCount}
          pointsCount={points ? points.length : 0}
        />
      );
    });
  }, [clusters, isFullScreenEnabled, mapRef, points, supercluster]);

  return cars ? (
    <MapWrapper ref={mapWrapperRef}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || '' }}
        center={CENTER_LATLNG}
        onChange={handleMapChange}
        onGoogleApiLoaded={({ map }) => {
          // eslint-disable-next-line no-param-reassign
          mapRef.current = map;
        }}
        style={
          isMobile
            ? {
                height: '100vh',
                width: '100vw',
                margin: '0 -15px',
              }
            : {
                height: `calc(100vh - 242px + ${pageOffset}px)`,
                width: '100%',
              }
        }
        yesIWantToUseGoogleMapApiInternals
        zoom={zoom}
      >
        {!loading && renderMarkers()}
      </GoogleMapReact>
    </MapWrapper>
  ) : null;
};

export default MapWithResults;
