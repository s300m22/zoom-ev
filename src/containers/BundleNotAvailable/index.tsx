import React from 'react';
import { Entry } from 'contentful';
import { DefaultLayout } from '../../layouts';
import { Button } from '../../elements';
import { IGlobalSettingsFields } from '../../interfaces/contentful.types.generated';
import { Content, Description, Title, Wrapper } from './BundleNotAvailable.styled';
import { MessagesIcon } from '../../icons';

export interface BundleNotAvailableProps {
  globalSettings: Entry<IGlobalSettingsFields>;
}

const BundleNotAvailable = ({ globalSettings }: BundleNotAvailableProps) => (
  <DefaultLayout globalSettings={globalSettings} isWide={false} pageTitle="404">
    <Wrapper>
      <Content>
        <MessagesIcon />
        <Title>Sorry, you already have an EV Benefits Bundle.</Title>
        <Description>
          Please wait for your current Bundle to expire before purchasing a new one or register and/
          login with a different email address to purchase an additional one.
        </Description>
        <Button href="/" withArrow>
          Go to home page
        </Button>
      </Content>
    </Wrapper>
  </DefaultLayout>
);

export default BundleNotAvailable;
