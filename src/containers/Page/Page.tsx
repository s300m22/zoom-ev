import { NextPage } from 'next';
import React, { useMemo } from 'react';
import { Entry } from 'contentful';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { IGlobalSettingsFields, IPageFields } from '../../interfaces/contentful.types.generated';
import { DefaultLayout } from '../../layouts';
import ContentSection from '../ContentSection';
import Contact from '../Contact';

export interface PageProps {
  page: Entry<IPageFields>;
  globalSettings: Entry<IGlobalSettingsFields>;
}

const Page: NextPage<PageProps> = ({ page, globalSettings }) => {
  const { title, contentSections, type, hideHeaderFooter, secondaryLogo, stickyCta } = page.fields;
  const { contactFormTopics } = globalSettings.fields;
  const content = useMemo(() => {
    switch (type) {
      case 'Contact': {
        return (
          <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY}>
            <Contact title={title} topics={contactFormTopics} />
          </GoogleReCaptchaProvider>
        );
      }
      default: {
        return contentSections?.map((section) => (
          <ContentSection key={section.sys.id} section={section} />
        ));
      }
    }
  }, [contactFormTopics, contentSections, title, type]);

  return (
    <DefaultLayout
      globalSettings={globalSettings}
      hideHeaderFooter={hideHeaderFooter}
      isWide={false}
      mobileCta={stickyCta}
      pageTitle={title}
      secondaryLogo={secondaryLogo?.fields?.file?.url}
    >
      {content}
    </DefaultLayout>
  );
};

export default Page;
