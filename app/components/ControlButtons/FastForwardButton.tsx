import React from 'react';
import { Song } from '@/app/context/PlayerContext';
import { usePlayer } from '@/app/context/PlayerContext';
import { FastForward } from 'lucide-react';

export default function FastForwardButton({
  setCurrentSong,
  findNextSong,
}: {
  setCurrentSong: (newCurrentSong: Song) => void;
  findNextSong: () => Song;
}) {
  const { shuffle } = usePlayer();
  const next = () => {
    setCurrentSong(findNextSong());
  };
  return (
    <button onClick={next}>
      <FastForward
        size={20}
        className='ml-2 hover:text-gray-300'
      />
    </button>
  );
}
