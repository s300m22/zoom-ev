import React, { ReactNode } from 'react';
import { ApolloProvider } from '@apollo/client';
import { createApolloClient } from './apolloClient';

interface ApiProviderProps {
  children: ReactNode;
}

const ApiProvider = ({ children }: ApiProviderProps) => {
  return <ApolloProvider client={createApolloClient()}>{children}</ApolloProvider>;
};

export default ApiProvider;
