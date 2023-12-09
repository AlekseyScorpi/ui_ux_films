import { IMovie } from "@/app.interface";
import axios from "axios";

export const filmListQuery = async (currentPage: string, pageSize: string) => {
    const response = await axios.get<{
      data: {
        movie_count: number;
        limit: number;
        page_count: number;
        movies: IMovie[];
      };
    }>(`https://yts.mx/api/v2/list_movies.json?page=${currentPage}&limit=${pageSize}`);
    return response.data;
  };

export const filmDetailsQuery = async (id: number) => {
    const response = await axios.get<{
        data : {
          movie : IMovie;
        }
    }>(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    return response.data
}