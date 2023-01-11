import { useInfiniteQuery } from "react-query";
import InfiniteScroll from "react-infinite-scroller";
import PokemonList from "./PokemonList";
import fetchData from "../API";
import Loading from "./Loading";
const LIMIT = 20;
export default function Pokemons() {
  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery(
    "pokemonDataPage",
    ({ pageParam = `https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}` }) =>
      fetchData(pageParam),
    {
      getNextPageParam: (lastPage) => lastPage.next,
    }
  );
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <InfiniteScroll hasMore={hasNextPage} loadMore={fetchNextPage}>
          <div className="container mx-auto p-6">
            <ol className="pokemon__list grid grid-cols-pokemon text-center gap-6 mb-6">
              {data?.pages.map((page, index) => {
                return <PokemonList pokemons={page.results} key={index} />;
              })}
            </ol>
          </div>
        </InfiniteScroll>
      )}
    </>
  );
}
