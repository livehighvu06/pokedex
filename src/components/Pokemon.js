import { useState } from "react";
import { useQuery } from "react-query";
import fetchData from "../API.js";
import Card from "./Card";
import getColor from "../hook/use-get-color.js";
import Loading from "./Loading";
export default function Pokemon({ pokemon }) {
  const [showCard, setShowCard] = useState(false);
  const { url } = pokemon;
  const {
    data: pokemonData,
    isLoading,
    isError,
    isSuccess,
  } = useQuery(["pokemonInfo", url], () => fetchData(url));

  const speciesURL = pokemonData?.species.url;

  const {
    data: pokemonSpecies,
    isLoading: speciesIsLoading,
    isError: speciesIsError,
    isSuccess: speciesIsSuccess,
  } = useQuery(["pokemonDetail", speciesURL], () => fetchData(speciesURL));
  if (isLoading || speciesIsLoading) return <Loading />;
  if (isError || speciesIsError) return "Error";

  const { id, types } = pokemonData;
  const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  const color = getColor(types[0].type.name);
  const gradient = types.map((type) => getColor(type.type.name)).join(", ");
  const { name } = pokemonSpecies.names.find(
    (pokemon) => pokemon.language.name === "zh-Hant"
  );
  const handleClick = () => {
    setShowCard(true);
  };
  const onClose = () => {
    setShowCard(false);
  };
  const Modal = <Card name={name} img={img} onClose={onClose} />;
  return (
    isSuccess &&
    speciesIsSuccess && (
      <>
        <li
          className="p-6 border-2 rounded-lg cursor-pointer"
          style={{
            backgroundColor: color,
            backgroundImage: `linear-gradient(45deg, ${gradient})`,
          }}
          onClick={handleClick}
        >
          <img className="mx-auto w-60" src={img} alt={name} />
        </li>
        {showCard && Modal}
      </>
    )
  );
}
