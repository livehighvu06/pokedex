import { useInfiniteQuery } from "react-query";
import InfiniteScroll from "react-infinite-scroller";
import PokemonList from "./PokemonList";
import fetchData from "../API";
let LIMIT = 20;
// let pageParam = 20;

// const fetchUrl = async (pageParam) => {
//   const endpoint = new URL("https://pokeapi.co/api/v2/pokemon");
//   endpoint.search = new URLSearchParams({
//     limit: pageParam,
//   });
//   console.log(endpoint);
//   const response = await fetch(endpoint);
//   return response.json();
// };
async function fetchPokemons({
  pageParam = `https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}`,
}) {
  return fetchData(pageParam);
}
export default function Pokemons() {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(["pokemonDataPage"], fetchPokemons, {
      getNextPageParam: (lastPage) => lastPage.next,
      // getPreviousPageParam: (firstPage) => firstPage.previous,
    });
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
