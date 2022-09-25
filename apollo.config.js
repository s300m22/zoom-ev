import { schema } from './.graphqlrc';

// This module describe configuration for Apollo CLI or the Apollo VS Code extension.
export default {
  service: {
    name: 'zoomev-api',
    url: schema,
  },
};
