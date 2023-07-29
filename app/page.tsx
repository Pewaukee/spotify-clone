import Navbar from './components/Navbar';
import Player from './components/Player';
import PlaylistCard from './components/PlaylistCard';
import PlayerProvider from './context/PlayerContext';

export default function Home() {
  return (
    <main className='w-full h-full bg-neutral-700 max-h-screen'>
      <Navbar />
      <div className='mt-10 ml-10 text-2xl'>
        <h1>Pewaukee&apos;s favorite tracks</h1>
      </div>
      <div className='w-full'>
        <div className='ml-24 mt-8'>
          <PlaylistCard
            image={{ src: '/immunity.png', alt: 'Immunity Clairo Album Cover' }}
            title='Immunity'
            description='Clairo'
          />
          <PlaylistCard
            image={{
              src: '/swimming.png',
              alt: 'Swimming Mac Miller Album Cover',
            }}
            title='Swimming'
            description='Mac Miller'
          />
          <PlaylistCard
            image={{
              src: '/free_spirit.png',
              alt: 'Free Spirit Khalid Album Cover',
            }}
            title='Free Spirit'
            description='Khalid'
          />
          <PlaylistCard
            image={{
              src: '/change_of_scenery.png',
              alt: 'Change of Scenery Quinn XCII Album Cover',
            }}
            title='Change of Scenery'
            description='Quinn XCII'
          />
          <PlaylistCard
            image={{ src: '/1999.png', alt: '1999 Rich Brian Album Cover' }}
            title='1999'
            description='Rich Brian'
          />
        </div>
      </div>
    </main>
  );
}
