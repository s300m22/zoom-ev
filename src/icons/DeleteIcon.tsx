import { memo, SVGProps } from 'react';

const DeleteIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height="32"
    viewBox="0 0 32 32"
    width="32"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#filter0_b)">
      <circle cx="16" cy="16" fill="#F05828" fillOpacity="0.8" r="16" />
    </g>
    <path
      d="M10.5 14.5v7a2 2 0 002 2h7a2 2 0 002-2v-7M8.5 11.5h15M13.5 11.5v-3h5v3"
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit="10"
    />
    <defs>
      <filter
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
        height="40"
        id="filter0_b"
        width="40"
        x="-4"
        y="-4"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feGaussianBlur in="BackgroundImage" stdDeviation="2" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur" />
        <feBlend in="SourceGraphic" in2="effect1_backgroundBlur" result="shape" />
      </filter>
    </defs>
  </svg>
);

export default memo(DeleteIcon);
