'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import usePicture from '@/hooks/getPicture';
import * as AspectRatio from '@radix-ui/react-aspect-ratio';
import {
  quantization,
  buildRgb,
  findAverage,
  rgbToHex,
} from '@/utils/colorGradient';
import NextImage from 'next/image';
import PlayButton from '../components/PlayButton';
import SongTable from './components/SongTable';
import { Album, AlbumData, AlbumTrack } from '@/data/musicData';
import { secondsToMinutes } from '@/utils/secondsToMinutes';
import useItem from '@/hooks/getItem';

// keep title and author outside the re-rendering of playlist
let title = '';
let author = '';

export default function Playlist() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { albumData, fetchAlbum } = useItem();

  const [currentAlbum, setCurrentAlbum] = useState<Album>({
    albumName: '',
    albumCover: '',
    tracks: [],
    artistName: '',
    artistPicture: '',
  }); // current album

  const [averageColor, setAverageColor] = useState('#ffffff');

  const handleLoad = useCallback(async () => {
    console.log('running handleload function');
    await fetchAlbum({
      album: title,
    });
    // await fetchPicture(); // fallback for no image
  }, [fetchAlbum, title, author]);

  useEffect(() => {
    if (searchParams) {
      title = searchParams.get('title') ?? ''; // if undefined, set to empty string
      author = searchParams.get('author') ?? ''; // if undefined, set to empty string
    }
    console.log(title, author);
    if (!searchParams || title === '' || author === '') {
      router.push('/playlist/notFound');
    } else handleLoad(); // fetch the tracks
  }, []); // run upon mounting, only run once

  // find a color gradient to match the album cover
  // source:
  // https://dev.to/producthackers/creating-a-color-palette-with-javascript-44ip

  const findGradient = useCallback(
    (data: Album) => {
      // if any error occurs, just return black
      console.log('data in findGradient', data);
      if (data !== null) {
        const img = new Image();
        img.src = data.albumCover;
        console.log('img.src' + img.src);
        img.crossOrigin = 'Anonymous';
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0);
          const imageData = ctx?.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
          );
          if (imageData) {
            const rgb = buildRgb(imageData);
            const quantized = quantization(rgb, 0);
            const average = findAverage(quantized);
            const averageColor = rgbToHex(average.r, average.g, average.b);
            console.log('averageColor', averageColor);
            setAverageColor(averageColor);
          } else {
            console.error('imageData is null');
          }
        };
        img.onerror = () => {
          console.error('error in img.onload');
        };
      }
    },
    [buildRgb, quantization, findAverage, rgbToHex, albumData, setAverageColor]
  );

  useEffect(() => {
    console.log('useEffect in playlist, data:', albumData);
    const album = albumData
      ? albumData.find(
          (album: {
            albumName: string;
            albumCover: string;
            tracks: AlbumTrack[];
            artistName: string;
            artistPicture: string;
          }) => {
            return album.artistName === author;
          }
        )
      : null;
    if (author && album) {
      setCurrentAlbum(album);
    }
  }, [albumData, findGradient]);

  useEffect(() => {
    if (currentAlbum.albumName !== '') {
      findGradient(currentAlbum);
    }
  }, [currentAlbum]);

  return (
    <div
      className='w-full h-min-screen'
      // tailwind does not support dynamic class names,
      // https://tailwindcss.com/docs/content-configuration#dynamic-class-names
      style={{
        background: `linear-gradient(to bottom, ${averageColor}, black 60%)`,
      }}
    >
      {/** TODO: back and forward buttons */}
      <div className='p-4 flex flex-col md:flex-row justify-center md:justify-normal items-center'>
        {/** use ${averageColor} */}
        <div className='flex mt-12 md:justify-self-left w-[70%] md:w-[20%] mb-6 md:mb-0'>
          {currentAlbum ? (
            <AspectRatio.Root ratio={1}>
              <img
                src={currentAlbum.albumCover}
                alt={currentAlbum.artistName}
                className='shadow-md shadow-gray-800 rounded-none'
                id='albumCover'
              />
            </AspectRatio.Root>
          ) : (
            <AspectRatio.Root ratio={1}>
              <NextImage
                src='/music_placeholder.png'
                alt='Placeholder for Album Cover'
                fill
                sizes='100vw'
              />
            </AspectRatio.Root>
          )}
        </div>
        <div className='w-full flex flex-col ml-6 md:mt-32'>
          <h1 className='flex md:items-center text-3xl md:text-6xl font-bold text-white'>
            {title}
          </h1>
          <div className='text-sm pt-6 flex flex-row items-center'>
            {currentAlbum && (
              <NextImage
                src={currentAlbum.artistPicture}
                alt={currentAlbum.artistName}
                width={25}
                height={25}
                className='rounded-full'
              />
            )}
            <p className='ml-[4px]'>
              {author} &mdash; {currentAlbum ? currentAlbum.tracks.length : 0}{' '}
              songs,{' '}
              {currentAlbum
                ? secondsToMinutes(
                    currentAlbum.tracks.reduce(
                      (acc: number, e: AlbumTrack) => acc + e.duration,
                      0
                    )
                  )
                : 0}
            </p>
          </div>
        </div>
      </div>
      <div className='m-4'>
        <PlayButton
          title={title}
          author={author}
        />
        <SongTable data={currentAlbum} />
      </div>
    </div>
  );
}

// dynamic metadata from https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
// only generates metadata for a local layout.tsx file
// export async function generateMetadata({
//   params,
// }: {
//   params: {
//     slug: string;
//   };
// }) {
//   return {
//     title: params.slug,
//     description: 'A clone of the popluar music streaming service.',
//   };
// }
