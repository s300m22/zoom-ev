import { memo, SVGProps } from 'react';

const RidesIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height="17"
    viewBox="0 0 16 17"
    width="16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M3 16a2 2 0 100-4 2 2 0 000 4zM13 5a2 2 0 100-4 2 2 0 000 4zM3 10V3.5A2.5 2.5 0 015.5 1v0A2.5 2.5 0 018 3.5v10a2.5 2.5 0 005 0V7"
      stroke="#6A707D"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
);

export default memo(RidesIcon);
