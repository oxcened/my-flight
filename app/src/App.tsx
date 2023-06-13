import FlightForm from './components/FlightForm/FlightForm.tsx';
import { useFlights } from './hooks/useFlights.ts';
import FlightResult from './components/FlightResult/FlightResult.tsx';

export default function App() {
  const { data, isLoading, error, fetch } = useFlights();

  return (
    <main className="max-w-md mx-auto px-4 p-8">
      <h1 className="text-5xl font-bold text-center">🏝 MyFlight 🛩</h1>
      <p className="mt-5 text-lg font-light text-center">
        Cheap flights around the corner
      </p>

      <FlightForm isLoading={isLoading} onSubmit={fetch} />
      <FlightResult flights={data} isLoading={isLoading} error={error} />
    </main>
  );
}
