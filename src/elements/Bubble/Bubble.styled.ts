import styled from 'styled-components';

type Directions = 'top' | 'right' | 'bottom' | 'left';

const tooltip = {
  margin: '35px',
  arrowSize: '8px',
  background: '#fff',
};

const getBuublePosition = (direction: Directions) => {
  switch (direction) {
    case 'right':
      return `
        &::before {
          left: calc(${tooltip.arrowSize} * -1);
          top: 50%;
          transform: translateX(0) translateY(-50%);
          border-right-color: ${tooltip.background}!important;
        }
      `;
    case 'left':
      return `
        &::before {
          transform: translateX(0) translateY(-50%);
          border-left-color: ${tooltip.background}!important;
        }
      `;
    case 'bottom':
      return `
        &::before {
          bottom: 100%;
          border-bottom-color: ${tooltip.background}!important;
        }
      `;
    default:
      return `
        &::before {
          left: 50%;
          bottom: calc(${tooltip.arrowSize} * -2);
          border-top-color: ${tooltip.background}!important;
        }
      `;
  }
};

interface BubbleProps {
  direction: Directions;
}

const BubbleWrapper = styled.div<BubbleProps>(
  ({ theme: { palette, breakpoints, up }, direction }) => `
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    text-align: left;
    font-size: 14px;
    width: 100%;
    white-space: wrap;
    border-radius: 12px;
    line-height: 21px;
    color: ${palette.gray};
    background: ${palette.secondary};
    border: 1px solid ${palette.lightText};
    box-shadow: ${palette.boxShadow};
    padding: 20px;

    P {
      width: 100%;
      text-align: left;
      margin: 20px 0 0;
    }
  
    ${up(breakpoints.md)} {
      ${getBuublePosition(direction)};
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

    }
  `,
);

export default BubbleWrapper;
