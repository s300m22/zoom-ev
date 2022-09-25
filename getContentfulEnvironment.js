// This file is used by [contentful-typescript-codegen](https://github.com/intercom/contentful-typescript-codegen)

const contentfulManagement = require('contentful-management');
require('dotenv').config();

module.exports = function getContentfulEnvironment() {
  const contentfulClient = contentfulManagement.createClient({
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_MANAGEMENT_ACCESS_TOKEN,
  });

  return contentfulClient
    .getSpace(process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID)
    .then((space) => space.getEnvironment(process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT));
};
