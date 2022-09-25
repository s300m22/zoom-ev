import { useState } from 'react';
import {
  BoldText,
  Image,
  StyledLink,
  SimpleCard,
  Heading,
  CancelSubscriptionPopup,
  CreditCard,
  UpdatePaymentDetailsPopup,
} from '../../../../../elements';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  CopyToClipboard,
  DefaultBundleIcon,
} from '../../../../../icons';
import { convertToReadableDateFormat, formatPrice } from '../../../../../utils';
import {
  ImageWrapper,
  CardFirstRow,
  CardSecondRow,
  ProductBillingPaymentWrapper,
  CellWrapper,
  Label,
  FooterParagraph,
  FooterBundleCancel,
} from './SingleBundle.styled';
import { BundleSubscriptionStatusEnum } from '../../../../../interfaces/api.types.generated.d';
import { BundleSubscriptionQuery } from '../../../../../hooks/api/bundleSubscription/bundleSubscription.generated';
import mixpanel from 'mixpanel-browser';

interface BundleFooterProps {
  bundleStatus: BundleSubscriptionStatusEnum;
}

const BundleCardFooterActive = () => (
  <FooterBundleCancel>
    <div>
      <Heading variant="h5">Cancel upcoming subscription</Heading>
      <FooterParagraph>
        The future payment will be cancelled, but your subscription and Zoom EV code will remain
        valid until the renewal date.
      </FooterParagraph>
    </div>
    <CancelSubscriptionPopup />
  </FooterBundleCancel>
);

// const BundleCardFooterCanceled = () => (
//   <FooterBundleCancel>
//     <div>
//       <Heading variant="h5">Re-activate subscription</Heading>
//       <FooterParagraph>
//         Your subscription is currently cancelled. You can re-activate it so that it will
//         automatically renew.
//       </FooterParagraph>
//     </div>
//     <ReactivateSubscriptionPopup />
//   </FooterBundleCancel>
// );

const BundleFooter = ({ bundleStatus }: BundleFooterProps) => {
  if (bundleStatus === BundleSubscriptionStatusEnum.Active) return <BundleCardFooterActive />;
  // if (bundleStatus === BundleSubscriptionStatusEnum.Canceled) return <BundleCardFooterCanceled />;
  return null;
};

interface SingleBundleProps {
  bundle: BundleSubscriptionQuery['bundleSubscription'];
}
// Fix types when backend will return correct data
const SingleBundle = ({ bundle }: SingleBundleProps) => {
  const [expanded, setExpanded] = useState(false);
  const bundleStartDate = bundle?.currentPeriodStart
    ? convertToReadableDateFormat({ date: (bundle?.currentPeriodStart || 0) * 1000 })
    : '-';
  const bundleEndDate = bundle?.currentPeriodEnd
    ? convertToReadableDateFormat({ date: (bundle?.currentPeriodEnd || 0) * 1000 }) || '-'
    : '-';
  const bundleStatus = bundle?.status;

  const [copied, setCopied] = useState(false);

  const ZoomCodeDisplay = () => {
    return (
      <>
        {bundle?.code && (
          <div className="flex items-center justify-center ml-8">
            <div className="mr-2">
              <h4 className="m-0 text-gray-400 font-light md:text-sm text-xs">Your Zoom EV Code</h4>
              <p className="m-0 text-lg font-semibold">{bundle.code}</p>
            </div>
            <button
              className="clip bg-transparent border-none text-center flex flex-col items-center text-blue-400 text-xs font-medium underline mt-0"
              onClick={() => {
                navigator.clipboard.writeText(bundle.code ?? '');
                setCopied(true);
              }}
            >
              <CopyToClipboard className="margin-0 w-8 h-8 mb-1" />
              {copied ? 'COPIED' : 'COPY'}
            </button>
          </div>
        )}
      </>
    );
  };

  return bundleStatus ? (
    <>
      <h2>
        My Subscription
        <span
          className="text-blue-500 ml-4 inline-block md:hidden"
          onClick={() => {
            mixpanel.track('benefits.subscription.open_close', {
              open: !expanded,
            });
            setExpanded(!expanded);
          }}
          role="button"
          tabIndex={-1}
        >
          {!expanded ? (
            <ChevronDownIcon className="w-5 h-5" />
          ) : (
            <ChevronUpIcon className="w-5 h-5" />
          )}
        </span>
      </h2>
      <div className="flex bg-blue-100 rounded-xl shadow-lg">
        <div className="w-full">
          <SimpleCard
            footer={
              bundleStatus === BundleSubscriptionStatusEnum.Active && expanded ? (
                <BundleFooter bundleStatus={bundleStatus} />
              ) : null
            }
          >
            <div>
              {expanded ? (
                <>
                  <CardFirstRow>
                    <CardFirstRow>
                      <div className="flex items-center justify-between w-full">
                        <ImageWrapper>
                          {bundle?.resellerBusiness?.logoImage?.url ? (
                            <Image asset={bundle.resellerBusiness.logoImage.url} />
                          ) : (
                            <DefaultBundleIcon />
                          )}
                        </ImageWrapper>
                        <ZoomCodeDisplay />
                      </div>
                    </CardFirstRow>
                  </CardFirstRow>
                  <CardSecondRow className="bg-[#00BFF3] bg-opacity-5 p-6 rounded-lg md:bg-transparent md:p-0">
                    <ProductBillingPaymentWrapper>
                      <CellWrapper>
                        <Label>Product</Label>
                        <BoldText>{bundle?.bundleType?.name}</BoldText>
                      </CellWrapper>
                      <CellWrapper>
                        <Label>Billing date</Label>
                        <BoldText>
                          {bundleStatus === BundleSubscriptionStatusEnum.Canceled
                            ? '-'
                            : bundleStartDate}
                        </BoldText>
                      </CellWrapper>
                      <CellWrapper>
                        <Label>
                          Payment method{' '}
                          {bundleStatus !== BundleSubscriptionStatusEnum.Canceled && (
                            <UpdatePaymentDetailsPopup />
                          )}
                        </Label>
                        <BoldText>
                          <CreditCard paymentMethod={bundle?.paymentMethod} />
                        </BoldText>
                      </CellWrapper>
                    </ProductBillingPaymentWrapper>
                  </CardSecondRow>

                  <div className="bg-gray-50 md:flex items-center justify-between px-7 py-5 rounded-lg text-gray-500">
                    {bundleStatus === BundleSubscriptionStatusEnum.Created && (
                      <div>
                        We are currently processing payment for your bundle. Please wait until the
                        process will finish. <br /> It could take{' '}
                        <BoldText>up to 15 minutes</BoldText>.
                      </div>
                    )}
                    {bundleStatus === BundleSubscriptionStatusEnum.Canceled && (
                      <div>
                        Your subscription is now cancelled. Your bundle code will remain valid until{' '}
                        <BoldText>{bundleEndDate}</BoldText>.
                      </div>
                    )}
                    {bundleStatus === BundleSubscriptionStatusEnum.Active && bundle?.paymentMethod && (
                      <div>
                        Your subscription will be automatically renewed on{' '}
                        <BoldText>{bundleEndDate}</BoldText>. You will be charged{' '}
                        <BoldText>{bundle && formatPrice(bundle.bundleType.price / 100)}</BoldText>.
                      </div>
                    )}
                    {bundleStatus === BundleSubscriptionStatusEnum.Active &&
                      !bundle?.paymentMethod && (
                        <div>
                          Please add your payment details if you would like your benefits to renew.
                          The subscription costs{' '}
                          <BoldText>
                            {bundle && formatPrice(bundle.bundleType.price / 100)}
                          </BoldText>{' '}
                          per year. If you do not add payment details, your subscription will cancel
                          on <BoldText>{bundleEndDate}</BoldText>.
                        </div>
                      )}
                    <StyledLink color="blue" href="/terms-and-conditions">
                      Terms & conditions
                    </StyledLink>
                  </div>
                </>
              ) : (
                <>
                  <CardFirstRow>
                    <div className="flex items-center justify-between w-full">
                      <ImageWrapper>
                        {bundle?.resellerBusiness?.logoImage?.url ? (
                          <Image asset={bundle.resellerBusiness.logoImage.url} />
                        ) : (
                          <DefaultBundleIcon />
                        )}
                      </ImageWrapper>
                      <ZoomCodeDisplay />
                    </div>
                  </CardFirstRow>
                </>
              )}
            </div>
          </SimpleCard>
        </div>
        <div className="w-0 md:w-12 shrink-0 grow-0 flex items-end justify-center pb-3">
          <button
            className="bg-white bg-opacity-50 rounded-md w-8 h-8 border-0 md:flex items-center justify-center hover:cursor-pointer hidden"
            onClick={() => {
              mixpanel.track('benefits.subscription.open_close', {
                open: !expanded,
              });
              setExpanded(!expanded);
            }}
          >
            {!expanded ? (
              <ChevronDownIcon className="w-3 h-3" />
            ) : (
              <ChevronUpIcon className="w-3 h-3" />
            )}
          </button>
        </div>
      </div>
    </>
  ) : null;
};

export default SingleBundle;
