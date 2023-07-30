'use client';

import { usePlayer } from '@/app/context/PlayerContext';
import useMusic from '@/hooks/useMusic';
import { constructQueue } from '@/utils/constructQueue';
import { secondsToMinutes } from '@/utils/secondsToMinutes';
import { Headphones, Play } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useState } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';

export default function Song({
  track_position,
  title,
  explicit_lyrics,
  artistName,
  duration,
  preview,
}: {
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
    // TODO: have to pause if the song is already playing
    // and play new song if queue is already populated
    console.log('handle click in song.tsx')
    // set the queue to the correct song defined by the preview
    await fetchMusic({ // this will trigger a change in the data variable
      title: title,
      artist: artistName,
    }); 
  };

  // if the queue changes, then we need to update the current song
  // to match the button we clicked
  // TODO: this is not working correctly, check the print logs
  useDeepCompareEffect(() => {
    console.log('queue changed in song.tsx')
    if (queue) {
      setCurrentSong(queue[track_position - 1]);
    }
  }, [queue]);

  useEffect(() => {
    constructQueue(data).then(queue => {
      console.log('queue', queue);
      setQueue(queue)
    }).catch(err => {
      console.log('error in constructQueue', err)
    });
  }, [data]);

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
        ) : (
          currentSong?.title === title ? <Headphones size={16} className='text-green-400' /> : track_position
        )}
      </div>
      <div className={`flex flex-col col-span-5 self-center ${currentSong?.title === title ? 'text-green-400': ''}`}>
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
