import styled from 'styled-components';

export const SimpleCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.palette.secondary};
  color: ${({ theme }) => theme.palette.primary};
  padding: 20px;
  box-shadow: ${({ theme }) => theme.palette.boxShadow};
  border-radius: 12px;
  transition: 0.6s box-shadow;
  position: relative;

  &:hover {
    box-shadow: ${({ theme }) => theme.palette.action.hoverShadow};
  }

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    padding: 30px;
  }
`;

interface SimpleCardFooterProps {
  variant: 'light' | 'dark';
}

export const SimpleCardFooter = styled.div<SimpleCardFooterProps>`
  background: ${({ theme }) => theme.palette.lightBackground};
  border-top: 1px solid #f2f2f2;
  margin: 20px -20px -20px -20px;
  padding: 20px;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    padding: 30px;
    margin: 30px -30px -30px -30px;
  }
  p {
    margin: 0;
    line-height: 21px;
  }
`;
