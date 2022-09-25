import styled from 'styled-components';

export const DialogWrapper = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DialogInner = styled.div`
  background-color: white;
  border-radius: 30px;
  width: 30%;
  max-width: 100%;
  min-width: 400px;
  min-height: 300px;
  padding: 3%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

export const DialogMessage = styled.div`
  text-align: center;
`;
export const DialogActionsHolder = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 25px;
`;

export const DialogMessageContent = styled.p``;

export const DialogPopupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    max-width: 444px;
    // padding: 10px 31px 20px 31px;
  }
`;
