# Spotify Clone with Next.js

This is a Spotify clone built using Next.js, a popular React framework for server-side rendering and building modern web applications. The project aims to replicate some of the core features of the Spotify music streaming service.

## Demo

https://spotify-clone-mocha-ten.vercel.app

## Features

- Browsing and searching for songs, artists, and albums
- Playing songs with audio controls (play, pause, skip)
- Responsive design for different screen sizes

## Technologies Used

- Next.js
- React
- MaterialUI
- Tailwind CSS
- Deezer API
- [useDeepCompareEffect](https://github.com/kentcdodds/use-deep-compare-effect)
- Axios
- RadixUI
- Lucide Icons

## Installation

Provide step-by-step instructions to set up the project locally:

1. Clone the repository: `git clone https://github.com/your-username/spotify-clone.git`
2. Navigate to the project directory: `cd spotify-clone`
3. Install dependencies: `npm install` or `yarn install`

## Issues

There are different issues with mobile and desktop versions of the application.

Sometimes the queue might be jammed and the request to the API not go through, refreshing the page should fix this. Also, on mobile, when playing a song, the request does not automatically go through and start playing the song. For this, we need to click on the play button twice.

## Future Improvements

- Perhaps using Redux for better state management over Context. 
- UI could be improved to look more like Spotify's. 
- Authentication could be a next step using a database solution like Supabase, allowing for custom playlists and user data.
- Search feature should remove duplicates found in the search results.
- Changing `player.tsx` for mobile usage, as spotify web and mobile players are much different, could have a pop-up menu.
- Designing the library page (although Authentication is a precursor to this).
- Better loading pages for a more involved UI experience between API fetches.
