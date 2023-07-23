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
    const { title, artist } = req.query as {
      title: string;
      artist: string;
    };
    if (!title || !artist) {
      return res.status(400).json({ message: 'Missing query parameters' });
    }
    const response = await axios.get(
      `https://api.deezer.com/search/album?q=${title}&limit=5`
    );
    // check errors for axios request
    if (response.status !== 200) {
      return res.status(500).json({ message: 'no album' });
    }
    // check errors for deezer api
    if (response.data.error) {
      return res.status(500).json({ message: response.data.error.message });
    }

    // now select the correct album with the corresponding array of songs
    const album = response.data.data.find(
      (album: any) => album.artist.name === artist
    );

    if (!album) {
      return res
        .status(404)
        .json({ message: 'Album not found with corresponding artist' });
    }

    const albumCover = album.cover_medium;
    const artistName = album.artist.name;

    // now get the corresponding tracklist
    const tracklistResponse = await axios.get(album.tracklist);
    if (tracklistResponse.status !== 200) {
      return res.status(500).json({ message: 'no tracklist' });
    }
    // check errors for deezer api
    if (tracklistResponse.data.error) {
      return res
        .status(500)
        .json({ message: tracklistResponse.data.error.message });
    }

    const tracks = tracklistResponse.data.data;

    // get the mp3 previews as an array of objects
    /**
     * example:
     * {
     *    title: 'song title',
     *    preview: 'mp3 preview url'
     * }
     */
    const mp3Previews: {
      title: string;
      preview: string;
    }[] = [];
    tracks.forEach((track: any) => {
      mp3Previews.push({
        title: track.title,
        preview: track.preview,
      });
    });

    return res.json({
      albumCover,
      mp3Previews,
      artistName
    });
  }
}
