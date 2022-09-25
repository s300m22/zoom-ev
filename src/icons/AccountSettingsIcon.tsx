import { memo, SVGProps } from 'react';

const AccountSettingsIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M18 20.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
      stroke="#061027"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <path
      d="M23.5 18c0-.465-.064-.913-.172-1.344l1.917-1.107-1.5-2.598-1.915 1.106a5.476 5.476 0 00-2.33-1.344V10.5h-3v2.212a5.5 5.5 0 00-2.33 1.345l-1.915-1.106-1.5 2.598 1.917 1.107A5.512 5.512 0 0012.5 18c0 .464.064.913.172 1.344l-1.917 1.107 1.5 2.598 1.916-1.106a5.476 5.476 0 002.33 1.344V25.5h3v-2.212a5.503 5.503 0 002.33-1.344l1.916 1.106 1.5-2.598-1.917-1.107c.106-.432.17-.881.17-1.345z"
      stroke="#061027"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <defs id="defs25">
      <filter
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
        height="104"
        id="filter0_d"
        width="104"
        x="0"
        y="0"
      >
        <feFlood floodOpacity="0" id="feFlood10" result="BackgroundImageFix" />
        <feColorMatrix
          id="feColorMatrix12"
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy="10" id="feOffset14" />
        <feGaussianBlur id="feGaussianBlur16" stdDeviation="17" />
        <feColorMatrix
          id="feColorMatrix18"
          type="matrix"
          values="0 0 0 0 0.089375 0 0 0 0 0.292447 0 0 0 0 0.325 0 0 0 0.1 0"
        />
        <feBlend
          id="feBlend20"
          in2="BackgroundImageFix"
          mode="normal"
          result="effect1_dropShadow"
        />
        <feBlend
          id="feBlend22"
          in="SourceGraphic"
          in2="effect1_dropShadow"
          mode="normal"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

export default memo(AccountSettingsIcon);
