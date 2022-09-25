import React from 'react';
import Document, { DocumentContext } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import { isProduction } from '../utils';
import Head from 'next/head'; // eslint-disable-line
import Script from 'next/script'; // eslint-disable-line

class MyDocument extends Document {
  /**
   * Overwritten so that the CSS styles are included in the server-side generated HTML.
   * Taken from https://github.com/zeit/next.js/tree/canary/examples/with-styled-components .
   */
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(
              <>
                {/* eslint-disable-next-line @next/next/no-sync-scripts */}
                <script
                  src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&libraries=geometry,places`}
                />
                {isProduction && (
                  <>
                    <Script
                      async
                      src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`}
                    />
                    <Script
                      // eslint-disable-next-line react/no-danger
                      dangerouslySetInnerHTML={{
                        __html: `
                          window.dataLayer = window.dataLayer || [];
                          function gtag(){dataLayer.push(arguments);}
                          gtag('js', new Date());
                          gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID}', {
                            page_path: window.location.pathname,
                          });
                        `,
                      }}
                      id="set-gtag-data"
                    />
                  </>
                )}
                <Head>
                  <title>ZoomEV</title>
                </Head>
                <App {...props} />
              </>,
            ),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
}

export default MyDocument;
