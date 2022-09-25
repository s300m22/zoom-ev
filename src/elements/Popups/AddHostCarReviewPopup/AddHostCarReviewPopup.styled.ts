import styled from 'styled-components';
import { TextAreaWrapper } from '../../Inputs/TextArea/TextArea.styled';

export const AddHostCarReviewPopupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  text-align: center;
  align-items: center;
  width: 100%;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    width: 600px;
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;
  justify-content: space-between;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    flex-wrap: nowrap;
  }

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    margin-top: 80px;
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

export const AddUserReviewForm = styled.form``;

export const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    margin-top: 42px;
    display: grid;
    grid-template-columns: 120px 372px;
    grid-template-rows: 1fr;
    gap: 0px 52px;
  }

  ${TextAreaWrapper} {
    margin-top: 15px;

    + div {
      text-align: left;
    }
  }
`;
