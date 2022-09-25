import styled from 'styled-components';

interface LabelProps {
  variant?: string;
}
export const Label = styled.label<LabelProps>(
  ({ theme: { down, breakpoints, palette }, variant }) => `
    display: flex;
    align-items: center;
    border-radius: 12px;
    padding: ${variant === 'borderless' ? '0' : '16px'};
    border: ${variant === 'borderless' ? 'none' : '1px solid #ececec'};
    user-select: none;
    margin-right: 20px;
    margin-bottom: 20px;
    max-height: 50px;
    color: ${palette.primary};
    font-size: 16px;
    line-height: 150%;
    white-space: nowrap;
    cursor: pointer;
    position: relative;

    ${down(breakpoints.sm)} {
      width: 100%;
      margin-right: 0;
    }

    span {
      z-index: 1;
    }

    &:last-of-type {
      margin-right: 0;
    }

    * {
      ${variant === 'borderless' ? 'border: none !important; box-shadow: none !important;' : ''};
    }
  `,
);

export const RadioOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  border-radius: 12px;
`;

export const IconContainer = styled.div`
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const UnmarkedCheckboxIcon = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid #ececec !important;
`;
export const CheckboxIconBox = styled.div`
  display: none;
`;

export const RadioContent = styled.span`
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

interface StyledRadioProps {
  variant?: string;
}

export const StyledRadio = styled.input<StyledRadioProps>`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;

  &:checked ~ ${RadioContent} {
    ${UnmarkedCheckboxIcon} {
      display: none;
    }
    ${CheckboxIconBox} {
      display: inline;
    }
  }

  &:checked ~ ${RadioOverlay} {
    border: 1px solid #34c9ca;
    color: ${({ theme }) => theme.palette.action.hover};
    background: #fff;
    box-shadow: 0 10px 34px rgba(23, 75, 83, 0.1);

    ::before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: #ececec;
      opacity: 0;
      transition: opacity 0.2s;
    }

    ::after {
      content: '';
      position: absolute;
      left: 50%;
      top: 50%;
      border-radius: 50%;
      padding: 50%;
      width: 32px;
      height: 32px;
      background: ${({ theme }) => theme.palette.action.selected};
      opacity: 0;
      transform: translate(-50%, -50%) scale(1);
      transition: opacity 1s, transform 0.5s;
    }

    :active::after {
      opacity: 0.32;
      transform: translate(-50%, -50%) scale(0);
      transition: transform 0s;
    }
  }
`;
