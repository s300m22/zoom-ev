import { Asset } from 'contentful';
import { getAssetFileUrl, getAssetAltText } from '../../contentful/utils';
import { StyledImage, FramedImage } from './Image.styled';

export interface ImageProps {
  asset: Asset | string;
  imagePattern?: string;
  imageOverlay?: boolean;
  layout?: 'top' | 'bottom' | 'left' | 'right';
  imageTransform?: string;
  alt?: string;
  maxWidth?: string;
  mobileImage?: Asset | string;
}

const Image = ({
  asset,
  alt,
  imagePattern,
  imageOverlay,
  imageTransform,
  layout,
  maxWidth,
  mobileImage,
}: ImageProps) =>
  imagePattern && imagePattern !== 'None' ? (
    <FramedImage
      imageOverlay={imageOverlay}
      imagePattern={imagePattern}
      imageTransform={imageTransform}
      layout={layout}
    >
      <StyledImage
        alt={getAssetAltText(asset || alt)}
        hideMobile={!!mobileImage}
        src={getAssetFileUrl(asset, maxWidth)}
      />
      {mobileImage && (
        <StyledImage
          alt={getAssetAltText(mobileImage || alt)}
          hideDesktop
          src={getAssetFileUrl(mobileImage, maxWidth)}
        />
      )}
    </FramedImage>
  ) : (
    <>
      <StyledImage
        alt={getAssetAltText(asset || alt)}
        hideMobile={!!mobileImage}
        src={getAssetFileUrl(asset, maxWidth)}
      />
      {mobileImage && (
        <StyledImage
          alt={getAssetAltText(mobileImage || alt)}
          hideDesktop
          src={getAssetFileUrl(mobileImage, maxWidth)}
        />
      )}
    </>
  );

export default Image;
