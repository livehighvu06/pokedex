import { QueryClient, QueryClientProvider } from "react-query";
import PokemonList from "./components/PokemonList";
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <PokemonList />
      </div>
    </QueryClientProvider>
  );
}
