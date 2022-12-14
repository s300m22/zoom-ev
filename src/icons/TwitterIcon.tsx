import { memo, SVGProps } from 'react';

const TwitterIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height="24"
    viewBox="0 0 30 24"
    width="24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M29.63 2.862c-1.107.461-2.215.83-3.507.923 1.292-.739 2.215-1.939 2.677-3.323-1.2.738-2.492 1.2-3.877 1.476C23.815.738 22.246 0 20.585 0c-3.323 0-6.093 2.677-6.093 6.092 0 .462.093.923.185 1.385C9.6 7.2 5.169 4.8 2.123 1.107a5.81 5.81 0 00-.83 3.047c0 2.123 1.107 3.97 2.676 5.077A5.64 5.64 0 011.2 8.492v.093c0 2.954 2.123 5.353 4.892 5.907-.554.093-1.015.185-1.569.185-.37 0-.738 0-1.108-.092.739 2.4 3.047 4.153 5.631 4.246-2.03 1.661-4.708 2.584-7.57 2.584-.46 0-1.014 0-1.476-.092C2.77 22.985 6 24 9.415 24c11.17 0 17.262-9.23 17.262-17.262V6c1.108-.923 2.123-1.938 2.954-3.138z"
      fill="#1DA1F2"
    />
  </svg>
);

export default memo(TwitterIcon);
