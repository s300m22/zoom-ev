import { useState, ReactNode } from 'react';
import { QuestionIcon } from '../../icons';
import { TooltipWrapper, TooltipTip } from './Tooltip.styled';

type Directions = 'top' | 'right' | 'bottom' | 'left';

export interface TooltipProps {
  content: ReactNode;
  children?: ReactNode;
  delay?: number;
  direction?: Directions;
}

const Tooltip = ({
  content,
  children = <QuestionIcon />,
  delay = 400,
  direction = 'top',
}: TooltipProps) => {
  let timeout: ReturnType<typeof setTimeout>;
  const [active, setActive] = useState(false);

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, delay);
  };

  const hideTip = () => {
    clearInterval(timeout);
    setActive(false);
  };
  return (
    <TooltipWrapper onMouseEnter={showTip} onMouseLeave={hideTip}>
      {children}
      {active && <TooltipTip direction={direction}>{content}</TooltipTip>}
    </TooltipWrapper>
  );
};

export default Tooltip;
