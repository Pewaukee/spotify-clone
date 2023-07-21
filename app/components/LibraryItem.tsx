import { Music } from 'lucide-react';
import Image from 'next/image';
import * as AspectRatio from '@radix-ui/react-aspect-ratio';


// sample Library to use in developing the frontend
export default function LibraryItem({
    image,
    name,
    creator,
    type
}: {
    image: { src: string; alt: string };
    name: string;
    creator: string;
    type: 'Album' | 'Playlist'
}) {
  return (
    <div className='relative w-full h-full grid grid-cols-2 rounded-lg hover:bg-gray-400/25'>
      <div className='flex items-center justify-center p-2'>
        {/** render a square image with the AspectRatio element */}
        <AspectRatio.Root ratio={1}>
          <Image
            src={image.src}  
            alt={image.alt}
            fill={true}
            className='rounded-lg'
            />
        </AspectRatio.Root>
      </div>
      <div className='text-sm grid grid-rows-2 flex justify-center items-center ml-4 mr-4'>
        <div>
          <h1>{name}</h1>
        </div>
        <div className='grid grid-cols-2 flex justify-content items-center'>
          <p className='flex justify-content items-center text-[10px] text-gray-400 opactity-50'>
            {type}
            <Music
              size={32}
              strokeWidth={1.5}
              className='ml-[5px]'
            />
          </p>{' '}
          {/** or other options */}
          <h2 className='ml-[5px] decoration-solid hover:underline'>{creator}</h2>
          {/** make this a link to artist or user or something maybe? */}
        </div>
      </div>
    </div>
  );
}
