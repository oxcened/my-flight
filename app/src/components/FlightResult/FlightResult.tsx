import { Flights } from '../../hooks/useFlights.ts';
import FlightInfo from '../FlightInfo/FlightInfo.tsx';
import { priceFormatter } from '../../utils/formatters.ts';
import { PropsWithChildren } from 'react';

function FlightHeader({ children }: PropsWithChildren) {
  return (
    <p className="mt-4 uppercase text-sm font-medium bg-neutral-100 rounded-md p-2">
      {children}
    </p>
  );
}

export type FlightResultProps = {
  flights?: Flights;
  isLoading: boolean;
  error?: string;
};

export default function FlightResult({
  flights,
  isLoading,
  error,
}: FlightResultProps) {
  if (isLoading) {
    return <p className="mt-10 text-center">Loading, please wait...</p>;
  }

  if (error) {
    return <p className="mt-10 text-center">{error}</p>;
  }

  if (!flights) return;

  const hasStopover = !!flights.second_departure;

  const firstFlightInfo = (
    <FlightInfo
      departure={flights.first_departure}
      arrival={flights.first_arrival}
      price={flights.first_price}
    />
  );

  return (
    <div className="mt-10 border p-4 rounded-md">
      <p className="text-xl">Pack your bags 🧳</p>
      <p className="font-light mt-1 mb-8">
        Here is the cheapest flight we were able to find
      </p>

      {hasStopover ? (
        <>
          <FlightHeader>1️⃣ 1st Flight</FlightHeader>
          {firstFlightInfo}

          <FlightHeader>2️⃣ 2nd Flight</FlightHeader>
          <FlightInfo
            departure={flights.second_departure!}
            arrival={flights.second_arrival!}
            price={flights.second_price!}
          />

          <p className="mt-8 text-sm bg-orange-500/10 text-orange-950 rounded-md p-2 font-medium">
            Please note: This solution includes 1 stopover
          </p>
        </>
      ) : (
        firstFlightInfo
      )}

      <p className="mt-8 pt-4 pb-2 border-t grid grid-cols-2">
        <span className="text-neutral-500">Total Price</span>
        <span>{priceFormatter.format(flights.total_price)}</span>
      </p>
    </div>
  );
}
