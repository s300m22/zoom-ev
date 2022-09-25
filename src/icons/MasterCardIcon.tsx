import { memo, SVGProps } from 'react';

const MasterCardIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    height="618.031"
    version="1.1"
    viewBox="0 0 1000.008 618.031"
    width="1000.008"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g transform="translate(-1551.786 -2007.047) scale(3.35573)">
      <g transform="matrix(2.55794 0 0 2.55794 884.901 -11.427)">
        <g transform="translate(-502.861 -22.613)">
          <path className="st1" d="M380.2 268.6H411.7V325.20000000000005H380.2z" fill="#ff5f00" />
          <path
            className="st2"
            d="M382.2 296.9c0-11.5 5.4-21.7 13.7-28.3-6.1-4.8-13.8-7.7-22.2-7.7-19.9 0-36 16.1-36 36s16.1 36 36 36c8.4 0 16.1-2.9 22.2-7.7-8.3-6.5-13.7-16.8-13.7-28.3z"
            fill="#eb001b"
          />
          <path
            className="st3"
            d="M454.2 296.9c0 19.9-16.1 36-36 36-8.4 0-16.1-2.9-22.2-7.7 8.4-6.6 13.7-16.8 13.7-28.3s-5.4-21.7-13.7-28.3c6.1-4.8 13.8-7.7 22.2-7.7 19.9 0 36 16.2 36 36z"
            fill="#f79e1b"
          />
        </g>
      </g>
    </g>
  </svg>
);

export default memo(MasterCardIcon);
