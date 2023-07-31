/**
 * for a description text on a playlist card, we want
 * to truncate the text, but also allow a hover option
 * to read out the full description
 */
'use client';
import React from 'react';
import * as HoverCard from '@radix-ui/react-hover-card';

export default function DescriptionText({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <HoverCard.Root
      defaultOpen={false}
      openDelay={100}
    >
      <HoverCard.Trigger asChild>
        <div>
          <h2 className='line-clamp-1 text-white text-sm font-semibold ml-[10%] pt-4 mr-[10%]'>
            {title}
          </h2>
          <p className='line-clamp-1 text-xs text-gray-400 ml-[10%] pt-4 pb-4 mr-[10%]'>
            {description}
          </p>
        </div>
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content className='rounded-lg p-[20px] w-[200px] bg-neutral-500 duration-400 will-change-transform z-10'>
          <div>
            <h2 className='text-sm text-white'>{title}</h2>
            <p className='text-[10px] text-white'>{description}</p>
          </div>

          <HoverCard.Arrow className='fill-white' />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
}
