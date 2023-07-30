'use client';

import useMusic from '@/hooks/useMusic';
import Image from 'next/image';
import React, { useCallback, useEffect } from 'react';
import { Queue, usePlayer } from '../context/PlayerContext';
import { constructQueue } from '@/utils/constructQueue';

export default function PlayButton({
  title,
  author,
}: {
  title: string;
  author: string;
}) {
  const { queue, setQueue, clearQueue } = usePlayer();
  const { data, loading, error, fetchMusic } = useMusic();

  const handleClick = async () => {
    await fetchMusic({
      title: title,
      artist: author,
    });
  };

  // on a change of data, set the queue with the function
  useEffect(() => {
    // use promises to ensure that queue is set properly without 'race conditions'
    constructQueue(data).then(queue => {
      console.log('queue', queue);
      setQueue(queue)
    }).catch(err => {
      console.log('error in constructQueue', err)
    });
  }, [setQueue, data]);

  return (
      <button onClick={handleClick}>
        <Image
          src='/play.svg'
          alt='Play Button'
          width={75}
          height={75}
          className='rounded-full transform duration-300 ease-in-out brightness-125 hover:scale-110 hover:brightness-150'
        />
      </button>
  );
}
