import { useState } from 'react';
import axios from 'axios';
import { AlbumData, AlbumTrack, ArtistData, SongData } from '@/data/musicData';

export default function useItem() {
  const [songData, setSongData] = useState<SongData>(null);
  const [artistData, setAritstData] = useState<ArtistData>(null);
  const [albumData, setAlbumData] = useState<AlbumData>(null);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const fetchSong = async ({ song }: { song: string }) => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseUrl}/api/music/song`, {
        params: {
          song,
        },
      });

      console.log(response.data);
      setSongData(response.data.songData);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      console.error(error);
      setError(error);
    }
  };

  const fetchArtist = async ({ artist }: { artist: string }) => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseUrl}/api/music/artist`, {
        params: {
          artist,
        },
      });

      console.log(response.data);
      setAritstData(response.data);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      console.error(error);
      setError(error);
    }
  };

  const fetchAlbum = async ({ album }: { album: string }) => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseUrl}/api/music/album`, {
        params: {
          album,
        },
      });

      console.log(response.data);
      setAlbumData(response.data.albumData);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      console.error(error);
      setError(error);
    }
  };

  return {
    songData,
    artistData,
    albumData,
    error,
    loading,
    fetchSong,
    fetchArtist,
    fetchAlbum,
  };
}
