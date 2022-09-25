import { atom } from 'recoil';
import {
  AddCarAvailabilityPeriodInputType,
  CarDetailsUpdateInputType,
  CarFeatureType,
  CarSalesInfoInputType,
  ImageType,
} from '../../interfaces/api.types.generated.d';

interface CarSetupAtomProps {
  id?: string;
  features?: Array<CarFeatureType>;
  details: CarDetailsUpdateInputType;
  images?: Array<ImageType>;
  mainImageId?: string | null;
  pricePerHour?: number | null;
  pricePerDay?: number | null;
  pricePerWeek?: number | null;
  availabilityPeriods?: Array<AddCarAvailabilityPeriodInputType> | null;
  realLocation?: {
    addressPrivate?: string | null;
    addressPublic?: string | null;
    lon?: number;
    lat?: number;
    carId?: string;
  };
  tips?: string;
  guide?: string;
  isAvailableToBuy?: boolean;
  salesInfo?: CarSalesInfoInputType | null;
}

const vehicleSetupAtom = atom<CarSetupAtomProps | undefined>({
  key: 'vehicleSetupAtom',
  default: undefined,
});

export default vehicleSetupAtom;
