import * as React from 'react';
import { BiMoviePlay } from 'react-icons/bi'
export interface IHeaderProps {
}

export function Header (props: IHeaderProps) {
  return (
    <div className="py-8 bg-slate-950 px-24 flex justify-center md:justify-start">
        <div className='hidden sm:block'><BiMoviePlay size={48} color='orange'/></div>
        <div className="font-semibold text-slate-200 text-3xl flex items-center justify-center">HDNAREZKA</div>
    </div>
  );
}
