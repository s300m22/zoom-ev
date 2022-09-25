import styled from 'styled-components';
import { CustomStylesContainer } from '../SectionContainer/SectionContainer.styled';

export const TabsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const TabsBar = styled.div(
  ({ theme: { up, breakpoints } }) => `
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 4px;
    margin: 25px 0;

    ${up(breakpoints.sm)} {
      justify-content: space-between;
      flex-direction: row;
      flex-wrap: nowrap;
      margin: 50px 0;
    }

    h1 {
      margin-right: 25px;
      margin-bottom: 25px;

      ${up(breakpoints.sm)} {
        margin-bottom: initial;
      }
    }
  `,
);

export const TabWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const TabDescriptionWrapper = styled.div(
  ({ theme: { up, palette, breakpoints } }) => `
    color: ${palette.gray};
    font-size: 16px;
    line-height: 170%;
    width: 100%;
    margin: 35px 0 55px;

    ${up(breakpoints.lg)} {
      width: 57%;
    }

    h3 {
      color: ${palette.primary};
    }

    + ${CustomStylesContainer} {
      padding-top: 0;
    }
  `,
);

interface TabsBarLinksWrapperProps {
  width?: string;
}

export const TabsBarLinksWrapper = styled.div<TabsBarLinksWrapperProps>(
  ({ theme: { up, breakpoints }, width }) => `
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    width: 100%;
    padding: 4px;
    border-radius: 12px;
    background: rgba(106, 112, 125, 0.08);
    box-shadow: inset 0px 2px 0px rgba(6, 16, 39, 0.05);
    align-self: center;

    ${up(breakpoints.sm)} {
      justify-content: space-between;
      flex-direction: row;
      width: auto;
      margin: ${width === 'auto' ? 0 : '0 auto'};
    }

    ${up(breakpoints.md)} {
      width: ${width || '100%'};

    }
  `,
);

interface TabLinkProps {
  width?: string;
}

export const TabLink = styled.a<TabLinkProps>(
  ({ theme: { breakpoints, up, palette }, width }) => `
    color: ${palette.gray};
    font-weight: 600;
    padding: 12px;
    cursor: pointer;
    font-size: 14px;
    text-align: center;
    min-width: 100%;
    text-transform: capitalize;

    &.active {
      color: ${palette.primary};
      background: #fff;
      border-radius: 8px;
      box-shadow: 0px 10px 34px rgba(23, 75, 83, 0.1);
    }
${up(breakpoints.sm)} {
      min-width: 135px;
    }
    ${up(breakpoints.md)} {
      min-width: ${width || '210px'};
    }
  `,
);

export const FaqCard = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: ${({ theme }) => theme.palette.boxShadow};
  border-radius: 12px;
  padding: 30px;
  width: 100%;
`;
