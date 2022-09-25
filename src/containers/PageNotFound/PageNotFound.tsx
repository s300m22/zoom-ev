import React from 'react';
import { DefaultLayout } from '../../layouts';
import { Button } from '../../elements';
import { IGlobalSettings } from '../../interfaces/contentful.types.generated';
import { BackgroundTitle, Content, Description, Title, Wrapper } from './PageNotFound.styled';

export interface PageNotFoundProps {
  globalSettings: IGlobalSettings;
}

const PageNotFound = ({ globalSettings }: PageNotFoundProps) => (
  <DefaultLayout globalSettings={globalSettings} isWide={false} pageTitle="404">
    <Wrapper>
      <BackgroundTitle>404</BackgroundTitle>
      <Content>
        <Title>Oops, we&apos;ve run out of road</Title>
        <Description>Don’t worry, you can get back on track by visiting our home page</Description>
        <Button href="/" withArrow>
          Go to home page
        </Button>
      </Content>
    </Wrapper>
  </DefaultLayout>
);

export default PageNotFound;
