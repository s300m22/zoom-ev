import { GetStaticPaths, GetStaticProps } from 'next';
import { IBlogPostFields } from '../../interfaces/contentful.types.generated';
import contentfulClient from '../../contentful/client';
import { getBlogPostByUrlSlug, getGlobalSettings } from '../../contentful';
import { BlogPostProps } from '../../containers/Blog/BlogPost/BlogPost';
import { BlogPost } from '../../containers/Blog';

export const getStaticPaths: GetStaticPaths = async () => {
  const blogPosts = await contentfulClient.getEntries<IBlogPostFields>({
    content_type: 'blogPost',
    limit: 1000,
    resolveLinks: false,
  });

  return {
    paths: blogPosts.items.map(({ fields }) => ({
      params: {
        slug: fields.slug,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let urlSlug;

  if (params) {
    const { slug } = params;
    if (Array.isArray(slug)) {
      [urlSlug] = slug;
    } else {
      urlSlug = slug;
    }
  }

  if (!urlSlug) {
    throw new TypeError('Undefined urlSlug');
  }

  const [blogPost, globalSettings] = await Promise.all([
    getBlogPostByUrlSlug(urlSlug),
    getGlobalSettings(),
  ]);
  const props: BlogPostProps = { blogPost, globalSettings };

  return { props };
};

export default BlogPost;
