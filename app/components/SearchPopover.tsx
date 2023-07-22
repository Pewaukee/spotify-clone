'use client';

import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { usePathname } from 'next/navigation';
import * as Popover from '@radix-ui/react-popover';

export default function SearchPopover() {
  // init the pathname for additional underline styling based on the current page
  const pathname = usePathname();

  // function to check if a link is active, aka the current link
  const isLinkActive = (path: string) => pathname === path;

  // set state of text box in search popover
  const [userInput, setUserInput] = useState('');

  // set a disabled state for the button
  const [disabled, setDisabled] = useState(true);

  // function to open the search page
  const handleOpen = () => console.log('button clicked, now call endpoint');

  // clear the input if the x button is clicked
  const handleClearInput = () => setUserInput('');

  useEffect(() => {
    if (userInput.length > 0) return setDisabled(false);
    return setDisabled(true);
  }, [userInput]);

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <div className='flex flex-row cursor-pointer'>
          <p
            className={`${
              isLinkActive('/search')
                ? 'underline underline-offset-4 decoration-2'
                : ''
            }`}
          >
            Search
          </p>
          <div className='ml-[5px]'>
            <Search />
          </div>
        </div>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className='rounded-md pt-[10px] duration-400 ease-in-out will-change-transform'
          sideOffset={5}
          side='bottom'
          align='center'
        >
          <div className='w-[120%] justify-center items-center'>
            <div className='p-[5px] bg-gray-500 rounded-md'>
              <p className='text-sm'>Search for music!</p>
              <div className='flex flex-row'>
                <input
                  type='search'
                  placeholder='What would like to listen to?'
                  className='w-full rounded-md p-[10px] bg-gray-700 text-gray-800 text-[10px]'
                  onChange={(e) => setUserInput(e.target.value)}
                />

                <button
                  className='bg-green-400 rounded-md p-[10px] text-white disabled:bg-gray-400 disabled:cursor-not-allowed'
                  onClick={handleOpen}
                  value={userInput}
                  disabled={disabled}
                >
                  Go
                </button>
              </div>
            </div>
          </div>

          <Popover.Close />
          <Popover.Arrow />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
