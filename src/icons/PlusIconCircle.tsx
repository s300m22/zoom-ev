import { memo, SVGProps } from 'react';

const PlusSignIconCircle = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height="19"
    viewBox="0 0 19 19"
    width="19"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M8.65625 12.3438V10.0938H6.40625C5.91406 10.0938 5.5625 9.74219 5.5625 9.25C5.5625 8.79297 5.91406 8.40625 6.40625 8.40625H8.65625V6.15625C8.65625 5.69922 9.00781 5.3125 9.5 5.3125C9.95703 5.3125 10.3438 5.69922 10.3438 6.15625V8.40625H12.5938C13.0508 8.40625 13.4375 8.79297 13.4375 9.25C13.4375 9.74219 13.0508 10.0938 12.5938 10.0938H10.3438V12.3438C10.3438 12.8359 9.95703 13.1875 9.5 13.1875C9.00781 13.1875 8.65625 12.8359 8.65625 12.3438ZM18.5 9.25C18.5 14.2422 14.457 18.25 9.5 18.25C4.50781 18.25 0.5 14.2422 0.5 9.25C0.5 4.29297 4.50781 0.25 9.5 0.25C14.457 0.25 18.5 4.29297 18.5 9.25ZM9.5 1.9375C5.45703 1.9375 2.1875 5.24219 2.1875 9.25C2.1875 13.293 5.45703 16.5625 9.5 16.5625C13.5078 16.5625 16.8125 13.293 16.8125 9.25C16.8125 5.24219 13.5078 1.9375 9.5 1.9375Z"
      fill="#00BFF3"
    />
  </svg>
);

export default memo(PlusSignIconCircle);
