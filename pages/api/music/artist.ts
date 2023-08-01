import { SongData } from '@/data/musicData';
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
    const { artist } = req.query as {
      artist: string;
    };
    if (!artist) {
      return res.status(400).json({ message: 'Missing query parameters' });
    }
    try {
      const response = await axios.get(
        // match the current protocol
        `https://api.deezer.com/search?q=artist:"${artist}"&limit=5`
      );
      // check errors for axios request
      if (response.status !== 200) {
        return res.status(500).json({ message: 'no song' });
      }
      // check errors for deezer api
      if (response.data.error) {
        return res.status(500).json({ message: response.data.error.message });
      }

      const artistData = response.data.data[0];
      const artistName = artistData.artist.name;
      const artistPicture = artistData.artist.picture_big;

      // go find the tracklist
      const tracklist = await axios.get(artistData.artist.tracklist);

      // construct the SongTrack list of song data to pass back
      const songData: SongData = tracklist.data.data.map((song: any) => {
        return {
          title: song.title,
          duration: song.duration,
          explicit_lyrics: song.explicit_lyrics,
          preview: song.preview,
        };
      });

      return res.json({
        artistName,
        artistPicture,
        songData,
      })
    } catch (error: any) {
      return res.status(500).json({ message: error.response.data });
    }
  }
}
