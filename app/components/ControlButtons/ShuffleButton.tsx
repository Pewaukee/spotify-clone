import { usePlayer } from '@/app/context/PlayerContext';
import { Shuffle } from 'lucide-react';

export default function ShuffleButton() {
  const { shuffle, setShuffle } = usePlayer();
  const shuffleFunc = () => {
    setShuffle(!shuffle);
  };
  return (
    <button onClick={shuffleFunc}>
      <Shuffle
        size={20}
        className={
          shuffle
            ? 'text-green-400 hover:text-green-300'
            : 'hover:text-gray-400'
        }
      />
    </button>
  );
}
