import styled from 'styled-components';

export const ContactNumberWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ContactNumberHolder = styled.div`
  font-weight: 500;
  color: ${({ theme }) => theme.palette.dark};
  margin-top: 7px;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ theme }) => theme.up(theme.breakpoints.lg)} {
    justify-content: flex-start;
  }

  svg {
    margin-left: 5px;
    cursor: pointer;
  }
`;
