import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
`;

interface StyledSelectProps {
  isOpen?: boolean;
}

export const StyledSelect = styled.div<StyledSelectProps>(
  ({ theme: { palette }, isOpen }) => `
    width: 100%;
    min-width: 100px;
    padding: 15px 20px;
    cursor: pointer;
    border: 1px solid ${palette.lightText};
    outline: none;
    font-style: normal;
    font-weight: normal;
    color: ${palette.primary};
    font-size: 16px;
    line-height: 150%;
    position: relative;
    
    svg {
      position: absolute;
      right: 10px;
      top: 40%;
      border-color: currentColor;
    }

    box-sizing: border-box;
    transition: border-radius 500ms;

    ${
      isOpen
        ? `
      border-top-left-radius: 16px;
      border-top-right-radius: 16px;
      `
        : 'border-radius: 16px;'
    }

    /* Replaced arrow icon */
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-size: 7px;
    background: ${palette.secondary};
  `,
);

export const Label = styled.label`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 150%;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

interface SelectListItemProps {
  selected: boolean;
}

export const SelectListItem = styled.div<SelectListItemProps>(
  ({ theme: { palette }, selected }) =>
    `
  cursor: pointer;
  width: 100%;
  padding: 10px 20px;
  line-height: 150%;
  font-size: 16px;
  transform: translate3d(0, 0, 1000px);
  z-index: 1000;

  ${selected ? `color: ${palette.hover}` : ''};

  :hover,
  :active {
    background: ${palette.action.hover};
    transition: background 200ms, color 200ms;
  }
`,
);

export const SelectList = styled.div`
  width: 100%;
  max-height: 317px;
  overflow: auto;
  position: absolute;
  z-index: 999;
  top: 52px;
  background: ${({ theme }) => theme.palette.secondary};
  border: 1px solid ${({ theme }) => theme.palette.lightText};
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  box-shadow: 0 20px 44px rgba(23, 75, 83, 0.08);

  ${SelectListItem}:last-of-type {
    :hover,
    :active {
      border-bottom-left-radius: 16px;
      border-bottom-right-radius: 16px;
    }
  }
`;

export const SelectContainer = styled.div`
  position: relative;
`;
