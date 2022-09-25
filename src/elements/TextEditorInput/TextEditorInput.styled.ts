import styled from 'styled-components';
import { InputContainer } from '../Inputs';

interface TextEditorInputWrapperProps {
  isError: boolean;
  isReadOnly: boolean;
}

export const TextEditorInputWrapper = styled(InputContainer)<TextEditorInputWrapperProps>`
  .quill {
    * {
      font-family: inherit;
    }

    > div {
      border-color: ${({ isError, theme: { palette } }) => (isError ? palette.error : '#ececec')};
    }

    .ql-toolbar {
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
      background-color: #f8f8f8;
    }

    .ql-container {
      border-bottom-left-radius: 6px;
      border-bottom-right-radius: 6px;
      color: ${({ isError, theme: { palette } }) => (isError ? palette.error : palette.primary)};

      &.ql-disabled {
        border-radius: 16px;
        border: 1px solid #ececec;
        background: ${({ theme }) => theme.palette.lightText};
        color: ${({ theme }) => theme.palette.gray};
        cursor: not-allowed;

        * {
          cursor: not-allowed;
        }
      }
    }

    .ql-editor {
      min-height: 145px;
    }
  }
`;

interface LabelProps {
  required?: boolean;
  isError?: boolean;
}

export const Label = styled.label<LabelProps>`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 150%;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  width: 100%;
  color: ${({ isError, theme: { palette } }) => (isError ? palette.error : palette.primary)};

  ${({ required, theme: { palette } }) =>
    required &&
    `
      :after {
        content: '*';
        color: ${palette.error};
      }
  `}
`;

export const Error = styled.div`
  color: ${({ theme: { palette } }) => palette.error};
  font-size: 13px;
  margin: 5px 0px 5px 5px;
  min-height: 13px;
`;
