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
    name: string;
    creator: string;
    type: 'Album' | 'Playlist';
  }[];
}) {
  return (
    <ScrollArea.Root className='w-full h-[200px] border-md overflow-hidden shadow-md bg-white'>
      <ScrollArea.Viewport className='w-full h-full border-md '>
        <div style={{ padding: '15px 20px' }}>
          <div className='text-white'>Playlists</div>
          {playlists.map((playlist) => {
            return (
              <LibraryItem
                key={playlist.image.src}
                image={{
                  src: playlist.image.src,
                  alt: playlist.image.alt,
                }}
                name={playlist.name}
                creator={playlist.creator}
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
