import { memo, SVGProps } from 'react';

const ProfileDetailsIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height="36"
    version="1.1"
    viewBox="0 0 36 36"
    width="36"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#filter0_d)" transform="translate(-34 -24)">
      <circle cx="52" cy="42" fill="#fff" r="18" />
    </g>
    <path
      d="M18.5 18a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
      stroke="#061027"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <path
      d="M23.453 23.121a5.491 5.491 0 00-9.906 0"
      stroke="#061027"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <path
      d="M18.5 25a7.5 7.5 0 100-15 7.5 7.5 0 000 15z"
      stroke="#061027"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <defs id="defs2158">
      <filter
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
        height="104"
        id="filter0_d"
        width="104"
        x="0"
        y="0"
      >
        <feFlood floodOpacity="0" id="feFlood2143" result="BackgroundImageFix" />
        <feColorMatrix
          id="feColorMatrix2145"
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy="10" id="feOffset2147" />
        <feGaussianBlur id="feGaussianBlur2149" stdDeviation="17" />
        <feColorMatrix
          id="feColorMatrix2151"
          type="matrix"
          values="0 0 0 0 0.089375 0 0 0 0 0.292447 0 0 0 0 0.325 0 0 0 0.1 0"
        />
        <feBlend
          id="feBlend2153"
          in2="BackgroundImageFix"
          mode="normal"
          result="effect1_dropShadow"
        />
        <feBlend
          id="feBlend2155"
          in="SourceGraphic"
          in2="effect1_dropShadow"
          mode="normal"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

export default memo(ProfileDetailsIcon);
