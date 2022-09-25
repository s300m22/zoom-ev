import { memo, SVGProps } from 'react';

const CloseIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height="13"
    viewBox="0 0 13 13"
    width="13"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12 1L1 12M1 1l11 11"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit="10"
    />
  </svg>
);

export default memo(CloseIcon);
