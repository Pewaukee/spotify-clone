import { useState } from 'react';
import axios from 'axios';

export default function useMusic() {
  const [data, setData] = useState<string[] | null>(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchMusic = async ({
    title,
    artist,
  }: {
    title: string;
    artist: string;
  }) => {
    setLoading(true);
    try {
        const response = await axios.get('http://localhost:3000/api/music/music', {
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
