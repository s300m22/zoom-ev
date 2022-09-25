import { memo, SVGProps } from 'react';

const ChevronUpIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height="9"
    viewBox="0 0 14 9"
    width="14"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12.625 8.625C12.3086 8.625 12.0273 8.51953 11.8164 8.30859L7 3.49219L2.14844 8.30859C1.72656 8.76562 0.988281 8.76562 0.566406 8.30859C0.109375 7.88672 0.109375 7.14844 0.566406 6.72656L6.19141 1.10156C6.61328 0.644531 7.35156 0.644531 7.77344 1.10156L13.3984 6.72656C13.8555 7.14844 13.8555 7.88672 13.3984 8.30859C13.1875 8.51953 12.9062 8.625 12.625 8.625Z"
      fill="#7C7C7C"
    />
  </svg>
);

export default memo(ChevronUpIcon);
