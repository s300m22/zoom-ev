import { Asset } from 'contentful';

const getAssetAltText = (assetAlt?: Asset | string): string => {
  if (!assetAlt) return '';
  return typeof assetAlt === 'object' ? assetAlt.fields.title : assetAlt;
};

export default getAssetAltText;
