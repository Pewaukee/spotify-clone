import { Pause, Play } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';

export default function PlayPause() {
  const { pause, setPause } = usePlayer();
  const playPauseClick = () => {
    setPause(!pause);
  };
  return (
    <button onClick={playPauseClick}>
      {pause ? (
        <Play
          size={20}
          className='ml-2 hover:scale-110 hover:text-gray-300'
        />
      ) : (
        <Pause
          size={20}
          className='ml-2 hover:scale-110 hover:text-gray-300'
        />
      )}
    </button>
  );
}
