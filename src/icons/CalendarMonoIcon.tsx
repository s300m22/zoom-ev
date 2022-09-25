import { memo, SVGProps } from 'react';

const CalendarMonoIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height="20"
    viewBox="0 0 20 20"
    width="20"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M7 5V7"
      stroke="#6A707D"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit="10"
    />
    <path
      d="M14 5V7"
      stroke="#6A707D"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit="10"
    />
    <path
      d="M5 10H16"
      stroke="#6A707D"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit="10"
    />
    <path
      d="M15 7H6C5.44772 7 5 7.44772 5 8V15C5 15.5523 5.44772 16 6 16H15C15.5523 16 16 15.5523 16 15V8C16 7.44772 15.5523 7 15 7Z"
      stroke="#6A707D"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit="10"
    />
  </svg>
);

export default memo(CalendarMonoIcon);
