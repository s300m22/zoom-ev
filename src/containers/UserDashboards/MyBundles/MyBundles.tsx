/* eslint-disable no-nested-ternary */
import { NextPage } from 'next';
import { useCallback, useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  BusinessUserRoleEnum,
  useGetBundlesThatICanPurchaseQuery,
} from '../../../hooks/api/getBundlesThanICanPurchase/getBundlesThatICanPurchase.generated';
import {
  IBanner,
  IBenefitGroupsSection,
  IGlobalSettings,
} from '../../../interfaces/contentful.types.generated';
import { DashboardsLayout } from '../../../layouts';
import {
  WaitingBundleCard,
  NoBundles,
  SubscribeCustomers,
  BusinessActions,
  SingleBundle,
} from './components';
import { receivedBundlesAtom, userDetailsAtom } from '../../../recoil';
import { useBundleSubscriptionQuery } from '../../../hooks/api/bundleSubscription/bundleSubscription.generated';
import { useBundleTypesThatMyBusinessCanGrantQuery } from '../../../hooks/api/bundleTypesThatMyBusinessCanGrant/bundleTypesThatMyBusinessCanGrant.generated';
import {
  BundleSubscriptionStatusEnum,
  BundleSubscriptionType,
} from '../../../interfaces/api.types.generated.d';
import contentfulClient from '../../../contentful/client';
import BenefitGroupsSection from '../../SectionLayouts/BenefitGroupsSection';
import contentfulPreviewClient from '../../../contentful/previewClient';
import OnboardingModal from './components/OnboardingModal';
import BundleBannerComponent from './components/BundleBannerComponent';
import SetupCall from './components/SetupCall';

interface MyBundlesProps {
  globalSettings: IGlobalSettings;
  title: string;
}

const MyBundles: NextPage<MyBundlesProps> = ({ globalSettings, title }) => {
  const userData = useRecoilValue(userDetailsAtom);
  const { data: bundleTypes } = useBundleTypesThatMyBusinessCanGrantQuery();
  const {
    data: purchasedBundleData,
    loading: loadingPurchased,
    startPolling,
    stopPolling,
  } = useBundleSubscriptionQuery({
    fetchPolicy: 'network-only',
  });
  const { data: receivedBundleData, loading: loadingReceived } =
    useGetBundlesThatICanPurchaseQuery();
  const receivedBundles = useRecoilValue(receivedBundlesAtom);
  const bundleSubscription = purchasedBundleData?.bundleSubscription;
  const setReceivedBundles = useSetRecoilState(receivedBundlesAtom);
  const isBusiness =
    userData?.businessUserRole === BusinessUserRoleEnum.Operator ||
    userData?.businessUserRole === BusinessUserRoleEnum.Owner;

  const [benefitSection, setBenefitSection] = useState<IBenefitGroupsSection | undefined>(
    undefined,
  );

  const [banner, setBanner] = useState<IBanner | undefined>(undefined);

  const isPreview = false;
  const client = isPreview ? contentfulPreviewClient : contentfulClient;

  const getContentfulCards = useCallback(async () => {
    try {
      const benefitGroupSection = await client.getEntry<IBenefitGroupsSection>(
        bundleSubscription?.bundleType?.contentfulBenefitsComponentId as string,
        {
          include: 10,
          resolveLinks: true,
        },
      );
      if (benefitGroupSection) {
        // @ts-expect-error this happens because contentful wraps in an entity type and cant seem to be typecast
        setBenefitSection(benefitGroupSection);
      }
    } catch (error) {
      return;
    }
  }, [bundleSubscription?.bundleType.contentfulBenefitsComponentId, client]);

  const getContentfulBannerComponent = useCallback(async () => {
    try {
      const bannerComponent = await client.getEntry<IBanner>(
        bundleSubscription?.bundleType.contentfulBannerComponentId as string,
        {
          include: 10,
          resolveLinks: true,
        },
      );
      if (bannerComponent) {
        // @ts-expect-error this happens because contentful wraps in an entity type and cant seem to be typecast
        setBanner(bannerComponent as IBanner);
      }
    } catch (error) {
      return;
    }
  }, [bundleSubscription?.bundleType.contentfulBannerComponentId, client]);

  useEffect(() => {
    if (bundleSubscription) {
      if (bundleSubscription.status === BundleSubscriptionStatusEnum.Created) {
        startPolling(2000);
      } else {
        stopPolling();

        if (bundleSubscription?.bundleType.contentfulBenefitsComponentId) {
          getContentfulCards();
        }
        if (bundleSubscription.bundleType.contentfulBannerComponentId) {
          getContentfulBannerComponent();
        }
      }
    }
  }, [
    bundleSubscription,
    startPolling,
    stopPolling,
    getContentfulCards,
    getContentfulBannerComponent,
  ]);

  useEffect(() => {
    if (receivedBundleData?.bundleTypeThatICanPurchase) {
      setReceivedBundles(receivedBundleData.bundleTypeThatICanPurchase);
    }
  }, [receivedBundleData, setReceivedBundles]);

  if (isBusiness || bundleTypes?.bundleTypesThatMyBusinessCanGrant.length) {
    return (
      <DashboardsLayout
        globalSettings={globalSettings}
        pageActions={<BusinessActions />}
        pageTitle={title}
      >
        <SubscribeCustomers />
      </DashboardsLayout>
    );
  }

  return (
    <DashboardsLayout globalSettings={globalSettings} pageTitle={title}>
      {loadingReceived || loadingPurchased ? (
        <Skeleton
          count={1}
          height={100}
          style={{
            marginBottom: '10px',
            borderRadius: '12px',
            boxShadow: '0 10px 34px rgba(23, 75, 83, 0.1)',
          }}
        />
      ) : bundleSubscription ? (
        <>
          <SingleBundle bundle={bundleSubscription} />

          {bundleSubscription && <SetupCall />}

          {benefitSection && bundleSubscription && (
            <>
              <br />
              <h2 style={{ marginBottom: 0 }}>My Benefits</h2>
              <BenefitGroupsSection
                {...benefitSection.fields}
                bundleSubscription={bundleSubscription as BundleSubscriptionType}
                postPurchase
              />
              <OnboardingModal />
            </>
          )}
          {bundleSubscription && banner && (
            <>
              <br />
              <BundleBannerComponent {...banner} />
            </>
          )}
        </>
      ) : receivedBundles?.grantedBy ? (
        <WaitingBundleCard
          issuer={receivedBundles?.name}
          partnerImage={receivedBundles?.grantedBy?.logoImage?.url}
          url={receivedBundles?.contentPageUrl}
        />
      ) : (
        <NoBundles />
      )}
    </DashboardsLayout>
  );
};

export default MyBundles;
