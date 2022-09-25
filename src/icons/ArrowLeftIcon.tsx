import { memo, SVGProps } from 'react';

const ArrowLeftIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height="17"
    viewBox="0 0 16 17"
    width="16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M14 8.5H2M6 4.5l-4 4 4 4"
      stroke="#061027"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit="10"
    />
  </svg>
);

export default memo(ArrowLeftIcon);
