import { NextPage } from 'next';
import { IGlobalSettings } from '../../../interfaces/contentful.types.generated';
import { DashboardsLayout } from '../../../layouts';

interface SettingsProps {
  globalSettings: IGlobalSettings;
  title: string;
}

const Settings: NextPage<SettingsProps> = ({ globalSettings, title }) => {
  return (
    <DashboardsLayout globalSettings={globalSettings} pageTitle={title}>
      X
    </DashboardsLayout>
  );
};

export default Settings;
