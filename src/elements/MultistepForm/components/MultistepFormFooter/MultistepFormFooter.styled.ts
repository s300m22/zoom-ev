import styled from 'styled-components';
import { Container } from '../../..';

export const MultistepFormFooterWrapper = styled(Container)`
  display: flex;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 15px 10px;
  position: relative;

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    padding: 22px 15px;
  }
`;

interface PreviousStepProps {
  isVisible: boolean;
}

export const PreviousStep = styled.div<PreviousStepProps>`
  display: flex;
  font-weight: 500;
  cursor: pointer;

  :hover {
    color: ${({ theme }) => theme.palette.hover};
  }

  svg {
    margin-right: 12px;
  }

  ${({ isVisible }) =>
    isVisible &&
    `
    visibility: hidden;
  `}
`;
