import { DescriptionWrapper } from '../containers/SectionLayouts/ColumnSectionLayout/ColumnSectionLayout.styled';

const PAGE_WIDTH = 1120;
const PAGE_WIDTH_WIDE = 1440;

const theme = {
  breakpoints: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: PAGE_WIDTH + 30,
    lgWide: PAGE_WIDTH_WIDE + 30,
    xl: 1920,
  },
  pageWidth: `${PAGE_WIDTH}px`,
  pageWidthWide: `${PAGE_WIDTH_WIDE}px`,
  palette: {
    primary: '#061027',
    secondary: '#ffffff',
    gray: '#6A707D',
    grayMiddle: '#9FA4AF',
    dark: '#061027',
    lightText: '#F2F2F2',
    lightGray: '#4D6A707D',
    lightBackground: 'rgba(240, 244, 247, 0.6)',
    hover: '#54c0ef',
    blue: '#00bff3',
    error: '#dc004e',
    red: '#f05828',
    warning: '#ff9800',
    success: '#4caf50',
    boxShadow: '0 10px 34px rgba(23, 75, 83, 0.1)',
    action: {
      active: 'rgba(0, 0, 0, 0.54)',
      hover: 'rgba(0, 0, 0, 0.04)',
      hoverShadow: '0 15px 54px rgba(23, 75, 83, 0.2)',
      selected: 'rgba(0, 0, 0, 0.08)',
      disabled: 'rgba(0, 0, 0, 0.26)',
      disabledBackground: 'rgba(0, 0, 0, 0.12)',
    },
  },
  up: (breakpoint: number, vertical = false) =>
    `@media (min-${vertical ? 'height' : 'width'}: calc(${breakpoint}px + 1px))`,
  down: (breakpoint: number, vertical = false) =>
    `@media (max-${vertical ? 'height' : 'width'}: ${breakpoint}px)`,
  upDown: (breakpointUp: number, breakpointDown: number, vertical = false) =>
    `@media (min-${vertical ? 'height' : 'width'}: calc(${breakpointUp}px + 1px)) and (max-${
      vertical ? 'height' : 'width'
    }: ${breakpointDown}px)`,
  generateColors: (background: string) => {
    switch (background) {
      case 'light':
        return `
        background: ${theme.palette.secondary};
        color: ${theme.palette.primary};

        ${DescriptionWrapper} {
          color: ${theme.palette.gray};
        }
        `;
      case 'dark':
        return `
        background: ${theme.palette.primary};
        color: ${theme.palette.secondary};

        ${DescriptionWrapper} {
          color: ${theme.palette.lightText};
        }
        `;
      case 'gray':
        return `
        background: ${theme.palette.lightGray};
        color: ${theme.palette.primary};

        ${DescriptionWrapper} {
          color: ${theme.palette.gray};
        }
        `;
      default:
        return `
        background: ${background};
        color: ${theme.palette.primary};

        ${DescriptionWrapper} {
          color: ${theme.palette.gray};

          h1, h2, h3, h4, h5, h6 {
            color: ${theme.palette.dark};
          }
        }
        `;
    }
  },
  getLayout: (layout?: string) => {
    switch (layout) {
      case 'left':
        return `
          grid-template-columns: 1fr;
          > div + img, > div + div {
            order: -1;
          }
          ${theme.up(theme.breakpoints.md)} {
            grid-template-columns: repeat(2, 1fr);
          }
        `;
      case 'top':
        return `
          grid-template-columns: 1fr;
          > div + img, > div + div {
            order: -1;
          }
        `;
      case 'bottom':
        return 'grid-template-columns: 1fr;';
      case 'right':
        return `
          grid-template-columns: 1fr;
          ${theme.up(theme.breakpoints.md)} {
            grid-template-columns: repeat(2, 1fr);
          }
          `;
      default:
        return `
          grid-template-columns: 1fr;
        `;
    }
  },
  getLinkStyle: (color: string) => {
    switch (color) {
      case 'secondary':
        return `
          color: ${theme.palette.secondary};
          text-decoration: none;
        `;
      case 'blue':
        return `
        color: ${theme.palette.blue};
        text-decoration: underline;
      `;
      case 'primary':
      default:
        return `
        color: ${theme.palette.primary};
        text-decoration: none;
      `;
    }
  },
  generateGrid: (columns: number) => {
    const totalColumns = columns * 2;
    const span = totalColumns / columns;
    const nthChild = columns % 2 === 0 ? 'odd' : 'even';
    return `
      grid-template-columns: repeat( ${totalColumns}, 1fr );

      & > div {
        grid-column: span ${span};
    
        &:nth-last-child(1):nth-child(${nthChild}) {
          grid-column: ${span} / span ${span};
        }
      }
    `;
  },
} as const;

export default theme;

export type Theme = typeof theme;
