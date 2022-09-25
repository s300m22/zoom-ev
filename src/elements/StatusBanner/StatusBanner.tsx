import { ReactNode } from 'react';
import { StatusLabel } from '../StatusLabel';
import { StatusBannerWrapper, StatusBannerTextWrapper } from './StatusBanner.styled';
import StatusEnum from '../StatusLabel/StatusEnum';

export interface StatusBannerProps {
  status: StatusEnum;
  children?: ReactNode;
  statusText: string;
}

const StatusBanner = ({ status, statusText, children }: StatusBannerProps) => (
  <StatusBannerWrapper status={status}>
    <StatusLabel status={status}>{statusText}</StatusLabel>
    <StatusBannerTextWrapper>{children}</StatusBannerTextWrapper>
  </StatusBannerWrapper>
);

export default StatusBanner;
