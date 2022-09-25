import styled from 'styled-components';
import { SettingsCardWrapper } from '../../../../../../../elements/SettingsCard/SettingsCard';

interface CarVisibilityWrapperProps {
  isBlocked: boolean;
}

const CarVisibilityWrapper = styled(SettingsCardWrapper)<CarVisibilityWrapperProps>`
  justify-content: center;
  align-items: center;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    flex-direction: row;
    justify-content: space-between;
  }

  h4 {
    ${({ theme }) => theme.up(theme.breakpoints.sm)} {
      margin-right: 30px;
    }
  }
  div {
    margin-top: 15px;
    padding-top: 15px;
    pointer-events: ${({ isBlocked }) => (isBlocked ? 'none' : 'auto')};

    ${({ theme }) => theme.up(theme.breakpoints.sm)} {
      margin-top: 0;
      padding-top: 0;
    }
  }
`;

export default CarVisibilityWrapper;
