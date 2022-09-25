import styled from 'styled-components';

export const RadioOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  border-radius: 12px;
`;

export const StyledRadio = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;

  &:checked ~ ${RadioOverlay} {
    border: 1px solid #34c9ca;
    color: ${({ theme }) => theme.palette.action.hover};
    background: #fff;

    ::before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: ${({ theme }) => theme.palette.action.selected};
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

export const Label = styled.label`
  display: flex;
  align-items: center;
  border-radius: 12px;
  background: rgba(106, 112, 125, 0.08);
  padding: 16px;
  user-select: none;
  margin-right: 4%;
  color: ${({ theme }) => theme.palette.gray};
  cursor: pointer;
  position: relative;

  span {
    z-index: 1;
  }

  &:last-of-type {
    margin-right: 0;
  }
`;
