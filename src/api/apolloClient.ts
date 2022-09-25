import { setContext } from '@apollo/client/link/context';
import { Auth } from '@aws-amplify/auth';
import {
  ApolloClient,
  concat,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';

let apolloClient: ApolloClient<NormalizedCacheObject>;

export const createApolloClient = () => {
  const apiURL = `${process.env.NEXT_PUBLIC_API_URL}/graphql`;

  const authMiddleware = setContext(async (operation, { headers }) => {
    let JwtToken;
    try {
      const session = await Auth.currentSession();
      JwtToken = session.getIdToken().getJwtToken();
    } catch (error) {
      //
    }

    if (!JwtToken) {
      return {
        uri: `${apiURL}?q=${operation.operationName}`,
        headers: {
          ...headers,
        },
      };
    }

    return {
      uri: `${apiURL}?q=${operation.operationName}`,
      headers: {
        ...headers,
        authorization: `Bearer ${JwtToken}`,
      },
    };
  });

  const httpLink = new HttpLink({ uri: apiURL });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: concat(authMiddleware, httpLink),
  });
};

export function initializeApollo() {
  const client = apolloClient ?? createApolloClient();

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return client;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = client;

  return client;
}
