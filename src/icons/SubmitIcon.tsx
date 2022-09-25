import { memo, SVGProps } from 'react';

const SubmitIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height="61"
    viewBox="0 0 64 61"
    width="64"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect fill="url(#paint0_linear)" height="61" rx="30.5" width="64" />
    <path
      d="M37.507 32.615c3.428-4.746 2.282-11.318-2.56-14.678-4.84-3.36-11.544-2.237-14.972 2.51-3.427 4.746-2.281 11.317 2.56 14.677a10.92 10.92 0 0011.669.473l7.919 7.717a2.28 2.28 0 003.177.08 2.173 2.173 0 000-3.195l-7.793-7.584zm-8.772.72c-3.826 0-6.927-3.038-6.93-6.788 0-3.75 3.098-6.792 6.925-6.793 3.82-.002 6.92 3.032 6.928 6.777.006 3.752-3.091 6.797-6.919 6.804h-.004z"
      fill="#fff"
    />
    <defs>
      <linearGradient
        gradientUnits="userSpaceOnUse"
        id="paint0_linear"
        x1="0"
        x2="64"
        y1="30.5"
        y2="30.5"
      >
        <stop stopColor="#54C0EF" />
        <stop offset="1" stopColor="#16D3A4" />
      </linearGradient>
    </defs>
  </svg>
);

export default memo(SubmitIcon);
