import styled from 'styled-components';
import { SimpleCardWrapper } from '../../../../../elements/SimpleCard/SimpleCard.styled';

export const CardInnerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    flex-direction: row;
  }

  > div {
    display: flex;

    ${({ theme }) => theme.up(theme.breakpoints.sm)} {
      padding-right: 15px;
    }
  }

  button {
    margin-top: 25px;

    ${({ theme }) => theme.up(theme.breakpoints.sm)} {
      margin-right: 10px;
      margin-top: 0;
    }
  }
`;

export const WaitingBundleCardStyled = styled(SimpleCardWrapper)`
  padding: 10px !important;
  margin-bottom: 10px;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

export const ImageWrapper = styled.div`
  background: #ffffff;
  border: 1px solid #ececec;
  border-radius: 8px;
  height: 80px;
  width: 130px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 23px 16px;

  img {
    max-height: 100%;
  }
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 30px;

  p {
    font-size: 14px;
    color: ${({ theme: { palette } }) => palette.gray};
    margin: 6px 0;
  }
`;
