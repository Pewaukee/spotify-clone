'use client';

import useMusic from '@/hooks/useMusic';
import Image from 'next/image';
import React from 'react';

export default function PlayButton({
  title,
  author,
}: {
  title: string;
  author: string;
}) {
  const { data, loading, error, fetchMusic } = useMusic();
  const handleClick = () => {
    fetchMusic({
      title: title,
      artist: author,
    });
  };
  return (
    <div className='absolute top-[35%] left-[60%] brightness-110'>
      <button onClick={handleClick}>
        <Image
          src='/play.svg'
          alt='Play Button'
          width={75}
          height={75}
          className='rounded-full transform duration-300 ease-in-out hover:scale-110 hover:brightness-125'
        />
      </button>
      {data ? (
        <>
          {data.map((item: string, index) => (
            // autoplay the first song
            <audio key={index}
            controls={true}
            autoPlay={index !== 0}
            src={item} >
              This browser does not support this audio file.
            </audio>
          ))}
        </>
      ) : null}
    </div>
  );
}
