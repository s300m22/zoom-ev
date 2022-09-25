import { memo, SVGProps } from 'react';

const MarkIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height="34"
    viewBox="0 0 23 34"
    width="23"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M11.25 0C5.047 0 0 4.957 0 11.05c0 7.964 8.969 21.396 9.35 21.964.414.614 1.13.986 1.9.986s1.486-.372 1.9-.986c.381-.568 9.35-14 9.35-21.964C22.5 4.957 17.453 0 11.25 0zm0 15.298c-2.485 0-4.5-1.896-4.5-4.245 0-2.35 2.015-4.255 4.5-4.255 2.487 0 4.5 1.905 4.5 4.255 0 2.348-2.013 4.245-4.5 4.245z"
      fill="#000"
    />
  </svg>
);

export default memo(MarkIcon);
