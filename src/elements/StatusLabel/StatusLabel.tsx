import { ReactNode } from 'react';
import StatusEnum from './StatusEnum';
import { StatusLabelWrapper, StatusIndicator } from './StatusLabel.styled';

export interface StatusLabelProps {
  status: StatusEnum;
  children?: ReactNode;
}

const StatusLabel = ({ status, children }: StatusLabelProps) => (
  <StatusLabelWrapper>
    <StatusIndicator status={status} />
    {children}
  </StatusLabelWrapper>
);

export default StatusLabel;
