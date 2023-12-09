import { useQuery, useQueryClient } from "@tanstack/react-query";

import { filmDetailsQuery } from "@/api";

export const useFilm = (id: number) => {
  const queryClient = useQueryClient();

  const {
    data: filmRetrieve,
    isSuccess,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["getFilmRetrieve", id],
    queryFn: () => filmDetailsQuery(id),
    cacheTime: 1000 * 60 * 60,
    staleTime: 1000 * 60 * 60
  });

  const updateFilm = () => {
    return queryClient.invalidateQueries({
      queryKey: ["getFilmRetrieve"],
    });
  };

  return {
    filmRetrieve,
    updateFilm,
    isSuccess,
    isLoading,
    isError,
  };
};
