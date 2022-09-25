import styled from 'styled-components';
import { SettingsCardWrapper } from '../../../../../../../elements/SettingsCard/SettingsCard';

export const CarDeleteWrapper = styled(SettingsCardWrapper)`
  justify-content: center;
  align-items: center;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    flex-direction: row;
    justify-content: space-between;
  }
  button.delete {
    color: ${({ theme }) => theme.palette.red};
    margin-top: 15px;

    ${({ theme }) => theme.up(theme.breakpoints.sm)} {
      margin-left: 30px;
      margin-top: 0;
    }
  }
`;

export const CarDeleteConfirm = styled.div`
  display: flex;
  button {
    margin-top: 15px;

    ${({ theme }) => theme.up(theme.breakpoints.sm)} {
      margin-left: 30px;
      margin-top: 0;
    }
  }
`;
