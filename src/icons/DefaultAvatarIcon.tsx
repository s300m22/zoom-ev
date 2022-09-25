import { memo, SVGProps } from 'react';

const DefaultAvatarIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height="26"
    viewBox="0 0 26 26"
    width="26"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M13 13.8a4 4 0 100-8 4 4 0 000 8zM20.925 21.994a8.786 8.786 0 00-15.85 0"
      stroke="#9FA4AF"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
    <path
      d="M13 25c6.627 0 12-5.373 12-12S19.627 1 13 1 1 6.373 1 13s5.373 12 12 12z"
      stroke="#9FA4AF"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

export default memo(DefaultAvatarIcon);
