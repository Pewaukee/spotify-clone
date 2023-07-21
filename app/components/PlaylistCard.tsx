import Image from 'next/image';
import DescriptionText from './DescriptionText';
import PlayButton from './PlayButton';

export default function PlaylistCard({
  image,
  title,
  description,
}: {
  image: { src: string; alt: string };
  title: string;
  description: string;
}) {

  return (
    <div className='relative inline-block w-[15%] rounded-xl bg-gray-700/25 ease-in-out duration-300 group/play hover:bg-gray-500/50 mr-12'>
      <div className='opacity-0 duration-300 ease-in-out group-hover/play:opacity-100'>
        <PlayButton />
      </div>

      <div className='grid-rows-3 rounded-xl   '>
        <div className='flex justify-center items-center'>
          <Image
            src={image.src}
            alt={image.alt}
            width={150}
            height={150}
            className='rounded-xl mt-2 '
            priority={true}
          />
        </div>

        <div className='text-sm'>
          <h2 className='text-gray-800 font-semibold ml-2 pt-4 mr-2 truncate'>
            {title}
          </h2>
        </div>

        <DescriptionText title={title} description={description} />
      </div>
    </div>
  );
}
