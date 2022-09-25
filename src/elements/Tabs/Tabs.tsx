import { useState } from 'react';
import { useRouter } from 'next/router';
import Heading from '../Heading';
import RichTextRenderer from '../RichTextRenderer';
import { ITab, ITabFields } from '../../interfaces/contentful.types.generated';
import {
  TabDescriptionWrapper,
  TabsBar,
  TabsBarLinksWrapper,
  TabLink,
  TabWrapper,
  TabsWrapper,
} from './Tabs.styled';
import FaqTab from './components/FaqTab';
import ContentSection from '../../containers/ContentSection';

export interface TabsProps {
  tabs: ITab[];
  sectionTitle?: string;
  type: string;
  showUrls: boolean;
}

const Tab = ({ tab }: { tab: ITabFields }) => {
  const { title, description, sections } = tab;
  return (
    <TabWrapper>
      <TabDescriptionWrapper>
        {title && <Heading variant="h3">{title}</Heading>}
        {description && <RichTextRenderer>{description}</RichTextRenderer>}
      </TabDescriptionWrapper>
      {sections?.map((section) => (
        <ContentSection key={section.sys.id} section={section} />
      ))}
    </TabWrapper>
  );
};

const Tabs = ({ sectionTitle, tabs, type, showUrls }: TabsProps) => {
  const router = useRouter();

  const getActiveTab = () => {
    const tabIndex = tabs.findIndex((tab) => tab.fields.urlSlug === router.query.tab);
    return tabIndex > 0 ? tabIndex : 0;
  };

  const [activeTab, setActiveTab] = useState(getActiveTab());

  const handleClick = (index: number, url?: string) => {
    if (showUrls) {
      router.push(`?tab=${url}`);
      setActiveTab(tabs.findIndex((tab) => tab.fields.urlSlug === url));
    } else {
      setActiveTab(index);
    }
  };

  return (
    <TabsWrapper>
      <TabsBar>
        {sectionTitle && <Heading variant="h1">{sectionTitle}</Heading>}
        <TabsBarLinksWrapper width={type === 'FAQs' ? 'auto' : '100%'}>
          {tabs.map((tab, index) => (
            <TabLink
              className={activeTab === index ? 'active' : ''}
              key={tab.sys.id}
              onClick={() => handleClick(index, tab.fields.urlSlug)}
            >
              {tab.fields.title}
            </TabLink>
          ))}
        </TabsBarLinksWrapper>
      </TabsBar>
      {tabs.map((tab, index) =>
        // eslint-disable-next-line no-nested-ternary
        activeTab === index ? (
          type === 'FAQs' ? (
            <FaqTab key={tab.sys.id} tab={tab.fields} />
          ) : (
            <Tab key={tab.sys.id} tab={tab.fields} />
          )
        ) : null,
      )}
    </TabsWrapper>
  );
};

export default Tabs;
