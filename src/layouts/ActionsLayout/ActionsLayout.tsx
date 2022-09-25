import React, { ReactNode } from 'react';
import { Asset } from 'contentful';
import PageHead from '../PageHead';
import {
  BackButtonWrapper,
  LogoWrapper,
  Wrapper,
  ContentWrapper,
  PageLead,
  TopBar,
  PageFooter,
} from './ActionsLayouts.styled';
import { Image, StyledLink, UnsavedChangesBusinessPopup } from '../../elements';
import { ArrowLeftIcon } from '../../icons';

interface ActionsLayoutProps {
  pageTitle: string;
  children: ReactNode;
  pageLeadContent?: ReactNode;
  logo?: Asset;
  showBackButton?: boolean;
  customWidth?: string;
  pageFooterContent?: ReactNode;
  isCustomLogoAction?: boolean;
  isLogoLinkDisabled?: boolean;
}

const ActionsLayout = ({
  pageTitle,
  children,
  logo,
  showBackButton = true,
  pageLeadContent,
  pageFooterContent,
  customWidth,
  isCustomLogoAction = false,
  isLogoLinkDisabled = false,
}: ActionsLayoutProps) => (
  <Wrapper withFooter={Boolean(pageFooterContent)}>
    <PageHead pageTitle={pageTitle} />
    <TopBar>
      {showBackButton && (
        <BackButtonWrapper>
          <StyledLink goBack>
            <ArrowLeftIcon /> Take me back
          </StyledLink>
        </BackButtonWrapper>
      )}

      {isLogoLinkDisabled && <LogoWrapper>{logo && <Image asset={logo} />}</LogoWrapper>}

      {!isLogoLinkDisabled && !isCustomLogoAction && (
        <LogoWrapper>
          <StyledLink href="/">{logo && <Image asset={logo} />}</StyledLink>
        </LogoWrapper>
      )}
      {isCustomLogoAction && <UnsavedChangesBusinessPopup logo={logo} />}
    </TopBar>
    {pageLeadContent && <PageLead>{pageLeadContent}</PageLead>}
    <ContentWrapper width={customWidth}>{children}</ContentWrapper>
    {pageFooterContent && <PageFooter>{pageFooterContent}</PageFooter>}
  </Wrapper>
);

export default ActionsLayout;
