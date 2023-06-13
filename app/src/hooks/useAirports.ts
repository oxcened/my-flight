import { useEffect } from 'react';
import { useFetch } from './useFetch.ts';

export type Airport = {
  id: string;
  name: string;
  code: string;
};

async function fetchAirports(): Promise<Airport[]> {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}airports/`);
  const json = await response.json();
  if (!response.ok) throw new Error(json.message || response.statusText);
  return json.data;
}

export function useAirports() {
  const { fetch, ...rest } = useFetch(fetchAirports);

  useEffect(() => {
    fetch();
  }, []);

  return rest;
}
