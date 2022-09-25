import { memo, SVGProps } from 'react';

const DeleteWhiteIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height="20"
    version="1.1"
    viewBox="0 0 20 20"
    width="20"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#filter0_d)" transform="translate(-28 -20)">
      <circle cx="38" cy="30" fill="#fff" r="10" />
      <path
        d="M37.333 29.866v3.2m2.133-3.2v3.2m-5.333-5.333h8.533m-.533 0l-.463 6.476a1.067 1.067 0 01-1.064.99h-4.414a1.066 1.066 0 01-1.063-.99l-.463-6.476zm-2.133 0v-1.6a.533.533 0 00-.534-.533h-2.133a.533.533 0 00-.533.533v1.6z"
        stroke="#343a40"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="0.8"
      />
    </g>
    <defs id="defs23">
      <filter
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
        height="74.4"
        id="filter0_d"
        width="74.4"
        x="0.8"
        y="0.8"
      >
        <feFlood floodOpacity="0" id="feFlood8" result="BackgroundImageFix" />
        <feColorMatrix
          id="feColorMatrix10"
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy="8" id="feOffset12" />
        <feGaussianBlur id="feGaussianBlur14" stdDeviation="13.6" />
        <feColorMatrix
          id="feColorMatrix16"
          type="matrix"
          values="0 0 0 0 0.089375 0 0 0 0 0.292447 0 0 0 0 0.325 0 0 0 0.15 0"
        />
        <feBlend
          id="feBlend18"
          in2="BackgroundImageFix"
          mode="normal"
          result="effect1_dropShadow"
        />
        <feBlend
          id="feBlend20"
          in="SourceGraphic"
          in2="effect1_dropShadow"
          mode="normal"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

export default memo(DeleteWhiteIcon);
