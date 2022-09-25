import styled from 'styled-components';
import { Container } from '../../elements';
import { StyledButton } from '../../elements/Button/Button.styled';

export const Wrapper = styled(Container)(
  ({ theme: { breakpoints, down } }) => `
  min-height: 850px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 50px;
  
  ${down(breakpoints.md)} {
    min-height: 600px;
  }
`,
);

export const BackgroundTitle = styled.p`
  position: absolute;
  z-index: -1;
  font-weight: 700;
  color: ${({ theme: { palette } }) => palette.lightText};
  font-size: min(430px, max(140px, 35vw));
  top: 0;
  margin-block-start: 0;
  margin-block-end: 0;
`;

export const Title = styled.h1(
  ({ theme: { breakpoints, down } }) => `
  font-weight: 700;
  font-size: 60px;
  line-height: 120%;
  margin-block-start: 0;
  margin-block-end: 0;
  ${down(breakpoints.sm)} {
    font-size: 50px;
  }
`,
);

export const Content = styled.div`
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;

  ${StyledButton} {
    margin-top: 30px;
  }
`;

export const Description = styled.p`
  color: ${({ theme: { palette } }) => palette.gray};
`;
