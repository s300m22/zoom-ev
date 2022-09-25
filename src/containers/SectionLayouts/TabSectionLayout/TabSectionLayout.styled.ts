import styled from 'styled-components';
import { Container } from '../../../elements';

interface WrapperProps {
  background?: string;
  layout?: 'top' | 'bottom' | 'left' | 'right' | 'overlay';
  padding?: string;
}

export const Wrapper = styled(Container)<WrapperProps>(
  ({ theme: { breakpoints, up }, padding }) => `
    display: flex;
    align-items: center;
    justify-content: center;

    ${up(breakpoints.md)} {
      padding: ${padding || 0};
    }
  `,
);

export const DescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const TabsSection = styled.div(
  ({ theme: { breakpoints, up, palette } }) => `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    color: ${palette.primary};

    ${up(breakpoints.md)} {
      padding: 50px 0;
    }
  `,
);
