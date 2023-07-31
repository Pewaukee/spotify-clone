'use client';

import Image from 'next/image';
import DescriptionText from './DescriptionText';
import PlayButton from './PlayButton';
import { useRouter } from 'next/navigation';

export default function PlaylistCard({
  image,
  title,
  description,
}: {
  image: { src: string; alt: string };
  title: string;
  description: string;
}) {
  const router = useRouter();
  return (
    <div className='relative rounded-xl bg-gray-800/25 ease-in-out duration-300 group/play hover:bg-gray-500/50'>
      <div className='absolute bottom-[20%] right-[3%] opacity-0 duration-300 transition ease-in-out group-hover/play:opacity-100 group-hover/play:-translate-y-4'>
        <PlayButton
          title={title}
          author={description}
        />
      </div>

      <button
        className='grid-rows-3 rounded-xl'
        onClick={() =>
          router.push(`/playlist?title=${title}&author=${description}`)
        }
      >
        <div className='flex justify-center items-center'>
          <div className='w-[90%] h-[90%]'>
            <Image
              src={image.src}
              alt={image.alt}
              width={500}
              height={500}
              className='rounded-xl mt-[5%]'
              priority={true}
            />
          </div>
        </div>

        <DescriptionText
          title={title}
          description={description}
        />
      </button>
    </div>
  );
}
