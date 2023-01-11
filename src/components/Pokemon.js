import { useQuery } from "react-query";
import fetchData from "../API.js";
function getColor(type) {
  const colors = new Map([
    ["bug", "#a6b91a"],
    ["dark", "#705746"],
    ["dragon", "#6f35fc"],
    ["electric", "#f7d02c"],
    ["fairy", "#d685ad"],
    ["fighting", "#c22e28"],
    ["fire", "#ee8130"],
    ["flying", "#a98ff3"],
    ["ghost", "#735797"],
    ["grass", "#7ac74c"],
    ["ground", "#e2bf65"],
    ["ice", "#96d9d6"],
    ["normal", "#a8a77a"],
    ["poison", "#a33ea1"],
    ["psychic", "#f95587"],
    ["rock", "#b6a136"],
    ["steel", "#b7b7ce"],
    ["water", "#6390f0"],
  ]);

  return colors.get(type) || "#777";
}
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

  // const { sprites } = pokemonData;
  // const img = sprites.front_default;
  const { id, types } = pokemonData;
  console.log(pokemonData);
  const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  const color = getColor(types[0].type.name);
  const gradient = types.map((type) => getColor(type.type.name)).join(", ");
  const { name } = pokemonSpecies.names.find(
    (pokemon) => pokemon.language.name === "zh-Hant"
  );
  console.log(color, gradient);

  return (
    <li
      className="p-6 border-2 rounded-lg"
      style={{
        backgroundColor: color,
        backgroundImage: `linear-gradient(45deg, ${gradient})`,
      }}
    >
      <img className="mx-auto w-60" src={img} alt={name} />
      {/* <span className="text-white font-bold text-xl block mt-6">{name}</span> */}
    </li>
  );
}
