import { memo, SVGProps } from 'react';

const MailIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height="14"
    viewBox="0 0 18 14"
    width="18"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M15.75 0.5H2.25C0.984375 0.5 0 1.51953 0 2.75V11.75C0 13.0156 0.984375 14 2.25 14H15.75C16.9805 14 18 13.0156 18 11.75V2.75C18 1.51953 16.9805 0.5 15.75 0.5ZM2.25 2.1875H15.75C16.0312 2.1875 16.3125 2.46875 16.3125 2.75V3.55859L10.4414 8.41016C9.63281 9.07812 8.33203 9.07812 7.52344 8.41016L1.6875 3.55859V2.75C1.6875 2.46875 1.93359 2.1875 2.25 2.1875ZM15.75 12.3125H2.25C1.93359 12.3125 1.6875 12.0664 1.6875 11.75V5.73828L6.46875 9.74609C7.17188 10.3086 8.05078 10.625 9 10.625C9.91406 10.625 10.793 10.3086 11.4961 9.74609L16.3125 5.73828V11.75C16.3125 12.0664 16.0312 12.3125 15.75 12.3125Z"
      fill="#707070"
    />
    <path
      d="M15.75 0.5H2.25C0.984375 0.5 0 1.51953 0 2.75V11.75C0 13.0156 0.984375 14 2.25 14H15.75C16.9805 14 18 13.0156 18 11.75V2.75C18 1.51953 16.9805 0.5 15.75 0.5ZM2.25 2.1875H15.75C16.0312 2.1875 16.3125 2.46875 16.3125 2.75V3.55859L10.4414 8.41016C9.63281 9.07812 8.33203 9.07812 7.52344 8.41016L1.6875 3.55859V2.75C1.6875 2.46875 1.93359 2.1875 2.25 2.1875ZM15.75 12.3125H2.25C1.93359 12.3125 1.6875 12.0664 1.6875 11.75V5.73828L6.46875 9.74609C7.17188 10.3086 8.05078 10.625 9 10.625C9.91406 10.625 10.793 10.3086 11.4961 9.74609L16.3125 5.73828V11.75C16.3125 12.0664 16.0312 12.3125 15.75 12.3125Z"
      fill="#707070"
    />
  </svg>
);

export default memo(MailIcon);
