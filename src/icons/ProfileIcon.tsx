import { memo, SVGProps } from 'react';

const ProfileIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height="17"
    viewBox="0 0 17 17"
    width="17"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M8.5 9a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM13.453 14.121a5.491 5.491 0 00-9.906 0"
      stroke="#6A707D"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <path
      d="M8.5 16a7.5 7.5 0 100-15 7.5 7.5 0 000 15z"
      stroke="#6A707D"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
);

export default memo(ProfileIcon);
