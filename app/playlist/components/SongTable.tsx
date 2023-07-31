// render a single song like in the row
import { MusicData } from '@/data/musicData';
import React from 'react';
import Header from './Header';
import Link from 'next/link';
import Song from './Song';

export default function SongTable({ data }: { data: MusicData }) {
  // get the number of tracks and other relevant information

  const length = data ? data.tracks.length : 0;

  return (
    <>
      {data && (
        <div className='md:ml-[5%] md:mr-[5%] pb-[100px]'>
          <Header />
          {data.tracks.map((track, index) => {
            console.log(track.explicit_lyrics);
            return (
              <Song
                key={index}
                albumTitle={data.albumName}
                track_position={track.track_position}
                title={track.title}
                explicit_lyrics={track.explicit_lyrics}
                artistName={data.artistName}
                duration={track.duration}
                preview={track.preview}
              />
            );
          })}
        </div>
      )}
    </>
  );
}
