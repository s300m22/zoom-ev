import { memo, SVGProps } from 'react';

const ArrowRightIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height="8"
    viewBox="0 0 5 8"
    width="5"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M1 1L4 4L1 7"
      stroke="url(#paint0_linear)"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
    <defs>
      <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear" x1="1" x2="4" y1="4" y2="4">
        <stop stopColor="#54C0EF" />
        <stop offset="1" stopColor="#16D3A4" />
      </linearGradient>
    </defs>
  </svg>
);

export default memo(ArrowRightIcon);
