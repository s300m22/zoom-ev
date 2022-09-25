import { memo, SVGProps } from 'react';

const CarIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height="17"
    viewBox="0 0 17 17"
    width="17"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M5 14v2H1v-2M16 14v2h-4v-2M16 14H1V9.414a1 1 0 01.293-.707L2 8h13l.707.707a1 1 0 01.293.707V14z"
      stroke="#6A707D"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <path
      d="M3.5 12.5a1 1 0 100-2 1 1 0 000 2zM13.5 12.5a1 1 0 100-2 1 1 0 000 2zM2 8l.877-6.141c.071-.493.493-.859.99-.859h9.265a1 1 0 01.99.859L15 8"
      stroke="#6A707D"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
);

export default memo(CarIcon);
