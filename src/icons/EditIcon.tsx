import { memo, SVGProps } from 'react';

const EditIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height="18"
    viewBox="0 0 16 18"
    width="16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M1 16.5h14M10.5 1.5l3 3L5 13l-4 1 1-4 8.5-8.5zM8.5 3.5l3 3"
      stroke="#061027"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
);

export default memo(EditIcon);
