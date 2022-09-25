import styled from 'styled-components';

export const NotificationsWrapper = styled.div`
  background-color: white;
  border-radius: 15px;
  padding: 5px 15px;
  margin: 20px 0;
`;

export const NotificationItem = styled.a`
    display: block;
    padding 25px 5px;
    border-bottom: 1px solid rgba(0,0,0,0.05);
    cursor: pointer;
    &:last-child {
        border-bottom: 0;
    }
`;
