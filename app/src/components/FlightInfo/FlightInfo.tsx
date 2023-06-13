import { priceFormatter } from '../../utils/formatters.ts';

export type FlightProps = { departure: string; arrival: string; price: number };

export default function FlightInfo({ departure, arrival, price }: FlightProps) {
  return (
    <div className="grid grid-cols-2 mt-4">
      <p className="text-neutral-500">Leave from</p>
      <p>{departure}</p>
      <p className="text-neutral-500">Arrive at</p>
      <p>{arrival}</p>
      <p className="text-neutral-500">Price</p>
      <p>{priceFormatter.format(price)}</p>
    </div>
  );
}
