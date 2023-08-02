'use client';

import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { CaretDownIcon } from '@radix-ui/react-icons';
import { Folders } from 'lucide-react';
import styles from '../../styles/NavMenu.module.css';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ScrollMenu from './ScrollMenu';
import { homeAlbums } from '@/data/albums';

export default function NavigationMenuItem() {
  // init the pathname for additional underline styling based on the current page
  const pathname = usePathname();

  // function to check if a link is active, aka the current link
  const isLinkActive = (path: string) => pathname === path;

  return (
    <NavigationMenu.Root
      className='relative flex justify-center z-10 w-full select-none'
      delayDuration={100}
    >
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger className='flex flex-row justify-center items-center'>
            <p
              className={`${
                isLinkActive('/library')
                  ? 'underline underline-offset-4 decoration-2'
                  : ''
              }`}
            >
              Library
            </p>
            <Folders className='ml-[5px]' />
            <CaretDownIcon
              className={styles.CaretDown}
              aria-hidden
            />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className='w-[200%] md:w-full absolute flex justify-center items-center mt-4 top-0 left-[-95%] md:left-0 duration-200 ease-in-out'>
            <ul className='p-[10px] mt-[20px] list-none flex flex-col justify-center items-center bg-black rounded-xl border-4 border-solid border-white'>
              {/** TODO: convert to server component with children prop passing */}
              <ScrollMenu playlists={homeAlbums} />
              <NavigationMenu.Link
                asChild
                className='mt-6 mb-2 text-xs md:text-sm lg:text-base'
              >
                <Link href='/library'>View Library</Link>
              </NavigationMenu.Link>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Indicator className='flex items-end justify-center h-[10px] top-[100%] overflow-hidden z-10 duration-300 ease-in-out'>
          <div className='relative top-[70%] w-[10px] h-[10px] rotate-45 rounded-tl-[2px]' />
        </NavigationMenu.Indicator>
      </NavigationMenu.List>
      <div className='absolute flex justify-center w-full left-0 '>
        <NavigationMenu.Viewport className={styles.NavigationMenuViewport} />
      </div>
    </NavigationMenu.Root>
  );
}
