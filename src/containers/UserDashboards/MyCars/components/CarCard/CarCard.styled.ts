import styled from 'styled-components';
import { StatusLabelWrapper } from '../../../../../elements/StatusLabel/StatusLabel.styled';
import { SimpleCardWrapper } from '../../../../../elements/SimpleCard/SimpleCard.styled';

export const CarCardWrapper = styled(SimpleCardWrapper)<{ isHidden?: boolean }>`
  justify-content: space-between;
  flex-wrap: wrap;
  opacity: ${({ isHidden }) => (isHidden ? '0.5' : '1')};

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    flex-direction: row;
    flex-wrap: nowrap;
  }
`;

export const CarCardPhotoWrapper = styled.div`
  border-radius: 8px;
  width: 100%;
  height: auto;
  margin-bottom: 25px;
  position: relative;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    width: 200px;
    height: 155px;
    margin-bottom: 0;
  }
`;

export const CarCardPhotoLabel = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    font-size: 12px;
    padding: 10px;
    background: #f0f4f7;
    color: black;
    border-radius: 8px;
    line-height: 1;
    font-weight: 500;
  }
`;

export const CarImage = styled.img`
  object-fit: contain;
  width: 100%;
  height: 100%;
  border-radius: 8px;
`;

export const DefaultCar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ececec;
  border-radius: 8px;
  width: 100%;
  height: 100%;
  padding: 15px;
`;

export const CarCardDetails = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    width: auto;
    flex-wrap: nowrap;
  }
`;

export const CarCardAction = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 25px;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    width: auto;
  }

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    margin-top: 0;
    width: auto;
    justify-content: initial;
  }
  ${StatusLabelWrapper} {
    align-self: flex-start;
  }
`;

export const CarCardTextDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 100%;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    margin-left: 30px;
    text-align: left;
    width: auto;
  }
`;

export const CarCardTextRow = styled.div`
  display: flex;
  margin-bottom: 15px;
  justify-content: center;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    justify-content: initial;
  }

  &:last-of-type {
    margin-bottom: 0;
  }
`;

export const ReviewsRating = styled.span`
  font-weight: 400;
  font-size: 16px;
  margin-left: 20px;
  display: inline-flex;
  align-items: center;

  svg {
    margin-right: 10px;
  }
`;

export const NavigationButton = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  margin-right: 32px;
  justify-content: center;

  svg {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
    width: 37px;
    height: 37px;
    padding: 10px;
    border-radius: 50%;
    box-shadow: 0px 10px 34px rgba(23, 75, 83, 0.1);
    transition: 0.3s all;

    &:hover {
      box-shadow: 0px 20px 34px rgba(23, 75, 83, 0.2);
    }
  }

  :first-of-type {
    svg {
      background: linear-gradient(90deg, #54c0ef 0%, #16d3a4 100%);
    }
  }
  &:last-of-type {
    margin-right: 0;
  }
`;

export const CarCardStatCell = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-right: 60px;

  &:last-of-type {
    margin-right: 0;
  }
`;

export const CarCardStatCellTitle = styled.p`
  margin: 0 0 5px;
  color: ${({ theme }) => theme.palette.gray};
  font-size: 14px;
  width: 100%;
`;

export const CarCardStatCellDetails = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.palette.dark};
  font-weight: 600;
  width: 100%;
`;
