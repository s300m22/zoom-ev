import styled from 'styled-components';
import { BoldText } from '../../../../../../../elements';
import ContentBoxWrapper from '../../../../../../../elements/ContentBox/ContentBox.styled';

export const AddressHolder = styled(BoldText)`
  margin-bottom: 30px;
`;

interface MapWrapperProps {
  isError: boolean;
  isReadOnly: boolean;
}

export const MapWrapper = styled.div<MapWrapperProps>`
  height: 276px;
  width: 100%;
  position: relative;
  margin-bottom: 60px;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;

  > div:first-of-type {
    height: 245px !important;
    border-radius: 12px;
    border: 1px solid ${({ isError, theme: { palette } }) => (isError ? palette.error : '#ececec')};
    overflow: hidden;
    cursor: ${({ isReadOnly }) => (isReadOnly ? 'not-allowed' : 'auto')};
    filter: ${({ isReadOnly }) => (isReadOnly ? 'grayscale(1)' : 'none')};

    > div:first-of-type {
      pointer-events: ${({ isReadOnly }) => (isReadOnly ? 'none' : 'auto')};
    }
  }

  .gm-bundled-control-on-bottom {
    top: 0;
  }

  .gmnoprint > div {
    border-radius: 12px;
  }
`;

export const LocationNotes = styled(ContentBoxWrapper)`
  color: ${({ theme }) => theme.palette.dark};
`;

export const MapMarkWrapper = styled.div`
  position: relative;

  svg {
    position: absolute;
    top: -34px;
    left: -10px;
  }
`;
