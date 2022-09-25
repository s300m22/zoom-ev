import { memo, SVGProps } from 'react';

const QuestionIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height="12"
    viewBox="0 0 12 12"
    width="12"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M6 0C2.7 0 0 2.7 0 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6zm0 9.75c-.45 0-.75-.3-.75-.75s.3-.75.75-.75.75.3.75.75-.3.75-.75.75zM7.125 6.3c-.375.225-.375.3-.375.45v.75h-1.5v-.75c0-.975.6-1.425 1.05-1.725.375-.225.45-.3.45-.525 0-.45-.3-.75-.75-.75-.3 0-.525.15-.675.375L4.95 4.8l-1.275-.75.375-.675A2.238 2.238 0 016 2.25c1.275 0 2.25.975 2.25 2.25 0 1.05-.675 1.5-1.125 1.8z"
      fill="#9FA4AF"
    />
  </svg>
);

export default memo(QuestionIcon);
