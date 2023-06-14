import { render, screen } from '@testing-library/react';
import FlightForm from './FlightForm.tsx';
import { Airport } from '../../hooks/useAirports.ts';
import userEvent from '@testing-library/user-event';

const airports: Airport[] = [
  { id: '1', code: 'FCO', name: 'Fiumicino Airport' },
  { id: '2', code: 'MXP', name: 'Malpensa Airport' },
  { id: '3', code: 'BCN', name: 'Barcelona Airport' },
];

// Don't want to test the backend for this
jest.mock('../../hooks/useAirports.ts', () => ({
  useAirports: () => ({ data: airports }),
}));

// These are integration tests

describe(FlightForm.name, () => {
  it('Should render disabled submit btn when loading', () => {
    render(<FlightForm isLoading />);

    expect(
      screen.getByRole('button', { name: "Let's take off!" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: "Let's take off!" })
    ).toBeDisabled();
  });

  it('Should render enabled submit btn when not loading', () => {
    render(<FlightForm isLoading={false} />);

    expect(
      screen.getByRole('button', { name: "Let's take off!" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: "Let's take off!" })
    ).toBeEnabled();
  });

  it('Should not trigger onSubmit when submit btn is clicked and form is invalid', async () => {
    const handleSubmit = jest.fn();
    render(<FlightForm onSubmit={handleSubmit} />);

    await userEvent.click(
      screen.getByRole('button', { name: "Let's take off!" })
    );
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it('Should select departure airport when clicked', async () => {
    render(<FlightForm />);
    await userEvent.selectOptions(screen.getByLabelText('Select Departure'), [
      'Malpensa Airport (MXP)',
    ]);
    expect(screen.getByLabelText('Select Departure')).toHaveValue('MXP');
  });

  // Select Arrival should be disabled by default
  it('Should not select arrival airport when clicked', async () => {
    render(<FlightForm />);
    await userEvent.selectOptions(screen.getByLabelText('Select Arrival'), [
      'Malpensa Airport (MXP)',
    ]);
    expect(screen.getByLabelText('Select Arrival')).toHaveValue('');
  });

  it('Should trigger onSubmit when submit btn is clicked and form is valid', async () => {
    const handleSubmit = jest.fn();
    render(<FlightForm onSubmit={handleSubmit} />);

    await userEvent.selectOptions(screen.getByLabelText('Select Departure'), [
      'Malpensa Airport (MXP)',
    ]);
    await userEvent.selectOptions(screen.getByLabelText('Select Arrival'), [
      'Barcelona Airport (BCN)',
    ]);

    await userEvent.click(
      screen.getByRole('button', { name: "Let's take off!" })
    );
    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(handleSubmit).toHaveBeenCalledWith('MXP', 'BCN');
  });
});
