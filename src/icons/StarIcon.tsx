import { memo, SVGProps } from 'react';

const StarIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height="16"
    viewBox="0 0 17 16"
    width="17"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M15.146 5.057l-4.317-.628L8.902.518a1.041 1.041 0 00-1.8 0L5.175 4.43l-4.317.627a1 1 0 00-.556 1.706l3.123 3.045-.737 4.3a1 1 0 001.451 1.054l3.863-2.031 3.861 2.029a1 1 0 001.451-1.054l-.737-4.3 3.125-3.043a1 1 0 00-.554-1.705l-.002-.001z"
      fill="url(#paint0_linear)"
    />
    <defs>
      <linearGradient
        gradientUnits="userSpaceOnUse"
        id="paint0_linear"
        x1="0.711"
        x2="19.166"
        y1="15.293"
        y2="7.23"
      >
        <stop stopColor="#54EFD0" />
        <stop offset="1" stopColor="#00BFF3" />
      </linearGradient>
    </defs>
  </svg>
);

export default memo(StarIcon);
