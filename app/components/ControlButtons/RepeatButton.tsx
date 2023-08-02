import { usePlayer, RepeatMode } from '@/app/context/PlayerContext';
import { Repeat, Repeat1 } from 'lucide-react';
import React from 'react';

export default function RepeatButton() {
  const { repeat, setRepeat } = usePlayer();

  // cycling of repeat modes
  const repeatFunc = () => {
    if (repeat === RepeatMode.NONE) {
      setRepeat(RepeatMode.REPEAT_ALL);
    } else if (repeat === RepeatMode.REPEAT_ALL) {
      setRepeat(RepeatMode.REPEAT_ONE);
    } else setRepeat(RepeatMode.NONE);
  };

  // get the style of the repeat button based on the enum
  const repeatStyle = (): React.ReactNode => {
    const style = 'ml-2';
    if (repeat === RepeatMode.NONE) {
      return (
        <Repeat
          size={20}
          className={`${style} hover:text-gray-300`}
        />
      );
    } else if (repeat === RepeatMode.REPEAT_ALL) {
      return (
        <Repeat
          size={20}
          className={`${style} text-green-400 hover:text-green-300`}
        />
      );
    } else {
      return (
        <Repeat1
          size={20}
          className={`${style} text-green-400 hover:text-green-300`}
        />
      );
    }
  };

  return <button onClick={repeatFunc}>{repeatStyle()}</button>;
}
