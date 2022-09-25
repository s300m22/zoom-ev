import { memo, SVGProps } from 'react';

const UploadImageIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height="17"
    viewBox="0 0 17 17"
    width="17"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M1 5.5V2a1 1 0 011-1h3.5M11.5 1H15a1 1 0 011 1v3.5M16 11.5V15a1 1 0 01-1 1h-3.5M5.5 16H2a1 1 0 01-1-1v-3.5M8.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM8 9h1a3 3 0 013 3H5a3 3 0 013-3v0z"
      stroke="#6A707D"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default memo(UploadImageIcon);
