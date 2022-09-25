import styled from 'styled-components';

export const AwardsTrustpilotSectionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 5vmax 15px;
  color: ${({ theme }) => theme.palette.dark};
  background: #eef3f6;
  position: relative;

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    padding: 130px 0 110px;
  }

  &:after {
    content: '';
    position: absolute;
    z-index: -1;
    width: 150vw;
    height: 100%;
    left: -50vw;
    top: 0;
    background: #eef3f6;
  }
`;

export const AwardsTrustpilotSectionTitle = styled.div`
  display: flex;
  justify-content: center;
  max-width: 853px;
  text-align: center;
  margin: 0 auto 40px;
`;

export const AwardsListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
`;

export const AwardsListItem = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  color: ${({ theme }) => theme.palette.dark};
  font-weight: 500;
  margin: 30px 0;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    width: calc(100% / 2);
    margin: 40px 0;
  }

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    width: calc(100% / 3);
  }
`;

export const AwardsListItemImage = styled.div`
  width: auto;
  margin-right: 20px;
`;

export const AwardsListItemText = styled.div`
  width: 65%;
  display: flex;
`;

export const TrustpilotWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px auto 50px;
  justify-content: center;
  max-width: 252px;
  padding: 0 10px;

  svg {
    width: 125px;
    margin-bottom: 10px;
  }
`;

export const TrustpilotScore = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
