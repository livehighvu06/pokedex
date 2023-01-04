import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import PokemonList from "./components/PokemonList";
import fetchData from "./API.js";
const BASEURL = "https://pokeapi.co/api/v2/pokemon?limit=20";
const queryClient = new QueryClient();

export default function App() {
  const [pokemons, setPokemons] = useState(null);

  useEffect(() => {
    fetchData(BASEURL).then(({ results }) => setPokemons(results));
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <PokemonList pokemons={pokemons} />
      </div>
    </QueryClientProvider>
  );
}
