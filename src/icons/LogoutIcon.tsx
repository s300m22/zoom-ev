import { memo, SVGProps } from 'react';

const LogoutIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height="17"
    viewBox="0 0 17 17"
    width="17"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M7 5.5v-3a1 1 0 011-1h7a1 1 0 011 1v12a1 1 0 01-1 1H8a1 1 0 01-1-1v-3M12 8.5H1M4 5.5l-3 3 3 3"
      stroke="#6A707D"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
);

export default memo(LogoutIcon);
