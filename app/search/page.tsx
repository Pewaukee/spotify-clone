'use client';

import useItem from '@/hooks/getItem';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import Song from './components/Song';
import PlaylistCard from '../components/PlaylistCard';
import Artist from './components/Artist';

let song = '';
let artist = '';
let album = '';

export default function Search() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const {
    songData,
    artistData,
    albumData,
    fetchArtist,
    fetchSong,
    fetchAlbum,
  } = useItem();

  const valid = (): boolean => {
    if (song.length > 0 && album.length > 0) {
      return false;
    }
    if (song.length > 1 || album.length > 1 || artist.length > 1) {
      return true;
    }
    return false;
  };

  const handleLoad = () => {
    if (song.length > 0) {
      fetchSong({ song });
    } else if (artist.length > 0) {
      fetchArtist({ artist });
    } else {
      console.log('fetching albums', album);
      fetchAlbum({ album });
    }
  };

  useEffect(() => {
    if (searchParams) {
      song = searchParams.get('song') ?? '';
      artist = searchParams.get('artist') ?? '';
      album = searchParams.get('album') ?? '';
    }
    if (!searchParams && !valid()) {
      router.push('/search/notFound');
    } else handleLoad();
  }, []);

  return (
    <>
      {songData ? (
        <div className='pb-[100px] mt-[50px] grid grid-cols-2'>
          {songData.map((song, index) => {
            return (
              <div
                key={index}
                className='pl-2 pr-2 md:pl-8 md:pr-8 pb-2 md:pb-8'
              >
                <Song song={song} />
              </div>
            );
          })}
        </div>
      ) : null}

      <div>{artistData ? <Artist artistData={artistData} /> : null}</div>

      {albumData ? (
        <div className='pb-[100px] mt-[50px] grid grid-cols-2 md:grid-cols-3 ml-[10%] mr-[10%] flex justify-center items-center'>
          {albumData.map((album, index) => {
            return (
              <div
                key={index}
                className='pl-2 pr-2 md:pl-8 md:pr-8 pb-2 md:pb-8'
              >
                <PlaylistCard
                  image={{
                    src: album.albumCover,
                    alt: `${album.albumName} by ${album.artistName} Album Cover`,
                  }}
                  title={album.albumName}
                  description={album.artistName}
                />
              </div>
            );
          })}
        </div>
      ) : null}
    </>
  );
}
