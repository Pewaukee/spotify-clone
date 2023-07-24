'use client';
import { LinearProgress, Skeleton } from '@mui/material';
import { FastForward, Repeat, Repeat1, Rewind, Shuffle } from 'lucide-react';
import Image from 'next/image';
import VolumeSlider from './VolumeSlider';
import MusicFiles from './MusicFiles';
import { usePlayer } from '../context/PlayerContext';
import { useCallback, useEffect, useState } from 'react';
import PlayPause from './PlayPause';

export default function Player() {
  const { queue, volume, pause, currentSong, setCurrentSong } = usePlayer();
  const [currentTime, setCurrentTime] = useState<number>(0);
  // keep track of the position in the queue
  const [index, setIndex] = useState<number>(0);

  // get the audio file by the corresponding index
  // by searching for the UNIQUE id of the audio file
  const getAudioFile = useCallback(
    (): HTMLAudioElement | null => {
      if (queue.length === 0) return null;
      //TODO: include an index check later
      try {
        return document.getElementById(`audio-file-${index}`) as HTMLAudioElement
      } catch (error) {
        throw new Error('could not find the audio file');
      }
    }, [index, queue.length]
  );

  // set the volume attribute of the <audio> element
  const setVolumeofAudio = useCallback(() => {
    const audioFile = getAudioFile();
    if (audioFile) audioFile.volume = volume[0] / 200; // customizable scalar
  }, [volume, getAudioFile]);

  // either pause or play the current <audio> element
  const setPauseofAudio = useCallback(() => {
    const audioFile = getAudioFile();
    if (audioFile) pause ? audioFile.play() : audioFile.pause();
  }, [pause, getAudioFile]);

  // get the amount of time that has passed in the current <audio> element
  const getCurrentTime = (): number => {
    const audioFile = getAudioFile();
    if (audioFile) return Math.round(audioFile.currentTime);
    else return 0;
  };

  // convert the time to a time-readable string
  const timeString = (time: number): string =>
    `0:${time < 10 ? `0${time}` : time}`;

  // check the status of the current <audio> element
  // if it has ended, then load the next song
  const checkStatusOfAudio = () => {
    const audioFile = getAudioFile();
    if (audioFile && audioFile.ended) {
      // pause the current song to make sure it stops
      audioFile.pause();
      // then load the next song by triggering the re-render and the useEffect hook
      setIndex(index + 1);
    }
  };

  useEffect(() => {
    if (queue.length === 0) return setCurrentSong(null);
    // on a change of index, run the following code
    setCurrentSong(queue[index]);
    setCurrentTime(0);
    // update the next <audio> component's volume
    setVolumeofAudio();
    // play the next song
    setPauseofAudio();
  }, [index, queue, setCurrentSong, setPauseofAudio, setVolumeofAudio]);

  useEffect(() => {
    // set the volume if the volume changes
    setVolumeofAudio();
  }, [volume, queue, setVolumeofAudio]);

  useEffect(() => {
    setPauseofAudio();
  }, [pause, setPauseofAudio]);

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
