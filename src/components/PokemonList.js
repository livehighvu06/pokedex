import { useQuery } from "react-query";
import Pokemon from "./Pokemon";
import fetchData from "../API.js";
const BASEURL = "https://pokeapi.co/api/v2/pokemon?limit=20";

export default function Pokemons() {
  const { data, isLoading } = useQuery("pokemonData", () => fetchData(BASEURL));
  if (isLoading) return "Loading";
  return (
    <ol className="pokemon__list">
      {data.results?.map((pokemon) => {
        return <Pokemon pokemon={pokemon} key={pokemon.url} />;
      })}
    </ol>
  );
}
