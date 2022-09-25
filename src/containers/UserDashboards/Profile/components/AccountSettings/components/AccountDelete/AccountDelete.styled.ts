import styled from 'styled-components';
import ContentBoxWrapper from '../../../../../../../elements/ContentBox/ContentBox.styled';
import { SettingsCardWrapper } from '../../../../../../../elements/SettingsCard/SettingsCard';

export const AccountDeleteWrapper = styled(SettingsCardWrapper)`
  justify-content: flex-start;
  align-items: center;

  h4 {
    text-align: left;
    width: 100%;
  }

  button {
    color: ${({ theme }) => theme.palette.red};
    margin-top: 15px;

    ${({ theme }) => theme.up(theme.breakpoints.sm)} {
      margin-left: 30px;
      margin-top: 0;
    }
  }
`;

export const AccountDeleteContentBox = styled(ContentBoxWrapper)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 30px;
  flex-direction: column;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    flex-direction: row;
  }

  span {
    color: ${({ theme }) => theme.palette.dark};
  }
`;
