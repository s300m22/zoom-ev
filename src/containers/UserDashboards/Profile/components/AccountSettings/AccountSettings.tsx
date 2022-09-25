import { useState } from 'react';
import { NextPage } from 'next';
import { IGlobalSettings } from '../../../../../interfaces/contentful.types.generated';
import { DashboardsLayout } from '../../../../../layouts';
import ActiveFormEnum from './AccountSettingsEnum';
import { AccountDelete, ChangePassword, Email, EmailPreferences } from './components';

interface AccountSettingsProps {
  globalSettings: IGlobalSettings;
  title: string;
}

const AccountSettings: NextPage<AccountSettingsProps> = ({ globalSettings, title }) => {
  const [activeForm, setActiveForm] = useState<ActiveFormEnum>();
  return (
    <DashboardsLayout
      globalSettings={globalSettings}
      pageTitle={title}
      parentLink={{ url: '/dashboard/profile', label: 'Profile' }}
    >
      <Email activeForm={activeForm} setActiveForm={setActiveForm} />
      <ChangePassword activeForm={activeForm} setActiveForm={setActiveForm} />
      <EmailPreferences activeForm={activeForm} setActiveForm={setActiveForm} />
      <AccountDelete />
    </DashboardsLayout>
  );
};

export default AccountSettings;
