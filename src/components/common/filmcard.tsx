import * as React from 'react';
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';

export interface IFilmCardProps {
  id : number
  name : string
  description : string
  rate : number | string
  genre : string[]
  image: string
}

export function FilmCard (props: IFilmCardProps) {
  const [displayInfo, setDisplayInfo] = useState(false)
  const genreList = props.genre?.map((genre) =>
  <li className='list-none'>✔ {genre}</li>
  ).slice(0, 3);

  return (
    <Link href={`/films/${props.id}`} onMouseEnter={(e) => {
      setDisplayInfo(true)
      }} onMouseLeave={(e) => {
        setDisplayInfo(false)
      }}
      className='w-40 h-64 border-solid border-orange-400 border-4 my-2 mx-4 rounded-xl relative overflow-hidden text-slate-200 text-center'>
      <Image src={props.image} alt="Error load image" height={1000} width={1000} style={{ height: '100%', width: 'auto', opacity: displayInfo ? 0.3 : 1}}></Image>
      <div className='absolute top-0.5 left-0.5 justify-center px-1' style={{display: displayInfo ? "block" : "none", width: '100%', height: '100%'}}>
        <div className='font-semibold text-xl'>{props.name}</div>
        <div className='font-semibold text-m'>{props.rate}</div>
        <div>{genreList}</div>
        <div className='font-semibold text-sm line-clamp-3'>{props.description}</div>
      </div>
    </Link>
  );
}
