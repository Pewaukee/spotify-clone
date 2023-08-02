import { Queue } from '@/app/context/PlayerContext';
import { AlbumData } from '@/data/musicData';

export const constructQueue = (data: AlbumData, artist: string): Promise<Queue> => {
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
      for (const album of data) {
        if (album.artistName === artist) {
          const newQueue: Queue = [];
          const image_src = album.albumCover;
          const artist = album.artistName;
          album.tracks.forEach((track) => {
            newQueue.push({
              title: track.title,
              preview: track.preview,
              image_src: image_src,
              artist: artist,
            });
          });
          resolve(newQueue);
        }
      }
    }
    resolve([]);
  });
};
