'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import useMusic from '@/hooks/useMusic';
import usePicture from '@/hooks/getPicture';
import * as AspectRatio from '@radix-ui/react-aspect-ratio';
import { findGradient } from '@/utils/colorGradient';
import NextImage from 'next/image';
import PlayButton from '../components/PlayButton';
import SongTable from './components/SongTable';

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

  useEffect(() => {
    findGradient(data)
      .then((newColor) => {
        console.log(newColor);
        setAverageColor(newColor);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [data]); // TODO: won't render averageColor in classname

  return (
    <div className='w-full h-min-screen bg-gradient-to-b from-white to-black to-60%'>
      {/** back and forward buttons */}
      <div
        className={`p-4 flex flex-row`}
      >
        {/** use ${averageColor} */}
        <div className='flex mt-12 justify-self-left w-[20%]'>
          {
          data ? (
            <AspectRatio.Root ratio={1}>
              <img
                src={data.albumCover}
                alt={data.artistName}
                className='shadow-md shadow-gray-800 rounded-none'
                id='albumCover'
              />
            </AspectRatio.Root>
          ) : 
          (
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
export async function generateMetadata({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  return {
    title: params.slug,
    description: 'A clone of the popluar music streaming service.',
  };
}
