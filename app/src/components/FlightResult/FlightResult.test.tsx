import { render, screen } from '@testing-library/react';
import FlightResult from './FlightResult.tsx';
import { Flights } from '../../hooks/useFlights.ts';
import { priceFormatter } from '../../utils/formatters.ts';

const directFlight: Flights = {
  first_departure: 'FCO',
  first_arrival: 'MXP',
  first_price: 100,
  second_departure: null,
  second_arrival: null,
  second_price: null,
  total_price: 100,
};

const stopoverFlight = {
  ...directFlight,
  second_departure: 'MXP',
  second_arrival: 'BCN',
  second_price: 80,
  total_price: 180,
} satisfies Flights;

// These are integration tests

describe(FlightResult.name, () => {
  it('Should render loading state', () => {
    render(<FlightResult isLoading flights={directFlight} />);

    expect(screen.getByText('Loading, please wait...')).toBeInTheDocument();
  });

  it('Should render error', () => {
    render(
      <FlightResult
        flights={directFlight}
        isLoading={false}
        error="A mysterious error occured"
      />
    );

    expect(screen.getByText('A mysterious error occured')).toBeInTheDocument();
  });

  it('[direct] Should render flight price and total price', () => {
    render(<FlightResult flights={directFlight} isLoading={false} />);

    expect(
      screen.getAllByText(priceFormatter.format(directFlight.total_price))
    ).toHaveLength(2);
  });

  it('[stopover] Should render flight prices and total price', () => {
    render(<FlightResult flights={stopoverFlight} isLoading={false} />);

    expect(
      screen.getByText(priceFormatter.format(stopoverFlight.first_price))
    ).toBeInTheDocument();
    expect(
      screen.getByText(priceFormatter.format(stopoverFlight.second_price))
    ).toBeInTheDocument();
    expect(
      screen.getByText(priceFormatter.format(stopoverFlight.total_price))
    ).toBeInTheDocument();
  });
});
