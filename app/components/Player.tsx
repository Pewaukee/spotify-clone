import { LinearProgress } from '@mui/material';
import {
  FastForward,
  Pause,
  Play,
  PlayCircle,
  Repeat,
  Repeat1,
  Rewind,
  Shuffle,
  Volume1,
  Volume2,
  VolumeX,
} from 'lucide-react';
import Image from 'next/image';
import VolumeSlider from './VolumeSlider';

export default function Player({
  image,
  title,
  artist,
}: {
  image: {
    src: string;
    alt: string;
  };
  title: string;
  artist: string;
}) {
  return (
    <div className='absolute h-[70px] inset-x-0 bottom-0 bg-black z-30'>
      <div className='grid grid-cols-3'>
        {/** left side, with picture, title, and artist */}
        <div className='flex w-full h-full'>
          <Image
            src={image.src}
            alt={image.alt}
            width={50}
            height={50}
            className='rounded-md ml-4 mt-[10px] mb-[10px]'
          />

          <div className='flex flex-col ml-2 justify-center'>
            <h1 className='text-lg text-white'>{title}</h1>
            <p className='text-xs text-gray-300'>{artist}</p>
          </div>
        </div>

        {/** middle with main player and also controllable buttons */}
        <div className='flex flex-col'>
          <div className='flex justify-center items-center mt-4'>
            <div className='flex flex-row'>
                <Shuffle size={20} className='hover:text-gray-300'/>
                <Rewind size={20} className='ml-2 hover:text-gray-300'/>
                {/** add conditional in the future */}
                <Play size={20} className='ml-2 hover:scale-110 hover:text-gray-300'/>

                {/* <Pause /> */}
                <FastForward size={20} className='ml-2 hover:text-gray-300'/>
                <Repeat size={20} className='ml-2 hover:text-gray-300'/>
                {/** conditional */}
                {/* <Repeat1 /> */}
            </div>
          </div>

          <div className='flex flex-row justify-center items-center mt-2'>
            <p className='mr-2 text-xs text-gray-300'>0:15</p>
            <LinearProgress
              variant='determinate'
              value={50}
              className='w-[80%]'
            />
            <p className='ml-2 text-xs text-gray-300'>0:30</p>
          </div>
        </div>
        <VolumeSlider />
      </div>
    </div>
  );
}
