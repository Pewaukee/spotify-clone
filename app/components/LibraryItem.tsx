import { Music } from 'lucide-react';
import Image from 'next/image';
import * as AspectRatio from '@radix-ui/react-aspect-ratio';
import { useRouter } from 'next/navigation';

// sample Library to use in developing the frontend
export default function LibraryItem({
  image,
  name,
  creator,
  type,
}: {
  image: { src: string; alt: string };
  name: string;
  creator: string;
  type: 'Album' | 'Playlist';
}) {
  const router = useRouter();
  return (
    <button
      className='w-full'
      onClick={() =>
        router.push(
          `/playlist?title=${name}&author=${creator}`
        )
      }
    >
      <div className='relative w-full h-full grid grid-cols-2 rounded-lg bg-black hover:bg-black/25'>
        <div className='flex items-center justify-center p-[10px]'>
          {/** render a square image with the AspectRatio element */}
          <AspectRatio.Root ratio={1}>
            <Image
              src={image.src}
              alt={image.alt}
              fill={true}
              sizes='(min-width: 68) 100vw'
              className='rounded-sm md:rounded-lg'
            />
          </AspectRatio.Root>
        </div>
        <div className='text-[10px] lg:text-sm grid grid-rows-2 flex justify-center items-center ml-[10%] mr-[10%]'>
          <div>
            <h1 className='line-clamp-2'>{name}</h1>
          </div>
          <div className='grid grid-cols-2 flex justify-content items-center'>
            <div className='flex justify-content items-center text-gray-400 opactity-50'>
              <p className='text-[8px] lg:text-[10px]'>{type}</p>
              <Music
                size={24}
                strokeWidth={2}
                className='ml-0 lg:ml-[2px]'
              />
            </div>
            {/** or other options */}
            <div className='flex justify-center items-center'>
              <h2 className='line-clamp-2 text-[8px] sm:text-[10px] lg:text-sm ml-0 md:ml-[2px] lg:ml-[5px] decoration-solid hover:underline'>
                {creator}
              </h2>
            </div>
            {/** make this a link to artist or user or something maybe? */}
          </div>
        </div>
      </div>
    </button>
  );
}
