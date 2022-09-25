import styled from 'styled-components';

type Directions = 'top' | 'right' | 'bottom' | 'left';

const tooltip = {
  margin: '35px',
  arrowSize: '8px',
  background: '#fff',
};

const getTooltipPosition = (direction: Directions) => {
  switch (direction) {
    case 'right':
      return `
        left: calc(100% + (${tooltip.arrowSize} * 2));
        top: 50%;
        transform: translateX(0) translateY(-50%);

        &::before {
          left: calc(${tooltip.arrowSize} * -1);
          top: 50%;
          transform: translateX(0) translateY(-50%);
          border-right-color: ${tooltip.background}!important;
        }
      `;
    case 'left':
      return `
        left: auto;
        right: calc(100% + (${tooltip.arrowSize} * 2));
        top: 50%;
        transform: translateX(0) translateY(-50%);
  
        &::before {
          left: auto;
          right: calc(${tooltip.arrowSize} * -2);
          top: 50%;
          transform: translateX(0) translateY(-50%);
          border-left-color: ${tooltip.background}!important;
        }
      `;
    case 'bottom':
      return `
        top: calc(100% + 15px);
        left: 50%;

        &::before {
          bottom: 100%;
          border-bottom-color: ${tooltip.background}!important;
        }
      `;
    default:
      return `
        bottom: calc(100% + 15px);

        &::before {
          left: 50%;
          bottom: calc(${tooltip.arrowSize} * -2);
          border-top-color: ${tooltip.background}!important;
        }
      `;
  }
};

export const TooltipWrapper = styled.div`
  display: inline-flex;
  width: auto;
  position: relative;
  margin-left: 7px;
  cursor: pointer;

  svg {
    height: 16px;
    width: auto;
  }
`;

interface TooltipTipProps {
  direction: Directions;
}

export const TooltipTip = styled.div<TooltipTipProps>(
  ({ theme: { palette }, direction }) => `
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    width: 250px;
    position: absolute;
    border-radius: 12px;
    left: 50%;
    transform: translateX(-50%);
    line-height: 1;
    z-index: 100;
    color: ${palette.gray};
    background: ${palette.secondary};
    border: 1px solid ${palette.lightText};
    box-shadow: ${palette.boxShadow};
    padding: 15px;
    ${getTooltipPosition(direction)};

    &::before {
      content: ' ';
      border: solid transparent;
      height: 0;
      width: 0;
      position: absolute;
      pointer-events: none;
      border-width: ${tooltip.arrowSize};
      margin-left: calc(${tooltip.arrowSize} * -1);
      box-shadow: ${palette.boxShadow};
    }
  `,
);
