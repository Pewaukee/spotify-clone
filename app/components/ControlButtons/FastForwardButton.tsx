import { FastForward } from 'lucide-react';
import React, { Dispatch, SetStateAction } from 'react';

export default function FastForwardButton({
  index,
  setIndex,
  audioFile
}: {
  index: number;
  setIndex: Dispatch<SetStateAction<number>>;
  audioFile: HTMLAudioElement | null;
}) {
  const next = () => {
    // only if the audio file exists, increment the index
    if (audioFile) setIndex(index + 1);
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
