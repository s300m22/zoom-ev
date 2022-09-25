import { memo, SVGProps } from 'react';

const CopyToClipboard = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height="52"
    viewBox="0 0 52 52"
    width="52"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M40 0H12C5.37258 0 0 5.37258 0 12V40C0 46.6274 5.37258 52 12 52H40C46.6274 52 52 46.6274 52 40V12C52 5.37258 46.6274 0 40 0Z"
      fill="#2EBFF3"
    />
    <path
      d="M33.5 16.375V10.75H26.9375C25.3555 10.75 24.125 12.0391 24.125 13.5625V30.4375C24.125 32.0195 25.3555 33.25 26.9375 33.25H38.1875C39.7109 33.25 41 32.0195 41 30.4375V18.25H35.375C34.3203 18.25 33.5 17.4297 33.5 16.375ZM35.375 10.75V16.375H41L35.375 10.75ZM22.25 31.375V18.25H13.8125C12.2305 18.25 11 19.5391 11 21.0625V37.9375C11 39.5195 12.2305 40.75 13.8125 40.75H25.0625C26.5859 40.75 27.875 39.5195 27.875 37.9375V35.125H26C23.8906 35.125 22.25 33.4844 22.25 31.375Z"
      fill="white"
    />
  </svg>
);

export default memo(CopyToClipboard);