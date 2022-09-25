import styled from 'styled-components';

export const CarCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.palette.secondary};
  color: ${({ theme }) => theme.palette.primary};
  padding: 10px;
  box-shadow: ${({ theme }) => theme.palette.boxShadow};
  border-radius: 12px;
  width: 352px;
`;

export const CarAvailableToBuyNotice = styled.div`
  position: absolute;
  color: white;
  background-color: black;
  border-radius: 10px;
  right: 20px;
  top: -16px;
  padding: 8px 22px;
  font-size: 14px;
  font-weight: 500;
  border: 1.5px solid white;
`;
export const CarImageWrapper = styled.div`
  position: relative;
  display: flex;
`;

export const PartnerLogo = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  border-radius: 6px;
  background: #fff;
  width: 80px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    border-radius: 6px;
    padding: 5px 10px;
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;

export const Paragraph = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.palette.gray};
`;

export const CarDescriptionWrapper = styled.div`
  padding: 20px;

  h4 {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const CarFooterWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 20px 20px 20px;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    flex-wrap: nowrap;
  }
`;

export const CarRatingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${({ theme }) => theme.palette.dark};

  svg {
    margin: 0 10px;
  }
`;
