import { memo, SVGProps } from 'react';

const PlasticImpactIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height="64"
    viewBox="0 0 54 64"
    width="54"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M1 26h27v5.5l-3 1.375V49H1V26z" fill="url(#paint0_linear)" />
    <path
      clipRule="evenodd"
      d="M0 55.733V23.467a14.893 14.893 0 019.6-13.95v-2.05H7.467V5.333H9.6V1.067A1.067 1.067 0 0110.667 0H19.2a1.067 1.067 0 011.067 1.067v4.266H22.4v2.134h-2.133v2.05a14.87 14.87 0 019.556 12.802l-2.127.162a12.75 12.75 0 00-8.825-11.195 1.066 1.066 0 01-.738-1.014V7.467h-6.4v2.805a1.066 1.066 0 01-.738 1.014 12.77 12.77 0 00-8.862 12.18v1.067H25.6v2.134H2.133V48h19.2v2.133h-19.2v5.6a6.14 6.14 0 006.134 6.134 6.072 6.072 0 003.678-1.226 4.987 4.987 0 015.977 0 6.084 6.084 0 003.45 1.221l-.078 2.132a8.218 8.218 0 01-4.655-1.649 2.844 2.844 0 00-3.41 0A8.193 8.193 0 018.267 64 8.276 8.276 0 010 55.733zm18.133-53.6h-6.4v3.2h6.4v-3.2zM48 17.793l2.745 3.85a13.647 13.647 0 012.196 4.771c.259 1.079.39 2.184.392 3.293v4.426c-.001.411-.034.821-.097 1.227a9.588 9.588 0 01-.295 1.18l-.386 1.179a5.448 5.448 0 00-.002 3.49l.386 1.178c.26.778.393 1.593.394 2.413v14.933A4.272 4.272 0 0149.067 64h-2.315a3.191 3.191 0 01-2.268-.942 1.069 1.069 0 00-1.5 0l-1.509-1.508a3.253 3.253 0 014.517 0 1.072 1.072 0 00.76.317h2.315a2.135 2.135 0 002.133-2.134v-4.266h-8.533v-2.134H51.2V51.2h-8.533v-2.133H51.2v-2.134h-8.533V44.8H51.2a5.513 5.513 0 00-.286-1.743l-.386-1.178a7.578 7.578 0 01.001-4.83l.257-.782h-8.12v-2.134H51.2V32h-8.533v-2.133H51.2v-.16a11.917 11.917 0 00-.187-1.974h-8.346V25.6h7.786a11.52 11.52 0 00-1.441-2.715l-2.947-4.132a1.066 1.066 0 01-.198-.62v-4.266H41.6v4.266c0 .222-.07.438-.198.619l-2.944 4.128c-.255.355-.489.725-.702 1.107l-1.863-1.04c.252-.45.529-.887.83-1.306l2.744-3.849V12.8a1.067 1.067 0 011.066-1.067h6.4A1.067 1.067 0 0148 12.8v4.992zM9.01 14.594l1.18 1.776a8.602 8.602 0 012.117-1.02l-.657-2.03c-.934.302-1.823.73-2.64 1.274zm-.24 2.964a8.547 8.547 0 00-2.318 4.958l-2.12-.235a10.699 10.699 0 012.9-6.202l1.538 1.479zM6.4 28.8H4.267v2.133H6.4V28.8zm-2.133 4.267H6.4v9.6H4.267v-9.6zm25.6 2.133h-2.134v3.2h2.134v-3.2zm-2.134-8.533c0-1.795 1.874-3.2 4.267-3.2 2.393 0 4.267 1.405 4.267 3.2v3.608l2.494 1.252a3.184 3.184 0 011.772 2.863v5.077c0 .165-.038.329-.112.477l-.828 1.656.828 1.656c.074.148.112.312.112.477v2.134c0 .165-.038.329-.112.477L39.593 48l.828 1.656c.074.148.112.312.112.477v2.134c0 .165-.038.329-.112.477l-.828 1.656.828 1.656c.074.148.112.312.112.477V60.8a3.195 3.195 0 01-3.2 3.2H26.667a3.205 3.205 0 01-3.2-3.2v-4.267c0-.165.038-.329.112-.477l.828-1.656-.828-1.656a1.066 1.066 0 01-.112-.477v-2.134c0-.165.038-.329.112-.477L24.407 48l-.828-1.656a1.066 1.066 0 01-.112-.477v-2.134c0-.165.038-.329.112-.477l.828-1.656-.828-1.656a1.066 1.066 0 01-.112-.477V34.39a3.187 3.187 0 011.773-2.864l2.493-1.251v-3.608zm6.4 0c0-.435-.83-1.067-2.133-1.067-1.302 0-2.133.632-2.133 1.067 0 .435.83 1.066 2.133 1.066 1.302 0 2.133-.631 2.133-1.066zm4.106 7.16a1.063 1.063 0 00-.433-.393l-3.084-1.548a1.065 1.065 0 01-.589-.953v-1.498a5.49 5.49 0 01-4.266 0v1.498a1.065 1.065 0 01-.589.954l-3.083 1.546a1.066 1.066 0 00-.595.957v4.825l.954 1.908a1.068 1.068 0 010 .954l-.954 1.908v1.63l.954 1.908a1.068 1.068 0 010 .954l-.954 1.908v1.63l.954 1.908a1.068 1.068 0 010 .954l-.954 1.908V60.8a1.071 1.071 0 001.067 1.067h10.666c.087-.001.174-.011.259-.03A1.078 1.078 0 0038.4 60.8v-4.015l-.66-1.318H28.8v-2.134h8.94l.66-1.318v-1.63l-.66-1.318H28.8v-2.134h8.94l.66-1.318v-1.63l-.66-1.318H28.8v-2.134h8.94l.66-1.318V34.39c0-.2-.056-.394-.16-.563z"
      fill="#fff"
      fillRule="evenodd"
    />
    <defs>
      <linearGradient
        gradientUnits="userSpaceOnUse"
        id="paint0_linear"
        x1="2.2"
        x2="32.109"
        y1="49.024"
        y2="34.382"
      >
        <stop stopColor="#54EFD0" />
        <stop offset="1" stopColor="#00BFF3" />
      </linearGradient>
    </defs>
  </svg>
);

export default memo(PlasticImpactIcon);
