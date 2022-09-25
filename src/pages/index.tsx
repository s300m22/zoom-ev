import { GetStaticProps } from 'next';
import Page, { getStaticProps as PageGetStaticProps } from './[slug]';

export const getStaticProps: GetStaticProps = async (context) => {
  return PageGetStaticProps({
    ...context,
    params: {
      slug: 'homepage',
    },
  });
};

export default Page;
