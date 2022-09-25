import { memo, SVGProps } from 'react';

const EyeWhiteIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height="14"
    viewBox="0 0 18 14"
    width="18"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M1.5 7s3-5.5 7.5-5.5S16.5 7 16.5 7s-3 5.5-7.5 5.5S1.5 7 1.5 7z"
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <path
      d="M9 9.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
);

export default memo(EyeWhiteIcon);
