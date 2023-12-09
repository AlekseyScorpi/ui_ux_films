import * as React from 'react';
export interface IGenreCardProps {
    genreName : string,
}

export function GenreCard (props: IGenreCardProps) {
  return (
    <div className="mx-2 my-1 p-1 lg:mx-4 lg:my-2 lg:p-2 flex border-solid font-semibold text-xl w-36 xl:text-2xl bg-orange-400 lg:w-44 rounded-xl justify-center">
    {props.genreName}
    </div>
  );
}
