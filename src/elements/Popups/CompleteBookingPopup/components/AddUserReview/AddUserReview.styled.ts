import styled from 'styled-components';
import { TextAreaWrapper } from '../../../../Inputs/TextArea/TextArea.styled';

export const AddUserReviewForm = styled.form`
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

export const x = styled.div``;
