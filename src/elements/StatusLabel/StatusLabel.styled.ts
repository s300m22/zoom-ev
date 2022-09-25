import styled from 'styled-components';
import StatusEnum from './StatusEnum';
import { SimpleCardWrapper } from '../SimpleCard/SimpleCard.styled';
import { StatusesButtonsWrapper } from '../../containers/UserDashboards/Dashboard/components/Statuses/StatusesShared';

interface StatusIndicatorProps {
  status: StatusEnum;
}

const getIndicatorColor = (status: StatusEnum) => {
  switch (status) {
    case StatusEnum.Pending:
      return '#fbc814';
    case StatusEnum.Rejected:
      return '#f05828';
    case StatusEnum.Approved:
      return '#4caf50';
    case StatusEnum.InProgress:
      return '#00bff3;';
    case StatusEnum.Completed:
      return '#9fa4af';
    default:
      return '#fff';
  }
};

export const StatusLabelWrapper = styled(SimpleCardWrapper)`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 15px;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  border-radius: 72px;

  + ${StatusesButtonsWrapper} {
    margin-top: 14px;
  }
`;

export const StatusIndicator = styled.div<StatusIndicatorProps>`
  width: 10px;
  height: 10px;
  margin-right: 10px;
  border-radius: 50%;
  background-color: ${({ status }) => getIndicatorColor(status)};
`;

export default StatusLabelWrapper;
