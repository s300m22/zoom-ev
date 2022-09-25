import React from 'react';
import { Heading, Tabs } from '../../../elements';
import { ITabsSectionFields } from '../../../interfaces/contentful.types.generated';
import { Wrapper, TabsSection } from './TabSectionLayout.styled';

const TabSectionLayout = ({
  padding,
  title,
  tabs,
  type = 'Other',
  inlineTitle = false,
  showUrls = false,
}: ITabsSectionFields) => (
  <Wrapper padding={padding}>
    <TabsSection>
      {title && !inlineTitle && <Heading variant="h2">{title}</Heading>}
      <Tabs sectionTitle={inlineTitle ? title : ''} showUrls={showUrls} tabs={tabs} type={type} />
    </TabsSection>
  </Wrapper>
);

export default TabSectionLayout;
