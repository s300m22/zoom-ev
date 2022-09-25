import styled from 'styled-components';
import { defaultButton } from '../../../../../elements/Button/Button.styled';

const BusinessActionsWrapper = styled.div`
  display: flex;

  span {
    margin-left: 10px;
  }

  .exportButton {
    ${defaultButton}
    color: ${({ theme }) => theme.palette.primary};
    background: ${({ theme }) => theme.palette.secondary};
    border: 1px solid #34c9ca;

    :hover,
    :active {
      background: ${({ theme }) => theme.palette.action.hover};
    }
  }
`;

export default BusinessActionsWrapper;
