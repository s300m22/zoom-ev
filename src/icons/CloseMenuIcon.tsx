import { memo, SVGProps } from 'react';

const CloseMenuIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height="14"
    viewBox="0 0 14 14"
    width="14"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M13 1L1 13M1 1l12 12"
      stroke="#061027"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit="10"
    />
  </svg>
);

export default memo(CloseMenuIcon);
