'use client';

import Image from 'next/image';
import React from 'react';

export default function PlayButton() {
  return (
    <Image
      src='/play.svg'
      alt='Play Button'
      width={200}
      height={200}
      className='rounded-full transform duration-300 ease-in-out hover:scale-110 hover:brightness-125'
    />
  );
}
