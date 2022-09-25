import styled from 'styled-components';

export const PlacesAutoCompleteWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 18px 15px 12px;
  position: relative;

  > div {
    width: 100%;
  }

  input {
    padding: 9px 14px;
    background: ${({ theme: { palette } }) => palette.secondary};
    color: ${({ theme: { palette } }) => palette.primary};
    border: none;
    box-sizing: border-box;
    border-radius: 12px;
    outline: none;
    -webkit-appearance: none;
    width: 100%;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const LabelInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  position: relative;
`;

interface LabelProps {
  required?: boolean;
  isError?: boolean;
}

export const Label = styled.label<LabelProps>`
  font-size: 14px;
  line-height: 14px;
  margin: 0 0 0 15px;
  color: ${({ isError, theme: { palette } }) => (isError ? palette.error : palette.gray)};

  ${({ required, theme: { palette } }) =>
    required &&
    `
      :after {
        content: '*';
        color: ${palette.error};
      }
  `}
`;

export const CurrentLocationLoader = styled.div`
  position: absolute;
  top: 45%;
  right: 0;

  &::after {
    content: url('/images/icons/loader-spiner.svg');
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 10px;
    padding-top: 4px;
  }
`;
