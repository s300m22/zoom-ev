import { memo, SVGProps } from 'react';

const TickIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height="16"
    viewBox="0 0 16 16"
    width="16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M4.5 7.5L7 10l4.5-4.5"
      stroke="#061027"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit="10"
    />
  </svg>
);

export default memo(TickIcon);
