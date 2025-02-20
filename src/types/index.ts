export interface Contestant {
  id: string;
  name: string;
  age: number;
  imageUrl: string;
  skill: string;
  socialLinks: {
    instagram: string;
    twitter: string;
  };
  status: 'active' | 'eliminated';
}

export interface Season {
  id: number;
  theme: string;
  year: number;
  contestants: Contestant[];
}

export interface StreamData {
  youtubeUrl: string;
  streamStatus: boolean;
  nextStreamDate: string;
}

export interface AppData {
  currentStream: StreamData;
  seasons: Season[];
}