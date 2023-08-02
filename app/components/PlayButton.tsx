'use client';

import Image from 'next/image';
import React, { useEffect } from 'react';
import { usePlayer } from '../context/PlayerContext';
import { constructQueue } from '@/utils/constructQueue';
import useItem from '@/hooks/getItem';

export default function PlayButton({
  title,
  author,
}: {
  title: string;
  author: string;
}) {
  const { setQueue, setCurrentSong, randomIndices, shuffle } =
    usePlayer();
  const { albumData, fetchAlbum } = useItem();

  const handleClick = async () => {
    await fetchAlbum({
      album: title,
    });
  };

  // on a change of data, set the queue with the function
  useEffect(() => {
    // use promises to ensure that queue is set properly without 'race conditions'
    constructQueue(albumData, author)
      .then((queue) => {
        console.log('queue', queue);
        setQueue(queue);
        setCurrentSong(shuffle ? queue[randomIndices[0]] : queue[0]);
      })
      .catch((err) => {
        console.log('error in constructQueue', err);
      });
  }, [setQueue, albumData]);

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
