import styled from 'styled-components';

export const EnquireWithSellerWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  white-space: nowrap;
  text-decoration: none;
  cursor: pointer;
  color: #ffffff;
`;

export const EnquireLink = styled.a`
  cursor: pointer;
  padding-left: 5px;
  padding-right: 5px;
  color: #ffffff;
  :hover {
    color: #54c0ef;
  }
`;

export const EnquireText = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  text-decoration: none;
  padding-right: 10px;
`;

export const PhoneNumberText = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  text-decoration: none;
  padding-left: 5px;
`;

export const CallIconOutlinedWrapper = styled.span`
  :hover {
    color: #54c0ef;
  }
`;
