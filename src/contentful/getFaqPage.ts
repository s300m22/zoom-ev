import contentfulClient from './client';
import { IFaqPageFields } from '../interfaces/contentful.types.generated';
import removeEntryCollectionCircularReferences from './utils/removeEntryCollectionCircularReferences';

const getFaqPage = async () => {
  // Query options requires object in string notation
  const pages = await contentfulClient.getEntries<IFaqPageFields>({
    content_type: 'faqPage',
    'fields.urlSlug': 'faqs',
    include: 4,
    resolveLinks: true,
  });

  const page = removeEntryCollectionCircularReferences(pages).items[0];

  if (!page) {
    throw new TypeError('Faq page contentful entry is missing.');
  }
  return page;
};

export default getFaqPage;
