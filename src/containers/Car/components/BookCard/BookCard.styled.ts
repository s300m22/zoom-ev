import styled from 'styled-components';

export const BookEvForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid #ececec;
  box-shadow: 0px 10px 34px rgba(23, 75, 83, 0.1);
  border-radius: 12px;
  margin-bottom: 15px;

  > div:first-of-type {
    border-bottom: 1px solid #ececec;
  }
`;

export const CostSummary = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const CostSummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  p {
    font-weight: 500;
  }
`;

export const CostSummaryTotal = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid #ececec;

  h4:first-of-type {
    color: ${({ theme }) => theme.palette.gray};
  }
`;

export const InfoText = styled.p`
  margin: 10px 0 30px;
  color: ${({ theme }) => theme.palette.gray};
  font-size: 12px;
  width: 100%;
  text-align: center;
`;
