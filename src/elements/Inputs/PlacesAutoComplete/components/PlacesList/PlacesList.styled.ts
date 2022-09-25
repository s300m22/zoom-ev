import styled from 'styled-components';

export const PlacesListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: calc(100% + 15px);
  left: 20px;
  right: 0;
  margin: 0;
  box-shadow: 0px 10px 34px rgba(23, 75, 83, 0.1);
  border-radius: 12px;
  background: #fff;
  border: 1px solid #ececec;
  list-style: none;
  padding: 20px;
  z-index: 1;
`;

export const PlaceRow = styled.li`
  color: ${({ theme }) => theme.palette.primary};
  border-bottom: 1px solid ${({ theme }) => theme.palette.lightText};
  padding: 10px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;

  &:last-of-type {
    padding-bottom: 0;
    border-bottom: none;
  }

  &:first-of-type {
    margin-top: 10px;
    border-top: 1px solid ${({ theme }) => theme.palette.lightText};
  }

  &:hover {
    span {
      color: ${({ theme }) => theme.palette.hover};
    }
  }
`;

export const MainText = styled.span`
  font-weight: 500;
  color: ${({ theme }) => theme.palette.primary};
`;

export const SecondaryText = styled.span`
  font-weight: 400;
  color: ${({ theme }) => theme.palette.gray};
  font-size: 12px;
`;

export const UseCurrentLocation = styled.div`
  padding: 0;
  color: ${({ theme }) => theme.palette.primary};
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 14px;

  &:hover {
    color: ${({ theme }) => theme.palette.hover};
  }

  svg {
    margin-right: 5px;
    width: 20px;
  }
`;
