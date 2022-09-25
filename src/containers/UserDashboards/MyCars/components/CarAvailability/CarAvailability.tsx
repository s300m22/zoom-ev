/* eslint-disable react-hooks/exhaustive-deps */
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useMemo, useEffect } from 'react';
import { useWatch, useForm } from 'react-hook-form';
import { AvailabilityCalendar, CreatableSelect } from '../../../../../elements';
import { useMyCarsQuery } from '../../../../../hooks/api/myCars/myCars.generated';
import { CarDetailsApproveStatusEnum } from '../../../../../interfaces/api.types.generated.d';
import { IGlobalSettings } from '../../../../../interfaces/contentful.types.generated';
import { DashboardsLayout } from '../../../../../layouts';

interface CarAvailabilityProps {
  globalSettings: IGlobalSettings;
  title: string;
  carId: string;
}
interface CarSelectorProps {
  carId: string;
}

const CarSelector = ({ carId }: CarSelectorProps) => {
  const router = useRouter();
  const { data: myCarsData } = useMyCarsQuery();
  const myCars = myCarsData?.myCars;
  const { control, formState, setValue } = useForm();

  const currentlySelectedCar = useWatch<any>({
    control,
    name: 'myCars',
  });

  const myActiveCars = useMemo(
    () =>
      myCars?.filter((car) => car.details.approveStatus === CarDetailsApproveStatusEnum.Approved),
    [myCars],
  );

  const myCarsOptions = useMemo(
    () =>
      myActiveCars?.map((car) => ({
        value: car.id,
        label: `${car.details?.model?.name ? car.details.model.name : ''} ${
          car.details.registration
        }`,
      })),
    [myActiveCars],
  );

  useEffect(() => {
    if (currentlySelectedCar && formState.dirtyFields.myCars) {
      router.push(`/dashboard/car/availability/${currentlySelectedCar.value}`);
    }
  }, [currentlySelectedCar]);

  useEffect(() => {
    if (myCarsOptions && !formState.dirtyFields.myCars) {
      setValue(
        'myCars',
        myCarsOptions?.find((option) => option.value === carId),
      );
    }
  }, [myCarsOptions]);

  return (
    <div style={{ width: '256px' }}>
      <CreatableSelect
        control={control}
        isCreatable={false}
        name="myCars"
        options={myCarsOptions}
      />
    </div>
  );
};

const CarAvailability: NextPage<CarAvailabilityProps> = ({ carId, globalSettings, title }) => {
  return (
    <DashboardsLayout
      globalSettings={globalSettings}
      pageActions={<CarSelector carId={carId} />}
      pageTitle={title}
      parentLink={{ url: '/dashboard/cars', label: 'My EVs ' }}
    >
      <AvailabilityCalendar
        carId={carId}
        isEdit
        title="Select dates when you want this EV to be available."
      />
    </DashboardsLayout>
  );
};

export default CarAvailability;
