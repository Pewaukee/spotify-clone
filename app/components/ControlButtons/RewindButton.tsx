import { usePlayer } from '@/app/context/PlayerContext';
import { Rewind } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

export default function RewindButton({
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
  const previous = () => {
    if (audioFile) {
      // if the audioFile exists and the current time is less than 3 seconds, go back to previous song
      if (audioFile.currentTime <= 3) {
        // extra checks for negative index
        const curIndex = shuffle ? randomIndices.indexOf(index) : index;
        // if the index is not shuffled and zero, just set to zero
        if (!shuffle && curIndex === 0) setIndex(0);
        // if the index in the shuffled array is the 0th element, just set to zero
        else if (shuffle && curIndex === 0) setIndex(0);
        else {
          // otherwise, set the index to the previous element
          setIndex(shuffle ? randomIndices[curIndex - 1] : curIndex - 1);
        }
      }
      // if the audioFile exists and the current time is greater than 3 seconds, go back to the beginning of the song
      else audioFile.currentTime = 0;
    }
  };
  return (
    <button onClick={previous}>
      <Rewind
        size={20}
        className='ml-2 hover:text-gray-300'
      />
    </button>
  );
}
