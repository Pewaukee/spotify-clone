'use client';
/**
 * This file contains the context for the volume and queue of the player.
 * These variables when wrapped like in the following manner
 * <PlayerProvider>
 * <App />
 * </PlayerProvider>
 * can be used throughout the whole application by using the respective variables
 */
import React, { createContext, useContext, useState } from 'react';

/**
 * define an interface for the song which
 * is a list of objects with a title and a preview
 * and also the picture and the artist
 * all of this can be used to display onto the player
 */
export type Song = {
  title: string;
  preview: string;
  image_src: string;
  artist: string;
} | null;

export type Queue = Song[]; // queue is a list of songs

export enum RepeatMode {
  NONE,
  REPEAT_ONE,
  REPEAT_ALL,
}

interface PlayerContextInterface {
  // declare the variables and their types to be used throughout the application
  volume: number[];
  setVolume: (newVolume: number[]) => void;
  queue: Queue;
  setQueue: (newQueue: Queue) => void;
  clearQueue: () => void;
  pause: boolean;
  setPause: (newPause: boolean) => void;
  currentSong: Song;
  setCurrentSong: (newCurrentSong: Song) => void;
  shuffle: boolean;
  setShuffle: (newShuffle: boolean) => void;
  repeat: RepeatMode;
  setRepeat: (newRepeat: RepeatMode) => void;
}

const PlayerContext = createContext<PlayerContextInterface>({
  /**
   * These functions here should only be called from within
   * a PlayerProvider component, therefore they will be
   * overwritten when the component is used by the
   * types given in PlayerContextInterface
   */
  volume: [50],
  setVolume: () => {}, // The () is a placeholder value used when the context is accessed outside PlayerProvider
  queue: [],
  setQueue: () => {}, // The () is a placeholder value used when the context is accessed outside PlayerProvider
  clearQueue: () => {}, // Still a placeholder, but matches the actual implementation
  pause: false,
  setPause: () => {},
  currentSong: null,
  setCurrentSong: () => {},
  shuffle: false,
  setShuffle: () => {},
  repeat: RepeatMode.NONE,
  setRepeat: () => {},
});

interface PlayerProviderProps {
  children: React.ReactNode;
}

const PlayerProvider: React.FC<PlayerProviderProps> = ({ children }) => {
  const [volume, setVolume] = useState<number[]>([50]);

  const [queue, setQueue] = useState<Queue>([]);
  const clearQueue = () => setQueue([]);

  const [pause, setPause] = useState<boolean>(false);

  const [currentSong, setCurrentSong] = useState<Song>(null);

  const [shuffle, setShuffle] = useState<boolean>(false);

  const [repeat, setRepeat] = useState<RepeatMode>(RepeatMode.NONE);

  return (
    <PlayerContext.Provider
      value={{
        volume,
        setVolume,
        queue,
        setQueue,
        clearQueue,
        pause,
        setPause,
        currentSong,
        setCurrentSong,
        shuffle,
        setShuffle,
        repeat,
        setRepeat,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => useContext(PlayerContext);

export default PlayerProvider;
