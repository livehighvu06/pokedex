import { useQuery } from "react-query";
import fetchData from "../API.js";
export default function Pokemon({ pokemon }) {
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
