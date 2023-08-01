'use client';

import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import * as Popover from '@radix-ui/react-popover';
import MuiText from './MuiText';

export default function SearchPopover() {
  const router = useRouter();

  // init the pathname for additional underline styling based on the current page
  const pathname = usePathname();

  // function to check if a link is active, aka the current link
  const isLinkActive = (path: string) => pathname === path;

  // set state of text boxes in search popover
  const [userSongInput, setUserSongInput] = useState('');
  const [userArtistInput, setUserArtistInput] = useState('');
  const [userAlbumInput, setUserAlbumInput] = useState('');

  // set a disabled state for the button
  const [disabled, setDisabled] = useState(true);

  // function to open the search page
  const handleOpen = () => router.push(`/search/?song=${userSongInput}&artist=${userArtistInput}&album=${userAlbumInput}`)

  useEffect(() => {
    if (userSongInput.trim().length > 0 && userAlbumInput.trim().length > 0) {
      return setDisabled(true);
    }
    if (
      userSongInput.trim().length > 1 ||
      userAlbumInput.trim().length > 1 ||
      userArtistInput.trim().length > 1
    ) {
      return setDisabled(false);
    }

    return setDisabled(true);
  }, [userSongInput, userArtistInput, userAlbumInput]);

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
          className='flex justify-center rounded-md duration-400 ease-in-out will-change-transform'
          sideOffset={5}
          side='bottom'
          align='center'
        >
          <div className='p-[10px] bg-gray-200 rounded-md'>
            <p className='text-sm mb-[10px] text-black'>Search for music!</p>
            <div className='flex flex-col'>
              {[
                { label: 'Song', setFunction: setUserSongInput },
                { label: 'Artist', setFunction: setUserArtistInput },
                { label: 'Album', setFunction: setUserAlbumInput },
              ].map((item) => {
                return (
                  <MuiText
                    label={item.label}
                    setFunction={item.setFunction}
                  />
                );
              })}

              <button
                className='bg-green-400 rounded-md p-[10px] text-white disabled:bg-gray-400 disabled:cursor-not-allowed'
                onClick={handleOpen}
                disabled={disabled}
              >
                Go
              </button>
            </div>
          </div>

          <Popover.Close />
          <Popover.Arrow className='fill-white' />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
