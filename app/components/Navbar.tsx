'use client';

import React from 'react';
import Link from 'next/link';
import { Home, Search } from 'lucide-react';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';

// lazy load the NavigationMenu component, to prevent lots of client code from being rendered as well as server code
const NavigationMenuItem = dynamic(() => import('./NavigationMenu'), {
  loading: () => <p>Loading...</p>,
});

export default function Navbar() {
  // init the pathname for additional underline styling based on the current page
  const pathname = usePathname();

  // function to check if a link is active, aka the current link
  const isLinkActive = (path: string) => pathname === path;

  return (
    <nav className='h-[100px] w-full grid grid-cols-3 gap-4 flex justify-center items-center bg-gradient-to-r from-green-400 via-green-500 to-green-400 rounded-b-3xl'>
      {/** Home */}
      <div className='flex justify-center select-none '>
        <Link
          href='/'
          className='flex flex-row'
        >
          <p className={`${isLinkActive('/') ? 'underline underline-offset-4 decoration-2' : ''}`}>Home</p>
          <div className='ml-[5px]'>
            <Home />
          </div>
        </Link>
      </div>
      {/** search button */}
      <div className='flex justify-center select-none'>
        <Link
          href='/search'
          className='flex flex-row'
        >
          <p className={`${isLinkActive('/search') ? 'underline underline-offset-4 decoration-2' : ''}`}>Search</p>
          <div className='ml-[5px]'>
            <Search />
          </div>
        </Link>
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

