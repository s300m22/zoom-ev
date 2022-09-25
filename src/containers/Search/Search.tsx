/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */
import { useEffect, useMemo, useState, useRef } from 'react';
import { NextPage } from 'next';
import add from 'date-fns/add';
import { CarSearchBar, Container } from '../../elements';
import {
  CarsInRadiusQuery,
  useCarsInRadiusQuery,
} from '../../hooks/api/carsInRadius/carsInRadius.generated';
import { IGlobalSettings } from '../../interfaces/contentful.types.generated';
import { DefaultLayout } from '../../layouts';
import { CarsListing, MapWithResults } from './components';
import { SearchWrapper, SearchResultsWrapper, SearchBarWrapper } from './Search.styled';
import { useNextQueryParam, useSnackbar } from '../../hooks';
import { SortByEnum } from '../../elements/SearchFilters/FiltersEnum';
import mixpanel from 'mixpanel-browser';

interface DashboardProps {
  globalSettings: IGlobalSettings;
  title: string;
}

const Search: NextPage<DashboardProps> = ({ globalSettings, title }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef = useRef<any>();
  const start = useMemo(() => add(Date.now(), { days: 1 }).getTime(), []);
  const end = useMemo(() => add(Date.now(), { days: 3 }).getTime(), []);
  const [findingCars, setFindingCars] = useState(false);
  const [timeStart, timeEnd, prefilledLat, prefilledLng, sort, range, filters] = useNextQueryParam([
    'start',
    'end',
    'lat',
    'lng',
    'sort',
    'range',
    'filters',
    'term',
  ]);

  useEffect(() => {
    mixpanel.track('sharing.search', {
      time: { start: timeStart, end: timeEnd },
      location: {
        lat: prefilledLat,
        lng: prefilledLng,
      },
    });
  }, [timeStart, timeEnd, prefilledLat, prefilledLng]);

  const [visibleCars, setVisibleCars] = useState<
    CarsInRadiusQuery['carsInRadius']['cars'] | undefined
  >(undefined);

  // 55.378051, -3.435973 UK lat and lng
  const hasCoordinates =
    prefilledLat &&
    prefilledLng &&
    parseFloat(prefilledLat) !== 55.378051 &&
    parseFloat(prefilledLng) !== -3.435973;

  const [zoom, setZoom] = useState(hasCoordinates ? 10 : 5);

  const showSnackbar = useSnackbar();
  const radius = 821521;

  const selectedFilters = useMemo(
    () => (process.browser && filters ? JSON.parse(atob(filters.replace('%3D', ''))) : undefined),

    [sort, range, filters],
  );

  const { data: carsInRadiusData, loading } = useCarsInRadiusQuery({
    variables: {
      params: {
        lat: parseFloat(prefilledLat as string) || 54.093409,
        lon: parseFloat(prefilledLng as string) || -2.89479,
        radius,
        availabilityTimeStart: parseInt(timeStart as string, 10) || start,
        availabilityTimeEnd: parseInt(timeEnd as string, 10) || end,
        availabilityReturnUnavailable: false,
        ...(selectedFilters && {
          ...selectedFilters,
          ...(selectedFilters.seats && { seats: parseInt(selectedFilters.seats, 10) }),
          ...(selectedFilters.carMakerId &&
            selectedFilters.carMakerLabel && {
              carMakerId: selectedFilters.carMakerId,
              carMakerLabel: undefined, // overwrite label as we do not need this there. It's only stored to prefill select with custom label
            }),
        }),
      },
    },
  });

  useEffect(() => {
    if (!hasCoordinates) {
      setZoom(window.innerHeight > 900 ? 6 : 5);
    }
  }, []);

  useEffect(() => {
    if (visibleCars && visibleCars.length === 0 && findingCars) {
      if (zoom > 3) {
        setTimeout(() => {
          setZoom(zoom - 1);
        }, 150);
      } else {
        showSnackbar({ message: 'Could not find any cars', type: 'error' });
        setFindingCars(false);
      }
    } else {
      setFindingCars(false);
    }
  }, [visibleCars, findingCars]);

  const carsInRadius = useMemo(() => {
    if (!carsInRadiusData?.carsInRadius) return undefined;
    const { cars, overallCount } = carsInRadiusData?.carsInRadius; // eslint-disable-line

    const sortResults = (carsToSort?: CarsInRadiusQuery['carsInRadius']['cars']) => {
      const dataToSort = carsToSort?.length ? carsToSort : cars;
      if (sort === SortByEnum.lowToHigh) {
        return dataToSort.slice().sort((a, b) => a.pricePerDay - b.pricePerDay);
      }

      if (sort === SortByEnum.highToLow) {
        return dataToSort.slice().sort((a, b) => b.pricePerDay - a.pricePerDay);
      }
      return [];
    };

    const filterResults = () => {
      const rangeInt = range ? parseInt(range, 10) * 100 : 0;
      const c = visibleCars || cars;
      return c.filter((car) => car.pricePerDay <= rangeInt);
    };

    if (sort && range) {
      const filteredResults = filterResults();
      if (!filteredResults) return undefined;
      return {
        overallCount,
        cars: sortResults(filteredResults),
      };
    }

    if (sort) {
      return {
        overallCount,
        cars: sortResults(),
      };
    }

    if (range) {
      return {
        overallCount,
        cars: filterResults(),
      };
    }

    return carsInRadiusData.carsInRadius;
  }, [carsInRadiusData, sort, range]);

  useEffect(() => {
    document.body.classList.add('nooverflow');

    return () => {
      document.body.classList.remove('nooverflow');
    };
  }, []);

  return (
    <DefaultLayout globalSettings={globalSettings} isWide={false} pageTitle={title}>
      <Container>
        <SearchBarWrapper>
          <CarSearchBar isSearch loading={loading} mapRef={mapRef} setZoom={setZoom} />
        </SearchBarWrapper>
      </Container>
      <SearchWrapper>
        <SearchResultsWrapper>
          <CarsListing
            findingCars={findingCars}
            handleClick={() => setFindingCars(true)}
            loading={loading}
            searchResults={visibleCars || carsInRadius?.cars}
          />
          <MapWithResults
            cars={carsInRadius?.cars}
            loading={loading}
            mapRef={mapRef}
            setVisibleCars={setVisibleCars}
            setZoom={setZoom}
            zoom={zoom}
          />
        </SearchResultsWrapper>
      </SearchWrapper>
    </DefaultLayout>
  );
};

export default Search;
