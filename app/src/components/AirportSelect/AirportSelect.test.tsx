import AirportSelect from './AirportSelect.tsx';
import { screen, render } from '@testing-library/react';
import { Airport } from '../../hooks/useAirports.ts';
import userEvent from '@testing-library/user-event';

const airports: Airport[] = [
  { id: '1', code: 'FCO', name: 'Fiumicino Airport' },
  { id: '2', code: 'MXP', name: 'Malpensa Airport' },
  { id: '3', code: 'BCN', name: 'Barcelona Airport' },
];

describe(AirportSelect.name, () => {
  it('Should render', () => {
    render(<AirportSelect airports={airports} aria-label="Select Airports" />);
    expect(screen.getByLabelText('Select Airports')).toBeInTheDocument();
  });

  it('Should render all options', () => {
    render(<AirportSelect airports={airports} aria-label="Select Airports" />);
    // Add 1 for ot account for the default option
    expect(screen.getAllByRole('option')).toHaveLength(airports.length + 1);
  });

  it('Should have default option value by default', () => {
    render(<AirportSelect airports={airports} aria-label="Select Airports" />);
    expect(screen.getByLabelText('Select Airports')).toHaveValue('');
  });

  it('Should get focused on tab key press', async () => {
    render(<AirportSelect airports={airports} aria-label="Select Airports" />);
    await userEvent.tab();
    expect(screen.getByLabelText('Select Airports')).toHaveFocus();
  });

  it('Should change value on option click', async () => {
    render(<AirportSelect airports={airports} aria-label="Select Airports" />);

    await userEvent.selectOptions(
      screen.getByLabelText('Select Airports'),
      ['Fiumicino Airport (FCO)']
    );

    expect(screen.getByLabelText('Select Airports')).toHaveValue('FCO');
  });

  it('Should not change value on option click when disabled', async () => {
    render(<AirportSelect airports={airports} aria-label="Select Airports" disabled />);

    await userEvent.selectOptions(
      screen.getByLabelText('Select Airports'),
      ['Fiumicino Airport (FCO)']
    );

    expect(screen.getByLabelText('Select Airports')).toHaveValue('');
  });
});
