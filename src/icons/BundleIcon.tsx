import { memo, SVGProps } from 'react';

const BundleIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height="16"
    viewBox="0 0 13 16"
    width="13"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M6.5 6C9.538 6 12 4.88 12 3.5S9.538 1 6.5 1 1 2.12 1 3.5 3.462 6 6.5 6zM1 6v.5C1 7.881 3.462 9 6.5 9S12 7.881 12 6.5V6M1 9v.5C1 10.881 3.462 12 6.5 12S12 10.881 12 9.5V9M1 12v.5C1 13.881 3.462 15 6.5 15s5.5-1.119 5.5-2.5V12"
      stroke="#6A707D"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
);

export default memo(BundleIcon);
