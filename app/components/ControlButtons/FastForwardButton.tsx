import { RepeatMode, Song, usePlayer } from '@/app/context/PlayerContext';
import { FastForward } from 'lucide-react';
import React, { Dispatch, SetStateAction } from 'react';

export default function FastForwardButton({
  setCurrentSong,
  findNextSong,
  setTime,
}: {
  setCurrentSong: (newCurrentSong: Song) => void;
  findNextSong: () => Song;
  setTime: Dispatch<SetStateAction<number>>;
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
    setTime(0); // set the current time to zero when skipping
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
