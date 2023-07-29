import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

// get a random square picture from the unsplash api
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const response = await axios.get(
        'https://api.unsplash.com/photos/random',
        {
          params: {
            orientation: 'squarish',
            client_id: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
            count: 1,
            query: 'album', // search for pictures related to music
          },
        }
      );
      const picture = response.data[0];

      const src = picture.urls.regular;

      return res.json({
        src,
      });
    } catch (error: any) {
      return res.status(500).json({ message: error.response.data });
    }
  }
}
