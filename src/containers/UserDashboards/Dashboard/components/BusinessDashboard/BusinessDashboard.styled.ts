import styled from 'styled-components';

export const BusinessDashboardWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

export const FilterButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  flex-wrap: wrap;
  border-bottom: 1px solid #ececec;
  padding-bottom: 15px;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    justify-content: flex-end;
  }
`;

interface FilterButtonProps {
  isActive: boolean;
  counter: number;
}

export const FilterButton = styled.button<FilterButtonProps>`
  cursor: pointer;
  color: #718096;
  background: ${({ isActive }) => (isActive ? '#dfe5e9' : 'none')};
  padding: 10px 20px;
  border-radius: 37px;
  font-weight: 500;
  font-size: 14px;
  border: none;
  position: relative;
  margin-right: 10px;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    margin-right: 0px;
  }

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    margin-right: 10px;
  }

  &:last-of-type {
    margin-right: 0;
  }

  &:after {
    content: '${({ counter }) => counter || 0}';
    position: absolute;
    right: -8px;
    top: -8px;
    border-radius: 50%;
    font-size: 10px;
    width: 25px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fbc814;
    color: #fff;
    font-weight: 500;
  }
`;
