import { ReactNode } from 'react';
import Wrapper from './CarFeaturesList.styled';

export interface CarFeaturesListProps {
  children?: ReactNode;
}

const CarFeaturesList = ({ children }: CarFeaturesListProps) => <Wrapper>{children}</Wrapper>;

export default CarFeaturesList;
