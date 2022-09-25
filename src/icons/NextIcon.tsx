import { memo, SVGProps } from 'react';

const NextIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height="40"
    viewBox="0 0 40 40"
    width="40"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx="20" cy="20" fill="#fff" r="20" />
    <path
      d="M12 20h15M22 15l5 5-5 5"
      stroke="#061027"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit="10"
    />
  </svg>
);

export default memo(NextIcon);
