import { useState } from 'react';

export function useFetch<TData, TParams extends unknown[]>(
  fetchFn: (...args: TParams) => Promise<TData>
) {
  const [data, setData] = useState<TData>();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  function fetch(...args: TParams) {
    setData(undefined);
    setError(undefined);
    setLoading(true);

    fetchFn(...args)
      .then(setData)
      .catch((e) => setError(e.message || 'Unknown error'))
      .finally(() => setLoading(false));
  }

  return {
    data,
    isLoading,
    error,
    fetch,
  };
}
