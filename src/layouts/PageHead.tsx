import Head from 'next/head';

interface PageHeadProps {
  pageTitle: string;
}

const PageHead = ({ pageTitle }: PageHeadProps) => (
  <Head>
    <title>ZoomEV - {pageTitle}</title>
    <link href="/favicon.png" rel="icon" />
    <link href="https://fonts.gstatic.com" rel="preconnect" />
    <link
      href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700&display=swap"
      rel="stylesheet"
    />
  </Head>
);

export default PageHead;
