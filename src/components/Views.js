import { useInfiniteQuery } from "react-query";
import InfiniteScroll from "react-infinite-scroller";
import PokemonList from "./PokemonList";
import fetchData from "../API";
const LIMIT = 20;
export default function Pokemons() {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      "pokemonDataPage",
      ({ pageParam = `https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}` }) =>
        fetchData(pageParam),
      {
        getNextPageParam: (lastPage) => lastPage.next,
      }
    );
  if (isLoading) return "初始化";
  return (
    <>
      {isFetchingNextPage && "載入中~"}
      <InfiniteScroll hasMore={hasNextPage} loadMore={fetchNextPage}>
        <div>
          <ol className="pokemon__list">
            {data?.pages.map((page, index) => {
              return <PokemonList pokemons={page.results} key={index} />;
            })}
          </ol>
        </div>
      </InfiniteScroll>
    </>
  );
}
