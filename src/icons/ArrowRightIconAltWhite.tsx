import { memo, SVGProps } from 'react';

const ArrowRightIconAltWhite = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height="12"
    viewBox="0 0 13 12"
    width="13"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M7.21875 0.691406L12.0312 5.28516C12.168 5.42188 12.25 5.58594 12.25 5.77734C12.25 5.94141 12.168 6.10547 12.0312 6.24219L7.21875 10.8359C6.97266 11.082 6.53516 11.082 6.28906 10.8086C6.04297 10.5625 6.04297 10.125 6.31641 9.87891L9.95312 6.43359H0.65625C0.273438 6.43359 0 6.13281 0 5.77734C0 5.39453 0.273438 5.12109 0.65625 5.12109H9.95312L6.31641 1.64844C6.04297 1.40234 6.04297 0.964844 6.28906 0.71875C6.53516 0.445312 6.94531 0.445312 7.21875 0.691406Z"
      fill="white"
    />
  </svg>
);

export default memo(ArrowRightIconAltWhite);
