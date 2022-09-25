import contentfulClient from './client';
import { IBlogPostFields } from '../interfaces/contentful.types.generated';
import removeEntryCollectionCircularReferences from './utils/removeEntryCollectionCircularReferences';

const getBlogPostByUrlSlug = async (urlSlug: string) => {
  // Query options requires object in string notation
  const pages = await contentfulClient.getEntries<IBlogPostFields>({
    content_type: 'blogPost',
    'fields.slug': urlSlug,
    include: 1,
  });

  const page = removeEntryCollectionCircularReferences(pages, true).items[0];
  if (!page) {
    throw new TypeError(`blogPost contentful entry is missing for urlSlug ${urlSlug}`);
  }

  return page;
};

export default getBlogPostByUrlSlug;
