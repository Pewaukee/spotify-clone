'use client';
import { LinearProgress, Skeleton } from '@mui/material';
import { FastForward, Repeat, Rewind, Shuffle } from 'lucide-react';
import Image from 'next/image';
import VolumeSlider from './VolumeSlider';
import MusicFiles from './MusicFiles';
import { usePlayer } from '../context/PlayerContext';
import {
  useCallback, // memoizes the function so that it doesn't change every render
  useEffect,
  useState,
} from 'react';
import PlayPause from './PlayPause';
import { timeString } from '@/utils/timeUtil';

export default function Player() {
  // import context variables
  const { queue, volume, pause, currentSong, setCurrentSong } = usePlayer();
  // time state for the slider
  const [time, setTime] = useState<number>(0);
  // keep track of the position in the queue
  const [index, setIndex] = useState<number>(0);
  // keep track of the current <audio> element
  const [audioFile, setAudioFile] = useState<HTMLAudioElement | null>(null);

  // event listener for when the song ends
  const audioEnded = useCallback((): void => {
    if (audioFile) setIndex(index + 1);
  }, [index, setIndex, audioFile]);

  // get the amount of time that has passed in the current <audio> element
  const getCurrentTime = useCallback((): void => {
    audioFile ? setTime(Math.round(audioFile.currentTime)) : setTime(0);
  }, [audioFile]);

  // get the audio file by the corresponding index
  // by searching for the UNIQUE id of the audio file
  const getAudioFile = useCallback((): void => {
    setAudioFile(
      (document.getElementById(`audio-file-${index}`) as HTMLAudioElement) ??
        null
    );
  }, [index]);

  // set the volume attribute of the <audio> element
  const setVolumeofAudio = useCallback(() => {
    if (audioFile) audioFile.volume = volume[0] / 200; // customizable scalar
  }, [volume, audioFile]);

  // call the pause or play funciton on the current <audio> element
  const setPauseofAudio = useCallback(() => {
    if (audioFile) pause ? audioFile.play() : audioFile.pause();
  }, [pause, audioFile]);

  /**
   * for the queue and index, we only need to update the following:
   * 1. the current song
   * 2. the current time (reset back to zero if the index changes and we have a new song)
   * 3. the current <audio> element
   */
  useEffect(() => {
    // if index overshoots length, just set it back to nothing
    if (index >= queue.length) {
      setTime(0);
      return setCurrentSong(null);
    }
    // on a change of index, run the following code
    setCurrentSong(queue[index]);
    // set the current time
    setTime(0);
    // set the current <audio> element
    getAudioFile();
  }, [JSON.stringify(queue), index]); // useEffect with lists runs infinitely, so use JSON.stringify

  /**
   * only for the change in the volume,
   * we need to update the only the volume of the current audio clip
   */
  useEffect(() => {
    // set the volume if the volume changes
    setVolumeofAudio();
  }, [setVolumeofAudio, volume]);

  // event that adds event listeners to the <audio> element
  // only when the audioFile changes
  useEffect(() => {
    // add the event listeners when the component mounts
    if (audioFile) {
      // should independently add event listeners to each <audio> element
      audioFile.addEventListener('ended', audioEnded);
      audioFile.addEventListener('timeupdate', getCurrentTime);
    }

    // remove the event listeners when the component unmounts
    return () => {
      if (audioFile) {
        audioFile.removeEventListener('ended', audioEnded);
        audioFile.removeEventListener('timeupdate', getCurrentTime);
      }
    };
  }, [audioFile, audioEnded, getCurrentTime]);

  /**
   * either pause or play the audio file
   * depends on the play button and also a
   * new existing audio file
   */
  useEffect(() => {
    setPauseofAudio();
  }, [setPauseofAudio, audioFile, pause]);

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
            <p className='mr-2 text-xs text-gray-300'>{timeString(time)}</p>
            <LinearProgress
              variant='determinate'
              value={(time / 30) * 100}
              className='w-[80%]'
            />
            <p className='ml-2 text-xs text-gray-300'>0:30</p>
          </div>
        </div>
        {/** right side with the volume slider */}
        <VolumeSlider />
      </div>
      {/** add the music */}
      <MusicFiles />
    </div>
  );
}
