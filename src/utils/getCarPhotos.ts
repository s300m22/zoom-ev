import { ImageType } from '../interfaces/api.types.generated';

const getCarPhotos = (images?: Array<ImageType> | null, mainImageId?: string | null) => {
  if (images && images.length) {
    const mainImage = images.find((image) => image.id === mainImageId);
    const secondaryImages = images.filter((image) => image.id !== mainImageId);

    return {
      mainImage,
      secondaryImages,
    };
  }
  return {
    mainImage: null,
    secondaryImages: null,
  };
};

export default getCarPhotos;
