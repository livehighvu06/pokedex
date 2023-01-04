import { useEffect, useState } from "react";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";
const BASEURL = "https://pokeapi.co/api/v2/pokemon?limit=20";
const queryClient = new QueryClient();
const fetchData = async function (url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(response.status);
  }
  const data = await response.json();
  return data;
};

function Pokemon({ pokemon }) {
  const { url } = pokemon;
  const {
    data: pokemonData,
    isLoading,
    isError,
  } = useQuery(["pokemonInfo", url], () => fetchData(url));

  const speciesURL = pokemonData?.species.url;

  const {
    data: pokemonSpecies,
    isLoading: speciesIsLoading,
    isError: speciesIsError,
  } = useQuery(["pokemonDetail", speciesURL], () => fetchData(speciesURL));
  if (isLoading || speciesIsLoading) return "Loading";
  if (isError || speciesIsError) return "Error";

  const { sprites } = pokemonData;
  const img = sprites.front_default;
  const { name } = pokemonSpecies.names.find(
    (pokemon) => pokemon.language.name === "zh-Hant"
  );
  console.log(name);

  return (
    <li>
      <img src={img} alt={name} />
      <span>{name}</span>
    </li>
  );
}
function Pokemons({ pokemons }) {
  return (
    <ol>
      {pokemons?.map((pokemon) => {
        return <Pokemon pokemon={pokemon} key={pokemon.url} />;
      })}
    </ol>
  );
}

export default function App() {
  const [pokemons, setPokemons] = useState(null);

  useEffect(() => {
    fetchData(BASEURL).then(({ results }) => setPokemons(results));
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Pokemons pokemons={pokemons} />
      </div>
    </QueryClientProvider>
  );
}
