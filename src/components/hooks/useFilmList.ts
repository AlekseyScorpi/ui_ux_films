import { useInfiniteQuery} from "@tanstack/react-query";

import { filmListQuery } from "@/api";



export const useFilmList = (currentPage: string, pageSize: string) => {
    const {
      data: filmList,
      isLoading,
      isFetching,
      fetchNextPage,
      hasNextPage,
      error
    } = useInfiniteQuery(
      ["getFilmList", pageSize],
      ({ pageParam = 0 }) => filmListQuery(pageParam + 1, pageSize),
      {
        keepPreviousData: true,
        cacheTime: 1000 * 60 * 60,
        staleTime: 1000 * 60 * 60,
        getNextPageParam: (lastPage, pages) => pages.length,
      }
    );
    /*
    const {
      data: filmList,
      isSuccess,
      isLoading,
      isError,
    } = useQuery({
      queryKey: ["getFilmList", currentPage, pageSize],
      queryFn: () => filmListQuery(currentPage, pageSize),
      keepPreviousData: true,
      cacheTime: 1000 * 60 * 60,
      staleTime: 1000 * 60 * 60,
    });
    */
  
    return {
      filmList,
      isLoading,
      isFetching,
      fetchNextPage,
      hasNextPage,
      error
    };
  };