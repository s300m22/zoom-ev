import { useRouter } from 'next/router';
import { useMemo } from 'react';

const useNextQueryParam = (keys: Array<string>): Array<string | undefined> => {
  const { asPath, query } = useRouter();

  return useMemo(
    () =>
      keys.map((key) => {
        if (query[key]) {
          return query[key] as string;
        }

        const res = asPath.match(new RegExp(`[&?]${key}=(.*)(&|$)^[^&]+`)) || [];
        return res[1];
      }),
    [keys, asPath, query],
  );
};

export default useNextQueryParam;
