import { useState } from "react";
import { useQuery } from "react-query";
import fetchData from "../API.js";
import Card from "./Card";
import getColor from "../hook/use-get-color.js";

export default function Pokemon({ pokemon }) {
  const [showCard, setShowCard] = useState(false);
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

  const { id, types } = pokemonData;
  console.log(pokemonData);
  const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  // const anotherImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${id}.png`;

  const color = getColor(types[0].type.name);
  const gradient = types.map((type) => getColor(type.type.name)).join(", ");
  const { name } = pokemonSpecies.names.find(
    (pokemon) => pokemon.language.name === "zh-Hant"
  );
  const handleClick = () => {
    setShowCard(!showCard);
  };

  return (
    <li
      className="p-6 border-2 rounded-lg cursor-pointer"
      style={{
        backgroundColor: color,
        backgroundImage: `linear-gradient(45deg, ${gradient})`,
      }}
      onClick={handleClick}
    >
      <img className="mx-auto w-60" src={img} alt={name} />
      {showCard && <Card name={name} img={img} />}
    </li>
  );
}
