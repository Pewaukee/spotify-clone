'use client';
import * as Slider from '@radix-ui/react-slider';
import { Volume, Volume1, Volume2, VolumeX } from 'lucide-react';
import React from 'react';

import { usePlayer } from '../context/PlayerContext';

export default function VolumeSlider() {
  const { volume, setVolume } = usePlayer();

  const renderVolumeIcon = () => {
    if (volume[0] === 0) {
      return <VolumeX />;
    } else if (volume[0] < 30) {
      return <Volume />;
    } else if (volume[0] < 70) {
      return <Volume1 />;
    }
    return <Volume2 />;
  };

  // mute or unmute the volume if the volume icon is clicked
  const handleClick = () => {
    console.log(volume[0])
    if (volume[0] === 0) {
      setVolume([20]);
    } else {
      setVolume([0]);
    }
  };

  return (
    <div className='flex flex-row justify-center items-center'>
      <div className='mr-[5px]'>
        <button onClick={handleClick}>{renderVolumeIcon()}</button>
      </div>

      <form>
        <Slider.Root
          className='relative flex items-center select-none touch-none w-[80px] h-[20px] group/volume'
          defaultValue={[50]}
          max={100}
          step={1}
          onValueChange={(e) => setVolume(e)}
          value={volume}
        >
          <Slider.Track className='relative self-center grow rounded-full h-[3px] bg-gray-400'>
            <Slider.Range className='absolute bg-white rounded-full h-full group-hover/volume:bg-green-400' />
          </Slider.Track>
          <Slider.Thumb
            className='opacity-0 block w-[10px] h-[10px] bg-white rounded-[50px] focus:shadow-lg group-hover/volume:opacity-100'
            aria-label='Volume'
          />
        </Slider.Root>
      </form>
    </div>
  );
}
