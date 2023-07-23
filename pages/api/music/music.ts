import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { title, artist } = req.query as {
        title: string;
        artist: string;
    };
    if (!title || !artist) {
        return res.status(400).json({ message: 'Missing query parameters' });
    }
    const response = await axios.get(
      `https://api.deezer.com/search/album?q=${title}&limit=5`,
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
    const album = response.data.data.find((album: any) => album.artist.name === artist);

    if (!album) {
        return res.status(404).json({ message: 'Album not found with corresponding artist' });
    }

    // now get the corresponding tracklist
    const tracklistResponse = await axios.get(album.tracklist);
    if (tracklistResponse.status !== 200) {
        return res.status(500).json({ message: 'no tracklist' });
    }
    // check errors for deezer api
    if (tracklistResponse.data.error) {
        return res.status(500).json({ message: tracklistResponse.data.error.message });
    }

    const tracks = tracklistResponse.data.data;

    // get the mp3 previews
    const mp3Previews: string[] = [];
    tracks.forEach((track: any) => {
        mp3Previews.push(track.preview);
    });

    return res.json(mp3Previews);
  }
}
