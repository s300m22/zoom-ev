import styled from 'styled-components';
import { LinkWrapper } from '../../StyledLink/StyledLink.styled';

interface LabelProps {
  required?: boolean;
  isError?: boolean;
  readOnly?: boolean;
}

export const Checkmark = styled.span`
  position: absolute;
  top: calc(50% - 12px);
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #fff;
  border: 2px solid #ececec;
  border-radius: 6px;

  &::before {
    content: '';
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAHCAYAAAA1WQxeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABXSURBVHgBdY4LDcAgDESZAyQgASlzMCmbhDmahElAAhKOI1wTwuclF2h61/ZwCwB4Pr/bQcOHRqpFkryarzWpYAYo9eifqWjjQmcyrnFnVKpy7w47pyQpurduYotQwowAAAAASUVORK5CYII=');
    display: none;
    z-index: 2;
    position: absolute;
    background-size: cover;
    width: 10px;
    height: 8px;
    top: 6px;
    left: 5px;
  }

  &::after {
    content: '';
    position: absolute;
    display: none;
    left: 1px;
    top: 1px;
    width: 19px;
    height: 19px;
    background: linear-gradient(90deg, #54c0ef 0%, #16d3a4 100%);
    border-radius: 4px;
  }
`;

export const CheckboxLabel = styled.label<LabelProps>`
  display: flex;
  align-items: center;
  font-size: 16px;
  color: ${({ isError, theme: { palette } }) => (isError ? palette.error : palette.primary)};
  font-weight: 400;
  display: block;
  position: relative;
  padding-left: 35px;
  cursor: pointer;
  user-select: none;
  text-align: left;
  line-height: 24px;
  white-space: break-spaces;

  * {
    line-height: 24px;
  }

  ${({ required, theme: { palette } }) =>
    required &&
    `
      input + span {
        position: relative;
        &:after {
          content: '*';
          color: ${palette.error};
        }
      }
  `}

  ${({ readOnly, theme: { palette } }) =>
    readOnly &&
    `
      pointer-events: none;

      input + span {
        color: ${palette.gray} !important;
      }

      ${Checkmark} {
        &:after {
          background: ${palette.lightGray};
        }
      }
  `}

  ${LinkWrapper} {
    a {
      font-weight: 400;
    }
  }
`;

export const StyledInput = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;

  &:checked + span {
    color: ${({ theme }) => theme.palette.primary};
  }

  &:checked ~ ${Checkmark}::after, &:checked ~ ${Checkmark}::before {
    display: block;
  }
`;

export const Error = styled.div`
  color: ${({ theme: { palette } }) => palette.error};
  font-size: 13px;
  margin: 5px 0px 5px 35px;
  height: 13px;
`;
