import { ReactNode, useCallback, useEffect, useState } from 'react';
import { TabsBar, TabsBarLinksWrapper, TabLink, TabWrapper, TabsWrapper } from './Tabs.styled';

interface Tab {
  title: string;
  children: ReactNode;
}
interface SingleTabProps {
  tab: Tab;
}

interface TabsProps {
  tabs: Array<Tab>;
  at: string | null;
}

const SingleTab = ({ tab }: SingleTabProps) => <TabWrapper>{tab.children}</TabWrapper>;

const StandaloneTabs = ({ tabs, at }: TabsProps) => {
  const getActiveTab = useCallback(() => {
    if (at === null) return 0;
    const tabIndex = tabs.findIndex((tab) => tab.title.toLocaleLowerCase() === at);
    return tabIndex > 0 ? tabIndex : 0;
  }, [at, tabs]);

  const [activeTab, setActiveTab] = useState(getActiveTab());

  useEffect(() => {
    setActiveTab(getActiveTab());
  }, [getActiveTab]);

  const handleClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <TabsWrapper>
      <TabsBar>
        <TabsBarLinksWrapper width="auto">
          {tabs.map((tab, index) => (
            <TabLink
              className={activeTab === index ? 'active' : ''}
              key={tab.title}
              onClick={() => handleClick(index)}
            >
              {tab.title}
            </TabLink>
          ))}
        </TabsBarLinksWrapper>
      </TabsBar>
      {tabs.map((tab, index) =>
        activeTab === index ? <SingleTab key={tab.title} tab={tab} /> : null,
      )}
    </TabsWrapper>
  );
};

export default StandaloneTabs;
