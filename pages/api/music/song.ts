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
    const { song } = req.query as {
      song: string;
    };
    if (!song) {
      return res.status(400).json({ message: 'Missing query parameters' });
    }
    try {
      const response = await axios.get(
        // set a higher limit to filter through
        `https://api.deezer.com/search?q=track:"${song}"&limit=20`
      );
      // check errors for axios request
      if (response.status !== 200) {
        return res.status(500).json({ message: 'no song' });
      }
      // check errors for deezer api
      if (response.data.error) {
        return res.status(500).json({ message: response.data.error.message });
      }

      // keep track of the preview, and get the first 5 unique previews
      let currentPreview = '';

      const songData: SongData = [];

      // go through the data and get the first 5 unique previews
      // and then break out of the loop
      response.data.data.every((song: any) => {
        const preview = song.preview;
        if (preview === currentPreview) return;
        currentPreview = preview;

        if (songData.length === 5) return false;

        const title = song.title;
        const duration = song.duration;
        const explicit_lyrics = song.explicit_lyrics;
        const artistName = song.artist.name;

        songData.push({
          title,
          duration,
          explicit_lyrics,
          preview,
          artistName,
        });

        return true;
      });

      return res.json({ songData });
    } catch (error: any) {
      return res.status(500).json({ message: error.response.data });
    }
  }
}
