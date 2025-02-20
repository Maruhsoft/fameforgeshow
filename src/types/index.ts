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
  status: 'active' | 'exited' | 'disqualified' | 'winner';
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
  videoId: string;
}

export interface YouTubeStats {
  viewCount: number;
  likeCount: number;
  commentCount: number;
}

export interface AppData {
  currentStream: StreamData;
  seasons: Season[];
}