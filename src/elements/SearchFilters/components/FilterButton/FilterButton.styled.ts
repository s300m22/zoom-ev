import styled from 'styled-components';
import { RadioContent } from '../../../Inputs/FormRadioInput/FormRadioInput.styled';

interface FilterButtonProps {
  isActive: boolean;
}

export const FilterButtonWrapper = styled.div<FilterButtonProps>`
  cursor: pointer;
  position: relative;
  box-shadow: 0px 10px 34px rgba(23, 75, 83, 0.1);
  border-radius: 16px;
  background: #fff;
  padding: 15px 20px;
  min-width: 160px;
  width: 100%;
  height: 50px;
  margin-right: 32px;
  margin-bottom: 15px;
  color: ${({ theme }) => theme.palette.gray};
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: 0.6s box-shadow;
  white-space: nowrap;
  text-overflow: ellipsis;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    width: auto;
    margin-bottom: 0;
  }

  &:hover {
    box-shadow: ${({ theme }) => theme.palette.action.hoverShadow};
  }

  &:last-of-type() {
    margin-right: 0;
    margin-bottom: 0;
  }

  ${RadioContent} {
    justify-content: flex-start;
    font-weight: 500;
  }

  svg {
    pointer-events: none;
  }
`;

export const FilterBodyWrapper = styled.div`
  position: absolute;
  top: 60px;
  left: 0;
  background: #fff;
  border: 1px solid #f2f2f2;
  box-shadow: 0px 10px 24px rgba(6, 35, 112, 0.05);
  border-radius: 16px;
  transition: 0.6s box-shadow;
  padding: 30px;
  cursor: auto;
  z-index: 1;

  &:hover {
    box-shadow: ${({ theme }) => theme.palette.action.hoverShadow};
  }
`;

export const LabelWrapper = styled.div`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  pointer-events: none;
  padding-right: 10px;
`;
