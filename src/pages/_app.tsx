import React, { useEffect } from 'react';
import { RecoilRoot } from 'recoil';
import { AppProps } from 'next/app';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { ThemeProvider } from 'styled-components';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import TagManager from 'react-gtm-module';
import ApiProvider from '../api/ApiProvider';
import { GlobalStyle, theme } from '../layouts';
import { AuthProvider, SnackbarProvider } from '../providers';
import { configureAmplify, isProduction } from '../utils';
import { CookiesBar } from '../elements';
import * as gtag from '../utils/gtag';
import 'regenerator-runtime/runtime'; // Resolve https://github.com/contentful/contentful.js/issues/545
import 'react-image-lightbox/style.css';
import '../globals.css';
import mixpanel from 'mixpanel-browser';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});

mixpanel.init(process.env.NEXT_PUBLIC_MIX_PANEL_TOKEN!, { debug: false });

configureAmplify();

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      if (isProduction) {
        gtag.pageview(url);
        mixpanel.track('page.view', {
          url,
        });
      }
    };
    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    TagManager.initialize({ gtmId: process.env.NEXT_PUBLIC_GTM_ID as string });
  }, []);

  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <SnackbarProvider>
          <ApiProvider>
            <AuthProvider isProtected={pageProps.isProtected}>
              <Component {...pageProps} />
              <CookiesBar />
            </AuthProvider>
          </ApiProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </RecoilRoot>
  );
};
export default App;
