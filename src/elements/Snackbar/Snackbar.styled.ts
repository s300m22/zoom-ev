import styled, { css, keyframes } from 'styled-components';
import { Theme } from '../../layouts/Theme';

const fadeIn = keyframes`
  0% {
    bottom: 0;
    opacity: 0;
  }
  100% {
    bottom: 30px;
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  0% {
    bottom: 30px;
    opacity: 1;
  }
  100% {
    bottom: 0;
    opacity: 0;
  }
`;

const HideAnimation = () => css`
  visibility: hidden;
  animation: ${fadeOut} 0.5s;
`;

const OpenAnimation = () => css`
  visibility: visible;
  animation: ${fadeIn} 0.5s;
`;

export type SnackbarType = 'info' | 'success' | 'warning' | 'error';

interface GetSnackbarColorsProps {
  type: SnackbarType;
  theme: Theme;
}

const getSnackbarColor = ({ type, theme: { palette } }: GetSnackbarColorsProps) => {
  const { primary, lightText } = palette;

  switch (type) {
    case 'info':
      return primary;
    default:
      return lightText;
  }
};

const getSnackbarBackground = (props: GetSnackbarColorsProps) => {
  const { type, theme } = props;
  const { error, success, warning, lightText } = theme.palette;

  switch (type) {
    case 'error':
      return error;
    case 'warning':
      return warning;
    case 'success':
      return success;
    default:
      return lightText;
  }
};

export interface SnackbarWrapperProps {
  open?: boolean;
  type: SnackbarType;
}

export const SnackbarWrapper = styled.div<SnackbarWrapperProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 250px;
  min-height: 50px;
  width: 90%;
  text-align: center;
  padding: 16px 62px 16px 16px;
  position: fixed;
  z-index: 999;
  left: 50%;
  transform: translateX(-50%);
  bottom: 30px;
  box-shadow: ${({ theme: { palette } }) => palette.boxShadow};
  border-radius: 12px;
  transition: visibility 0.5s;
  font-size: 16px;
  line-height: 150%;
  background: ${getSnackbarBackground};
  color: ${getSnackbarColor};

  ${({ open }) => (open ? OpenAnimation : HideAnimation)}

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    width: auto;
  }
`;

const closeButtonSize = '21px';

interface CloseButtonProps {
  type: SnackbarType;
}

export const CloseButton = styled.div<CloseButtonProps>`
  position: absolute;
  top: 17px;
  width: ${closeButtonSize};
  height: ${closeButtonSize};
  right: ${closeButtonSize};
  opacity: 1;
  :hover {
    opacity: 0.5;
    cursor: pointer;
  }
  :before,
  :after {
    position: absolute;
    left: calc(${closeButtonSize} / 2);
    content: '';
    height: ${closeButtonSize};
    width: 2px;
    background-color: ${({ type, theme }) => getSnackbarColor({ type, theme })};
  }
  :before {
    transform: rotate(45deg);
  }
  :after {
    transform: rotate(-45deg);
  }
`;
