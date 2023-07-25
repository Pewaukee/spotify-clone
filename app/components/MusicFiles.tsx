'use client';
import { usePlayer } from '../context/PlayerContext';

export default function MusicFiles() {
  const { queue } = usePlayer();

  const filesExist = queue.length > 0;

  const files: string[] = [];

  if (filesExist) {
    queue.forEach((song) => {
      if (!song) throw new Error('song is null');
      files.push(song.preview);
    });
  }

  return (
    <>
      {files.length > 0 ? (
        <>
          {files.map((item: string, index) => (
            // autoplay the first song
            <audio
              key={index}
              src={item}
              className='audio-file'
              id={item} // unique id as the song preview string
            >
              This browser does not support this audio file.
            </audio>
            // TODO: how to delete the audio tags when not needed?
          ))}
        </>
      ) : null}
    </>
  );
}
