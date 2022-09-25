import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { IGlobalSettings } from '../../../interfaces/contentful.types.generated';
import { useGetBundlesThatICanPurchaseLazyQuery } from '../../../hooks/api/getBundlesThanICanPurchase/getBundlesThatICanPurchase.generated';
import { DashboardsLayout } from '../../../layouts';
import { userDetailsAtom, receivedBundlesAtom } from '../../../recoil';
import { ReceivedBundlePopup, BusinessInvitationPopup } from '../../../elements';
import { BusinessDashboard } from './components';
import { UserDetailsApprovalStatusEnum } from '../../../interfaces/api.types.generated.d';
import { useIsBusiness } from '../../../hooks';
import UserDashboard from './components/UserDashboard';

interface DashboardProps {
  globalSettings: IGlobalSettings;
  title: string;
}

const SubTitleComponent = ({ hasOptions }: { hasOptions?: boolean }) => (
  <p>
    Happy to have you here!
    <br />
    {hasOptions
      ? 'If you want to share Electrified Vehicles (Plug-in Electric or Hybrid cars or vans) within our Zoom EV sharing community, please choose from the following options:'
      : 'This dashboard will keep you posted of any car sharing activity. To give customers a Bundle, head to the ‘My Bundles’ tab.'}
  </p>
);

const Dashboard: NextPage<DashboardProps> = ({ globalSettings, title }) => {
  const isBusiness = useIsBusiness();
  const [getReceivedBundles, { data }] = useGetBundlesThatICanPurchaseLazyQuery();
  const userDetails = useRecoilValue(userDetailsAtom);
  const receivedBundles = useRecoilValue(receivedBundlesAtom);
  const setReceivedBundles = useSetRecoilState(receivedBundlesAtom);
  const [showBundlePopup, setShowBundlePopup] = useState(false);
  const [showBusinessPopup, setShowBusinessPopup] = useState(false);
  const router = useRouter();
  const showSubtitle =
    (!userDetails?.isOwnerProfileSetupFlowInitiated &&
      userDetails?.details.approvalStatus !== UserDetailsApprovalStatusEnum.Approved &&
      userDetails?.details.approvalStatus !== UserDetailsApprovalStatusEnum.Rejected) ||
    isBusiness;

  useEffect(() => {
    !receivedBundles && getReceivedBundles();
  }, [getReceivedBundles, receivedBundles]);

  useEffect(() => {
    if (data?.bundleTypeThatICanPurchase) {
      setReceivedBundles(data.bundleTypeThatICanPurchase);
    }
  }, [data, setReceivedBundles]);

  useEffect(() => {
    const isPopupClosedEarlier = localStorage.getItem('bundlePopupClosed');
    if (
      receivedBundles &&
      receivedBundles.isDefault === false &&
      isPopupClosedEarlier !== 'true' &&
      !userDetails?.businessUserRole
    ) {
      setShowBundlePopup(true);
    }
  }, [receivedBundles, userDetails?.businessUserRole]);

  useEffect(() => {
    if (userDetails && !userDetails?.details?.firstName) {
      router.push('/auth/tell-us-more');
    }
  }, [router, userDetails]);

  useEffect(() => {
    if (!userDetails?.isBusinessInvitationPopupClosed) {
      setShowBusinessPopup(true);
    }
  }, [userDetails?.isBusinessInvitationPopupClosed]);

  return (
    <DashboardsLayout
      globalSettings={globalSettings}
      pageTitle={title}
      subTitle={showSubtitle ? <SubTitleComponent hasOptions={!isBusiness} /> : null}
    >
      {showBundlePopup && receivedBundles && (
        <ReceivedBundlePopup
          bundlePageUrl={receivedBundles?.contentPageUrl}
          partnerImage={receivedBundles?.grantedBy?.logoImage?.url}
        />
      )}

      {showBusinessPopup && isBusiness && (
        <BusinessInvitationPopup businessImage={userDetails?.business?.logoImage?.url} />
      )}

      {!isBusiness ? <UserDashboard /> : <BusinessDashboard />}
    </DashboardsLayout>
  );
};

export default Dashboard;
