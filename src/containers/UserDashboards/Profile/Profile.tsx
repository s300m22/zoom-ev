import { NextPage } from 'next';
import { IGlobalSettings } from '../../../interfaces/contentful.types.generated';
import { DashboardsLayout } from '../../../layouts';
import { ProfileCard } from './components';

interface ProfileProps {
  globalSettings: IGlobalSettings;
  title: string;
}

const Profile: NextPage<ProfileProps> = ({ globalSettings, title }) => {
  return (
    <DashboardsLayout globalSettings={globalSettings} pageTitle={title}>
      <ProfileCard />
    </DashboardsLayout>
  );
};

export default Profile;
