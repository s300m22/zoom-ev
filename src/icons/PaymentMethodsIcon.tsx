import { memo, SVGProps } from 'react';

const PaymentMethodsIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M17.893 15.357c3.254 0 5.893-1.2 5.893-2.678 0-1.48-2.639-2.679-5.893-2.679C14.638 10 12 11.2 12 12.679c0 1.479 2.638 2.678 5.893 2.678z"
      stroke="#061027"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <path
      d="M12 15.357v.536c0 1.48 2.638 2.679 5.893 2.679s5.893-1.2 5.893-2.68v-.535"
      stroke="#061027"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <path
      d="M12 18.572v.535c0 1.48 2.638 2.679 5.893 2.679s5.893-1.2 5.893-2.679v-.536"
      stroke="#061027"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <path
      d="M12 21.786v.535C12 23.801 14.638 25 17.893 25s5.893-1.199 5.893-2.679v-.535"
      stroke="#061027"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <defs id="defs934">
      <filter
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
        height="104"
        id="filter0_d"
        width="104"
        x="0"
        y="0"
      >
        <feFlood floodOpacity="0" id="feFlood919" result="BackgroundImageFix" />
        <feColorMatrix
          id="feColorMatrix921"
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy="10" id="feOffset923" />
        <feGaussianBlur id="feGaussianBlur925" stdDeviation="17" />
        <feColorMatrix
          id="feColorMatrix927"
          type="matrix"
          values="0 0 0 0 0.089375 0 0 0 0 0.292447 0 0 0 0 0.325 0 0 0 0.1 0"
        />
        <feBlend
          id="feBlend929"
          in2="BackgroundImageFix"
          mode="normal"
          result="effect1_dropShadow"
        />
        <feBlend
          id="feBlend931"
          in="SourceGraphic"
          in2="effect1_dropShadow"
          mode="normal"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

export default memo(PaymentMethodsIcon);
