import { Rewind } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

export default function RewindButton({
  index,
  setIndex,
  audioFile,
}: {
  index: number;
  setIndex: Dispatch<SetStateAction<number>>;
  audioFile: HTMLAudioElement | null;
}) {
  const previous = () => {
    if (audioFile) {
      // if the audioFile exists and the current time is less than 3 seconds, go back to previous song
      if (audioFile.currentTime <= 3) setIndex(index > 0 ? index - 1 : 0); // check for negative index
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
