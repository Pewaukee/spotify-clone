'use client';
import * as Slider from '@radix-ui/react-slider';
import { Volume, Volume1, Volume2, VolumeX } from 'lucide-react';
import React, { useState } from 'react';

export default function VolumeSlider() {
  const [volume, setVolume] = useState([50]);

  const handleValueChange = (newVolume: number[]) => {
    setVolume(newVolume);
  };

  const renderVolumeIcon = (volume: number[]) => {
    if (volume[0] === 0) {
      return <VolumeX />;
    } else if (volume[0] < 30) {
      return <Volume />;
    } else if (volume[0] < 70) {
      return <Volume1 />;
    }
    return <Volume2 />;
  };

  return (
    <div className='flex flex-row justify-center items-center'>
        <div className='mr-2'>
        {renderVolumeIcon(volume)}
        </div>
      
      <form>
        <Slider.Root
          className='relative flex items-center select-none touch-none w-[100px] h-[20px] group/volume'
          defaultValue={[50]}
          max={100}
          step={1}
          onValueChange={handleValueChange}
        >
          <Slider.Track className='relative grow rounded-full h-[3px] bg-gray-400'>
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
