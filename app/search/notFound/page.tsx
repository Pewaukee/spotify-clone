import { FileAudio2, Home } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Error() {
  return (
    <div className='h-screen bg-gray-700 flex flex-col justify-center items-center'>
      <Image
        src='/spotify_logo.svg'
        alt='Spotify Clone Logo'
        width={200}
        height={200}
      />
      <div className='bg-gray-200 px-9 py-14 shadow-lg rounded text-black'>
        <h3 className='text-3xl font-bold'>Well, this is embarrassing</h3>
        <p className='text-reg font-bold'>
          Bad Search Request, missing or invalid params
        </p>
        <p className='mt-6 text-sm font-light'>Error Code: 404</p>
        <div className='grid grid-cols-2'>
          <div className='mt-6 justify-center items-center rounded-full bg-black inline-block bg-green-400 w-[50%]'>
            <Link href='/'>
              <div className='flex flex-row justify-center items-center'>
                Home <Home className='pl-[5px]' />
              </div>
            </Link>
          </div>
          <div className='mt-6 justify-self-end items-center rounded-full bg-black inline-block bg-green-400 w-[60%]'>
            <Link href='/Library'>
              <div className='flex flex-row justify-center items-center'>
                Library <FileAudio2 className='pl-[5px]' />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
