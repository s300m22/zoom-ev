import contentfulClient from './client';
import contentfulPreviewClient from './previewClient';
import { IGlobalSettings, IGlobalSettingsFields } from '../interfaces/contentful.types.generated';
import removeEntryCollectionCircularReferences from './utils/removeEntryCollectionCircularReferences';

const getGlobalSettings = async (isPreview?: boolean) => {
  const client = isPreview ? contentfulPreviewClient : contentfulClient;
  const settingsEntriesPromise = client.getEntries<IGlobalSettingsFields>({
    content_type: 'globalSettings',
    include: 3,
  });
  const settingsEntries = await settingsEntriesPromise;
  const settings = removeEntryCollectionCircularReferences(settingsEntries).items[0];
  if (!settings) {
    throw new TypeError('globalSettings contentful entry is missing');
  }

  return settings as IGlobalSettings;
};

export default getGlobalSettings;
