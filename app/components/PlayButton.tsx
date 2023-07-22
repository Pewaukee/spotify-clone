'use client';

import Image from 'next/image'
import React, {useState} from 'react'

export default function PlayButton() {
  return (
    <div className='absolute top-[35%] left-[60%] brightness-110'>
        <Image
        src='/play.svg'
        alt='Play Button'
        width={75}
        height={75}
        className='rounded-full transform duration-300 ease-in-out hover:scale-110 hover:brightness-125'
        />
    </div>
  )
}
