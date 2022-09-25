import { memo, SVGProps } from 'react';

const CogIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height="18"
    viewBox="0 0 16 18"
    width="16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M8 11.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
      stroke="#061027"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <path
      d="M13.5 9c0-.465-.064-.913-.172-1.344l1.917-1.107-1.5-2.598-1.915 1.106A5.476 5.476 0 009.5 3.713V1.5h-3v2.212a5.5 5.5 0 00-2.33 1.345L2.255 3.951l-1.5 2.598 1.917 1.107A5.512 5.512 0 002.5 9c0 .464.064.913.172 1.344L.755 11.451l1.5 2.598 1.916-1.106a5.476 5.476 0 002.33 1.344V16.5h3v-2.212a5.503 5.503 0 002.33-1.344l1.916 1.106 1.5-2.598-1.917-1.107c.106-.432.17-.881.17-1.345z"
      stroke="#061027"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
);

export default memo(CogIcon);
