import { memo, SVGProps } from 'react';

const LocationIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height="17"
    viewBox="0 0 13 17"
    width="13"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12 6.5C12 11 6.5 16 6.5 16S1 11 1 6.5a5.5 5.5 0 1111 0v0z"
      stroke="url(#paint0_linear)"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <path
      d="M6.5 9a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
      stroke="url(#paint1_linear)"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <defs>
      <linearGradient
        gradientUnits="userSpaceOnUse"
        id="paint0_linear"
        x1="1.489"
        x2="15.303"
        y1="16.016"
        y2="11.791"
      >
        <stop stopColor="#54EFD0" />
        <stop offset="1" stopColor="#00BFF3" />
      </linearGradient>
      <linearGradient
        gradientUnits="userSpaceOnUse"
        id="paint1_linear"
        x1="4.222"
        x2="10.071"
        y1="9.005"
        y2="6.566"
      >
        <stop stopColor="#54EFD0" />
        <stop offset="1" stopColor="#00BFF3" />
      </linearGradient>
    </defs>
  </svg>
);

export default memo(LocationIcon);
