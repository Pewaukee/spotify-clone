import { usePlayer } from '@/app/context/PlayerContext';
import { ArtistData } from '@/data/musicData';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import Image from 'next/image';
import React from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';
import ArtistTracks from './ArtistTracks';

export default function Artist({ artistData }: { artistData: ArtistData }) {
  const { queue, setQueue, setCurrentSong, shuffle, randomIndices } =
    usePlayer();

  const handleClick = () => {
    if (artistData) {
      setQueue(
        artistData.songData
          ? artistData.songData.map((song) => ({
              title: song.title,
              preview: song.preview,
              image_src: song.coverImage,
              artist: song.artistName,
            }))
          : []
      );
    }
  };

  useDeepCompareEffect(() => {
    setCurrentSong(shuffle ? queue[randomIndices[0]] : queue[0]);
  }, [queue]);

  return (
    <>
      <div className='md:grid grid-cols-2'>
        <div className='md:col-span-1'>
          <div className='flex justify-center items-center mt-[25px] mb-[25px]'>
            <h1 className='text-lg'>Best Result</h1>
          </div>
          <div className='flex justify-items-center ml-[15%] mr-[15%] md:ml-[25%] md:mr-[25%] rounded-full border-2 border-white shadow-lg shadow-gray-300'>
            {artistData ? (
              <Image
                src={artistData.artistPicture}
                alt={`Picture of ${artistData.artistName}`}
                width={400}
                height={400}
                className='rounded-full'
              />
            ) : (
              <p>No result found for that your search...</p>
            )}
          </div>
          <div className='flex justify-center items-center mt-[10px] mb-[10px]'>
            <h1 className='text-lg'>{artistData?.artistName}</h1>
            <button onClick={handleClick}>
              <PlayCircleIcon
                className='fill-green-500 transition duration-300 ml-[10px] hover:scale-125 hover:brightness-125'
                fontSize='large'
              />
            </button>
          </div>
        </div>

        <div className='md:col-span-1 md:flex-col md:items-center md:justify-center'>
          <h2 className='p-4'>Popular Songs of {artistData?.artistName}</h2>
          {artistData ? (
            <ArtistTracks
              songs={artistData.songData}
              artist={artistData.artistName}
            />
          ) : null}
        </div>
      </div>
    </>
  );
}
