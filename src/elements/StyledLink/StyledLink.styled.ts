import styled from 'styled-components';

// It gives ability to add reference in other styled-components styles,
// by adding styled-components empty instance
// https://styled-components.com/docs/advanced#caveat
export const LinkWrapper = styled.span``;

export const Paragraph = styled.p`
  color: ${({ theme }) => theme.palette.primary};
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  cursor: pointer;
  display: flex;
  align-items: center;

  :hover {
    color: ${({ theme }) => theme.palette.hover}!important;
  }

  svg {
    margin-right: 12px;
  }
`;

interface LinkProps {
  color: 'primary' | 'secondary' | 'blue';
}

export const Link = styled.a<LinkProps>(
  ({ color, theme: { palette, getLinkStyle } }) => `
    ${getLinkStyle(color)}
    font-weight: 500;
    line-height: 150%;
    cursor: pointer;
      
    :hover {
      color: ${palette.hover}!important;
    }
  `,
);

export const DropdownLink = styled.div(
  ({ theme: { up, breakpoints } }) => `
  padding: 18px 0;
  margin-right: calc(5% - 18px); 
  position: relative;
  width: 100%;
  ${up(breakpoints.sm)} {
    width: fit-content;
  }

  .ltt {
    justify-content: space-between!important;
    ${up(breakpoints.sm)} {
      font-size: 14px;
    }
  }
  span {
    display: block;
  }
  
  .menu {
    display:block;
    background-color: white;
    position: relative;
    padding: 5px;
    padding-left: 20px;

    p {
      padding: 24px;
    }
    span {
      a {
        padding: 18px 0;
      }
    }

    ${up(breakpoints.md)} {
      display: none;
      position: absolute;
      left: 0;
      top: calc(100% - 6px);
      box-shadow: 2px 0px 10px 0px rgb(0 0 0 / 10%);
      border-radius: 10px;
      min-width: 300px;
    }
  }
  &:hover {
    .menu {
      display:block;
    }
  }
  `,
);
