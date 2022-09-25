import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    width: 65%;
    flex-shrink: 0;
    flex-grow: 0;
  }
  .right {
    text-align: right;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    flex-direction: column;
    .price {
      font-size: 40px;
      display: block;
    }
  }
`;

export const EnquireWithSellerLink = styled.a`
  font-weight: 600;
  font-size: 15px;
`;
