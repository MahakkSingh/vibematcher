
export interface SpotifyUser {
  display_name: string;
  images: { url: string }[];
  id: string;
}

const STORAGE_KEY = 'vibematch_spotify_session';

export const spotifyService = {
  login: async (): Promise<SpotifyUser> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockUser: SpotifyUser = {
      display_name: 'VibeMaster_99',
      id: 'user_123456',
      images: [{ url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix' }]
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockUser));
    return mockUser;
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEY);
  },

  getSession: (): SpotifyUser | null => {
    const session = localStorage.getItem(STORAGE_KEY);
    return session ? JSON.parse(session) : null;
  },

  syncPlaylist: async (playlistId: string): Promise<boolean> => {
    // Simulate playlist export to Spotify
    await new Promise(resolve => setTimeout(resolve, 2000));
    return true;
  }
};
