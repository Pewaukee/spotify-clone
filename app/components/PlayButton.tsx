'use client';

import useMusic from '@/hooks/useMusic';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { usePlayer } from '../context/PlayerContext';

export default function PlayButton({
  title,
  author,
}: {
  title: string;
  author: string;
}) {
  const { queue, setQueue, clearQueue} = usePlayer();
  const { data, loading, error, fetchMusic } = useMusic();

  const handleClick = async () => {
    await fetchMusic({
      title: title,
      artist: author,
    });
  };

  useEffect(() => {
    if (data) {
      clearQueue();
      setQueue(data);
    }
  }, [data]);

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
    </div>
  );
}
