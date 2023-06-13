import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { Airport, useAirports } from '../../hooks/useAirports.ts';
import AirportSelect from '../AirportSelect/AirportSelect.tsx';

export type FlightFormProps = {
  isLoading: boolean;
  onSubmit: (departure: string, arrival: string) => void;
};

export default function FlightForm({ isLoading, onSubmit }: FlightFormProps) {
  const { data: airports = new Array<Airport>() } = useAirports();
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (airports.length && departure && arrival) {
      onSubmit(departure, arrival);
    }
  };

  const handleDepartureChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setDeparture(e.target.value);

    if (!e.target.value || e.target.value === arrival) {
      setArrival('');
    }
  };

  function handleSwitchAirports() {
    const temp = arrival;
    setArrival(departure);
    setDeparture(temp);
  }

  return (
    <form className="mt-12" onSubmit={handleSubmit}>
      <div className="grid sm:grid-cols-[minmax(0,1fr),max-content,minmax(0,1fr)] gap-2">
        <AirportSelect
          airports={airports}
          value={departure}
          onChange={handleDepartureChange}
        >
          Depart from...
        </AirportSelect>

        <button
          type="button"
          disabled={!arrival || !departure}
          className="disabled:opacity-50"
          title="Switch Arrival and Departure"
          onClick={handleSwitchAirports}
        >
          &#8596;
        </button>

        <AirportSelect
          // You can't take a flight that leaves and arrives in the same place, would be fun though
          airports={airports.filter((a) => a.code !== departure)}
          value={arrival}
          disabled={!departure}
          onChange={(e) => setArrival(e.target.value)}
        >
          Arrive to...
        </AirportSelect>
      </div>

      <button
        className={[
          'mt-8 font-bold w-full bg-neutral-900 text-neutral-200 py-3 px-5 rounded-lg hover:bg-neutral-700',
          'disabled:bg-neutral-400 disabled:cursor-not-allowed',
        ].join(' ')}
        disabled={isLoading}
      >
        Let's take off!
      </button>
    </form>
  );
}
