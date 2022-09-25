import { memo, SVGProps } from 'react';

const MessageIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height="16"
    viewBox="0 0 17 16"
    width="17"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M1 5l7.5 4L16 5"
      stroke="#6A707D"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <path
      d="M15 14.5H2a1 1 0 01-1-1v-11a1 1 0 011-1h13a1 1 0 011 1v11a1 1 0 01-1 1z"
      stroke="#6A707D"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
);

export default memo(MessageIcon);
