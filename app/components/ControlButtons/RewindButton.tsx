import { Song, usePlayer } from '@/app/context/PlayerContext';
import { Rewind } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

export default function RewindButton({
  setCurrentSong,
  audioFile,
  randomIndices,
  findIndexOfSong,
}: {
  setCurrentSong: (newCurrentSong: Song) => void;
  audioFile: HTMLAudioElement | null;
  randomIndices: number[];
  findIndexOfSong: () => number;
}) {
  const { shuffle, queue } = usePlayer();
  
  // navigate to the previous song in the queue
  const previous = () => {
    if (audioFile) {
      const index = findIndexOfSong();
      // if the current index is zero or partly through the song, then just replay the same song
      if (index === 0 || audioFile.currentTime > 3) {
        audioFile.currentTime = 0;
      } else {
        setCurrentSong(
          shuffle ? queue[randomIndices[index - 1]] : queue[index - 1]
        );
      }
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
