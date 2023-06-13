import { useFetch } from './useFetch.ts';

export type Flights = {
  first_departure: string;
  first_arrival: string;
  first_price: number;
  second_departure: string;
  second_arrival: string;
  second_price: number;
  total_price: number;
};

async function fetchFlights(
  departure: string,
  arrival: string
): Promise<Flights> {
  const response = await fetch(
    `${
      import.meta.env.VITE_API_BASE_URL
    }flights/?departure=${departure}&arrival=${arrival}`
  );

  const json = await response.json();
  if (!response.ok) throw new Error(json.message || response.statusText);
  return json.data;
}

export function useFlights() {
  return useFetch(fetchFlights);
}
