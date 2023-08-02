'use client';

import React from 'react';
import Link from 'next/link';
import { Folders, Home } from 'lucide-react';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import SearchPopover from './SearchPopover';
import { CaretDownIcon } from '@radix-ui/react-icons';
import styles from '../../styles/NavMenu.module.css';

// lazy load the NavigationMenu component, to prevent lots of client code from being rendered as well as server code
const NavigationMenuItem = dynamic(() => import('./NavigationMenu'), {
  loading: () => (
    <div className='flex flex-row justify-center items-center'>
      <p>Library</p>
      <Folders className='ml-[5px]' />
      <CaretDownIcon
        className={styles.CaretDown}
        aria-hidden
      />
    </div>
  ),
});

export default function Navbar() {
  // init the pathname for additional underline styling based on the current page
  const pathname = usePathname();

  // function to check if a link is active, aka the current link
  const isLinkActive = (path: string) => pathname === path;

  return (
    <nav className='h-[100px] w-full grid grid-cols-3 gap-4 text-lg flex justify-center items-center bg-gradient-to-r from-green-400 via-green-500 to-green-400 rounded-b-3xl'>
      {/** Home */}
      <div className='flex justify-center select-none '>
        <Link
          href='/'
          className='flex flex-row'
        >
          <p
            className={`${
              isLinkActive('/')
                ? 'underline underline-offset-4 decoration-2'
                : ''
            }`}
          >
            Home
          </p>
          <div className='ml-[5px]'>
            <Home />
          </div>
        </Link>
      </div>
      {/** search button */}
      <div className='flex justify-center select-none'>
        <SearchPopover />
      </div>

      {/** playlists, dropdown menu */}
      <div className='flex justify-center items-center'>
        <div className='w-[80%]'>
          <NavigationMenuItem />
        </div>
      </div>
    </nav>
  );
}
