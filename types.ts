
export enum Mood {
  Vibing = 'Vibing',
  Energized = 'Energized',
  Chill = 'Chill',
  Focused = 'Focused',
  Sad = 'Sad',
  Confident = 'Confident',
  Nostalgic = 'Nostalgic'
}

export enum Activity {
  Workout = 'Working Out',
  Study = 'Studying',
  Relax = 'Relaxing',
  Party = 'Partying',
  Commute = 'Commuting',
  LateDrive = 'Late Night Drive'
}

export interface Track {
  title: string;
  artist: string;
  album?: string;
  genre: string;
  duration?: string;
  bpm?: number;
  moodTags: string[];
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  mood: Mood;
  activity: Activity;
  tracks: Track[];
  createdAt: number;
}
