'use client';
import Link from 'next/link';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { CaretDownIcon } from '@radix-ui/react-icons';
import { Folders, Home, Search } from 'lucide-react';
import React, { CSSProperties, Children } from 'react';
import styles from '../../styles/NavMenu.module.css';

const open: CSSProperties = {
  transform: 'rotate(180deg);',
};

export default function Navbar() {
  return (
    <nav className='h-[100px] w-full grid grid-cols-3 gap-4 flex justify-center items-center bg-gradient-to-r from-green-400 via-green-500 to-green-400 rounded-b-3xl'>
      {/** Home */}
      <div className='flex justify-center select-none'>
        <Link
          href='/'
          className='flex flex-row'
        >
          Home
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
          Search
          <div className='ml-[5px]'>
            <Search />
          </div>
        </Link>
      </div>

      {/** playlists, dropdown menu */}
      <div className='flex justify-center items-center'>
        <div className='w-[40%]'>
          <NavigationMenu.Root
            className='relative flex justify-center z-10 w-full select-none'
            delayDuration={100}
          >
            <NavigationMenu.List>
              <NavigationMenu.Item>
                <NavigationMenu.Trigger className='flex flex-row justify-center items-center'>
                  Playlists
                  <Folders className='ml-[5px]' />
                  <CaretDownIcon
                    className={`relative top-[1px] transition-transform duration-300 ease-in-out ${styles.CaretDown}`}
                    aria-hidden
                  />
                </NavigationMenu.Trigger>
                <NavigationMenu.Content className='absolute flex justify-center items-center mt-4 top-0 left-0 w-full duration-200 ease-in-out'>
                  <ul className='p-[22px] mt-[20px] list-none flex flex-col justify-center items-center bg-purple-400'>
                    <NavigationMenu.Link asChild>
                      <Link href='/playlists/1'>Playlist 1</Link>
                    </NavigationMenu.Link>
                  </ul>
                </NavigationMenu.Content>
                {/* <NavigationMenu.Content className='absolute top-0 left-0 w-full duration-200 ease-linear'>
              <ul className='p-[22px] m-0 list-none'>
                <ListItem
                  title='Introduction'
                  href='/docs/primitives/overview/introduction'
                >
                  Build high-quality, accessible design systems and web apps.
                </ListItem>
                <ListItem
                  title='Getting started'
                  href='/docs/primitives/overview/getting-started'
                >
                  A quick tutorial to get you up and running with Radix
                  Primitives.
                </ListItem>
                <ListItem
                  title='Styling'
                  href='/docs/primitives/guides/styling'
                >
                  Unstyled and compatible with any styling solution.
                </ListItem>
              </ul>
            </NavigationMenu.Content> */}
              </NavigationMenu.Item>
              <NavigationMenu.Indicator className='flex items-end justify-center h-[10px] top-[100%] hidden z-10 ease-linear animate-pulse'>
                <div className='relative top-[70%] bg-white h-[10px] w-[10px] transform rotate-45' />
              </NavigationMenu.Indicator>
            </NavigationMenu.List>

            <NavigationMenu.Viewport className='NavigationMenuViewport' />
          </NavigationMenu.Root>
        </div>
      </div>
    </nav>
  );
}

type ListItemProps = {
  className?: string;
  title: string;
  href: string;
  children: React.ReactNode;
};

function ListItem({
  className,
  title,
  href,
  children,
}: React.PropsWithChildren<ListItemProps>) {
  return (
    <li>
      <NavigationMenu.Link asChild>
        <Link
          className={className ? className : ''}
          href={href}
        >
          <div className=''>{title}</div>
          <p>{children}</p>
        </Link>
      </NavigationMenu.Link>
    </li>
  );
}
