'use client';

import useItem from '@/hooks/getItem';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

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
    <div>
      {songData
        ? songData.map((song) => {
            return (
              <div key={song.preview}>
                <p>{song.title}</p>
                <p>{song.duration}</p>
                <p>{song.explicit_lyrics}</p>
                <p>{song.preview}</p>
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
