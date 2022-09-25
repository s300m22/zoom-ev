import styled from 'styled-components';

export const ShowDiscountCode = styled.a`
  color: ${({ theme }) => theme.palette.blue};
  font-size: 18px;
  line-height: 21px;
  text-decoration: underline;
  cursor: pointer;
  display: block;
`;

export const DiscountCodeWrapper = styled.div`
  margin: 30px 0 30px 0;
`;

export const DiscountForm = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    flex-wrap: nowrap;
  }

  input + div {
    display: none;
  }

  button {
    width: 100%;
    margin-top: 15px;

    ${({ theme }) => theme.up(theme.breakpoints.sm)} {
      margin-left: 20px;
      margin-right: 20px;
      margin-top: 0px;
      width: auto;
    }
  }

  svg {
    display: none;
    cursor: pointer;

    ${({ theme }) => theme.up(theme.breakpoints.sm)} {
      display: block;
    }
  }
`;

export const PromoCodeApplied = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    flex-wrap: nowrap;
  }

  h6 {
    color: ${({ theme }) => theme.palette.dark};
    margin: 0 20px 0 0;
  }
`;

export const PromoCodeText = styled.span`
  color: ${({ theme }) => theme.palette.gray};

  svg {
    cursor: pointer;
    margin: 0 20px;
  }
`;

export const PromoCodeValue = styled.span`
  color: ${({ theme }) => theme.palette.primary};
`;
