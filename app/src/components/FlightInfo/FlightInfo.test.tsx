import { render, screen } from '@testing-library/react';
import FlightInfo from './FlightInfo.tsx';
import { priceFormatter } from '../../utils/formatters.ts';

const flight = {
  departure: 'MXP',
  arrival: 'BCN',
  price: 100,
};

describe(FlightInfo.name, () => {
  it('Should render departure airport', () => {
    render(
      <FlightInfo
        departure={flight.departure}
        arrival={flight.arrival}
        price={flight.price}
      />
    );

    expect(screen.getByText(flight.departure)).toBeInTheDocument();
  });

  it('Should render arrival airport', () => {
    render(
      <FlightInfo
        departure={flight.departure}
        arrival={flight.arrival}
        price={flight.price}
      />
    );

    expect(screen.getByText(flight.arrival)).toBeInTheDocument();
  });

  it('Should render flight price', () => {
    render(
      <FlightInfo
        departure={flight.departure}
        arrival={flight.arrival}
        price={flight.price}
      />
    );

    expect(
      screen.getByText(priceFormatter.format(flight.price))
    ).toBeInTheDocument();
  });
});
