'use client';
import { LinearProgress, Skeleton } from '@mui/material';
import { FastForward, Repeat, Repeat1, Rewind, Shuffle } from 'lucide-react';
import Image from 'next/image';
import VolumeSlider from './VolumeSlider';
import MusicFiles from './MusicFiles';
import { usePlayer } from '../context/PlayerContext';
import { useEffect, useState } from 'react';
import PlayPause from './PlayPause';

export default function Player() {
  const { queue, volume, pause, currentSong, setCurrentSong } = usePlayer();
  const [currentTime, setCurrentTime] = useState<number>(0);
  // keep track of the position in the queue
  const [index, setIndex] = useState<number>(0);

  const getAudioFile = (): HTMLAudioElement =>
    document.getElementById(`audio-file-${index}`) as HTMLAudioElement;

  const setVolumeofAudio = () => {
    if (queue.length === 0) return;

    try {
      const audioFile = getAudioFile();
      audioFile.volume = volume[0] / 200;
    } catch (error) {
      console.log('Error setting volume of audio files');
    }
  };

  const setPauseofAudio = () => {
    if (queue.length === 0) return;

    try {
      const audioFile = getAudioFile();
      pause ? audioFile.play() : audioFile.pause();
    } catch (error) {
      throw new Error('could not find the audio file to pause');
    }
  };

  const getCurrentTime = (): number => {
    try {
      const audioFile = getAudioFile();
      return Math.round((audioFile.currentTime / audioFile.duration) * 30);
    } catch (error: any) {
      return 0;
    }
  };

  const timeString = (time: number): string =>
    `0:${time < 10 ? `0${time}` : time}`;

  const checkStatusOfAudio = () => {
    if (queue.length === 0) return;

    try {
      const audioFile = getAudioFile();
      if (audioFile.ended) {
        // pause the current song to make sure it stops
        audioFile.pause();
        // then load the next song by triggering the re-render and the useEffect hook
        setIndex(index + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // on a change of index, run the following code
    setCurrentSong(queue[index]);
    setCurrentTime(0);
    // update the next <audio> component's volume
    setVolumeofAudio();
    // play the next song
    setPauseofAudio();
  }, [index]);

  useEffect(() => {
    setVolumeofAudio();
  }, [volume, queue]);

  useEffect(() => {
    if (queue.length === 0) return setCurrentSong(null);
    setCurrentSong(queue[index]);
  }, [queue]);

  useEffect(() => {
    setPauseofAudio();
  }, [pause]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getCurrentTime());
      checkStatusOfAudio();
    }, 500);

    return () => clearInterval(interval);
  });

  return (
    <div className='absolute h-[70px] inset-x-0 bottom-0 bg-black z-30'>
      <div className='grid grid-cols-3'>
        {/** left side, with picture, title, and artist */}
        <div className='flex w-full h-full'>
          {currentSong ? (
            <>
              <Image
                key={currentSong.image_src}
                src={currentSong.image_src}
                alt={`Song Cover of ${currentSong.title} by ${currentSong.artist}`}
                width={50}
                height={50}
                className='rounded-md ml-4 mt-[10px] mb-[10px]'
              />

              <div className='flex flex-col ml-2 justify-center'>
                <h1 className='text-lg text-white'>{currentSong.title}</h1>
                <p className='text-xs text-gray-300'>{currentSong.artist}</p>
              </div>
            </>
          ) : (
            <>
              <Skeleton
                variant='rectangular'
                width={50}
                height={50}
                animation={false}
                className='rounded-md ml-4 mt-[10px] mb-[10px] bg-gray-600'
              />
              <div className='flex flex-col ml-2 justify-center'>
                <Skeleton
                  variant='text'
                  width={100}
                  height={20}
                  animation={false}
                  className='rounded-md ml-2 bg-gray-600'
                />
                <Skeleton
                  variant='text'
                  width={80}
                  height={20}
                  animation={false}
                  className='rounded-md ml-2 bg-gray-600'
                />
              </div>
            </>
          )}
        </div>

        {/** middle with main player and also controllable buttons */}
        <div className='flex flex-col'>
          <div className='flex justify-center items-center mt-4'>
            <div className='flex flex-row'>
              <Shuffle
                size={20}
                className='hover:text-gray-300'
              />
              <Rewind
                size={20}
                className='ml-2 hover:text-gray-300'
              />

              <PlayPause />

              <FastForward
                size={20}
                className='ml-2 hover:text-gray-300'
              />
              <Repeat
                size={20}
                className='ml-2 hover:text-gray-300'
              />
              {/** conditional */}
              {/* <Repeat1 /> */}
            </div>
          </div>

          <div className='flex flex-row justify-center items-center mt-2'>
            <p className='mr-2 text-xs text-gray-300'>
              {timeString(currentTime)}
            </p>
            <LinearProgress
              variant='determinate'
              value={(currentTime / 30) * 100}
              className='w-[80%]'
            />
            <p className='ml-2 text-xs text-gray-300'>0:30</p>
          </div>
        </div>
        <VolumeSlider />
      </div>
      {/** add the music */}
      <MusicFiles />
    </div>
  );
}
