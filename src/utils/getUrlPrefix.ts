import { INavigationLinkFields } from '../interfaces/contentful.types.generated';

/* eslint-disable @typescript-eslint/no-explicit-any */
const getUrlPrefix = (url: INavigationLinkFields['linkedEntry']) => {
  switch (url?.sys?.contentType?.sys?.id) {
    case 'faq':
      return 'faqs/';
    case 'blogPost':
      return 'blog/';
    default:
      return '';
  }
};

export default getUrlPrefix;
