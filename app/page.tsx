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
            image={{ src: '/piano.png', alt: 'Piano Playlist Cover' }}
            title='Peaceful Piano'
            description='Peaceful piano to help you relax and focus on your work.'
          />
          <PlaylistCard
            image={{ src: '/piano.png', alt: 'Piano Playlist Cover' }}
            title='Peaceful Piano'
            description='Peaceful piano to help you relax and focus on your work.'
          />
          <PlaylistCard
            image={{ src: '/piano.png', alt: 'Piano Playlist Cover' }}
            title='Peaceful Piano'
            description='Peaceful piano to help you relax and focus on your work.'
          />
          <PlaylistCard
            image={{ src: '/piano.png', alt: 'Piano Playlist Cover' }}
            title='Peaceful Piano'
            description='Peaceful piano to help you relax and focus on your work.'
          />
          <PlaylistCard
            image={{ src: '/piano.png', alt: 'Piano Playlist Cover' }}
            title='Peaceful Piano'
            description='Peaceful piano to help you relax and focus on your work.'
          />
        </div>
      </div>
    </main>
  );
}
