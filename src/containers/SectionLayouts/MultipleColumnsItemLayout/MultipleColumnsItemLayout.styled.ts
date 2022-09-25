import styled from 'styled-components';
import { StyledImage } from '../../../elements/Image/Image.styled';

export const HeaderWrapper = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 10px;
  min-height: 54px;

  ${({ theme: { up, breakpoints } }) => up(breakpoints.md)} {
    min-height: 72px;
  }
`;

export const WidthWrapper = styled.div`
  display: flex;
  justify-content: flex-start !important;
  align-items: center;
  width: 100%;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 352px;

  ${({ theme: { down, breakpoints } }) => down(breakpoints.md)} {
    margin-bottom: 30px;
    max-width: unset;
  }
`;

export const ImageContainer = styled.div`
  margin-bottom: 30px;
  ${StyledImage} {
    border-radius: 12px;
    object-fit: cover;
    width: 352px;
    height: 191px;

    ${({ theme: { down, breakpoints } }) => down(breakpoints.md)} {
      width: 100%;
    }
  }
`;

export const StyledReadMoreWrapper = styled.div`
  a,
  p {
    font-weight: bold;
  }
`;

export const DescriptionWrapper = styled.div`
  color: ${({ theme }) => theme.palette.gray};
  font-size: 16px;
  line-height: 150%;
  margin-bottom: 10px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 72px;
`;
