import styled from 'styled-components';

export const OutroWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f4f7;
  z-index: 2;
`;

export const OutroInnerWrapper = styled.div`
  max-width: 725px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  padding: 0 15px;

  button {
    align-self: center;
  }
`;

export const OutroParagraph = styled.p`
  margin: 20px 0 50px;
  color: ${({ theme }) => theme.palette.gray};
  line-height: 24px;
`;
