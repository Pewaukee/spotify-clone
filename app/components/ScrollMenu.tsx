// create a scroll menu inside the navigation menu
import * as ScrollArea from '@radix-ui/react-scroll-area';
import React from 'react';
import LibraryItem from './LibraryItem';
import styles from '../../styles/ScrollMenu.module.css';

export default function ScrollMenu({
  playlists,
}: {
  playlists: {
    image: {
      src: string;
      alt: string;
    };
    title: string;
    artist: string;
    type: 'Album' | 'Playlist';
  }[];
}) {
  return (
    <ScrollArea.Root className='w-full h-[200px] border-md overflow-hidden shadow-md bg-gray-800'>
      <ScrollArea.Viewport className='w-full h-full border-md '>
        <div className='pt-[15px] pb-[15px] pl-[5px] pr-[5px]'>
          <div className='text-white mb-[10px]'>Playlists</div>
          {playlists.map((playlist) => {
            return (
              <LibraryItem
                key={playlist.image.src}
                image={{
                  src: playlist.image.src,
                  alt: playlist.image.alt,
                }}
                name={playlist.title}
                creator={playlist.artist}
                type={playlist.type}
              />
            );
          })}
        </div>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar
        className={`${styles.ScrollAreaScrollbar} flex select-none p-[2px] bg-black transition ease-out duration-200 hover:bg-gray-700`}
        orientation='vertical'
      >
        <ScrollArea.Thumb className='flex-1 relative' />
      </ScrollArea.Scrollbar>
      <ScrollArea.Scrollbar
        className={`${styles.ScrollAreaScrollbar} flex select-none p-[2px] bg-black transition ease-out duration-200 hover:bg-gray-700`}
        orientation='horizontal'
      >
        <ScrollArea.Thumb className='flex-1 relative' />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner className='bg-black-800' />
    </ScrollArea.Root>
  );
}
