import styled from 'styled-components';

export const StepsLineWrapper = styled.div`
  display: flex;
  width: 100%;
  counter-reset: dots;
  position: relative;
  flex-direction: row;
`;
interface StepsLineItemProps {
  numberOfSteps: number;
  isActive: boolean;
}

export const StepsParagraph = styled.p`
  margin: 0 !important;
  font-size: 14px !important;
  line-height: 21px;
  display: none;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    display: block;
  }
`;

export const StepsLineItem = styled.div<StepsLineItemProps>`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 50px 10px 20px;
  width: 100%;

  ${StepsParagraph} {
    font-weight: ${({ isActive }) => (isActive ? 600 : 400)};
    color: ${({ isActive, theme: { palette } }) => (isActive ? palette.dark : palette.grayMiddle)};
  }

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    width: calc(100% / ${({ numberOfSteps }) => numberOfSteps});
    &:nth-child(2n + 1) {
      &:before {
        content: '';
      }
    }

    &:before {
      content: '';
      position: absolute;
      top: 20px;
      left: 50%;
      height: 1px;
      width: 100%;
      background: repeating-linear-gradient(
        to right,
        #f0f4f799,
        #f0f4f799 10px,
        rgba(106, 112, 125, 0.3) 10px,
        rgba(106, 112, 125, 0.3) 20px
      );
    }
  }

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    white-space: nowrap;
  }

  &:after {
    counter-increment: dots;
    content: counter(dots);
    background: url('data:image/png;base64,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');
    background-size: cover;
    width: 40px;
    height: 40px;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.palette.secondary};
    font-weight: 600;
    filter: ${({ isActive }) => (isActive ? 'none' : 'grayscale(1)')};
    font-size: 12px;
    line-height: 14px;
  }

  &:last-of-type {
    &:before {
      content: none;
    }
  }
`;
