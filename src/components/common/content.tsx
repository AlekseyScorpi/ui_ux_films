import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { FilmCard } from './filmcard';
import { useFilmList } from '../hooks/useFilmList';
import { Loader } from './loader';

export interface IContentProps {
}

export function Content(props: IContentProps) {
  const [page, setPage] = useState(1);
  const pageSize = 20;
  const { filmList, isLoading, error, fetchNextPage, hasNextPage } = useFilmList(String(page), String(pageSize));

  const loader = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        setPage((prevPage) => prevPage + 1);
      }
    }, { threshold: 1 });

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage]);

  useEffect(() => {
    fetchNextPage();
  }, [page]);

  if (isLoading) return <div style={{position: 'absolute', left: '50%', top: '50%'}}><Loader/></div>
  
  if (error) return <div>An error has occurred</div>

  const films = filmList?.pages.flatMap(page => page.data.movies.map(({id, title, summary, rating, genres, medium_cover_image}) => (
    <FilmCard 
      key={id}
      id={id}
      name={title} 
      description={summary || "No description"}
      rate={rating || "No rating"} 
      genre={genres}
      image={medium_cover_image}
    />
  )));

  return (
    <div>
      <div className='px-4 py-4 mx-20 md:mx-10 sm:mx-5 grid lg:grid-cols-5 lg:grid-rows-3 md:grid-cols-3 md:grid-rows-5 sm:grid-cols-2 sm:grid-flow-row-dense justify-items-center'>
        {films}
      </div>
      <div className='flex justify-center h-16' ref={loader}><Loader/></div>
    </div>
  );
}
