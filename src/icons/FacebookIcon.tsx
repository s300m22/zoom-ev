import { memo, SVGProps } from 'react';

const FacebookIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height="24"
    viewBox="0 0 24 24"
    width="24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M24 12.072a12 12 0 10-13.875 11.854v-8.385H7.078v-3.469h3.047V9.428c0-3.007 1.792-4.669 4.532-4.669.9.013 1.798.091 2.687.234v2.954H15.83a1.734 1.734 0 00-1.955 1.875v2.25H17.2l-.532 3.47h-2.8v8.384A12 12 0 0024 12.072z"
      fill="#2174EE"
    />
  </svg>
);

export default memo(FacebookIcon);
