import styled from 'styled-components';

export const SummaryBox = styled.div`
  border: 1px solid #ececec;
  border-radius: 12px;
  display: flex;
  padding: 10px 10px 20px;
  margin-top: 30px;
  flex-wrap: wrap;
`;

export const SummaryBoxCarDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  margin-top: 10px;
`;

export const CarCardPhotoWrapper = styled.div`
  border-radius: 8px;
  width: 100%;
  height: auto;
  margin-bottom: 25px;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    width: 130px;
    margin-bottom: 0;
  }
`;

export const AvarageRatings = styled.div`
  display: flex;
  align-items: center;

  svg {
    margin-right: 5px;
  }
`;

export const CarReviewsCountsWrapper = styled.span`
  margin-left: 5px;
  display: inline-block;
  color: ${({ theme }) => theme.palette.gray};
`;

export const TotalBox = styled.div`
  display: flex;
  padding: 33px 30px;
  margin: 0 -30px 30px;
  border-bottom: 1px solid #ececec;
  border-top: 1px solid #ececec;
  flex-direction: column;
`;

export const AgreementsForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

export const ButtonWrapper = styled.div`
  background: rgba(240, 244, 247, 0.6);
  border: 1px solid #f2f2f2;
  padding: 30px;
  margin: 20px -30px -30px;
  display: flex;
  justify-content: center;
`;

export const SplitBox = styled.div`
  border-top: 1px solid #f2f2f2;
  margin: 30px -30px 0;
  padding: 30px;
  display: flex;
  flex-direction: column;

  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

export const SummaryInfoText = styled.p`
  margin: 10px 0 0;
  color: ${({ theme }) => theme.palette.gray};
  font-size: 12px;
  width: 85%;
  text-align: left;
  white-space: pre-wrap;
`;

export const PriceBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
