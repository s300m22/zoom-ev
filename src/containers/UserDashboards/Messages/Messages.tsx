import { NextPage } from 'next';
import { IGlobalSettings } from '../../../interfaces/contentful.types.generated';
import { DashboardsLayout } from '../../../layouts';

interface MessagesProps {
  globalSettings: IGlobalSettings;
  title: string;
}

const Messages: NextPage<MessagesProps> = ({ globalSettings, title }) => {
  return (
    <DashboardsLayout globalSettings={globalSettings} pageTitle={title}>
      X
    </DashboardsLayout>
  );
};

export default Messages;
