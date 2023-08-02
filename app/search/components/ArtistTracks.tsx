import { SongData } from '@/data/musicData';
import React from 'react';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import IndividualSong from './IndividualSong';

export default function ArtistTracks({
  songs,
  artist,
}: {
  songs: SongData;
  artist: string;
}) {
  return (
    <div className='flex justify-center items-center'>
      <ScrollArea.Root className='w-[90%] h-[200px] md:h-[400px] rounded-md overflow-hidden shadow-md bg-gray-200 mb-[100px] '>
        <ScrollArea.Viewport className='w-full h-full rounded-md'>
          <div style={{ padding: '15px 20px' }}>
            {songs
              ? songs.map((song, index) => (
                  <IndividualSong
                    key={index}
                    song={song}
                  />
                ))
              : null}
          </div>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          className='flex select-none p-[2px] hover:bg-gray-400 hover:rounded-md'
          orientation='vertical'
        >
          <ScrollArea.Thumb
            className='relative flex-1 before:content-none 
        before:absolute before:top-[50%] before:left-[50%] 
        before:translate-x-1/2 before:translate-y-1/2
        before:w-full before: h-full before:min-w-[44px]
        before:min-h-[44px]'
          />
        </ScrollArea.Scrollbar>
        <ScrollArea.Scrollbar
          className='ScrollAreaScrollbar'
          orientation='horizontal'
        >
          <ScrollArea.Thumb className='relative flex-1' />
        </ScrollArea.Scrollbar>
        <ScrollArea.Corner className='bg-black' />
      </ScrollArea.Root>
    </div>
  );
}
