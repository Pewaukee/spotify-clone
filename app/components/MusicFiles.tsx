'use client';
import { usePlayer } from '../context/PlayerContext';

export default function MusicFiles() {
  const { queue } = usePlayer();
  return (
    <div>
      {queue.length > 0 ? (
        <>
          {queue.map((item: string, index) => (
            // autoplay the first song
            <audio
              key={index}
              controls={true}
              autoPlay={index === 0}
              src={item}
              id='music'
            >
              This browser does not support this audio file.
            </audio>
          ))}
        </>
      ) : null}
    </div>
  );
}
