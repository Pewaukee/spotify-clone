'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import useMusic from '@/hooks/useMusic';
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
import { MusicData } from '@/data/musicData';
import { secondsToMinutes } from '@/utils/secondsToMinutes';

// keep title and author outside the re-rendering of playlist
let title = '';
let author = '';

export default function Playlist() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { data, loading, error, fetchMusic } = useMusic();

  const { picture, pictureLoading, fetchPicture } = usePicture();

  const [averageColor, setAverageColor] = useState('#ffffff');

  const handleLoad = useCallback(async () => {
    console.log('running handleload function');
    await fetchMusic({
      title: title,
      artist: author,
    });
    // await fetchPicture(); // fallback for no image
  }, [fetchMusic, fetchPicture, title, author]);

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

  const findGradient = useCallback((data: MusicData) => {
    // if any error occurs, just return black
      console.log('data in findGradient', data);
      if (data !== null) {
        const img = new Image();
        img.src = data.albumCover;
        console.log('img.src' + img.src)
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
  }, [buildRgb, quantization, findAverage, rgbToHex, data, setAverageColor]);

  useEffect(() => {
    console.log('useEffect in playlist, data:', data);
    if (data) findGradient(data);
  }, [data, findGradient]);

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
      <div className={`p-4 flex flex-row`}>
        {/** use ${averageColor} */}
        <div className='flex mt-12 justify-self-left w-[20%]'>
          {data ? (
            <AspectRatio.Root ratio={1}>
              <img
                src={data.albumCover}
                alt={data.artistName}
                className='shadow-md shadow-gray-800 rounded-none'
                id='albumCover'
              />
            </AspectRatio.Root>
          ) : (
            picture && (
              <img
                src={picture.src}
                alt='random picture in case data is null'
                width={500}
                height={500}
              />
            )
          )}
        </div>
        <div className='relative w-full flex flex-col ml-6'>
          <div className='absolute top-[40%] flex items-center'>
            <h1 className='text-6xl font-bold text-white'>{title}</h1>
          </div>
          <div className='absolute top-[90%] text-sm'>
            <div className='flex flex-row items-center'>
              {data && (
                <NextImage
                  src={data.artistPicture}
                  alt={data.artistName}
                  width={25}
                  height={25}
                  className='rounded-full'
                />
              )}
              <p className='ml-[4px]'>{author}</p>
              <p className='ml-[10px]'>
                {data ? data.tracks.length : 0} songs,
              </p>
              <p className='ml-[4px]'>
                {data
                  ? secondsToMinutes(
                      data.tracks.reduce((acc, e) => acc + e.duration, 0)
                    )
                  : 0}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='m-4'>
        <PlayButton
          title={title}
          author={author}
        />
        <SongTable data={data} />
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
