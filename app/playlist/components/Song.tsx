'use client';

import { usePlayer } from '@/app/context/PlayerContext';
import useItem from '@/hooks/getItem';
import useMusic from '@/hooks/useMusic';
import { constructQueue } from '@/utils/constructQueue';
import { secondsToMinutes } from '@/utils/secondsToMinutes';
import { Headphones, Pause, Play } from 'lucide-react';
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

  const { queue, setQueue, setCurrentSong, currentSong, setPause, pause } =
    usePlayer();
  
    const {albumData, fetchAlbum} = useItem();

  const handleClick = async () => {
    // if the song is already playing, pause it
    if (currentSong?.title === title) {
      setPause(!pause);
    }
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
      await fetchAlbum({
        // trigger a change in the data variable for below useEffect
        album: albumTitle,
      });
    }
  };

  useEffect(() => {
    constructQueue(albumData, artistName)
      .then((queue) => {
        console.log('queue in song.tsx', queue);
        setQueue(queue);
        setCurrentSong(queue[track_position - 1]);
      })
      .catch((err) => {
        console.log('error in constructQueue', err);
      });
  }, [setQueue, albumData]);

  return (
    <div
      className='grid grid-cols-10 rounded-md pb-2 pt-2 hover:bg-gray-400/50'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className='col-span-1 flex items-center pl-[10px]'>
        {isHovered ? (
          <button onClick={handleClick}>
            {currentSong?.preview === preview && !pause ? (
              <Pause size={16} />
            ) : (
              <Play size={16} />
            )}
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
        <p className='text-sm md:text-lg line-clamp-1'>{title}</p>
        <p className='text-gray-400 flex flex-row items-center text-xs md:text-[14px]'>
          {explicit_lyrics && (
            <span className='w-[15px] h-[15px] bg-gray-200 text-gray-500 rounded-sm flex justify-center items-center text-xs mr-[5px]'>
              E
            </span>
          )}
          {artistName}
        </p>
      </div>
      <div className='col-span-2 flex items-center text-sm md:text-md'>
        {secondsToMinutes(duration)}
      </div>
      <div className='col-span-2 underline underline-offset-2 flex items-center text-sm md:text-md'>
        <Link href={preview}>Link</Link>
      </div>
    </div>
  );
}
