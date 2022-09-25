import { memo, SVGProps } from 'react';

const CheckboxIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height={20}
    viewBox="0 0 20 20"
    width={20}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect fill="#fff" height={19} rx={9.5} stroke="#ECECEC" width={19} x={0.5} y={0.5} />
    <rect fill="url(#prefix__paint0_linear)" height={14} rx={7} width={14} x={3} y={3} />
    <path
      d="M7 10l2.143 2.5L13 8"
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={2}
    />
    <defs>
      <linearGradient
        gradientUnits="userSpaceOnUse"
        id="prefix__paint0_linear"
        x1={3}
        x2={17}
        y1={10}
        y2={10}
      >
        <stop stopColor="#54C0EF" />
        <stop offset={1} stopColor="#16D3A4" />
      </linearGradient>
    </defs>
  </svg>
);

export default memo(CheckboxIcon);
