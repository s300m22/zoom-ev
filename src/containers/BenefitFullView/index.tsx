import React, { useEffect, useState } from 'react';
import { Container, GreenLine } from './BenefitFullView.styled';
import { Banner, Button, Image, List } from '../../elements';
import {
  IBenefit,
  IBenefitChargerComparisonTable,
  IBenefitContent3ColumnImagesWithText,
  IBenefitGroup,
  IFaqSection,
  INavigationLink,
} from '../../interfaces/contentful.types.generated';
import ThreeColumnFeatureImages from './Content/ThreeColumnFeatureImages';
import BenefitVideo from './Content/Video';
import BenefitWorksWellWith from './Content/WorksWellWith';
import BenefitFAQs from './Content/FAQs';
import BenefitCta from './Content/CTA';
import BenefitContactAndHelp from './Content/ContactAndHelp';
import BenefitTestimonials from './Content/Testimonials';
import ImageGridAndFeatures from './Content/ImageGridAndFeatures';
import { BundleSubscriptionType } from '../../interfaces/api.types.generated';
import { CopyToClipboard, MailIcon } from '../../icons';
import { AppStoreButton, BackButton, GooglePlayButton } from './Buttons';
import TelIcon from '../../icons/TelIcon';
import { Asset } from 'contentful';
import ChargerComparisonTable from '../ChargerComparisonTable';
import { usePlugSurfingBenefitRequestLazyQuery } from '../../hooks/api/plugSurfingBenefitRequest/plugSurfingBenefitRequest.generated';
import { usePlugsurfingMutation } from '../../hooks/api/createPlugSurfingBenefitRequest/createPlugSurfingBenefitRequest.generated';
import { useMediaDevice } from '../../hooks';
import PageStickyCTA from '../Page/PageStickyCTA';

interface BenefitFullViewProps {
  onClose: () => void;
  benefit: IBenefit;
  group: IBenefitGroup;
  onOpenWorksWithBenefit: (benefit: IBenefit) => void;
  postPurchase: boolean;
  bundleSubscription?: BundleSubscriptionType;

  groupSectionData: {
    type: 'ZoomEv Bundle' | 'Partner Bundle';
    partnerLogo?: Asset | undefined;
    stickyCtaLink?: INavigationLink | undefined;
    partnerTitle?: string;
    partnerPriceText?: string;
  };
}

const BenefitFullView: React.FC<BenefitFullViewProps> = ({
  onClose,
  benefit,
  group,
  onOpenWorksWithBenefit,
  postPurchase,
  bundleSubscription,
  groupSectionData,
}) => {
  const [copied, setCopied] = useState(false);

  const { isMobile, isTablet } = useMediaDevice();

  // plugSurfingBenefitRequest
  const [getPlugsurfinBenefitRes, { data: plugsurfingRequestData }] =
    usePlugSurfingBenefitRequestLazyQuery();
  const [requestPlugSurfingKeyFn, { error: plRequestError, loading: plLoading }] =
    usePlugsurfingMutation({
      refetchQueries: ['plugSurfingBenefitRequest'],
    });

  useEffect(() => {
    if (benefit.fields.isPlugsurfingBenefit) {
      getPlugsurfinBenefitRes();
    }
  }, [benefit.fields.isPlugsurfingBenefit, getPlugsurfinBenefitRes]);

  const requestPlugSurfingKey = async () => {
    try {
      await requestPlugSurfingKeyFn();
      // eslint-disable-next-line no-empty
    } catch (error) {}
  };

  const BenefitContentDisplayComponent: React.FC<{
    component: IBenefitContent3ColumnImagesWithText;
  }> = ({ component }) => {
    switch (component.fields.type) {
      case '3 Column Images':
        return <ThreeColumnFeatureImages {...component} />;
      case 'Video':
        return <BenefitVideo {...component} />;
      case 'Works well with':
        return (
          <BenefitWorksWellWith {...component} onOpenWorksWithBenefit={onOpenWorksWithBenefit} />
        );
      case 'CTA':
        return <BenefitCta {...component} />;
      case 'Contact And Help':
        return <BenefitContactAndHelp {...component} />;
      case 'Testimonials':
        return <BenefitTestimonials {...component} />;
      case 'Image Grid and Features Section':
        return <ImageGridAndFeatures {...component} />;
      default:
        return <div>Unsupported Content Type</div>;
    }
  };

  const AccessBenefitStickyContent = () => {
    if (benefit.fields.isPlugsurfingBenefit || !benefit.fields.accessBenefitButton) {
      return null;
    }

    switch (benefit.fields.accessBenefitType) {
      case 'Link + Title':
      case 'Link + Title + Contact Details':
        return (
          <PageStickyCTA
            backgroundColour="white"
            before={
              <div className="sticky-cta-mobile" style={{ width: '50vw' }}>
                {benefit.fields.accessBenefitTitle}
                <h3>{groupSectionData.partnerPriceText ?? 'FREE'}</h3>
              </div>
            }
            button={benefit.fields.accessBenefitButton}
            title="AccessBenefits"
          />
        );

      default:
        return <div></div>;
    }
  };
  const AccessBenefitContent = () => {
    if (benefit.fields.isPlugsurfingBenefit) {
      return (
        <>
          {plugsurfingRequestData?.plugSurfingBenefitRequest?.details ? (
            <>
              <div className="buttonRequested">
                <div className="little-dot"></div>
                Request Received
              </div>
              {!plRequestError?.message &&
                plugsurfingRequestData?.plugSurfingBenefitRequest?.details && (
                  <p className="pl-status">
                    We’ve ordered your key. It should arrive by post within{' '}
                    <strong>14 working days</strong>
                  </p>
                )}
            </>
          ) : (
            <>
              <h3>Request FREE charging key</h3>
              <Button
                disabled={!!plugsurfingRequestData?.plugSurfingBenefitRequest}
                isLoading={plLoading}
                onClick={() => requestPlugSurfingKey()}
                title="Request my key"
              >
                Request key
              </Button>

              {plRequestError?.message && (
                <p className="pl-error">
                  {plRequestError.message === 'NoAddressAvailable' ? (
                    <span>
                      Please email your postal address to{' '}
                      <a href="mailto:membersupport@zoom-ev.com">membersupport@zoom-ev.com</a> so
                      they can order your key
                    </span>
                  ) : (
                    plRequestError.message
                  )}
                </p>
              )}
            </>
          )}
        </>
      );
    }
    switch (benefit.fields.accessBenefitType) {
      case 'Appstore Links':
        return (
          <>
            <h3>{benefit.fields.accessBenefitTitle}</h3>
            <div className="store-links">
              {benefit.fields.appStoreLink && (
                <a href={benefit.fields.appStoreLink}>
                  <AppStoreButton />
                </a>
              )}
              {benefit.fields.playStoreLink && (
                <a href={benefit.fields.playStoreLink}>
                  <GooglePlayButton />
                </a>
              )}
            </div>
          </>
        );
      case 'Link + Title':
        return (
          <>
            <h3>{benefit.fields.accessBenefitTitle}</h3>
            {benefit.fields.accessBenefitButton && (
              <Button link={benefit.fields.accessBenefitButton} />
            )}
          </>
        );
      case 'Link + Title + Contact Details':
        return (
          <>
            <h3>{benefit.fields.accessBenefitTitle}</h3>
            {benefit.fields.accessBenefitButton && (
              <Button link={benefit.fields.accessBenefitButton} />
            )}
            <div className="contact-links">
              {benefit.fields.contactPhone && (
                <a href={`tel://${benefit.fields.contactPhone}`}>
                  <TelIcon />
                  {benefit.fields.contactPhone}
                </a>
              )}
              {benefit.fields.contactEmail && (
                <a href={`mailto://${benefit.fields.contactEmail}`}>
                  <MailIcon />
                  {benefit.fields.contactEmail}
                </a>
              )}
            </div>
          </>
        );
      default:
        return <></>;
    }
  };

  const PostPurchaseContainer = () => {
    return (
      <div className="details-content-holder">
        <div className="back-btn" onClick={() => onClose()} role="button" tabIndex={-1}>
          <BackButton /> <span>BACK TO EV BENEFITS</span>
        </div>
        <div className="redemption-code">
          <div className="title-and-code">
            <span>Your Zoom EV code:</span>
            {benefit.fields?.overrideBenefitCode ?? bundleSubscription?.code}
          </div>
          <button
            className="clip"
            onClick={() => {
              navigator.clipboard.writeText(
                // @ts-expect-error wouldn't be undefined if were here
                benefit.fields?.overrideBenefitCode ?? bundleSubscription?.code,
              );
              setCopied(true);
            }}
          >
            <CopyToClipboard />
            {copied ? 'COPIED' : 'COPY'}
          </button>
        </div>
        <div className="how-to-access-benefit">
          <h3>How to access your benefit</h3>
          {(isMobile || isTablet) && <GreenLine />}
          <List
            listColumns={1}
            listItems={benefit.fields.accessBenefitSteps?.map((instruction) => (
              <div className="" key={instruction}>
                <p className="instruction">{instruction}</p>
              </div>
            ))}
            margin={'7px 20px 7px 34px'}
          />
        </div>
        <div className="benefit-access-links">
          <AccessBenefitContent />
        </div>
      </div>
    );
  };

  const PrePurchaseContainer = () => {
    return (
      <div className="details-content-holder">
        <div className="left-side">
          <div className="back-btn" onClick={() => onClose()} role="button" tabIndex={-1}>
            <BackButton />
            <span>BACK TO EV BENEFITS</span>
          </div>
          <h1>{benefit.fields.title}</h1>
          <GreenLine />
          <List
            listColumns={1}
            listItems={benefit.fields.features?.map((bFeature) => (
              <div className="list-item" key={bFeature.sys.id}>
                <h2>{bFeature.fields.longTitle ?? bFeature.fields.title}</h2>
                <p>{bFeature.fields.description ?? bFeature.fields.shortDescription}</p>
              </div>
            ))}
          />

          <span className="small">{benefit.fields.disclaimer}</span>
        </div>
        <div>
          {groupSectionData.type == 'Partner Bundle' ? (
            <>
              <div className="price-card partner">
                {groupSectionData.partnerLogo && <Image asset={groupSectionData.partnerLogo} />}
                <h4>{groupSectionData.partnerTitle ?? 'Zoom EV Benefit Bundle'}</h4>
                <span className="price">{groupSectionData.partnerPriceText ?? 'FREE'}</span>
                <br />
                <Button analyticsData={{ type: 'buy_bundle/access_bundle' }} href="/checkout">
                  Access your Bundle
                </Button>
              </div>
              <div className="partner-unlock-icon">
                <div className="lock-icon">
                  <Image asset="/images/icons/unlock-icon.png" />
                </div>
                <div className="cntent">
                  <h5>Unlock this benefit</h5>
                  <p>Complete the sign up to the Bundle to access this benefit</p>
                </div>
              </div>
            </>
          ) : (
            <div className="price-card">
              <div className="unlock-icon">
                <Image asset="/images/icons/unlock-icon.png" />
              </div>
              <h5>Unlock this benefit</h5>
              <p>Subscribe to the bundle to get access to this benefit</p>
              <h4>Zoom EV Benefit Bundle Annual subscription</h4>
              <span className="price">£39.99</span>
              <small>inc VAT</small>
              <br />
              <Button analyticsData={{ type: 'buy_bundle/access_bundle' }} href="/buy-bundle">
                Buy Bundle
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <Container id="benefit-full-view">
      <div className="header">
        <div
          className="bg-image"
          style={{ backgroundImage: `url("${benefit.fields.headerImage.fields.file.url}")` }}
        ></div>
        <div className="bg-image-overlay"></div>
        {benefit.fields.cta && (
          <div className="potential-cta">
            <div className="inner">
              <Banner {...benefit.fields.cta.fields} />
            </div>
          </div>
        )}
        <div className="inner-header">
          <h1>{group.fields.title}</h1>

          <div className="details-block">
            <div className="logo">
              <Image asset={benefit.fields.logo} />
            </div>
            {postPurchase ? <PostPurchaseContainer /> : <PrePurchaseContainer />}
          </div>
        </div>
      </div>
      {!postPurchase && !(isMobile || isTablet) && (
        <div className="sticky-cta">
          <Button
            analyticsData={{ type: 'buy_bundle/access_bundle' }}
            href={groupSectionData.type == 'Partner Bundle' ? '/checkout' : '/buy-bundle'}
          >
            {groupSectionData.type == 'Partner Bundle' ? 'Access your Bundle' : 'Buy Bundle'}
          </Button>
        </div>
      )}
      <div className="body">
        {/* if this is post purchase we should show the elements from the feature block */}
        {postPurchase && (
          <div className="post-purchase-dynamic-features">
            <h1>{benefit.fields.title}</h1>
            <GreenLine />
            <List
              listColumns={1}
              listItems={benefit.fields.features?.map((bFeature) => (
                <div className="list-item" key={bFeature.sys.id}>
                  <h2>{bFeature.fields.longTitle ?? bFeature.fields.title}</h2>
                  <p>{bFeature.fields.description ?? bFeature.fields.shortDescription}</p>
                </div>
              ))}
            />

            <span className="small">{benefit.fields.disclaimer}</span>
          </div>
        )}
        {benefit.fields.content
          ?.filter((benefitContent) => {
            if (benefitContent.fields.shownOn == 'Both') return true;
            if (benefitContent.fields.shownOn == 'Post Purchase' && postPurchase) return true;
            return benefitContent.fields.shownOn == 'Pre Purchase' && !postPurchase;
          })
          .map((benefitContent) => {
            switch (benefitContent.sys.contentType.sys.id) {
              case 'benefitContent3ColumnImagesWithText':
                return (
                  <BenefitContentDisplayComponent
                    component={benefitContent as IBenefitContent3ColumnImagesWithText}
                    key={benefitContent.sys.id}
                  />
                );
              case 'faqSection':
                return (
                  <BenefitFAQs key={benefitContent.sys.id} {...(benefitContent as IFaqSection)} />
                );
              case 'benefitChargerComparisonTable':
                return (
                  <div className="comparision-table-container-wrapper">
                    <h4>{benefitContent.fields.title}</h4>
                    <br />
                    <ChargerComparisonTable
                      {...(benefitContent as IBenefitChargerComparisonTable)}
                      onBenefitSelect={onOpenWorksWithBenefit}
                    />
                  </div>
                );
              default:
                return <div></div>;
            }
          })}
      </div>

      {!postPurchase && (isMobile || isTablet) && (
        <PageStickyCTA
          backgroundColour="white"
          before={
            groupSectionData.type == 'Partner Bundle' ? (
              <div className="sticky-cta-mobile" style={{ width: '50vw' }}>
                {groupSectionData.partnerTitle ?? 'Zoom EV Benefit Bundle'}
                <h3>{groupSectionData.partnerPriceText ?? 'FREE'}</h3>
              </div>
            ) : (
              <div className="sticky-cta-mobile" style={{ width: '50vw' }}>
                Annual Subscription
                <h3>£39.99</h3>
              </div>
            )
          }
          // @ts-ignore
          button={
            groupSectionData.type == 'Partner Bundle'
              ? {
                  sys: {},
                  fields: {
                    customUrl: '/buy-bundle',
                    label: 'Access Bundle',
                    analyticsData: { type: 'buy_bundle/access_bundle' },
                  },
                }
              : {
                  sys: {},
                  fields: {
                    customUrl: '/buy-bundle',
                    label: 'Buy Bundle',
                    analyticsData: { type: 'buy_bundle/access_bundle' },
                  },
                }
          }
          title="EV Benefits Bundle"
        />
      )}

      {postPurchase && (isMobile || isTablet) && <AccessBenefitStickyContent />}
    </Container>
  );
};

export default BenefitFullView;
