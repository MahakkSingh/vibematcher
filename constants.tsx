
import React from 'react';
import { 
  Zap, 
  Coffee, 
  Moon, 
  Dumbbell, 
  BookOpen, 
  Music, 
  Car, 
  Heart, 
  CloudRain,
  Smile,
  Target
} from 'lucide-react';
import { Mood, Activity } from './types';

export const MOOD_CONFIG: Record<Mood, { icon: React.ReactNode; color: string }> = {
  [Mood.Vibing]: { icon: <Music className="w-5 h-5" />, color: 'bg-blue-400' },
  [Mood.Energized]: { icon: <Zap className="w-5 h-5" />, color: 'bg-yellow-400' },
  [Mood.Chill]: { icon: <Coffee className="w-5 h-5" />, color: 'bg-green-400' },
  [Mood.Focused]: { icon: <Target className="w-5 h-5" />, color: 'bg-purple-400' },
  [Mood.Sad]: { icon: <CloudRain className="w-5 h-5" />, color: 'bg-indigo-400' },
  [Mood.Confident]: { icon: <Smile className="w-5 h-5" />, color: 'bg-pink-400' },
  [Mood.Nostalgic]: { icon: <Heart className="w-5 h-5" />, color: 'bg-orange-400' },
};

export const ACTIVITY_CONFIG: Record<Activity, { icon: React.ReactNode; color: string }> = {
  [Activity.Workout]: { icon: <Dumbbell className="w-5 h-5" />, color: 'bg-red-400' },
  [Activity.Study]: { icon: <BookOpen className="w-5 h-5" />, color: 'bg-cyan-400' },
  [Activity.Relax]: { icon: <Moon className="w-5 h-5" />, color: 'bg-teal-400' },
  [Activity.Party]: { icon: <Music className="w-5 h-5" />, color: 'bg-fuchsia-400' },
  [Activity.Commute]: { icon: <Car className="w-5 h-5" />, color: 'bg-slate-400' },
  [Activity.LateDrive]: { icon: <Moon className="w-5 h-5" />, color: 'bg-blue-900' },
};

export const MOCK_TRENDING_PLAYLISTS = [
  {
    id: '1',
    name: 'Midnight Synth',
    description: 'Electric dreams for late night city drives.',
    tracksCount: 24,
    mood: Mood.Nostalgic,
    img: 'https://picsum.photos/seed/synth/400/400'
  },
  {
    id: '2',
    name: 'Hyperpop Chaos',
    description: 'Max volume energy for the grind.',
    tracksCount: 18,
    mood: Mood.Energized,
    img: 'https://picsum.photos/seed/pop/400/400'
  },
  {
    id: '3',
    name: 'Lo-Fi Study Hall',
    description: 'Quiet beats for deep focus.',
    tracksCount: 40,
    mood: Mood.Focused,
    img: 'https://picsum.photos/seed/lofi/400/400'
  }
];
