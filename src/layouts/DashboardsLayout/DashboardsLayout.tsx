import { ReactNode } from 'react';
import { IGlobalSettings } from '../../interfaces/contentful.types.generated';
import DefaultLayout from '../DefaultLayout';
import {
  ChildrenWrapper,
  DashboardsContent,
  DashboardsLayoutWrapper,
  Subtitle,
  DashboardsContentHeader,
} from './DashboardsLayout.styled';
import { Container, Heading, StyledLink, UserSideBar } from '../../elements';
import { ArrowLeftIcon } from '../../icons';

interface DashboardsLayoutProps {
  globalSettings: IGlobalSettings;
  pageTitle: string;
  children: ReactNode;
  customPageTitle?: string;
  subTitle?: ReactNode;
  pageActions?: ReactNode;
  parentLink?: {
    label: string;
    url: string;
  };
}

const DashboardsLayout = ({
  globalSettings,
  pageTitle,
  children,
  customPageTitle,
  subTitle,
  pageActions,
  parentLink,
}: DashboardsLayoutProps) => (
  <DefaultLayout backgroundColor="#f0f4f7" globalSettings={globalSettings} pageTitle={pageTitle}>
    <DashboardsLayoutWrapper>
      <Container isWide>
        <UserSideBar />
        <DashboardsContent>
          <DashboardsContentHeader>
            <div>
              <Heading variant="h3">{customPageTitle || pageTitle}</Heading>
              {subTitle && <Subtitle>{subTitle}</Subtitle>}
              {parentLink && (
                <StyledLink href={parentLink.url}>
                  <ArrowLeftIcon /> {parentLink.label}
                </StyledLink>
              )}
            </div>
            {pageActions}
          </DashboardsContentHeader>
          <ChildrenWrapper>{children}</ChildrenWrapper>
        </DashboardsContent>
      </Container>
    </DashboardsLayoutWrapper>
  </DefaultLayout>
);

export default DashboardsLayout;
