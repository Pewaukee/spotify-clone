'use client';

import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { CaretDownIcon } from '@radix-ui/react-icons';
import { Folders } from 'lucide-react';
import LibraryItem from './LibraryItem';
import styles from '../../styles/NavMenu.module.css';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
              className={`relative top-[1px] transition-transform duration-300 ease-in-out ${styles.CaretDown}`}
              aria-hidden
            />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content
            className={`absolute flex justify-center items-center mt-4 top-0 left-0 w-full duration-200 ease-in-out ${styles.NavigationMenuContent}`}
          >
            <ul className='p-[10px] mt-[20px] list-none flex flex-col justify-center items-center bg-black rounded-xl border-4 border-solid border-white'>
              <NavigationMenu.Link asChild>
                {/** TODO: convert to server component with children prop passing */}
                <LibraryItem
                  image={{
                    src: '/immunity.png',
                    alt: 'Immunity Album Cover',
                  }}
                  name={'Immunity'}
                  creator={'Clairo'}
                  type={'Album'}
                />
              </NavigationMenu.Link>
              <NavigationMenu.Link asChild>
                <LibraryItem
                  image={{
                    src: '/swimming.png',
                    alt: 'Swimming Album Cover',
                  }}
                  name={'Swimming'}
                  creator={'Mac Miller'}
                  type={'Album'}
                />
              </NavigationMenu.Link>
              <NavigationMenu.Link
                asChild
                className='mt-6 mb-2 text-xs md:text-sm lg:text-base'
              >
                <Link href='/library'>View Library</Link>
              </NavigationMenu.Link>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Indicator
          className={`flex items-end justify-center h-[10px] top-[100%] overflow-hidden z-10 duration-300 ease-in-out ${styles.NavigationMenuIndicator}`}
        >
          <div className='relative top-[70%] w-[10px] h-[10px] rotate-45 rounded-tl-[2px]' />
        </NavigationMenu.Indicator>
      </NavigationMenu.List>
      <div className='absolute flex justify-center w-full left-0 '>
        <NavigationMenu.Viewport
          className={`relative origin-center w-full rounded-xl duration-300 ease-linear ${styles.NavigationMenuViewport}`}
        />
      </div>
    </NavigationMenu.Root>
  );
}
