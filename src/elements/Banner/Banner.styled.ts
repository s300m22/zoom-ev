import styled from 'styled-components';

interface WrappersProps {
  variant: string;
}

export const BannerStandaloneWrapper = styled.div`
  margin: 40px 0;
`;

export const BaseWrapper = styled.div`
  display: flex;
  background: rgba(106, 112, 125, 0.08);
  border-radius: 12px;
  padding: 30px;
  justify-content: space-between;
  align-items: center;
`;

export const FullWidthWrapper = styled(BaseWrapper)<WrappersProps>(
  ({ theme: { down, breakpoints, palette }, variant }) => `
  display: flex;
  width: 100%;
  max-width: 1440px;
  justify-content: ${variant === 'centered' ? 'center' : 'space-between'};
  text-align: ${variant === 'centered' ? 'center' : 'left'};
  background: ${variant === 'secondary' ? palette.secondary : 'rgba(106, 112, 125, 0.08)'};

  ${down(breakpoints.md)} {
    flex-wrap: wrap;
    justify-content: flex-start;
  }
`,
);

export const FullWidthButtonWrapper = styled.div(
  ({ theme: { down, breakpoints } }) => `
  display: flex;
  justify-content: flex-end;
  width: 350px;
  
  ${down(breakpoints.md)} {
    margin-top: 20px;
    justify-content: flex-start;
    width: 100%;
  }
`,
);

export const FullWidthAligner = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  text-align: left;
`;

export const Wrapper = styled(BaseWrapper)<WrappersProps>`
  width: 100%;

  button {
    margin-top: 20px;
  }

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    max-width: 543px;
    width: auto;
  }
`;

export const Description = styled.div`
  p {
    font-size: 16px;
    line-height: 150%;
    color: ${({ theme }) => theme.palette.gray};
    margin: 10px 0 0 0;
  }
`;
