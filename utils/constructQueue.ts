import { Queue } from '@/app/context/PlayerContext';
import { MusicData } from '@/data/musicData';

export const constructQueue = (data: MusicData): Promise<Queue> => {
  // construct the new list based on the following type sig
  /**
   * type Song = {
   * title: string;
   * preview: string;
   * image_src: string;
   * artist: string;
   * } | null;
   *
   * type Queue = Song[];
   */
  return new Promise((resolve, reject) => {
    if (data) {
      const newQueue: Queue = [];
      const image_src = data.albumCover;
      const artist = data.artistName;
      data.tracks.forEach((track) => {
        newQueue.push({
          title: track.title,
          preview: track.preview,
          image_src: image_src,
          artist: artist,
        });
      });
      resolve(newQueue);
    }
    resolve([]);
  });
};
