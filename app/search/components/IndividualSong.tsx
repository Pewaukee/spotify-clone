import { usePlayer } from '@/app/context/PlayerContext';
import { SongTrack } from '@/data/musicData';
import { secondsToMinutes } from '@/utils/secondsToMinutes';
import Image from 'next/image';
import React from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';

export default function IndividualSong({ song }: { song: SongTrack }) {
  const { setQueue, queue, setCurrentSong } = usePlayer();

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

  console.log('song cover image', song.coverImage)
  return (
    <button
      className='w-full bg-gray-600 grid grid-cols-5 mb-[5px] hover:bg-gray-400'
      onClick={handleClick}
    >
      <div className='col-span-1'>
        <Image
          src={song.coverImage}
          alt={`Cover image for ${song.title} by ${song.artistName}`}
          width={100}
          height={100}
        />
      </div>
      <div className='h-full col-span-3 flex ml-[5px] justify-start items-center'>
        <p className='line-clamp-1'>{song.title}</p>{' '}
        {song.explicit_lyrics && (
          <span className='w-[15px] h-[15px] bg-gray-200 text-gray-500 rounded-sm flex justify-center items-center text-xs'>
            E
          </span>
        )}
      </div>
      <div className='h-full col-span-1 flex justify-center items-center'>
        {secondsToMinutes(song.duration)}
      </div>
    </button>
  );
}
