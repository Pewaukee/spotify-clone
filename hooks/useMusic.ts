import { useState } from 'react';
import axios from 'axios';

export default function useMusic() {
  const [data, setData] = useState<{
    albumCover: string;
    mp3Previews: {
      title: string;
      preview: string;
    }[];
    artistName: string;
  } | null>(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const fetchMusic = async ({
    title,
    artist,
  }: {
    title: string;
    artist: string;
  }) => {
    setLoading(true);
    try {
        const response = await axios.get(`${baseUrl}/api/music/music`, {
            params: {
                title,
                artist,
            },
        });

      console.log(response);
      setData(response.data);
      setLoading(false);
    } catch (error: any) {
      console.error(error);
      setError(error);
    }
  };

  return { data, error, loading, fetchMusic };
}
