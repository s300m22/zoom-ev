import {
  IFaqSectionFields,
  IFaqFields,
  IFaqPageFields,
} from '../interfaces/contentful.types.generated.d';
import contentfulClient from './client';
import removeEntryCollectionCircularReferences from './utils/removeEntryCollectionCircularReferences';

const getFaqArticle = async (slug: string) => {
  const faqArticleEntries = await contentfulClient.getEntries<IFaqFields>({
    content_type: 'faq',
    'fields.urlSlug[match]': slug,
    limit: 1,
  });
  const article = removeEntryCollectionCircularReferences(faqArticleEntries);

  if (!article) {
    throw new TypeError('FAQ Article contentful entry is missing');
  }

  const articleSectionEntries = await contentfulClient.getEntries<IFaqSectionFields>({
    links_to_entry: article.items[0].sys.id,
  });

  const articleSection = removeEntryCollectionCircularReferences(articleSectionEntries).items[0];

  const page = await contentfulClient.getEntries<IFaqPageFields>({
    content_type: 'faqPage',
    'fields.urlSlug': 'faqs',
    include: 4,
    limit: 1,
    resolveLinks: true,
  });

  const {
    fields: { banner },
  } = removeEntryCollectionCircularReferences(page).items[0];

  return { article, articleSection, banner };
};

export default getFaqArticle;
