import { FastForward } from 'lucide-react';
import React, { Dispatch, SetStateAction } from 'react';

export default function FastForwardButton({
  index,
  setIndex,
}: {
  index: number;
  setIndex: Dispatch<SetStateAction<number>>;
}) {
  const next = () => {
    setIndex(index + 1);
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
