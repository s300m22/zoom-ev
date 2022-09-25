import { EvCarIcon } from '../../icons';
import { CarPhotoWrapper, CarImage } from './CarPhoto.styled';

export interface CarPhotoProps {
  photoUrl?: string | null;
  width?: string;
  height?: string;
}

const CarPhoto = ({ photoUrl, width = '200px', height = '155px' }: CarPhotoProps) => (
  <CarPhotoWrapper height={height} width={width}>
    {photoUrl ? <CarImage alt="" src={photoUrl} /> : <EvCarIcon />}
  </CarPhotoWrapper>
);

export default CarPhoto;
