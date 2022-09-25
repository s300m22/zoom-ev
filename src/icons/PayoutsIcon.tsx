import { memo, SVGProps } from 'react';

const PayoutsIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height="18"
    viewBox="0 0 18 18"
    width="18"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M7.5 5.5h6M7.5 8.5h6M12.5 14.5v-1h-11v1a2 2 0 002 2h11a2 2 0 01-2-2z"
      stroke="#6A707D"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <path
      d="M4.5 11.5v-10h12v13a2 2 0 01-2 2"
      stroke="#6A707D"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
);

export default memo(PayoutsIcon);
