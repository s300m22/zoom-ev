import { memo, SVGProps } from 'react';

const SettingsIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height="17"
    viewBox="0 0 17 17"
    width="17"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M15 16H2a1 1 0 01-1-1V2a1 1 0 011-1h13a1 1 0 011 1v13a1 1 0 01-1 1zM8.5 6H13M4 6h2M6 4v4M8.5 11H4M13 11h-2M11 9v4"
      stroke="#6A707D"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
);

export default memo(SettingsIcon);
