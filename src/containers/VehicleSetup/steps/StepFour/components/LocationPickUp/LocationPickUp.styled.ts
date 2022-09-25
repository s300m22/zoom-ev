import styled from 'styled-components';

interface MapWrapperProps {
  isError: boolean;
}

export const MapWrapper = styled.div<MapWrapperProps>`
  height: 276px;
  width: 100%;
  position: relative;
  margin-bottom: 30px;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;

  > div:first-of-type {
    height: 245px !important;
    border-radius: 12px;
    border: 1px solid ${({ isError, theme: { palette } }) => (isError ? palette.error : '#ececec')};
    overflow: hidden;
  }

  .gm-bundled-control-on-bottom {
    top: 0;
  }

  .gmnoprint > div {
    border-radius: 12px;
  }
`;

export const LocationMarker = styled.div`
  display: flex;
  background: #fff;
  box-shadow: 0px 10px 34px rgba(23, 75, 83, 0.1);
  border-radius: 12px;
  position: absolute;
  bottom: 0;
  left: 10px;
  right: 10px;
  padding: 10px;
  color: ${({ theme: { palette } }) => palette.gray};
  font-size: 14px;
`;

export const Error = styled.div`
  color: ${({ theme: { palette } }) => palette.error};
  font-size: 13px;
  margin: 5px 0px 5px 5px;
  min-height: 13px;
`;

interface LabelProps {
  required?: boolean;
  isError?: boolean;
}

export const Label = styled.label<LabelProps>`
  display: block;
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  color: ${({ isError, theme: { palette } }) => (isError ? palette.error : palette.dark)};
  margin: 0 0 20px;

  ${({ required, theme: { palette } }) =>
    required &&
    `
      :after {
        content: '*';
        color: ${palette.error};
      }
  `}
`;

export const MapMarkWrapper = styled.div`
  position: relative;

  svg {
    position: absolute;
    top: -34px;
    left: -10px;
  }
`;
