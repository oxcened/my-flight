import { SelectHTMLAttributes } from 'react';
import { Airport } from '../../hooks/useAirports.ts';

export type AirportSelectProps = {
  airports: Airport[];
  placeholder?: string;
} & Pick<
  SelectHTMLAttributes<HTMLSelectElement>,
  'children' | 'value' | 'disabled' | 'aria-label' | 'onChange'
>;

export default function AirportSelect({
  airports,
  placeholder,
  ...rest
}: AirportSelectProps) {
  return (
    <select
      required
      className="border py-3 px-2 rounded-md enabled:hover:border-neutral-400 disabled:cursor-not-allowed"
      {...rest}
    >
      <option value="">{placeholder}</option>
      {airports.map((a) => (
        <option key={a.id} value={a.code}>
          {a.name} ({a.code})
        </option>
      ))}
    </select>
  );
}
