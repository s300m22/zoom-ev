import { memo, SVGProps } from 'react';

const CalendarIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height="17"
    viewBox="0 0 16 17"
    width="16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M1 6h14"
      stroke="url(#paint0_linear)"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <path
      d="M14 3H2a1 1 0 00-1 1v11a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1z"
      stroke="url(#paint1_linear)"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <path
      d="M4 1v2"
      stroke="url(#paint2_linear)"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <path
      d="M12 1v2"
      stroke="url(#paint3_linear)"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <path
      d="M8 1v2"
      stroke="url(#paint4_linear)"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <defs>
      <linearGradient
        gradientUnits="userSpaceOnUse"
        id="paint0_linear"
        x1="1.622"
        x2="2.17"
        y1="7.001"
        y2="3.802"
      >
        <stop stopColor="#54EFD0" />
        <stop offset="1" stopColor="#00BFF3" />
      </linearGradient>
      <linearGradient
        gradientUnits="userSpaceOnUse"
        id="paint1_linear"
        x1="1.622"
        x2="17.621"
        y1="16.014"
        y2="8.828"
      >
        <stop stopColor="#54EFD0" />
        <stop offset="1" stopColor="#00BFF3" />
      </linearGradient>
      <linearGradient
        gradientUnits="userSpaceOnUse"
        id="paint2_linear"
        x1="4.044"
        x2="5.36"
        y1="3.002"
        y2="2.728"
      >
        <stop stopColor="#54EFD0" />
        <stop offset="1" stopColor="#00BFF3" />
      </linearGradient>
      <linearGradient
        gradientUnits="userSpaceOnUse"
        id="paint3_linear"
        x1="12.044"
        x2="13.361"
        y1="3.002"
        y2="2.728"
      >
        <stop stopColor="#54EFD0" />
        <stop offset="1" stopColor="#00BFF3" />
      </linearGradient>
      <linearGradient
        gradientUnits="userSpaceOnUse"
        id="paint4_linear"
        x1="8.044"
        x2="9.36"
        y1="3.002"
        y2="2.728"
      >
        <stop stopColor="#54EFD0" />
        <stop offset="1" stopColor="#00BFF3" />
      </linearGradient>
    </defs>
  </svg>
);

export default memo(CalendarIcon);
