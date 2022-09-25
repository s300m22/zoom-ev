import { memo, SVGProps } from 'react';

const PictureIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height="44"
    viewBox="0 0 44 44"
    width="44"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M43.97 16.113a.86.86 0 00-.4-.522l-5.242-3.026V6.53a.86.86 0 00-.86-.86H26.39L16.765.116a.859.859 0 00-1.174.315l-3.026 5.242H6.53a.86.86 0 00-.86.86V17.61L.116 27.235a.86.86 0 00.315 1.174l5.242 3.026v6.034c0 .474.385.86.86.86H17.61l9.625 5.556a.859.859 0 001.174-.315l3.026-5.242h6.034a.86.86 0 00.86-.86V26.39l5.556-9.625a.86.86 0 00.086-.652zM16.65 2.033l6.302 3.639H14.55l2.1-3.639zM2.033 27.35l3.639-6.302v8.403l-3.639-2.1zM27.35 41.967l-6.302-3.639h8.403l-2.1 3.639zm9.26-5.358H7.39V7.391h29.22v29.218zm1.718-13.657V14.55l3.639 2.101-3.639 6.302z"
      fill="#718096"
    />
    <path
      d="M33.344 9.797h-7.201a.86.86 0 100 1.719h6.341v12.782l-1.31-2.27a2.68 2.68 0 00-2.344-1.353 2.68 2.68 0 00-2.344 1.353l-2.158 3.738-3.818-6.612a3.162 3.162 0 00-2.766-1.597 3.162 3.162 0 00-2.767 1.597l-2.515 4.357-.002.003-.944 1.636V11.516h6.892a.86.86 0 100-1.72h-7.752a.86.86 0 00-.86.86v22.688c0 .474.386.86.86.86h22.688a.86.86 0 00.86-.86V10.656a.86.86 0 00-.86-.86zM16.466 20.014a1.46 1.46 0 011.278-.738 1.46 1.46 0 011.278.738l2.293 3.972-.823 1.9a.502.502 0 01-.413.304.502.502 0 01-.47-.206 1.907 1.907 0 00-1.656-.782c-.652.037-1.233.399-1.555.967a.189.189 0 01-.157.099.19.19 0 01-.169-.075l-1.826-2.335 2.22-3.844zm-4.95 8.574l1.803-3.125 1.4 1.789c.364.467.99.733 1.578.733.047 0-.048.003 0 0 .639-.048 1.28-.411 1.595-.968a.188.188 0 01.16-.1.189.189 0 01.17.081c.477.654 1.244.99 2.047.9a2.207 2.207 0 001.8-1.329l.316-.73 3.837 6.645H11.516v-3.896zm16.69 3.896l-2.886-4.999 2.654-4.597a.97.97 0 01.856-.494.97.97 0 01.856.494l2.798 4.848v4.748h-4.278z"
      fill="#718096"
    />
    <path
      d="M22.277 11.516a.865.865 0 00.608-.252.866.866 0 00.252-.608.865.865 0 00-.252-.607.862.862 0 00-1.467.607.862.862 0 00.86.86z"
      fill="#718096"
    />
  </svg>
);

export default memo(PictureIcon);