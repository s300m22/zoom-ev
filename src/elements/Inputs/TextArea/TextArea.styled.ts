import styled from 'styled-components';
import { InputHTMLAttributes } from 'react';

interface StyledTextAreaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  maxWidth?: string;
  isError?: boolean;
  noResize?: boolean;
  isReadOnly: boolean;
}
export const TextAreaWrapper = styled.div`
  position: relative;
`;

export const StyledTextArea = styled.textarea<StyledTextAreaProps>`
  resize: ${({ noResize }) => noResize && 'none'};
  padding: 16px;
  background: ${({ theme: { palette }, isReadOnly }) =>
    isReadOnly ? palette.lightText : palette.secondary};
  cursor: ${({ isReadOnly }) => (isReadOnly ? 'not-allowed' : 'auto')};
  color: ${({ theme: { palette } }) => palette.primary};
  border: 1px solid ${({ isError, theme: { palette } }) => (isError ? palette.error : '#ececec')};
  box-sizing: border-box;
  border-radius: 12px;
  outline: none;
  width: 100%;
  min-height: 156px;
  max-width: ${({ maxWidth }) => maxWidth || '100%'};
  -webkit-appearance: none;

  ::-webkit-scrollbar {
    width: 4px;
    border-radius: 12px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: ${({ theme: { palette } }) => palette.lightGray};
    border-radius: 2px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export const TextAreaCounter = styled.div`
  position: absolute;
  bottom: 10px;
  right: 15px;
  color: ${({ theme: { palette } }) => palette.gray};
`;

export default StyledTextArea;
