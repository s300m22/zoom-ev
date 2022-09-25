import styled from 'styled-components';

export const ContentWrapper = styled.div`
  position: relative;

  padding-top: 20px;
  padding-bottom: 20px;
  justify-content: space-between;
  align-items: start;

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    display: flex;
    flex-direction: row-reverse;
  }
`;

interface SidebarComponentProps {
  expanded?: boolean;
}

export const SidebarComponent = styled.div<SidebarComponentProps>(
  ({ theme: { breakpoints, up } }) => `
  position: relative;
  top: 20px;
  right: 0;
  width: 100%;
  background-color: white;
  flex-shrink: 0;
  box-shadow: 0px 10px 34px rgba(23, 75, 83, 0.1);
  border-radius: 20px;
  overflow: hidden;
  z-index: 999;
  max-height: 80vh;
  overflow: auto;

  ${up(breakpoints.md)} {
    width: 350px;
    position: sticky;
  }
`,
);

interface SidebarComponentBlockProps {
  active?: boolean;
}

export const SidebarComponentBlock = styled.div<SidebarComponentBlockProps>(
  ({
    theme: {
      palette: { blue },
    },
    active,
  }) => `
  padding: 20px;
    display: block;
    border-bottom: 1px solid #f7f7f7;
    border-left: 3px solid

    ${active ? blue : 'transparent'};
    ${
      active
        ? `
        color: black;
        font-weight: 600;
      
        `
        : `
        color: gray;
    `
    }

    :hover {
      color: black;
      font-weight: 600;
      cursor: pointer;
      border-left: 3px solid ${blue};
    }
 
  `,
);

export const SidebarComponentBlockTitle = styled.h1``;
export const SidebarComponentBlockItemTitle = styled.h3`
  display: inline;
  margin-right: 5px;
`;

export const SidebarComponentBlockItemContent = styled.div`
  margin-bottom: 25px;
  color: rgb(106, 112, 125);
  p {
    margin-top: 20px;
    margin-bottom: 20px;
    line-height: 150%;
  }
`;
export const SidebarHeader = styled.h3`
  padding: 20px;
`;

export const ContentComponent = styled.div`
  width: 100%;
  flex-shrink: 0;
  flex-grow: 0;
  padding-top: 20px;

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    width: calc(100% - 380px);
  }
`;

export const ContentComponentTitle = styled.h3`
  color: black;
`;

export const BlockIndent = styled.span`
  padding-left: 2px;
  padding-right: 10px;
`;

export const BackToTopButton = styled.a`
  position: fixed;
  bottom: 20px;
  width: 90%;
  max-width: 300px;
  margin: auto;
  background-color: white;
  flex-shrink: 0;
  box-shadow: 0px 10px 34px rgba(23, 75, 83, 0.1);
  border-radius: 20px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
