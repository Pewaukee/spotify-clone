import { useState } from 'react';
import axios from 'axios';
import { MusicData } from '@/data/musicData';

export default function useMusic() {
  
  const [data, setData] = useState<MusicData>(null);

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
    console.log('loading in useMusic', loading)
    try {
        const response = await axios.get(`${baseUrl}/api/music/music`, {
            params: {
                title,
                artist,
            },
        });

      console.log(response.data);
      setData(response.data);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      console.error(error);
      setError(error);
    }
  };

  return { data, error, loading, fetchMusic };
}
