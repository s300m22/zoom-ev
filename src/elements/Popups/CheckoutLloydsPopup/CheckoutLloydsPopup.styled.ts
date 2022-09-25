import styled from 'styled-components';

export const CheckoutLloydsPopupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    max-width: 544px;
    padding: 10px 31px 20px 31px;
  }
`;

export const ImageWrapper = styled.div`
  display: flex;
  margin-bottom: 50px;
  max-height: 150px;

  img {
    object-fit: contain;
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 50px;
  justify-content: space-between;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    flex-wrap: nowrap;
  }

  button {
    width: 100%;
    margin-bottom: 15px;

    ${({ theme }) => theme.up(theme.breakpoints.sm)} {
      margin-bottom: 0;

      &:first-of-type {
        margin-right: 20px;
      }
    }
  }
`;
