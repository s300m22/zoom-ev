import { GetStaticProps } from 'next';
import { getBlogPage } from '../../contentful';
import { BlogPostsList } from '../../containers/Blog';
import { BlogPostsListProps } from '../../containers/Blog/BlogPostsList/BlogPostsList';
import getGlobalSettings from '../../contentful/getGlobalSettings';

export const getStaticProps: GetStaticProps = async () => {
  const [page, globalSettings] = await Promise.all([getBlogPage(), getGlobalSettings()]);

  const props: BlogPostsListProps = { ...page, globalSettings };

  return { props };
};

export default BlogPostsList;
