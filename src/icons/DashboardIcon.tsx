import { memo, SVGProps } from 'react';

const DashboardIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height="17"
    viewBox="0 0 17 17"
    width="17"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M7 1H1v8h6V1zM7 12H1v4h6v-4zM16 1h-6v5h6V1zM16 9h-6v7h6V9z"
      stroke="#6A707D"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
);

export default memo(DashboardIcon);
