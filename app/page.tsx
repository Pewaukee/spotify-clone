import Player from './components/Player';
import PlaylistCard from './components/PlaylistCard';
import PlayerProvider from './context/PlayerContext';

export default function Home() {
  return (
    <main className='w-full h-full bg-neutral-700 max-h-screen'>
      <div className='mt-10 ml-10 text-2xl'>
        <h1>Pewaukee&apos;s favorite tracks</h1>
      </div>
      <div className='w-full'>
        <div className='ml-24 mt-8'>
          <PlayerProvider>
            <PlaylistCard
              image={{ src: '/immunity.png', alt: 'Immunity Album Cover' }}
              title='Immunity'
              description='Clairo'
            />
            <PlaylistCard
              image={{ src: '/swimming.png', alt: 'Swimming Album Cover' }}
              title='Swimming'
              description='Mac Miller'
            />
            <Player
              image={{ src: '/swimming.png', alt: 'swimming' }}
              title='Swimming'
              artist='Mac Miller'
            />
          </PlayerProvider>
        </div>
      </div>
    </main>
  );
}
