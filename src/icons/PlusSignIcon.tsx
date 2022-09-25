import { memo, SVGProps } from 'react';

const PlusSignIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height={19}
    viewBox="0 0 19 19"
    width={19}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M9.34.392a.947.947 0 00-.947.947v7.053H1.34a.947.947 0 000 1.893h7.053v7.054c0 .846 1.025 1.26 1.616.67.381-.382.277-.032.277-7.724h7.054a.947.947 0 000-1.893h-7.054V1.34A.947.947 0 009.34.392z"
      fill="#9FA4AF"
    />
  </svg>
);

export default memo(PlusSignIcon);
