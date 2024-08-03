import { useCallback, useEffect, useRef, useState } from "react";

interface UseShortPollingProps<T> {
  interval?: number;
  fetcher: () => Promise<T>;
}
/**
 * A hook that fetches data at a regular interval and updates the data and error state
 * @param interval - the interval in milliseconds to fetch the data
 * @param fetcher - a function that fetches the data
 * @returns an object with the following properties:
 * - startPolling - a function that starts the polling
 * - stopPolling - a function that stops the polling
 * - isPolling - a boolean that indicates if the polling is active
 * - data - the fetched data
 * - error - the error if the fetch fails
 * - setData - a function to set the data
 * - isFetching - a boolean that indicates if the data is being fetched
 * @example
 * const { data, error, isPolling, startPolling, stopPolling } = useShortPolling({
 *  interval: 1000,
 * fetcher: fetchJobs,
 * });
 * if (error) {
 * console.error(error);
 * }
 * if (data) {
 * console.log(data);
 * }
 */
export const useShortPolling = <T>({
  interval = 1000,
  fetcher,
}: UseShortPollingProps<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isPolling, setIsPolling] = useState<boolean>(false);
  const intervalIdRef = useRef<number | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  // startFetch function is a function that fetches the data and sets the data and error state
  const startFetch = useCallback(async () => {
    if (isFetching) return;
    setIsFetching(true);
    try {
      const res = await fetcher();
      setData(res);
      setError(null);
    } catch (error) {
      setError(error as Error);
    }
    setIsFetching(false);
  }, [fetcher]);

  const startPolling = useCallback(() => {
    if (intervalIdRef.current) return;
    setIsPolling(true);
    startFetch();
    intervalIdRef.current = setInterval(async () => {
      await startFetch();
    }, interval);
  }, [startFetch, interval]);

  const stopPolling = useCallback(() => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
    setIsPolling(false);
  }, []);

  useEffect(() => {
    startPolling();
    return () => stopPolling();
  }, [startPolling, stopPolling]);

  return {
    startPolling,
    stopPolling,
    isPolling,
    data,
    error,
    setData,
  };
};
