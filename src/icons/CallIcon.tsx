import { memo, SVGProps } from 'react';

const CallIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg fill="none" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="18" cy="18" fill="url(#paint0_linear)" r="18" />
    <path
      d="M19.178 20.529L18.119 21.854C16.4782 20.8892 15.1107 19.5217 14.146 17.881L15.471 16.822C15.6262 16.6977 15.7359 16.5255 15.7829 16.3323C15.83 16.1391 15.8117 15.9357 15.731 15.754L14.524 13.036C14.4374 12.841 14.2845 12.6831 14.0923 12.5904C13.9002 12.4977 13.6814 12.4763 13.475 12.53L11.175 13.13C10.9599 13.1849 10.7727 13.3174 10.6494 13.502C10.5261 13.6866 10.4754 13.9102 10.507 14.13C10.9109 17.0012 12.2386 19.6628 14.2894 21.7125C16.3402 23.7622 19.0025 25.0886 21.874 25.491C22.0937 25.5225 22.3173 25.4718 22.5019 25.3485C22.6865 25.2252 22.819 25.038 22.874 24.823L23.474 22.523C23.5273 22.3167 23.5058 22.0981 23.4131 21.9062C23.3205 21.7143 23.1627 21.5615 22.968 21.475L20.246 20.27C20.0643 20.1891 19.861 20.1707 19.6678 20.2175C19.4746 20.2644 19.3024 20.3739 19.178 20.529V20.529Z"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <path
      d="M18.4999 14C19.4282 14 20.3184 14.3687 20.9748 15.0251C21.6312 15.6815 21.9999 16.5717 21.9999 17.5"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <path
      d="M18.4999 11C19.3535 11 20.1988 11.1681 20.9874 11.4948C21.776 11.8214 22.4926 12.3002 23.0961 12.9038C23.6997 13.5074 24.1785 14.2239 24.5052 15.0126C24.8318 15.8012 24.9999 16.6464 24.9999 17.5"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <defs>
      <linearGradient
        gradientUnits="userSpaceOnUse"
        id="paint0_linear"
        x1="0"
        x2="36"
        y1="18"
        y2="18"
      >
        <stop stopColor="#54C0EF" />
        <stop offset="1" stopColor="#16D3A4" />
      </linearGradient>
    </defs>
  </svg>
);

export default memo(CallIcon);
