import styled from 'styled-components';
import StatusEnum from '../StatusLabel/StatusEnum';

interface StatusIndicatorProps {
  status: StatusEnum;
}

const getColors = (status: StatusEnum) => {
  switch (status) {
    case StatusEnum.Pending:
      return 'color: #FBC814; background: rgba(251, 200, 20, 0.3); border: 1px solid #FBC814;';
    case StatusEnum.Rejected:
      return 'color: #fff; background: rgb(230 30 30 / 95%); border: 1px solid #c90025;';
    case StatusEnum.Approved:
      return 'color: #4caf50 background: rgba(30, 69, 31, 0.3); border: 1px solid #4caf50;';
    default:
      return '#061027';
  }
};

export const StatusBannerWrapper = styled.div<StatusIndicatorProps>`
  display: flex;
  border-radius: 12px;
  padding: 20px;
  font-weight: 500;
  align-items: center;
  ${({ status }) => getColors(status)};
`;

export const StatusBannerTextWrapper = styled.div`
  display: flex;
  margin-left: 30px;
`;
