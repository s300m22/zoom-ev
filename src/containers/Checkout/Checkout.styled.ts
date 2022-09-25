import styled from 'styled-components';

export const CheckoutWrapper = styled.div``;

export const CheckoutForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    flex-wrap: nowrap;
  }

  > div {
    width: 100%;

    ${({ theme }) => theme.up(theme.breakpoints.md)} {
      width: 48%;
    }
  }
`;

export const LeftSideWrapper = styled.div`
  > div {
    margin-bottom: 30px;
  }

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    max-width: 544px;
  }
`;

export const RightSideWrapper = styled.div`
  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    max-width: 544px;
  }
`;


export const HowItWorks = styled.div`
  ${({ theme }) => theme.up(theme.breakpoints.md)} {
   
    font-family: Rubik;
    font-size: 24px;
    font-weight: 700;
    line-height: 29px;
    letter-spacing: 0em;
    text-align: left;

  }
`;
