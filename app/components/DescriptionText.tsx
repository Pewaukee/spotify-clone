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
    <div>
      <HoverCard.Root
        defaultOpen={false}
        openDelay={100}
      >
        <HoverCard.Trigger asChild>
          <div className='h-[50px] text-xs text-gray-400 ml-[10%] pt-4 pb-2 mr-[10%]'>
            <p className='truncate'>{description}</p>
          </div>
        </HoverCard.Trigger>
        <HoverCard.Portal>
          <HoverCard.Content className='rounded-lg p-[20px] w-[200px] bg-neutral-500 duration-400 will-change-transform z-10'>
            <div>
              <h2 className='text-sm text-white'>{title}</h2>
              <p className='text-[10px] text-white'>{description}</p>
            </div>

            <HoverCard.Arrow />
          </HoverCard.Content>
        </HoverCard.Portal>
      </HoverCard.Root>
    </div>
  );
}
