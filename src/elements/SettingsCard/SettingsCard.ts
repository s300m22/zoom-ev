import styled from 'styled-components';
import { CollapsibleListWrapper } from '../CollapsibleList/CollapsibleList.styled';
import { StatusBannerWrapper } from '../StatusBanner/StatusBanner.styled';
import { SimpleCardWrapper } from '../SimpleCard/SimpleCard.styled';

interface SettingsCardWrapperProps {
  isFormBlurred?: boolean;
}

export const SettingsCardWrapper = styled(SimpleCardWrapper)<SettingsCardWrapperProps>`
  position: relative;
  margin-top: 0 !important;
  margin-bottom: 30px;

  &:after {
    content: none;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.4);
    border-radius: 12px;
  }

  ${({ isFormBlurred }) => (isFormBlurred ? '&:after { content: ""}' : null)}
`;

export const SettingsCardHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    justify-content: space-between;
    flex-direction: row;
  }

  + ${StatusBannerWrapper} {
    margin-top: 30px;
  }
`;

export const SettingsEditLink = styled.p`
  margin: 0;
  font-weight: 500;
  color: ${({ theme }) => theme.palette.gray};
  cursor: pointer;
`;

export const SettingsCardFooter = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;

  button {
    :first-of-type {
      margin-right: 10px;
    }
  }

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    justify-content: flex-end;
  }
`;

export const SettingsForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

export const SettingsContent = styled.div`
  display: flex;
  flex-direction: column;

  ${CollapsibleListWrapper} {
    .Collapsible {
      :last-of-type {
        border-bottom: 0;
        padding-bottom: 0;
      }
    }
  }
`;
