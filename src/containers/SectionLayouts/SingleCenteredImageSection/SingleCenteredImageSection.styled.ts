import styled from 'styled-components';

interface SingleCenteredImageSectionWrapperProps {
  background: string;
  padding: string;
}

export const SingleCenteredImageSectionWrapper = styled.div<SingleCenteredImageSectionWrapperProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 5vmax 15px 5vmax;
  color: ${({ theme }) => theme.palette.gray};
  background: ${({ background }) => background};
  position: relative;

  &:after {
    content: '';
    position: absolute;
    z-index: -1;
    width: 150vw;
    height: 100%;
    left: -50vw;
    top: 0;
    background: ${({ background }) => background};

    ${({ theme }) => theme.up(theme.breakpoints.md)} {
      content: none;
    }
  }

  p {
    color: ${({ theme }) => theme.palette.gray};
    margin: 10px 0;
  }

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    padding: ${({ padding }) => padding};
  }
`;

export default SingleCenteredImageSectionWrapper;
