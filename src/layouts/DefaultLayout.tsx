import React, { ReactNode } from 'react';
import { Entry } from 'contentful';
import TopBar from '../containers/TopBar/TopBar';
import PageHead from './PageHead';
import { IGlobalSettingsFields, IStickyCta } from '../interfaces/contentful.types.generated';
import Footer from '../containers/Footer';
import { useMediaDevice } from '../hooks';
import PageStickyCTA from '../containers/Page/PageStickyCTA';
import ScrollToTop from '../elements/ScrollToTop';
import { isDesktop } from 'react-device-detect';

interface DefaultLayoutProps {
  pageTitle: string;
  globalSettings: Entry<IGlobalSettingsFields>;
  children: ReactNode;
  isWide?: boolean;
  backgroundColor?: string;
  hideHeaderFooter?: boolean;
  secondaryLogo?: string;
  mobileCta?: IStickyCta | undefined;
}

const DefaultLayout = ({
  pageTitle,
  globalSettings,
  children,
  isWide = true,
  backgroundColor = 'transparent',
  hideHeaderFooter = false,
  secondaryLogo = undefined,
  mobileCta = undefined,
}: DefaultLayoutProps) => {
  const {
    footerBottomLinks,
    footerSections,
    footerTopCta,
    navigation,
    socialLinks,
    topBarLogo,
    topBarCta,
  } = globalSettings.fields;

  const { isMobile, isTablet } = useMediaDevice();

  return (
    <>
      <PageHead pageTitle={pageTitle} />
      {(isMobile || isTablet) && !!mobileCta && <PageStickyCTA {...mobileCta.fields} />}
      {hideHeaderFooter ? (
        <TopBar
          hideProfile
          isWide={isWide}
          logo={topBarLogo}
          logoLink={false}
          secondaryLogo={secondaryLogo}
        />
      ) : (
        <TopBar cta={topBarCta} isWide={isWide} logo={topBarLogo} navigation={navigation} />
      )}

      <main style={{ backgroundColor }}>{children}</main>

      {!hideHeaderFooter && (
        <Footer
          cta={footerTopCta}
          isWide={isWide}
          links={footerBottomLinks}
          sections={footerSections}
          socialLinks={socialLinks}
        />
      )}

      {(isMobile || isTablet) && !mobileCta && <ScrollToTop />}
      {isDesktop && <ScrollToTop />}
    </>
  );
};

export default DefaultLayout;
