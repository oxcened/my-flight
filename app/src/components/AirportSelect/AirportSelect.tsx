import { SelectHTMLAttributes } from 'react';
import { Airport } from '../../hooks/useAirports.ts';

export type AirportSelectProps = {
  airports: Airport[];
} & Pick<
  SelectHTMLAttributes<HTMLSelectElement>,
  'children' | 'value' | 'disabled' | 'onChange'
>;

export default function AirportSelect({
  airports,
  value,
  children,
  disabled,
  onChange,
}: AirportSelectProps) {
  return (
    <select
      required
      className="border py-3 px-2 rounded-md enabled:hover:border-neutral-400 disabled:cursor-not-allowed"
      value={value}
      onChange={onChange}
      disabled={disabled}
    >
      <option value="">{children}</option>
      {airports.map((a) => (
        <option key={a.id} value={a.code}>
          {a.name} ({a.code})
        </option>
      ))}
    </select>
  );
}
