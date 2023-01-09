import React from "react";
import Pokemon from "./Pokemon";

function PokemonList({ pokemons }) {
  // console.log(pokemons);
  return (
    <>
      {pokemons.map((pokemon) => {
        return <Pokemon key={pokemon.url} pokemon={pokemon} />;
      })}
    </>
  );
}

export default PokemonList;
