import { memo, SVGProps } from 'react';

const VisaIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height="10"
    viewBox="0 0 32 10"
    width="32"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M8 9.921H5.288L3.255 2.164c-.096-.357-.301-.673-.603-.821A8.827 8.827 0 00.167.522v-.3h4.368c.603 0 1.055.45 1.13.97L6.72 6.789 9.43.223h2.637L8 9.92zm5.574 0h-2.56L13.121.223h2.561L13.574 9.92zm5.422-7.01c.076-.523.528-.822 1.055-.822a4.772 4.772 0 012.486.448l.452-2.088A6.483 6.483 0 0020.654 0C18.17 0 16.36 1.343 16.36 3.208c0 1.418 1.281 2.163 2.186 2.612.978.447 1.355.746 1.28 1.193 0 .671-.754.97-1.507.97-.904 0-1.808-.224-2.636-.598l-.452 2.09c.904.372 1.883.522 2.787.522 2.787.074 4.519-1.268 4.519-3.283 0-2.536-3.54-2.685-3.54-3.804zM31.5 9.92L29.466.223h-2.184c-.452 0-.904.299-1.055.746L22.462 9.92h2.636l.526-1.417h3.24l.301 1.417H31.5zm-3.84-7.084l.751 3.656h-2.108l1.356-3.656z"
      fill="#172B85"
      fillRule="evenodd"
    />
  </svg>
);

export default memo(VisaIcon);
