'use client';
import { SongTrack } from '@/data/musicData';
import { secondsToMinutes } from '@/utils/secondsToMinutes';
import Image from 'next/image';
import React from 'react';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { usePlayer } from '@/app/context/PlayerContext';
import MusicFiles from '@/app/components/MusicFiles';
import useDeepCompareEffect from 'use-deep-compare-effect';

export default function Song({ song }: { song: SongTrack }) {
  const { setQueue, setCurrentSong, queue } = usePlayer();

  const handleClick = () => {
    setQueue([
      {
        title: song.title,
        preview: song.preview,
        image_src: song.coverImage,
        artist: song.artistName,
      },
    ]);
  };

  useDeepCompareEffect(() => {
    setCurrentSong(queue[0]);
  }, [queue]);

  return (
    <div className='relative flex flex-col md:grid md:grid-cols-5 bg-gray-600 transition-colors duration-600 ease hover:bg-gray-400 '>
      <div className='md:col-span-2'>
        <Image
          src={song.coverImage}
          alt={`${song.title} cover image`}
          width={200}
          height={200}
          className='p-2'
        />
      </div>

      <div className='flex flex-col mt-[10%] ml-[10px] mr-[5%] text-white md:col-span-3'>
        <h1 className='text-[10px] md:text-lg'>{song.title}</h1>
        <h2 className='text-[8px] md:text-base text-gray-300 mb-[10px]'>
          {song.artistName} &mdash; {secondsToMinutes(song.duration)}
        </h2>
      </div>
      <button
        className='absolute top-0 left-0'
        onClick={handleClick}
      >
        <PlayCircleIcon
          className='fill-green-500 transition duration-300 hover:scale-125 hover:brightness-125'
          fontSize='large'
        />
      </button>
      <MusicFiles />
    </div>
  );
}

// TODO: is <MusicFiles /> needed?
