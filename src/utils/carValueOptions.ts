import { CarValueEnum } from '../interfaces/api.types.generated.d';
import formatPrice from './formatPrice';

const convertValuesToLabel = (value: CarValueEnum) => {
  switch (value) {
    case CarValueEnum.Between10And20:
      return `${formatPrice(10000)} - ${formatPrice(19999)}`;
    case CarValueEnum.Between20And30:
      return `${formatPrice(20000)} - ${formatPrice(29999)}`;
    case CarValueEnum.Between30And40:
      return `${formatPrice(30000)} - ${formatPrice(39999)}`;
    case CarValueEnum.Between40And60:
      return `${formatPrice(40000)} - ${formatPrice(59999)}`;
    case CarValueEnum.Between60And75:
      return `${formatPrice(60000)} - ${formatPrice(75000)}`;
    case CarValueEnum.MoreThan75:
      return `${formatPrice(75000)}+`;
    default:
      return '';
  }
};

// Works only with getDefaultValue function
export const convertEnumValueToRange = (value: CarValueEnum | null | undefined) => {
  if (!value) return undefined;
  switch (value) {
    case CarValueEnum.Between10And20:
      return 15000;
    case CarValueEnum.Between20And30:
      return 25000;
    case CarValueEnum.Between30And40:
      return 35000;
    case CarValueEnum.Between40And60:
      return 50000;
    case CarValueEnum.Between60And75:
      return 67500;
    case CarValueEnum.MoreThan75:
      return 75001;
    default:
      return undefined;
  }
};

export const carValueOptions = Object.values(CarValueEnum)
  .map((value) => ({
    label: convertValuesToLabel(value),
    value,
  }))
  .slice(0, -1);

export const getDefaultValue = (value: number | undefined) => {
  if (!value) return undefined;
  switch (true) {
    case value >= 10000 && value <= 19999:
      return {
        label: `${formatPrice(10000)} - ${formatPrice(19999)}`,
        value: CarValueEnum.Between10And20,
      };
    case value >= 20000 && value <= 29999:
      return {
        label: `${formatPrice(20000)} - ${formatPrice(29999)}`,
        value: CarValueEnum.Between20And30,
      };
    case value >= 30000 && value <= 39999:
      return {
        label: `${formatPrice(30000)} - ${formatPrice(39999)}`,
        value: CarValueEnum.Between30And40,
      };
    case value >= 40000 && value <= 59999:
      return {
        label: `${formatPrice(40000)} - ${formatPrice(59999)}`,
        value: CarValueEnum.Between40And60,
      };
    case value >= 60000 && value <= 75000:
      return {
        label: `${formatPrice(60000)} - ${formatPrice(75000)}`,
        value: CarValueEnum.Between60And75,
      };
    case value > 75000:
      return {
        label: `${formatPrice(75000)}+`,
        value: CarValueEnum.MoreThan75,
      };
    default:
      return undefined;
  }
};
