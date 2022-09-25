/* eslint-disable no-nested-ternary */
import { NextPage } from 'next';
import Head from 'next/head';
import { Container, StyledLink } from '../../elements';
import { useGetPublicCarQuery } from '../../hooks/api/getPublicCarInformation/getPublicCarInformation.generated';
import { ArrowLeftIcon } from '../../icons';
import { IGlobalSettings } from '../../interfaces/contentful.types.generated';
import { DefaultLayout } from '../../layouts';
import {
  CarAvailableForSaleWrapper,
  CarInfoWrapper,
  CarWrapper,
  GoBackWrapper,
} from './Car.styled';
import {
  CarLoadingSkeleton,
  LocationCard,
  BookCard,
  CarSummaryCard,
  HostedByCard,
  CarNotFound,
  OptionToBuyDetails,
} from './components';
import { TradingHoursCard } from './components/TradingHoursCard';
import UserStatusNotice from './components/UserStatusNotice';

interface DashboardProps {
  globalSettings: IGlobalSettings;
  title: string;
  carId: string;
}

const Car: NextPage<DashboardProps> = ({ globalSettings, title, carId }) => {
  const { data: carData, loading: carLoading } = useGetPublicCarQuery({
    variables: {
      id: carId,
    },
  });

  const car = carData?.car;

  return (
    <DefaultLayout
      backgroundColor="rgb(241, 242, 243)"
      globalSettings={globalSettings}
      isWide={false}
      pageTitle={title}
    >
      <Container>
        <GoBackWrapper>
          <StyledLink goBack>
            <ArrowLeftIcon /> Back to results
          </StyledLink>
        </GoBackWrapper>

        {carLoading ? (
          <CarLoadingSkeleton />
        ) : car ? (
          <>
            <CarWrapper>
              <Head>
                <title>
                  ZoomEV - Car {car?.details?.maker?.name} - {car?.details?.model?.name}
                </title>
              </Head>
              <UserStatusNotice car={car} />
              <CarInfoWrapper>
                <CarSummaryCard car={car} />
                <HostedByCard car={car} />
              </CarInfoWrapper>
              <CarInfoWrapper>
                <LocationCard car={car} />
                <TradingHoursCard car={car} />
                <BookCard car={car} />
              </CarInfoWrapper>
              {car.isAvailableToBuy && (
                <CarAvailableForSaleWrapper>
                  <OptionToBuyDetails car={car} />
                </CarAvailableForSaleWrapper>
              )}
            </CarWrapper>
          </>
        ) : (
          <CarNotFound />
        )}
      </Container>
    </DefaultLayout>
  );
};

export default Car;
