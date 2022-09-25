import styled, { css } from 'styled-components';

export type ButtonVariant = 'contained' | 'outlined' | 'link' | 'text' | 'text_blue';

interface StyledButtonProps {
  variant: ButtonVariant;
}

export const defaultButton = () => css`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  padding: 16px 30px;
  border-radius: 72px;
  box-sizing: border-box;
  font-weight: 600;
  font-size: 14px;
  height: 50px;
  width: auto;
  cursor: pointer;
  margin: 0;
  overflow: hidden;
  text-decoration: none;
  outline: none;
  white-space: nowrap;
  border-color: transparent;
  color: ${({ theme }) => theme.palette.secondary};
  background: linear-gradient(90deg, #54c0ef 0%, #16d3a4 100%);

  :disabled {
    background: ${({ theme }) => theme.palette.action.disabledBackground};
    backdrop-filter: blur(44px);
    color: ${({ theme }) => theme.palette.action.disabled};
    cursor: not-allowed;
    pointer-events: all !important;
    border: 1px solid ${({ theme }) => theme.palette.action.disabled};

    :hover,
    :active {
      background: ${({ theme }) => theme.palette.action.disabledBackground};
      box-shadow: none;
    }

    :active::after {
      opacity: 1;
      transform: none;
    }
  }

  :hover,
  :active {
    background: linear-gradient(90deg, #459fc4 0%, #13b08a 100%);
    box-shadow: ${({ theme }) => theme.palette.boxShadow};
  }

  :focus {
    outline: 0;
  }

  // Overlay
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
`;

export const Arrow = styled.div`
  padding-left: 20px;
`;

export const Loader = styled.div`
  width: 36px;

  &::after {
    content: url('/images/icons/loader-spiner.svg');
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 10px;
    padding-top: 4px;
  }
`;

export const StyledButton = styled.button<StyledButtonProps>`
  ${defaultButton()}
  min-width: ${({ variant }) => (variant === 'text' ? 'unset' : '120px')};

  ${({ theme: { palette }, variant }) => {
    switch (variant) {
      case 'outlined': {
        return `
          border: 1px solid #34C9CA;
          color: ${palette.primary};
          background: ${palette.secondary};
          
          :hover, :active {
            background: ${palette.action.hover};
          }
    
          ${Arrow} {
            content: url("/images/icons/arrow-right-black.svg");
          }
        `;
      }
      case 'link': {
        return `
          border: none;
          color: ${palette.primary};
          font-weight: 700;
          background: ${palette.secondary};
          padding: 16px 20px;
          border-radius: 72px;
          box-shadow: 0px 10px 34px rgba(23, 75, 83, 0.1);
          position: relative;
    
          :hover, :active {
            background: ${palette.action.hover};
          }
    
          ${Arrow} {
            content: url("/images/icons/arrow-right-black.svg");
          }
        `;
      }
      case 'text':
      case 'text_blue': {
        return `
          border: none;
          color: ${variant === 'text' ? palette.primary : '#2ebff3'};
          background: transparent;
          font-weight: 700;
          padding: 0;
          
          :hover, :active {
            background: transparent;
            box-shadow: none;
            color: ${palette.hover};
          }
          
          ${Arrow} {
            content: url(${
              variant === 'text'
                ? '/images/icons/arrow-right-black.svg'
                : '/images/icons/arrow-right-blue.svg'
            } );
            height: 22px;
          }
        `;
      }
      case 'contained': {
        return `
          ${Arrow} {
            content: url("/images/icons/arrow-right-white.svg");
          }
        `;
      }
      default:
        return null;
    }
  }};
`;
