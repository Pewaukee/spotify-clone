'use client';
import { LinearProgress, Skeleton } from '@mui/material';
import Image from 'next/image';
import VolumeSlider from './VolumeSlider';
import MusicFiles from './MusicFiles';
import { Queue, RepeatMode, Song, usePlayer } from '../context/PlayerContext';
import {
  useCallback, // memoizes the function so that it doesn't change every render
  useEffect,
  useState,
} from 'react';
// import ReactDOM from 'react-dom'
import useDeepCompareEffect from 'use-deep-compare-effect';
import PlayPause from './ControlButtons/PlayPause';
import { timeString } from '@/utils/timeUtil';
import FastForwardButton from './ControlButtons/FastForwardButton';
import RewindButton from './ControlButtons/RewindButton';
import ShuffleButton from './ControlButtons/ShuffleButton';
import RepeatButton from './ControlButtons/RepeatButton';
import { shuffleIndices } from '@/utils/shuffle';
import useMusic from '@/hooks/useMusic';

export default function Player() {
  // import context variables
  const { queue, setQueue, volume, pause, currentSong, setCurrentSong, shuffle, repeat } =
    usePlayer();
  // use loading from api hook
  const { loading } = useMusic();
  // time state for the slider
  const [time, setTime] = useState<number>(0);
  // keep track of the current <audio> element
  const [audioFile, setAudioFile] = useState<HTMLAudioElement | null>(null);
  // keep track of the random indices for shuffle
  const [randomIndices, setRandomIndices] = useState<number[]>([]);

  // callback to find first song in queue
  const firstSong = useCallback((): Song => {
    if (queue.length === 0) return null;
    return shuffle ? queue[randomIndices[0]] : queue[0];
  }, [queue, shuffle, randomIndices]);

  // find the corresponding matching index of the current song in queue based on the shuffle
  const findIndexOfSong = useCallback((): number => {
    if (!currentSong) return -1;
    const index = queue.findIndex((song: Song) => {
      return song && song.preview === currentSong.preview;
    });
    return shuffle ? randomIndices.indexOf(index) : index;
  }, [currentSong, queue, shuffle, randomIndices]);

  // find next song in queue based on shuffle and repeat, covering edge cases
  const findNextSong = useCallback((): Song => {
    if (queue.length === 0) return null;
    // if the current song is null, then return the first song
    if (!currentSong) {
      return firstSong();
    }
    const index = findIndexOfSong();
    // if overshooting the last index, return based on the repeat mode
    if (index === queue.length - 1) {
      if (repeat === RepeatMode.NONE) {
        setTime(0);
        setQueue([]);
        return null;
      } else if (repeat === RepeatMode.REPEAT_ALL) {
        return firstSong();
      }
    }
    return shuffle ? queue[randomIndices[index + 1]] : queue[index + 1];
  }, [
    queue,
    currentSong,
    shuffle,
    randomIndices,
    repeat,
    firstSong,
    findIndexOfSong,
  ]);

  // event listener for when the song ends
  const audioEnded = useCallback((): void => {
    // if repeatMode is ONE, then just replay the same song
    if (repeat === RepeatMode.REPEAT_ONE) {
      if (audioFile) {
        audioFile.currentTime = 0;
        audioFile.play();
      }
    }
    // otherwise, increment the song
    else if (audioFile) setCurrentSong(findNextSong());
  }, [audioFile, shuffle, randomIndices, repeat]);

  // get the amount of time that has passed in the current <audio> element
  const getCurrentTime = useCallback((): void => {
    audioFile ? setTime(Math.round(audioFile.currentTime)) : setTime(0);
  }, [audioFile, setTime]);

  // get the audio file by the corresponding index
  // by searching for the UNIQUE id of the audio file
  const getAudioFile = useCallback((): void => {
    if (currentSong) {
      setAudioFile(
        (document.getElementById(currentSong.preview) as HTMLAudioElement) ??
          null
      );
    } else setAudioFile(null);
  }, [currentSong, setAudioFile]);

  // set the volume attribute of the <audio> element
  const setVolumeofAudio = useCallback(() => {
    if (audioFile) audioFile.volume = volume[0] / 1000; // customizable scalar
  }, [volume, audioFile]);

  // call the pause or play funciton on the current <audio> element
  const setPauseofAudio = useCallback(() => {
    if (audioFile) pause ? audioFile.pause() : audioFile.play();
  }, [pause, audioFile]);

  // useEffect with lists runs infinitely, so use JSON.stringify
  // useDeepCompareEffect actually compares the contents of the list
  useDeepCompareEffect(() => {
    if (queue.length > 0) {
      setRandomIndices(shuffleIndices(queue.length));
    }
  }, [queue, setRandomIndices, shuffleIndices]);

  // when the randomIndices list changes, update the current song
  useDeepCompareEffect(() => {
    setCurrentSong(firstSong());
  }, [randomIndices, setCurrentSong, firstSong]);

  // if the current song changes, only then get the audio file
  useEffect(() => {
    // first pause the currently playing audio file
    if (audioFile) {
      audioFile.pause();
      // set time back to zero in case it were played again
      audioFile.currentTime = 0;
    }
    // set the new audio element
    getAudioFile();
  }, [currentSong, getAudioFile]);

  // event that adds event listeners to the <audio> element
  // only when the audioFile changes
  useEffect(() => {
    console.log('audiofile', audioFile)
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
  }, [setPauseofAudio, audioFile?.src, pause]);

  /**
   * only for the change in the volume,
   * we need to update the only the volume of the current audio clip
   */
  useEffect(() => {
    // set the volume if the volume changes
    setVolumeofAudio();
  }, [setVolumeofAudio, volume]);

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
                animation={loading ? 'pulse' : false}
                className='rounded-md ml-4 mt-[10px] mb-[10px] bg-gray-600'
              />
              <div className='flex flex-col ml-2 justify-center'>
                <Skeleton
                  variant='text'
                  width={100}
                  height={20}
                  animation={loading ? 'pulse' : false}
                  className='rounded-md ml-2 bg-gray-600'
                />
                <Skeleton
                  variant='text'
                  width={80}
                  height={20}
                  animation={loading ? 'pulse' : false}
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
              <ShuffleButton />
              <RewindButton
                setCurrentSong={setCurrentSong}
                audioFile={audioFile}
                randomIndices={randomIndices}
                findIndexOfSong={findIndexOfSong}
              />
              <PlayPause />
              <FastForwardButton
                setCurrentSong={setCurrentSong}
                findNextSong={findNextSong}
              />
              <RepeatButton />
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
