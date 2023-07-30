'use client';

import useMusic from '@/hooks/useMusic';
import Image from 'next/image';
import React, { useCallback, useEffect } from 'react';
import { Queue, usePlayer } from '../context/PlayerContext';

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

  // construct a queue from the data variable
  const constructQueue = useCallback((): Queue => {
    // construct the new list based on the following type sig
    /**
     * type Song = {
     * title: string;
     * preview: string;
     * image_src: string;
     * artist: string;
     * } | null;
     * 
     * type Queue = Song[];
     */
    if (data) {
      const newQueue: Queue = [];
      const image_src = data.albumCover;
      const artist = data.artistName;
      data.tracks.forEach((track) => {
        newQueue.push({
          title: track.title,
          preview: track.preview,
          image_src: image_src,
          artist: artist,
        });
      });
      return newQueue;
    }
    return [];
  }, [setQueue, data]);

  // on a change of data, set the queue with the function
  useEffect(() => {
    setQueue(constructQueue());
  }, [setQueue, constructQueue]);

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
