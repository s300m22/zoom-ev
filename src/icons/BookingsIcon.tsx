import { memo, SVGProps } from 'react';

const BookingsIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height="17"
    viewBox="0 0 17 17"
    width="17"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M9 1v7L6.5 6 4 8V1"
      stroke="#6A707D"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <path
      d="M1 14.5V3a2 2 0 012-2h11a2 2 0 012 2v11.5"
      stroke="#6A707D"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <path
      d="M14.5 13h-12a1.5 1.5 0 000 3h12a1.5 1.5 0 000-3z"
      stroke="#6A707D"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
);

export default memo(BookingsIcon);
