// export the type according to the music data to be used among the app
export type AlbumTrack = {
  title: string;
  duration: number;
  explicit_lyrics: boolean;
  track_position: number;
  preview: string;
};

export type Album = {
  albumName: string;
  albumCover: string;
  tracks: AlbumTrack[];
  artistName: string;
  artistPicture: string;
}

export type AlbumData = Album[] | null;

export type SongTrack = {
  title: string;
  duration: number;
  explicit_lyrics: boolean;
  preview: string;
  artistName: string;
};

export type SongData = SongTrack[] | null;

export type ArtistData = {
  artistName: string;
  artistPicture: string;
  songData: SongData;
} | null;