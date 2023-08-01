'use client';

import useItem from '@/hooks/getItem';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import Song from './components/Song';
import Navbar from '../components/Navbar';

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
    loading,
    error,
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
    <div className='grid grid-cols-2 gap-8 mt-[50px] pb-[100px]'>
      {songData
        ? songData.map((song, index) => {
            return (
              <div key={song.preview}className={`${index % 2 === 0 ? 'pl-8': 'pr-8'}`}>
                <Song song={song} />
              </div>
            );
          })
        : null}
      {artistData && (
        <div>
          <p>{artistData.artistName}</p>
          <p>{artistData.artistPicture}</p>
        </div>
      )}
      {albumData
        ? albumData.map((album) => {
            return (
              <div>
                <p>{album.albumName}</p>
                <p>{album.albumCover}</p>
                <p>{album.artistName}</p>
                <p>{album.artistPicture}</p>
              </div>
            );
          })
        : null}
    </div>
  );
}
