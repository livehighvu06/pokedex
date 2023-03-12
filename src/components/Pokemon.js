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
  } = useQuery(["pokemonInfo", url], () => fetchData(url), {
    enabled: !!url,
  });

  const speciesURL = pokemonData?.species.url;

  const {
    data: pokemonSpecies,
    isLoading: speciesIsLoading,
    isError: speciesIsError,
    isSuccess: speciesIsSuccess,
  } = useQuery(["pokemonDetail", speciesURL], () => fetchData(speciesURL), {
    enabled: !!speciesURL,
  });
  if (isLoading || speciesIsLoading) return <Loading />;
  if (isError || speciesIsError) return "Error";

  const { id, types } = pokemonData;
  const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  const color = getColor(types[0].type.name);
  const gradient = types.map((type) => getColor(type.type.name)).join(", ");
  const getInfo = (target) => {
    return target.find((pokemon) => pokemon.language.name === "zh-Hant");
  };
  const { name } = getInfo(pokemonSpecies.names);
  const { genus } = getInfo(pokemonSpecies.genera);

  const handleClick = () => {
    setShowCard(true);
  };
  const onClose = () => {
    setShowCard(false);
  };
  const bgImage = {
    backgroundColor: color,
    backgroundImage: `linear-gradient(45deg, ${gradient})`,
  };
  const Modal = (
    <Card
      name={name}
      img={img}
      genus={genus}
      types={types}
      onClose={onClose}
      bgImage={bgImage}
    />
  );
  return (
    isSuccess &&
    speciesIsSuccess && (
      <>
        <li
          className="p-6 border-2 rounded-lg cursor-pointer md:grayscale hover:grayscale-0 transition duration-300"
          style={bgImage}
          onClick={handleClick}
        >
          <img className="mx-auto w-60" src={img} alt={name} />
        </li>
        {showCard && Modal}
      </>
    )
  );
}
