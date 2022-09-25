import styled from 'styled-components';

type Layout = 'top' | 'bottom' | 'left' | 'right' | undefined;
interface FramedImageProps {
  imagePattern?: string;
  imageOverlay?: boolean;
  layout?: Layout;
  imageTransform?: string;
}

const getFrameDetails = (pattern: string | undefined) => {
  switch (pattern) {
    case 'Pattern #1':
      return {
        pattern: '/images/patterns/pattern_1.svg',
        patternRules: `
          top: 4%;
          left: 2%;
        `,
        overlay: '/images/overlays/overlay_1.png',
        overlayRules: `
          top: -3.5%;
          right: -4%;    
        `,
        mask: '/images/masks/mask_1.svg',
      };
    case 'Pattern #2':
      return {
        pattern: '/images/patterns/pattern_2.svg',
        patternRules: `
            top: 4%;
            left: -2%;
          `,
        overlay: '/images/overlays/overlay_2.png',
        overlayRules: `
          top: 3.5%;
          transform: scale(1.15);
          left: -1.75%;
          z-index: 3;  
        `,
        mask: '/images/masks/mask_2.svg',
      };
    case 'Pattern #3':
      return {
        pattern: '/images/patterns/pattern_3.svg',
        patternRules: `
          top: 4%;
          left: 2%;
        `,
        overlay: '/images/overlays/overlay_3.png',
        overlayRules: `
          top: 3.5%;
          transform: scale(1.1, 1.15);
          left: 2.35%;   
        `,
        mask: '/images/masks/mask_3.svg',
      };
    case 'Pattern #4':
      return {
        pattern: '/images/patterns/pattern_3.svg',
        patternRules: `
            top: 4%;
            left: 2%;
          `,
        overlay: '/images/overlays/overlay_3.png',
        overlayRules: `
            top: 3.25%;
            transform: scale(1, 1);
            left: 2.35%;   
          `,
        mask: '/images/masks/mask_3.svg',
      };
    case 'Pattern #5':
      return {
        pattern: '/images/patterns/pattern_3.svg',
        patternRules: `
              top: 4%;
              left: 2%;
            `,
        overlay: '/images/overlays/overlay_3.png',
        overlayRules: `
              top: 3.25%;
              transform: scale(1.05, 1.05);
              left: 0.35%;   
            `,
        mask: '/images/masks/mask_3.svg',
      };
    default:
      return {
        pattern: '',
        patternRules: '',
        overlay: '',
        overlayRules: '',
        mask: '',
      };
  }
};

const generateTransform = (layout: Layout) => {
  switch (layout) {
    case 'top':
    case 'bottom':
      return '';
    case 'right':
      return 'scale(1.6) translateX(7%)';
    case 'left':
      return 'scale(1.6) translateY(-7.35%) translateX(-16%)';
    default:
      return '';
  }
};

export const FramedImage = styled.div<FramedImageProps>(
  ({ imagePattern, layout, imageOverlay, imageTransform, theme: { up, breakpoints } }) => {
    const { pattern, patternRules, overlay, overlayRules, mask } = getFrameDetails(imagePattern);
    const transform = imageOverlay && generateTransform(layout);
    return `
    position: relative;
    pointer-events: none;
    margin: 30px;
    display: flex;
    justify-content: center;
    z-index: 1;

    ${up(breakpoints.sm)} {
      margin: 60px;
    }
  
    ${up(breakpoints.md)} {
      max-height: initial;
      transform: ${imageTransform || transform};
      margin: 0;
    }

    &::after, &::before {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
    }

    &::after {
      background: url("${pattern}") no-repeat center / contain;
      ${patternRules}
      z-index: 1;
    }

    &::before {
      background: url("${overlay}") no-repeat center / contain;
      ${overlayRules}
      z-index: 3;
    }

    img {
      mask: url("${mask}") no-repeat center / contain;
      position: relative;
      z-index: 2;
      object-fit: cover !important;
      align-self: flex-start;
      justify-self: flex-start;
    }
  `;
  },
);

interface StyledImageProps {
  hideMobile?: boolean;
  hideDesktop?: boolean;
}
export const StyledImage = styled.img<StyledImageProps>`
  max-width: 100%;
  height: auto;
  display: ${(props) => (props.hideMobile ? 'none' : 'initial')};

  ${({ theme }) => theme.up(theme.breakpoints.md)} {
    display: ${(props) => (props.hideDesktop ? 'none' : 'initial')};
  }
`;

export default StyledImage;
