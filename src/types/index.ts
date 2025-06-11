


export interface Song {
	  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number; // in seconds
  imageUrl: string;
  audioUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  imageUrl: string;
  releaseYear: number;
  songs: Song[];
}