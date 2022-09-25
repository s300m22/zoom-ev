/* eslint-disable prefer-template */
import { Asset } from 'contentful';

const getAssetFileUrl = (assetUrl: Asset | string, maxWidth?: string): string =>
  typeof assetUrl === 'object'
    ? `https:${assetUrl.fields.file.url}${maxWidth ? '?w=' + maxWidth : ''}`
    : assetUrl;

export default getAssetFileUrl;
