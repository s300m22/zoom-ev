import { memo, SVGProps } from 'react';

const DropdownIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="currentColor"
    height="1em"
    stroke="currentColor"
    strokeWidth="0"
    viewBox="0 0 320 512"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z" />
  </svg>
);

export default memo(DropdownIcon);
