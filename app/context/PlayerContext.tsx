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

interface PlayerContextInterface {
  // declare the variables and their types to be used throughout the application
  volume: number[];
  setVolume: (newVolume: number[]) => void;
  queue: string[];
  setQueue: (newQueue: string[]) => void;
  clearQueue: () => void;
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
});

interface PlayerProviderProps {
  children: React.ReactNode;
}

const PlayerProvider: React.FC<PlayerProviderProps> = ({ children }) => {
  const [volume, setVolume] = useState<number[]>([50]);
  const [queue, setQueue] = useState<string[]>([]);

  const clearQueue = () => setQueue([]);

  return (
    <PlayerContext.Provider value={{ volume, setVolume, queue, setQueue, clearQueue }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => useContext(PlayerContext);

export default PlayerProvider;
