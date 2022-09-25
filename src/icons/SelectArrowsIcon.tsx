import { memo, SVGProps } from 'react';

const SelectArrowsIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height={10}
    viewBox="0 0 7 10"
    width={7}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M6 6.818L3.5 9 1 6.818M1 3.182L3.5 1 6 3.182"
      stroke="#061027"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default memo(SelectArrowsIcon);
