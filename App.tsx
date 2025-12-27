import React, { useState, useEffect } from 'react';
import { Mood, Activity, Playlist, Track } from './types';
import { CheckerboardHeader, GlassCard, CDIcon } from './components/RetroUI';
import VibeSelector from './components/VibeSelector';
import PlaylistDisplay from './components/PlaylistDisplay';
import { generatePlaylistWithAI } from './services/geminiService';
import { spotifyService, SpotifyUser } from './services/spotifyService';
import { MOCK_TRENDING_PLAYLISTS } from './constants';
// Added Plus icon to the lucide-react imports to fix the error on line 174
import { Music, Search, Heart, User, LayoutGrid, Sparkles, Disc, LogOut, ExternalLink, Plus } from 'lucide-react';

const App: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [loading, setLoading] = useState(false);
  const [generatedPlaylist, setGeneratedPlaylist] = useState<Playlist | null>(null);
  const [activeTab, setActiveTab] = useState<'home' | 'discover' | 'library'>('home');
  
  const [user, setUser] = useState<SpotifyUser | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    const session = spotifyService.getSession();
    if (session) setUser(session);
  }, []);

  const handleConnectSpotify = async () => {
    setIsConnecting(true);
    try {
      const spotifyUser = await spotifyService.login();
      setUser(spotifyUser);
    } catch (err) {
      console.error(err);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleLogout = () => {
    spotifyService.logout();
    setUser(null);
    setActiveTab('home');
  };

  const handleGenerate = async () => {
    if (!selectedMood || !selectedActivity) return;
    
    setLoading(true);
    try {
      const tracks = await generatePlaylistWithAI(selectedMood, selectedActivity);
      const newPlaylist: Playlist = {
        id: Math.random().toString(36).substr(2, 9),
        name: `${selectedMood} ${selectedActivity} Vibe`,
        description: `An AI-curated sonic journey for when you are feeling ${selectedMood.toLowerCase()} while ${selectedActivity.toLowerCase()}.`,
        mood: selectedMood,
        activity: selectedActivity,
        tracks,
        createdAt: Date.now()
      };
      setGeneratedPlaylist(newPlaylist);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      alert("Failed to generate vibe. Please check your API key and try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderHome = () => (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {!generatedPlaylist ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-block px-4 py-1.5 bg-pink-100 text-pink-600 rounded-full text-sm font-bold border border-pink-200">
              {user ? `WELCOME BACK, ${user.display_name.toUpperCase()}` : '#1 AI PLAYLIST CURATOR'}
            </div>
            <h1 className="text-6xl md:text-8xl font-syne font-extrabold tracking-tighter leading-none uppercase">
              Find Your <span className="text-gradient">Vibe.</span>
            </h1>
            <p className="text-xl text-slate-500 font-medium max-w-lg">
              No more doom scrolling for music. Just tell us how you feel and what you're doing. Let the AI do the heavy lifting.
            </p>
            
            <div className="hidden lg:flex items-center gap-6 py-8 grayscale opacity-50">
              <div className="flex flex-col items-center"><Disc className="w-12 h-12" /> <span className="text-[10px] font-bold mt-1 uppercase">Lo-Fi</span></div>
              <div className="flex flex-col items-center"><Disc className="w-12 h-12" /> <span className="text-[10px] font-bold mt-1 uppercase">Hyperpop</span></div>
              <div className="flex flex-col items-center"><Disc className="w-12 h-12" /> <span className="text-[10px] font-bold mt-1 uppercase">Grunge</span></div>
              <div className="flex flex-col items-center"><Disc className="w-12 h-12" /> <span className="text-[10px] font-bold mt-1 uppercase">Techno</span></div>
            </div>
          </div>

          <GlassCard className="bg-white/90">
            <VibeSelector
              selectedMood={selectedMood}
              onMoodSelect={setSelectedMood}
              selectedActivity={selectedActivity}
              onActivitySelect={setSelectedActivity}
              onGenerate={handleGenerate}
              loading={loading}
            />
          </GlassCard>
        </div>
      ) : (
        <PlaylistDisplay 
          playlist={generatedPlaylist} 
          onBack={() => setGeneratedPlaylist(null)}
          isConnected={!!user}
        />
      )}
    </div>
  );

  const renderDiscover = () => (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div className="space-y-2">
          <h2 className="text-5xl font-syne font-extrabold uppercase tracking-tighter">Discovery <span className="text-pink-500">Feed</span></h2>
          <p className="text-slate-500 font-medium">Trending vibes from across the community.</p>
        </div>
        <div className="flex gap-2 bg-white p-2 rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <input 
            type="text" 
            placeholder="Search moods..." 
            className="px-4 py-2 outline-none font-bold"
          />
          <button className="bg-black text-white p-3 rounded-xl hover:bg-slate-800 transition-colors">
            <Search size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MOCK_TRENDING_PLAYLISTS.map((playlist) => (
          <GlassCard key={playlist.id} className="group hover:-translate-y-2 transition-transform duration-300">
            <div className="relative aspect-square mb-6 overflow-hidden rounded-2xl border-2 border-black">
              <img src={playlist.img} className="w-full h-full object-cover" alt={playlist.name} />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                <button className="bg-white text-black p-5 rounded-full shadow-2xl scale-75 group-hover:scale-100 transition-transform">
                  <Sparkles size={32} />
                </button>
              </div>
              <div className="absolute top-4 left-4">
                <CDIcon size="w-10 h-10" />
              </div>
            </div>
            <h3 className="text-2xl font-syne font-bold uppercase mb-1">{playlist.name}</h3>
            <p className="text-slate-500 font-medium mb-4">{playlist.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold px-3 py-1 bg-slate-100 rounded-full uppercase">{playlist.tracksCount} TRACKS</span>
              <button className="flex items-center gap-1 font-bold hover:text-pink-500 transition-colors">
                <Heart size={18} /> SAVE
              </button>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );

  const renderLibrary = () => (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {user ? (
        <div className="space-y-12">
          <div className="flex items-center gap-6">
            <img src={user.images[0].url} className="w-24 h-24 rounded-full border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]" alt="User Profile" />
            <div className="space-y-1">
              <h2 className="text-4xl font-syne font-extrabold uppercase leading-none">{user.display_name}'S VAULT</h2>
              <p className="text-slate-500 font-medium">Synchronized with Spotify • {user.id}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Added onClick to GlassCard to enable tab switching */}
            <GlassCard className="border-dashed border-slate-300 flex flex-col items-center justify-center py-12 gap-4 text-slate-400 group cursor-pointer hover:border-black hover:text-black transition-colors" onClick={() => setActiveTab('home')}>
              <Plus size={48} />
              <span className="font-bold uppercase tracking-widest">Generate New Vibe</span>
            </GlassCard>
            
            <GlassCard className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex justify-between items-start mb-4">
                <CDIcon size="w-12 h-12" />
                <span className="text-xs font-bold px-2 py-1 bg-green-100 text-green-700 rounded border border-green-200 uppercase">Synced</span>
              </div>
              <h3 className="text-xl font-bold uppercase mb-2">Morning Focus Grind</h3>
              <p className="text-slate-500 text-sm mb-4">Generated 2 days ago</p>
              <button className="text-sm font-bold flex items-center gap-1 hover:text-[#1DB954]">
                <ExternalLink size={14} /> View on Spotify
              </button>
            </GlassCard>
          </div>
        </div>
      ) : (
        <div className="max-w-md mx-auto py-24 text-center space-y-8">
          <div className="relative inline-block">
            <LayoutGrid size={80} className="mx-auto text-slate-200" />
            <div className="absolute inset-0 flex items-center justify-center">
              <LogOut size={32} className="text-slate-400 rotate-12" />
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-4xl font-syne font-bold uppercase tracking-tighter">Your Vault is Locked</h2>
            <p className="text-slate-500 font-medium leading-relaxed">
              Connect your Spotify account to save vibes, sync playlists, and unlock your personal music vault.
            </p>
          </div>
          <button 
            onClick={handleConnectSpotify}
            className="w-full py-5 bg-[#1DB954] text-white rounded-3xl font-syne font-extrabold text-xl tracking-tighter border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all flex items-center justify-center gap-3"
          >
            <Music size={24} /> CONNECT SPOTIFY
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen pb-24">
      {/* Header/Nav */}
      <header className="sticky top-0 z-50 glass-morphism border-b-2 border-black px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => { setActiveTab('home'); setGeneratedPlaylist(null); }}
          >
            <div className="bg-black p-2 rounded-xl group-hover:rotate-12 transition-transform">
              <Music className="text-white" />
            </div>
            <span className="text-2xl font-syne font-extrabold tracking-tighter uppercase italic">
              VIBE<span className="text-pink-500">MATCH</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 font-bold text-sm tracking-widest uppercase">
            <button 
              onClick={() => setActiveTab('home')}
              className={`${activeTab === 'home' ? 'text-black border-b-2 border-black' : 'text-slate-400'} hover:text-black transition-all pb-1`}
            >
              Generator
            </button>
            <button 
              onClick={() => setActiveTab('discover')}
              className={`${activeTab === 'discover' ? 'text-black border-b-2 border-black' : 'text-slate-400'} hover:text-black transition-all pb-1`}
            >
              Discover
            </button>
            <button 
              onClick={() => setActiveTab('library')}
              className={`${activeTab === 'library' ? 'text-black border-b-2 border-black' : 'text-slate-400'} hover:text-black transition-all pb-1`}
            >
              Library
            </button>
          </nav>

          {user ? (
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Connected</span>
                <span className="font-bold text-sm leading-none">{user.display_name}</span>
              </div>
              <div className="relative group">
                <img 
                  src={user.images[0].url} 
                  className="w-10 h-10 rounded-full border-2 border-black cursor-pointer hover:rotate-6 transition-transform" 
                  alt="Profile"
                />
                <div className="absolute top-full right-0 mt-2 w-48 bg-white border-2 border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all p-2 z-50">
                   <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 p-3 text-red-500 hover:bg-red-50 rounded-xl font-bold transition-colors"
                   >
                     <LogOut size={16} /> Disconnect
                   </button>
                </div>
              </div>
            </div>
          ) : (
            <button 
              onClick={handleConnectSpotify}
              disabled={isConnecting}
              className="flex items-center gap-2 bg-[#1DB954] text-white px-5 py-2.5 rounded-2xl font-bold hover:brightness-110 transition-all border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none translate-y-0 active:translate-y-1"
            >
              {isConnecting ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <>
                  <User size={18} />
                  <span className="hidden sm:inline uppercase text-xs tracking-tighter">Connect Spotify</span>
                </>
              )}
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main>
        {activeTab === 'home' && renderHome()}
        {activeTab === 'discover' && renderDiscover()}
        {activeTab === 'library' && renderLibrary()}
      </main>

      {/* Floating Mobile Nav */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 md:hidden z-50">
        <div className="glass-morphism rounded-3xl p-2 border-2 border-black shadow-2xl flex items-center gap-2">
          <button 
            onClick={() => setActiveTab('home')}
            className={`p-4 rounded-2xl ${activeTab === 'home' ? 'bg-black text-white' : 'text-slate-400'}`}
          >
            <Sparkles size={24} />
          </button>
          <button 
            onClick={() => setActiveTab('discover')}
            className={`p-4 rounded-2xl ${activeTab === 'discover' ? 'bg-black text-white' : 'text-slate-400'}`}
          >
            <LayoutGrid size={24} />
          </button>
          <button 
            onClick={() => setActiveTab('library')}
            className={`p-4 rounded-2xl ${activeTab === 'library' ? 'bg-black text-white' : 'text-slate-400'}`}
          >
            <Heart size={24} />
          </button>
        </div>
      </div>

      {/* Background Decor */}
      <div className="fixed -bottom-24 -left-24 w-96 h-96 bg-blue-400/10 blur-[100px] pointer-events-none rounded-full"></div>
      <div className="fixed -top-24 -right-24 w-96 h-96 bg-pink-400/10 blur-[100px] pointer-events-none rounded-full"></div>
    </div>
  );
};

export default App;