import { memo, SVGProps } from 'react';

const BubblePointIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height="24"
    viewBox="0 0 24 24"
    width="24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx="12" cy="12" fill="url(#paint0_linear)" opacity="0.1" r="12" />
    <circle cx="12" cy="12" fill="url(#paint1_linear)" opacity="0.4" r="8" />
    <circle cx="12" cy="12" fill="url(#paint2_linear)" r="4" />
    <defs>
      <linearGradient
        gradientUnits="userSpaceOnUse"
        id="paint0_linear"
        x1="0"
        x2="24"
        y1="12"
        y2="12"
      >
        <stop stopColor="#54C0EF" />
        <stop offset="1" stopColor="#16D3A4" />
      </linearGradient>
      <linearGradient
        gradientUnits="userSpaceOnUse"
        id="paint1_linear"
        x1="4"
        x2="20"
        y1="12"
        y2="12"
      >
        <stop stopColor="#54C0EF" />
        <stop offset="1" stopColor="#16D3A4" />
      </linearGradient>
      <linearGradient
        gradientUnits="userSpaceOnUse"
        id="paint2_linear"
        x1="8"
        x2="16"
        y1="12"
        y2="12"
      >
        <stop stopColor="#54C0EF" />
        <stop offset="1" stopColor="#16D3A4" />
      </linearGradient>
    </defs>
  </svg>
);

export default memo(BubblePointIcon);
