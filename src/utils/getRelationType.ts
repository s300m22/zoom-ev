import { GetPublicCarQuery } from '../hooks/api/getPublicCarInformation/getPublicCarInformation.generated';

export enum RelationTypesEnum {
  P2P = 'Peer to Peer',
  P2B = 'Peer to Business',
  B2B = 'Business to Business',
}

export const getRelationType = (
  car: GetPublicCarQuery['car'],
  isBusiness: boolean,
): RelationTypesEnum | null => {
  const isBusinessCar = Boolean(car?.business?.id);
  switch (true) {
    case isBusiness && isBusinessCar:
      return RelationTypesEnum.B2B;
    case (isBusiness && !isBusinessCar) || (!isBusiness && isBusinessCar):
      return RelationTypesEnum.P2B;
    case !isBusiness && !isBusiness:
      return RelationTypesEnum.P2P;
    default:
      return null;
  }
};
