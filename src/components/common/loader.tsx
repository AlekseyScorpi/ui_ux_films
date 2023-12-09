import * as React from 'react';
import {RotateLoader } from 'react-spinners';
export interface ILoaderProps {
}

export function Loader (props: ILoaderProps) {
  return (
    <RotateLoader color="#fb923c" size={30} speedMultiplier={0.5}/>
  );
}
