'use client';

import { usePlayer } from '@/app/context/PlayerContext';
import useMusic from '@/hooks/useMusic';
import { constructQueue } from '@/utils/constructQueue';
import { secondsToMinutes } from '@/utils/secondsToMinutes';
import { Headphones, Play } from 'lucide-react';
import Link from 'next/link';
import React, { useCallback, useEffect } from 'react';
import { useState } from 'react';

export default function Song({
  albumTitle,
  track_position,
  title,
  explicit_lyrics,
  artistName,
  duration,
  preview,
}: {
  albumTitle: string;
  track_position: number;
  title: string;
  explicit_lyrics: boolean;
  artistName: string;
  duration: number;
  preview: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const { queue, setQueue, setCurrentSong, currentSong } = usePlayer();
  const { data, loading, fetchMusic } = useMusic();

  const handleClick = async () => {
    // check if the queue already has the song
    let index: number = -1;
    if (queue) {
      index = queue.findIndex((song) => {
        if (song) return song.preview === preview;
        return false;
      });
    }
    // if the index is found, just set the song
    if (index !== -1) setCurrentSong(queue[index]);
    else {
      // the clicked song is nowhere in the queue, fetch a new queue
      await fetchMusic({
        // trigger a change in the data variable for below useEffect
        title: albumTitle,
        artist: artistName,
      });
    }
  };

  useEffect(() => {
    constructQueue(data)
      .then((queue) => {
        console.log('queue in song.tsx', queue);
        setQueue(queue);
        setCurrentSong(queue[track_position - 1]);
      })
      .catch((err) => {
        console.log('error in constructQueue', err);
      });
  }, [setQueue, data]);

  return (
    <div
      className='grid grid-cols-10 rounded-md pb-2 pt-2 hover:bg-gray-400/50'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className='col-span-1 flex items-center pl-[10px]'>
        {isHovered ? (
          <button onClick={handleClick}>
            <Play size={16} />
          </button>
        ) : currentSong?.title === title ? (
          <Headphones
            size={16}
            className='text-green-400'
          />
        ) : (
          track_position
        )}
      </div>
      <div
        className={`flex flex-col col-span-5 self-center ${
          currentSong?.title === title ? 'text-green-400' : ''
        }`}
      >
        <p>{title}</p>
        <p className='text-gray-400 flex flex-row items-center'>
          {explicit_lyrics && (
            <span className='w-[15px] h-[15px] bg-white text-gray-500 rounded-sm flex justify-center items-center text-xs mr-[5px]'>
              E
            </span>
          )}
          {artistName}
        </p>
      </div>
      <div className='col-span-2 flex items-center'>
        {secondsToMinutes(duration)}
      </div>
      <div className='col-span-2 flex items-center'>
        <Link href={preview}>Link</Link>
      </div>
    </div>
  );
}
