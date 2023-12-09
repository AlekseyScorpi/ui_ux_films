import Link from 'next/link';
import * as React from 'react';
export interface ITorrentCardProps {
    url : string,
    quality : string,
    size : string
}

export function TorrentCard (props: ITorrentCardProps) {
  return (
    <Link href={props.url} className='mx-2 my-4 p-1 lg:mx-4 lg:my-2 lg:p-2 flex border-solid font-bold text-lg w-36 md:text-xl bg-green-600 md:w-48 rounded-xl justify-center'>
        <div className='mx-1'>{props.quality}</div>
        <div className='mx-1'>{props.size}</div>
    </Link>
  );
}
