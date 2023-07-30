'use client';

import { secondsToMinutes } from '@/utils/secondsToMinutes';
import { Play } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { useState } from 'react';

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

  return (
    <div
      className='grid grid-cols-10 rounded-md hover:bg-gray-400/50'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className='col-span-1 flex items-center pl-[10px]'>
        <p>
          {isHovered ? (
            <button
            onClick={() => console.log('play')}
            >
              <Play size={16}/>
            </button>
          ) : (
            track_position
          )}
        </p>
      </div>
      <div className='flex flex-col col-span-5'>
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
