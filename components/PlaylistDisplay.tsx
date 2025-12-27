
import React, { useState } from 'react';
import { Track, Playlist } from '../types';
import { GlassCard, CDIcon } from './RetroUI';
import { Play, Share2, Plus, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { spotifyService } from '../services/spotifyService';

interface PlaylistDisplayProps {
  playlist: Playlist;
  onBack: () => void;
  isConnected: boolean;
}

const PlaylistDisplay: React.FC<PlaylistDisplayProps> = ({ playlist, onBack, isConnected }) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [synced, setSynced] = useState(false);

  const handleSync = async () => {
    if (!isConnected) {
      alert("Please connect your Spotify account first!");
      return;
    }
    setIsSyncing(true);
    const success = await spotifyService.syncPlaylist(playlist.id);
    if (success) {
      setSynced(true);
      setIsSyncing(false);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button 
        onClick={onBack}
        className="mb-6 flex items-center gap-2 font-bold text-slate-500 hover:text-black transition-colors group"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> BACK TO GENERATOR
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar Info */}
        <div className="lg:col-span-1">
          <GlassCard className="sticky top-24 bg-gradient-to-br from-white to-pink-50 overflow-hidden">
            <div className="aspect-square w-full relative group mb-6">
              <img 
                src={`https://picsum.photos/seed/${playlist.id}/600/600`} 
                alt="Playlist Cover" 
                className="w-full h-full object-cover rounded-2xl border-4 border-black shadow-lg"
              />
              <div className="absolute top-4 right-4">
                <CDIcon size="w-16 h-16" />
              </div>
            </div>

            <h2 className="text-3xl font-syne font-extrabold mb-2 leading-none uppercase">{playlist.name}</h2>
            <p className="text-slate-600 mb-6 font-medium">{playlist.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-8">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold border border-blue-200">
                {playlist.mood}
              </span>
              <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs font-bold border border-pink-200">
                {playlist.activity}
              </span>
            </div>

            <div className="space-y-3">
              <button 
                onClick={handleSync}
                disabled={isSyncing || synced}
                className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none active:translate-x-1 active:translate-y-1 transition-all ${
                  synced ? 'bg-slate-100 text-slate-500 shadow-none border-slate-300' : 'bg-[#1DB954] text-white'
                }`}
              >
                {isSyncing ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : synced ? (
                  <><CheckCircle2 size={20} /> ADDED TO SPOTIFY</>
                ) : (
                  <><Play fill="white" size={20} /> SYNC WITH SPOTIFY</>
                )}
              </button>
              <div className="grid grid-cols-2 gap-3">
                <button className="py-3 bg-white border-2 border-slate-200 rounded-2xl font-bold flex items-center justify-center gap-2 hover:border-black transition-all">
                  <Share2 size={18} /> SHARE
                </button>
                <button className="py-3 bg-white border-2 border-slate-200 rounded-2xl font-bold flex items-center justify-center gap-2 hover:border-black transition-all">
                  <Plus size={18} /> SAVE
                </button>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Track List */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-xl font-syne font-bold uppercase border-b-4 border-black pb-2 flex items-center justify-between">
            The Tracklist 
            <span className="text-slate-400 text-sm font-normal">{playlist.tracks.length} SONGS</span>
          </h3>
          <div className="space-y-3">
            {playlist.tracks.map((track, index) => (
              <div 
                key={index} 
                className="group flex items-center gap-4 p-4 rounded-2xl bg-white border-2 border-transparent hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] transition-all cursor-pointer"
              >
                <div className="w-10 text-slate-300 font-syne font-extrabold text-xl group-hover:text-pink-500">
                  {(index + 1).toString().padStart(2, '0')}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg leading-tight group-hover:text-blue-600">{track.title}</h4>
                  <p className="text-slate-500 text-sm font-medium">{track.artist} • {track.genre}</p>
                </div>
                <div className="hidden md:flex flex-wrap gap-1 justify-end max-w-[150px]">
                  {track.moodTags.slice(0, 2).map((tag, i) => (
                    <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-[10px] uppercase font-bold">
                      {tag}
                    </span>
                  ))}
                </div>
                <button className="p-2 rounded-full hover:bg-slate-100 transition-colors">
                  <Plus size={20} className="text-slate-400 hover:text-black" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistDisplay;
