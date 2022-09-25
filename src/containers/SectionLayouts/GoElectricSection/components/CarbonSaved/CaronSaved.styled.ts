import styled from 'styled-components';

export const CarbonSavedWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    flex-direction: row;
  }
`;

export const CarIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin: 15px 0 25px;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    margin: 15px 40px 0 0;
  }
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const Paragraph = styled.p`
  margin: 0;
`;
