import { useState } from 'react';
import { NextPage } from 'next';
import { IGlobalSettings } from '../../../../../interfaces/contentful.types.generated';
import { DashboardsLayout } from '../../../../../layouts';
import ActiveFormEnum from './BusinessAccountSettingsEnum';
import { ChangePassword, Email, EmailPreferences, PersonalInformation } from './components';

interface BusinessAccountSettingsProps {
  globalSettings: IGlobalSettings;
  title: string;
}

const BusinessAccountSettings: NextPage<BusinessAccountSettingsProps> = ({
  globalSettings,
  title,
}) => {
  const [activeForm, setActiveForm] = useState<ActiveFormEnum>();
  return (
    <DashboardsLayout
      globalSettings={globalSettings}
      pageTitle={title}
      parentLink={{ url: '/dashboard/profile', label: 'Profile' }}
    >
      <PersonalInformation activeForm={activeForm} setActiveForm={setActiveForm} />
      <Email activeForm={activeForm} setActiveForm={setActiveForm} />
      <ChangePassword activeForm={activeForm} setActiveForm={setActiveForm} />
      <EmailPreferences />
    </DashboardsLayout>
  );
};

export default BusinessAccountSettings;
