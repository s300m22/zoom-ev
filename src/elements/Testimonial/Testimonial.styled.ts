import styled from 'styled-components';

export const TestimonialWrapper = styled.div(
  ({ theme: { up, breakpoints } }) => `
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 720px;
    
    img, svg {
      width: 100px;
      height: 100px;
      ${up(breakpoints.sm)} {
        width: 150px;
        height: 150px;
      }
    }

    ${up(breakpoints.md)} {
      margin: 5% 0;
    }
  `,
);

export const TestimonialQuote = styled.p`
  font-size: 18px;
  font-style: italic;

  ${({ theme }) => theme.up(theme.breakpoints.sm)} {
    font-size: 20px;
  }

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    font-size: 24px;
  }
`;

export const AuthorDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0 0;
`;

export const AuthorLocation = styled.p`
  margin: 5px 0;
  color: ${({ theme }) => theme.palette.gray};
`;
