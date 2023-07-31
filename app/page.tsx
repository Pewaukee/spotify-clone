import { homeAlbums } from '@/data/albums';
import Navbar from './components/Navbar';
import Player from './components/Player';
import PlaylistCard from './components/PlaylistCard';

export default function Home() {
  return (
    <main className='w-full h-full bg-neutral-700'>
      <Navbar />
      <div className='flex justify-center items-center text-xl mt-4 ml-2 mr-2 md:mt-10 md:ml-10 md:text-2xl md:items-start md:justify-normal'>
        <h1>Pewaukee&apos;s favorite tracks</h1>
      </div>
      <div className='w-full'>
        <div className='m-2 pb-[200px] md:m-4 grid grid-cols-3 gap-4 md:grid-cols-5'>
          {homeAlbums.map((album, index) => (
            <PlaylistCard
              key={index}
              image={album.image}
              title={album.title}
              description={album.artist}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
