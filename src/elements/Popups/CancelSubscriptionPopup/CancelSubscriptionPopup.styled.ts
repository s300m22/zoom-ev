import styled from 'styled-components';

export const Parapgraph = styled.p`
  color: ${({ theme }) => theme.palette.gray};
`;

export const CancelSubscriptionPopupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  li {
    font-size: 16px;
    margin: 10px 20px 10px 34px;
    color: ${({ theme }) => theme.palette.gray};
    font-weight: 500;
    line-height: 24px;
  }

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    max-width: 544px;
    padding: 10px 31px 20px 31px;
  }

  ${Parapgraph} {
    margin: 20px 0 10px;
    line-height: 24px;
  }
`;
export const ImageWrapper = styled.div`
  margin: 10px 0 30px;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;
  justify-content: space-between;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    flex-wrap: nowrap;
  }

  button {
    width: 100%;
    margin-bottom: 15px;

    ${({ theme }) => theme.up(theme.breakpoints.sm)} {
      margin-bottom: 0;
      width: auto;

      &:first-of-type {
        margin-right: 20px;
      }
    }
  }
`;
