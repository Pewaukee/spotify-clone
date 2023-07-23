import PlaylistCard from './components/PlaylistCard';

export default function Home() {
  return (
    <main className='w-full min-h-screen bg-green-100/25'>
      <div className='mt-10 ml-10 text-2xl'>
        <h1>Focus</h1>
      </div>
      <div className='w-full'>
        <div className='ml-24 mt-8'>
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
          
        </div>
      </div>
    </main>
  );
}
