import { memo, SVGProps } from 'react';

const ChevronDownIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height="9"
    viewBox="0 0 14 9"
    width="14"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M7 8.75C6.68359 8.75 6.40234 8.64453 6.19141 8.43359L0.566406 2.80859C0.109375 2.38672 0.109375 1.64844 0.566406 1.22656C0.988281 0.769531 1.72656 0.769531 2.14844 1.22656L7 6.04297L11.8164 1.22656C12.2383 0.769531 12.9766 0.769531 13.3984 1.22656C13.8555 1.64844 13.8555 2.38672 13.3984 2.80859L7.77344 8.43359C7.5625 8.64453 7.28125 8.75 7 8.75Z"
      fill="#7C7C7C"
    />
  </svg>
);

export default memo(ChevronDownIcon);
