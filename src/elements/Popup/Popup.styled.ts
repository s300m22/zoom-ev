import styled from 'styled-components';

interface PopupWrapperProps {
  maxHeight: string;
}

export const PopupWrapper = styled.div<PopupWrapperProps>`
  display: flex;
  z-index: 999;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: auto;
  padding: 40px 15px 15px 15px;
  max-width: 100%;
  flex-direction: column;
  background: ${({ theme }) => theme.palette.secondary};
  color: ${({ theme }) => theme.palette.primary};
  box-shadow: ${({ theme }) => theme.palette.boxShadow};
  font-size: 16px;
  font-weight: 400;
  overflow-y: auto;
  max-height: calc(100vh - 55px);

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    padding: 40px 30px 30px 30px;
  }

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    max-width: 80%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 12px;
    bottom: initial;
    width: auto;
  }

  ${({ theme }) => theme.up(900, true)} {
    overflow: visible;
  }

  ${({ theme, maxHeight }) => theme.up(maxHeight.replace('px', ''), true)} {
    max-height: ${({ maxHeight }) => maxHeight};
  }
`;

export const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 998;
  background: rgba(6, 16, 39, 0.6);
  backdrop-filter: blur(44px);
`;

export const PopupTrigger = styled.span`
  &:focus {
    outline: none;
  }
`;

export const PopupClose = styled.div`
  position: absolute;
  right: 15px;
  top: 15px;
  width: 15px;
  height: 15px;
  opacity: 0.3;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }

  &::before,
  &::after {
    position: absolute;
    left: 10px;
    content: ' ';
    height: 17px;
    width: 2px;
    background-color: #333;
  }

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }
`;
