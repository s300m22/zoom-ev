import { memo, SVGProps } from 'react';

const ArrowBottomIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height="6"
    viewBox="0 0 11 6"
    width="11"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M1 .5L5.5 5 10 .5"
      stroke="#6A707D"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit="10"
    />
  </svg>
);

export default memo(ArrowBottomIcon);
