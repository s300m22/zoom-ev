import { memo, SVGProps } from 'react';

const PadlockIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    aria-hidden="true"
    focusable="false"
    role="presentation"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    // style="display: block; height: 16px; width: 16px; fill: currentcolor;"
    {...props}
  >
    <path d="M10.25 4a2.25 2.25 0 0 0-4.495-.154L5.75 4v2h-1.5V4a3.75 3.75 0 0 1 7.495-.2l.005.2v2H13a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h7.25V4z" />
  </svg>
);

export default memo(PadlockIcon);
