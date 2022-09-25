import { memo, SVGProps } from 'react';

const ClosedEyeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height="20"
    version="1.1"
    viewBox="0 0 20 20"
    width="20"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M3 10.5S6 5 10.5 5s7.5 5.5 7.5 5.5-3 5.5-7.5 5.5S3 10.5 3 10.5z"
      stroke="#6A707D"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit="10"
    />
    <path
      d="M10.5 13a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
      stroke="#6A707D"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit="10"
    />
    <path
      d="M2.5 16.5L17.987 4.817"
      fill="none"
      stroke="#6a707d"
      strokeLinecap="butt"
      strokeLinejoin="miter"
      strokeOpacity="1"
      strokeWidth="1"
    />
  </svg>
);

export default memo(ClosedEyeIcon);
