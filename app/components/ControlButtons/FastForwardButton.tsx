import { usePlayer } from '@/app/context/PlayerContext';
import { FastForward } from 'lucide-react';
import React, { Dispatch, SetStateAction } from 'react';

export default function FastForwardButton({
  index,
  setIndex,
  audioFile,
  randomIndices,
}: {
  index: number;
  setIndex: Dispatch<SetStateAction<number>>;
  audioFile: HTMLAudioElement | null;
  randomIndices: number[];
}) {
  const { shuffle } = usePlayer();
  const next = () => {
    // only if the audio file exists, increment the index
    if (audioFile) {
      // based on the shuffle variable
      shuffle
        ? setIndex(randomIndices[randomIndices.indexOf(index) + 1])
        : setIndex(index + 1);
    }
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
