import Pokemon from "./Pokemon";
export default function Pokemons({ pokemons }) {
  return (
    <ol className="pokemon__list">
      {pokemons?.map((pokemon) => {
        return <Pokemon pokemon={pokemon} key={pokemon.url} />;
      })}
    </ol>
  );
}
