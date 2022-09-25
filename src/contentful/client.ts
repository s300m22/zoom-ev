import { createClient } from 'contentful';

const contentfulClient = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_DELIVERY_ACCESS_TOKEN || '',
  // Remove draft entries from API response
  // ( https://github.com/contentful/contentful.js/issues/350#issuecomment-606521416 )
  removeUnresolved: true,
});

export default contentfulClient;
