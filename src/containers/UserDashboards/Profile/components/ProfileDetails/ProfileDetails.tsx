import { useState } from 'react';
import { NextPage } from 'next';
import { useRecoilValue } from 'recoil';
import { BoldText, StatusBanner, StatusEnum } from '../../../../../elements';
import { ShieldIcon } from '../../../../../icons';
import { UserDetailsApprovalStatusEnum } from '../../../../../interfaces/api.types.generated.d';
import { IGlobalSettings } from '../../../../../interfaces/contentful.types.generated';
import { DashboardsLayout } from '../../../../../layouts';
import { userDetailsAtom } from '../../../../../recoil';
import { Address, DrivingLicense, PersonalInformation } from './components';
import {
  ProfileDetailsCard,
  ProfileDetailsCardIconWrapper,
  ProfileDetailsParagraph,
} from './ProfileDetails.styled';
import ActiveFormEnum from './ProfileDetailsEnum';
import { ProfilePending } from '../../../Dashboard/components';

interface ProfileDetailsProps {
  globalSettings: IGlobalSettings;
  title: string;
}

const ProfileDetails: NextPage<ProfileDetailsProps> = ({ globalSettings, title }) => {
  const [activeForm, setActiveForm] = useState<ActiveFormEnum>();
  const userDetails = useRecoilValue(userDetailsAtom);
  const profileStatus = userDetails?.details.approvalStatus;
  const profileRequestedStatus = userDetails?.detailsRequested?.approvalStatus;
  return (
    <DashboardsLayout
      globalSettings={globalSettings}
      pageTitle={title}
      parentLink={{ url: '/dashboard/profile', label: 'Profile' }}
    >
      {profileRequestedStatus === UserDetailsApprovalStatusEnum.Rejected ? (
        <StatusBanner status={StatusEnum.Rejected} statusText="Changes rejected">
          {userDetails?.detailsRequested?.rejectionReason}
        </StatusBanner>
      ) : null}
      <br />
      <br />

      {profileStatus === UserDetailsApprovalStatusEnum.Approved &&
      userDetails?.detailsRequested === null ? (
        <ProfileDetailsCard>
          <ProfileDetailsCardIconWrapper>
            <ShieldIcon />
          </ProfileDetailsCardIconWrapper>
          <div>
            <BoldText>This data is verified by Zoom EV team. </BoldText>
            <ProfileDetailsParagraph>
              Any changes made to your approved profile need to be reviewed and re-approved by the
              Zoom EV team. It usually takes up to 48 hours. You can&apos;t make any booking until
              the changes are approved.
            </ProfileDetailsParagraph>
          </div>
        </ProfileDetailsCard>
      ) : null}
      {profileRequestedStatus === UserDetailsApprovalStatusEnum.Pending ? (
        <ProfilePending customStyles={{ marginBottom: '30px' }} />
      ) : null}
      <PersonalInformation activeForm={activeForm} setActiveForm={setActiveForm} />
      {profileRequestedStatus !== UserDetailsApprovalStatusEnum.Draft ? (
        <>
          <Address activeForm={activeForm} setActiveForm={setActiveForm} />
          <DrivingLicense activeForm={activeForm} setActiveForm={setActiveForm} />
        </>
      ) : null}
    </DashboardsLayout>
  );
};

export default ProfileDetails;
