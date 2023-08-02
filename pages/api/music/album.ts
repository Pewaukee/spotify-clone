import { AlbumData, AlbumTrack } from '@/data/musicData';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    /**
     * this api is going to search for a specific album,
     * and then return its cover, mp3 preview with title,
     * and finally the artist name
     */
    const { album } = req.query as {
      album: string;
    };
    if (!album) {
      return res.status(400).json({ message: 'Missing query parameters' });
    }
    // get all the albums corresponding to first 5 artists
    // store result list outside the try block for scoping
    const albumData: AlbumData = [];

    try {
      const response = await axios.get(
        // get with no limit, so we can loop correctly
        `https://api.deezer.com/search/?q="${album}"`
      );
      // check errors for axios request
      if (response.status !== 200) {
        return res.status(500).json({ message: 'no album' });
      }
      // check errors for deezer api
      if (response.data.error) {
        return res.status(500).json({ message: response.data.error.message });
      }

      let currentAlbumName = ''; // keep track of current album name, to get 5 unique albums
      let currentArtistName = ''; // keep track of current artist name, to get 5 unique artists

      for (const album of response.data.data) {
        const artistName = album.artist.name;
        const albumName = album.album.title;

        if (
          albumName === currentAlbumName &&
          artistName === currentArtistName
        ) {
          continue;
        }
        currentAlbumName = albumName;
        currentArtistName = artistName;

        if (albumData.length === 10) break; // break out of loop

        const albumCover = album.album.cover_medium;

        const trackList = await axios.get(album.album.tracklist);

        const tracks = trackList.data.data.map((track: any) => {
          return {
            title: track.title,
            duration: track.duration,
            explicit_lyrics: track.explicit_lyrics,
            track_position: track.track_position,
            preview: track.preview,
          };
        });

        const artistPicture = album.artist.picture_small;

        albumData.push({
          albumName,
          albumCover,
          tracks,
          artistName,
          artistPicture,
        });
        // console.log(albumData)
        
      }
      console.log('albumdata at end of loop', albumData);
      return res.json({ albumData });
    } catch (error: any) {
      return res.status(500).json({ message: error.response.data });
    }
  }
}
