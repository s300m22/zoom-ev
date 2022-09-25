import contentfulClient from './client';
import { IBlogPostFields, IFaqPageFields } from '../interfaces/contentful.types.generated';
import removeEntryCollectionCircularReferences from './utils/removeEntryCollectionCircularReferences';

const getBlogPage = async () => {
  // Query options requires object in string notation
  const pages = await contentfulClient.getEntries<IFaqPageFields>({
    content_type: 'page',
    'fields.urlSlug': 'blog',
    include: 4,
    resolveLinks: true,
  });
  const page = removeEntryCollectionCircularReferences(pages).items[0];

  if (!page) {
    throw new TypeError('Faq page contentful entry is missing.');
  }

  const blogPostsEntries = await contentfulClient.getEntries<IBlogPostFields>({
    content_type: 'blogPost',
    resolveLinks: true,
    order: '-sys.createdAt',
    include: 1,
  });

  const blogPosts = removeEntryCollectionCircularReferences(blogPostsEntries).items;
  if (!blogPosts) {
    throw new TypeError('blogPosts contentful entry is missing');
  }

  return {
    title: page.fields.title,
    blogPosts,
    blogCategories: [],
  };
};

export default getBlogPage;
