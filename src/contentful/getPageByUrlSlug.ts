import contentfulClient from './client';
import { IPageFields } from '../interfaces/contentful.types.generated';
import removeEntryCollectionCircularReferences from './utils/removeEntryCollectionCircularReferences';
import contentfulPreviewClient from './previewClient';

const getPageByUrlSlug = async (urlSlug: string, isPreview?: boolean) => {
  // Query options requires object in string notation
  const client = isPreview ? contentfulPreviewClient : contentfulClient;
  const pages = await client.getEntries<IPageFields>({
    content_type: 'page',
    'fields.urlSlug': urlSlug,
    include: 6,
  });

  const page = removeEntryCollectionCircularReferences(pages).items[0];
  if (!page) {
    throw new TypeError(`page contentful entry is missing for urlSlug ${urlSlug}`);
  }

  return page;
};

export default getPageByUrlSlug;
