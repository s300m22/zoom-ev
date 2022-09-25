import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { Button, Banner, Heading, CarSearchBar } from '../../../elements';
import { userDetailsAtom } from '../../../recoil';
import { IGoElectricSectionFields } from '../../../interfaces/contentful.types.generated';
import {
  CarsRecentlyRentedQuery,
  useCarsRecentlyRentedQuery,
} from '../../../hooks/api/carsRecentlyRented/carsRecentlyRented.generated';
import { useCarsRecentlyCreatedQuery } from '../../../hooks/api/carsRecentlyCreated/carsRecentlyCreated.generated';
import {
  BannerWrapper,
  ButtonWrapper,
  GoElectricSectionWrapper,
  GoElectricSectionOuterwrapper,
  SearchWrapper,
  Paragraph,
  CarSearchBarWrapper,
} from './GoElectricSection.styled';
import { CarSlider, CarbonSaved } from './components';
import { CarProps } from '../../../elements/CarCard/CarCard';

const mapCarsDetails = (carsList?: CarsRecentlyRentedQuery['carsRecentlyRented']) => {
  if (carsList && carsList.length) {
    return carsList.map((car) => {
      const {
        id,
        details,
        business,
        addressPublic,
        pricePerDay,
        reviewsAverageScore,
        isAvailableToBuy,
      } = car;
      return {
        id,
        modelName: `${details.maker?.name ? details.maker.name : ''} ${
          details.model?.name ? details.model.name : ''
        }`,
        partnerLogo: business?.logoImage?.url,
        carImage: details.images.find((i) => i.id === details.mainImageId)?.url,
        location: addressPublic,
        pricePerDay,
        reviewsAverageScore,
        isAvailableToBuy,
      };
    });
  }
  return undefined;
};

const GoElectricSection = ({
  title,
  description,
  banner,
  carbonSaved,
  backgroundNotLogged,
  backgroundLogged,
}: IGoElectricSectionFields) => {
  const userDetails = useRecoilValue(userDetailsAtom);
  const { data: carsRecentlyRentedData, loading: carsRecentlyRentedLoading } =
    useCarsRecentlyRentedQuery({
      variables: {
        byMe: false,
        limit: 6,
      },
    });

  const { data: carsRecentlyRentedByMeData, loading: carsRecentlyRentedByMeLoading } =
    useCarsRecentlyRentedQuery({
      variables: {
        byMe: true,
        limit: 6,
      },
    });

  const { data: carsRecentlyCreatedData, loading: carsRecentlyCreatedLoading } =
    useCarsRecentlyCreatedQuery({
      variables: {
        limit: 6,
      },
    });

  const carsRecentlyRented = carsRecentlyRentedData?.carsRecentlyRented;
  const carsRecentlyRentedByMe = carsRecentlyRentedByMeData?.carsRecentlyRented;
  const carsRecentlyCreated = carsRecentlyCreatedData?.carsRecentlyCreated;
  const recentlyRentedCars = useMemo(
    () =>
      userDetails && carsRecentlyRentedByMe && carsRecentlyRentedByMe.length > 3
        ? mapCarsDetails(carsRecentlyRentedByMe)
        : mapCarsDetails(carsRecentlyRented),
    [carsRecentlyRented, carsRecentlyRentedByMe, userDetails],
  );

  const recentlyCreatedCars = useMemo(
    () => mapCarsDetails(carsRecentlyCreated),
    [carsRecentlyCreated],
  );

  return (
    <GoElectricSectionOuterwrapper>
      <SearchWrapper
        background={
          userDetails ? backgroundLogged.fields.file.url : backgroundNotLogged.fields.file.url
        }
      >
        <Heading variant="h1">{title}</Heading>
        <Paragraph>{description}</Paragraph>
        <CarSearchBarWrapper>
          <CarSearchBar />
        </CarSearchBarWrapper>
        {carbonSaved && <CarbonSaved carbonSaved={carbonSaved} />}
      </SearchWrapper>
      <GoElectricSectionWrapper>
        <CarSlider
          cars={recentlyCreatedCars as Array<CarProps>}
          loading={carsRecentlyCreatedLoading}
          sectionTitle="Latest wheels on Zoom EV"
        />
        <CarSlider
          cars={recentlyRentedCars as Array<CarProps>}
          loading={carsRecentlyRentedLoading && carsRecentlyRentedByMeLoading}
          sectionTitle="EVs most recently shared"
        />
        <ButtonWrapper>
          <Button href="/search" withArrow>
            Show all EVs
          </Button>
        </ButtonWrapper>
        {banner && (
          <BannerWrapper>
            <Banner {...banner.fields} />
          </BannerWrapper>
        )}
      </GoElectricSectionWrapper>
    </GoElectricSectionOuterwrapper>
  );
};
export default GoElectricSection;
