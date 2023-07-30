// export the type according to the music data to be used among the app
export type MusicData = {
  albumName: string;
  albumCover: string;
  tracks: {
    title: string;
    duration: number;
    explicit_lyrics: boolean;
    track_position: number;
    preview: string;
  }[];
  artistName: string;
  artistPicture: string;
} | null;
