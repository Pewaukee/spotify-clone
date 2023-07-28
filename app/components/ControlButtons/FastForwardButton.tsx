import { RepeatMode, Song, usePlayer } from '@/app/context/PlayerContext';
import { FastForward } from 'lucide-react';
import React from 'react';

export default function FastForwardButton({
  setCurrentSong,
  findNextSong,
}: {
  setCurrentSong: (newCurrentSong: Song) => void;
  findNextSong: () => Song;
}) {

  // for repeat changes on skip
  const { repeat, setRepeat } = usePlayer();

  const next = () => {
    /**
     * in spotify, the repeat mode is set
     * back to repeat all if a current song
     * is set to repeat one and skipped
     */
    if (repeat === RepeatMode.REPEAT_ONE) {
      setRepeat(RepeatMode.REPEAT_ALL);
    }
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
