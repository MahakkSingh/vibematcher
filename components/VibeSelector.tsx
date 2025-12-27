
import React from 'react';
import { Mood, Activity } from '../types';
import { MOOD_CONFIG, ACTIVITY_CONFIG } from '../constants';
import { NeonButton, GlassCard } from './RetroUI';

interface VibeSelectorProps {
  selectedMood: Mood | null;
  onMoodSelect: (mood: Mood) => void;
  selectedActivity: Activity | null;
  onActivitySelect: (activity: Activity) => void;
  onGenerate: () => void;
  loading: boolean;
}

const VibeSelector: React.FC<VibeSelectorProps> = ({
  selectedMood,
  onMoodSelect,
  selectedActivity,
  onActivitySelect,
  onGenerate,
  loading
}) => {
  return (
    <div className="space-y-8">
      <section>
        <h3 className="text-xl font-syne font-bold mb-4 flex items-center gap-2">
          1. HOW ARE YOU FEELING? <span className="text-pink-500 text-sm italic">#MOOD</span>
        </h3>
        <div className="flex flex-wrap gap-3">
          {(Object.keys(Mood) as Array<keyof typeof Mood>).map((key) => (
            <NeonButton
              key={key}
              active={selectedMood === Mood[key]}
              onClick={() => onMoodSelect(Mood[key])}
            >
              <span className={`p-1.5 rounded-lg ${MOOD_CONFIG[Mood[key]].color}`}>
                {MOOD_CONFIG[Mood[key]].icon}
              </span>
              <span className="font-bold">{Mood[key]}</span>
            </NeonButton>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-xl font-syne font-bold mb-4 flex items-center gap-2">
          2. WHAT'S THE MOVE? <span className="text-blue-500 text-sm italic">#ACTIVITY</span>
        </h3>
        <div className="flex flex-wrap gap-3">
          {(Object.keys(Activity) as Array<keyof typeof Activity>).map((key) => (
            <NeonButton
              key={key}
              active={selectedActivity === Activity[key]}
              onClick={() => onActivitySelect(Activity[key])}
            >
              <span className={`p-1.5 rounded-lg ${ACTIVITY_CONFIG[Activity[key]].color}`}>
                {ACTIVITY_CONFIG[Activity[key]].icon}
              </span>
              <span className="font-bold">{Activity[key]}</span>
            </NeonButton>
          ))}
        </div>
      </section>

      <div className="pt-6">
        <button
          onClick={onGenerate}
          disabled={loading || !selectedMood || !selectedActivity}
          className={`w-full py-6 rounded-3xl font-syne font-extrabold text-2xl tracking-tighter transition-all duration-300 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-4 ${
            loading || !selectedMood || !selectedActivity
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed border-2 border-slate-300 shadow-none translate-x-1 translate-y-1'
              : 'bg-gradient-to-r from-blue-500 to-pink-500 text-white hover:-translate-x-1 hover:-translate-y-1 active:translate-x-0 active:translate-y-0 border-4 border-black'
          }`}
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-8 w-8 border-b-4 border-white"></div>
              MIXING THE VIBE...
            </>
          ) : (
            'GENERATE VIBE'
          )}
        </button>
        <p className="text-center mt-4 text-slate-500 text-sm font-medium">
          Powered by Gemini AI • 100% Personal to You
        </p>
      </div>
    </div>
  );
};

export default VibeSelector;
