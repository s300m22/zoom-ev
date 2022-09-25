/* eslint-disable no-nested-ternary */
import { NextPage } from 'next';
import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import Skeleton from 'react-loading-skeleton';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Button } from '../../../elements';
import { MyCarsQuery, useMyCarsQuery } from '../../../hooks/api/myCars/myCars.generated';
import { useSetOwnerProfileSetupFlowInitiatedMutation } from '../../../hooks/api/setOwnerProfileSetupFlowInitiated/setOwnerProfileSetupFlowInitiated.generated';
import { IGlobalSettings } from '../../../interfaces/contentful.types.generated';
import { DashboardsLayout } from '../../../layouts';
import { userDetailsAtom, vehicleSetupAtom } from '../../../recoil';
import { logError } from '../../../utils';
import { CarCard, NoCars } from './components';
import { useDeleteCarMutation } from '../../../hooks/api/deleteCar/deleteCar.generated';
import {
  CarDetailsApproveStatusEnum,
  UserDetailsApprovalStatusEnum,
} from '../../../interfaces/api.types.generated.d';
import { useIsBusiness } from '../../../hooks';

interface MyCarsProps {
  globalSettings: IGlobalSettings;
  title: string;
}

const sortCars = (a: MyCarsQuery['myCars'][0], b: MyCarsQuery['myCars'][0]) => {
  const aMaker = a.details.maker?.name || a.detailsRequested?.maker?.name || '';
  const aModel = a.details.model?.name || a.detailsRequested?.model?.name || '';
  const bMaker = b.details.maker?.name || b.detailsRequested?.maker?.name || '';
  const bModel = b.details.model?.name || b.detailsRequested?.model?.name || '';
  return aMaker === bMaker ? (aModel < bModel ? -1 : 1) : aMaker < bMaker ? -1 : 1;
};

const ListMyEv = () => {
  const router = useRouter();
  const userDetails = useRecoilValue(userDetailsAtom);
  const setUserDetails = useSetRecoilState(userDetailsAtom);
  const setVehicleDetails = useSetRecoilState(vehicleSetupAtom);
  const isBusiness = useIsBusiness();
  const setupEnabled =
    userDetails?.details.approvalStatus !== UserDetailsApprovalStatusEnum.Approved;
  const [setOwnerProfileSetupFlowInitiated] = useSetOwnerProfileSetupFlowInitiatedMutation();

  const handleOwnerSetupInit = async () => {
    setVehicleDetails(undefined);
    if (!userDetails?.isOwnerProfileSetupFlowInitiated) {
      try {
        await setOwnerProfileSetupFlowInitiated();
        userDetails &&
          setUserDetails({
            ...userDetails,
            isOwnerProfileSetupFlowInitiated: true,
          });
        router.push('/vehicle-setup');
      } catch (err) {
        logError(err);
      }
    }
    router.push('/vehicle-setup');
  };

  return (
    <Button disabled={!isBusiness && setupEnabled} onClick={handleOwnerSetupInit}>
      List your EV
    </Button>
  );
};

const MyCars: NextPage<MyCarsProps> = ({ globalSettings, title }) => {
  const [deleteCar] = useDeleteCarMutation();
  const isBusiness = useIsBusiness();
  const removalOn = false;
  const { data: myCarsData, loading: carsLoading } = useMyCarsQuery();
  const myCars = useMemo(() => {
    return myCarsData?.myCars?.slice().sort((a, b) => a.createdAt - b.createdAt) || [];
  }, [myCarsData]);

  const emptyCars = useMemo(() => {
    return myCars.filter(
      (car) =>
        car.details.approveStatus !== CarDetailsApproveStatusEnum.Approved &&
        car.detailsRequested === null,
    );
  }, [myCars]);

  const visibleCars = myCars.filter((car) => car.visible);
  const hiddenCars = myCars.filter((car) => !car.visible);
  const allCars = [...visibleCars.sort(sortCars), ...hiddenCars.sort(sortCars)];

  useEffect(() => {
    if (emptyCars && isBusiness && removalOn) {
      try {
        emptyCars.forEach((car) =>
          deleteCar({
            variables: {
              carId: car.id,
            },
          }),
        );
      } catch (error: any) {
        logError(error);
      }
    }
  }, [deleteCar, emptyCars, isBusiness, removalOn]);

  return (
    <DashboardsLayout globalSettings={globalSettings} pageActions={<ListMyEv />} pageTitle={title}>
      {allCars.length ? (
        allCars.map((car) => <CarCard car={car} key={car.id} />)
      ) : carsLoading ? (
        <Skeleton
          count={4}
          height={215}
          style={{
            marginBottom: '10px',
            borderRadius: '12px',
            boxShadow: '0 10px 34px rgba(23, 75, 83, 0.1)',
          }}
        />
      ) : (
        <NoCars />
      )}
    </DashboardsLayout>
  );
};

export default MyCars;
