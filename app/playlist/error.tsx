'use client';

import { FileAudio2, Home } from 'lucide-react';
import Link from 'next/link';

export default function Error({ error }: { error: Error }) {
  return (
    <div className='bg-gray-200 px-9 py-14 shadow-lg rounded text-black'>
      <h3 className='text-3xl font-bold'>Well, this is embarrassing</h3>
      <p className='text-reg font-bold'>{error.message}</p>
      <p className='mt-6 text-sm font-light'>Error Code: 400</p>
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
  );
}
