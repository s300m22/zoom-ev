/* eslint-disable no-nested-ternary */
import { useState } from 'react';
import { NextPage } from 'next';
import Skeleton from 'react-loading-skeleton';
import { useGetCarQuery } from '../../../../../hooks/api/getCar/getCar.generated';
import { IGlobalSettings } from '../../../../../interfaces/contentful.types.generated';
import { DashboardsLayout } from '../../../../../layouts';
import CarPricing from './components/CarPricing';
import NoCars from '../NoCars';
import CarDetailsActiveFormEnum from './CarDetailsActiveFormEnum';
import { CarDelete, CarGuide, CarInformation, CarLocation, CarVisibility } from './components';
import CarPhotosDescription from './components/CarPhotosDescription';
import { Heading, StatusEnum, StatusLabel } from '../../../../../elements';
import {
  StatusesActionsWrapper,
  StatusesCardWrapper,
  StatusesParagraph,
  StatusesTextWrapper,
} from '../../../Dashboard/components/Statuses/StatusesShared';
import { CarDetailsApproveStatusEnum } from '../../../../../hooks/api/generateBundleCodes/generateBundleCodes.generated';

interface CarDetailsProps {
  globalSettings: IGlobalSettings;
  title: string;
  carId: string;
}

const CarDetails: NextPage<CarDetailsProps> = ({ globalSettings, title, carId }) => {
  const [activeForm, setActiveForm] = useState<CarDetailsActiveFormEnum>();
  const {
    data: carData,
    loading: carLoading,
    refetch: refetchCarDetails,
  } = useGetCarQuery({
    variables: {
      id: carId,
    },
  });

  const car = carData?.car;

  const sharedProps = () => ({
    activeForm,
    car,
    setActiveForm,
    refetchCarDetails,
  });

  return (
    <DashboardsLayout
      globalSettings={globalSettings}
      pageTitle={title}
      parentLink={{ url: '/dashboard/cars', label: 'My EVs ' }}
    >
      {carLoading ? (
        <Skeleton
          count={1}
          height={1000}
          style={{
            marginBottom: '10px',
            borderRadius: '12px',
            boxShadow: '0 10px 34px rgba(23, 75, 83, 0.1)',
          }}
        />
      ) : car ? (
        <>
          {car.detailsRequested?.approveStatus === CarDetailsApproveStatusEnum.Pending && (
            <StatusesCardWrapper style={{ marginBottom: '30px' }}>
              <StatusesTextWrapper>
                <Heading variant="h4">Thanks updating your EV details!</Heading>
                <StatusesParagraph>
                  We&apos;ll review your changes within 24hours, or normally even faster.
                </StatusesParagraph>
              </StatusesTextWrapper>
              <StatusesActionsWrapper>
                <StatusLabel status={StatusEnum.Pending}>Pending approval</StatusLabel>
              </StatusesActionsWrapper>
            </StatusesCardWrapper>
          )}
          <CarPricing {...sharedProps()} />
          <CarLocation {...sharedProps()} />
          <CarInformation {...sharedProps()} />
          <CarPhotosDescription {...sharedProps()} />
          <CarGuide {...sharedProps()} />
          <CarVisibility carId={car.id} carVisibility={car.visible} />
          <CarDelete carId={car.id} />
        </>
      ) : (
        <NoCars />
      )}
    </DashboardsLayout>
  );
};

export default CarDetails;
