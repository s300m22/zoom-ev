import { NextPage } from 'next';
import { Entry } from 'contentful';
import {
  IGlobalSettingsFields,
  IFaqPageFields,
} from '../../../interfaces/contentful.types.generated';
import { DefaultLayout } from '../../../layouts';
import { TabSectionLayout } from '../../SectionLayouts';
import { Banner } from '../../../elements';
import Wrapper from './Page.styled';

export interface PageProps {
  page: Entry<IFaqPageFields>;
  globalSettings: Entry<IGlobalSettingsFields>;
}

const Page: NextPage<PageProps> = ({ page, globalSettings }) => {
  const { title, faqTabsSection, banner } = page.fields;

  return (
    <DefaultLayout globalSettings={globalSettings} isWide={false} pageTitle={title}>
      <Wrapper>
        <TabSectionLayout {...faqTabsSection.fields} />
        {banner && <Banner {...banner.fields} />}
      </Wrapper>
    </DefaultLayout>
  );
};

export default Page;
