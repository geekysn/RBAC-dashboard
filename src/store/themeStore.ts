import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark' | 'system';

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'system', // Default to system
      setTheme: (newTheme) => {
        console.log('Setting theme to:', newTheme); // Add explicit logging
        
        const root = window.document.documentElement;
        
        // Explicitly handle theme application
        if (newTheme === 'system') {
          const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
          root.classList.toggle('dark', systemTheme === 'dark');
        } else {
          root.classList.toggle('dark', newTheme === 'dark');
        }
        
        set({ theme: newTheme });
      },
    }),
    {
      name: 'theme-storage',
      // Optional: Add migration strategy if needed
      migrate: (persistedState: any) => {
        // Ensure theme is valid
        if (!['light', 'dark', 'system'].includes(persistedState?.state?.theme)) {
          return { theme: 'system' };
        }
        return persistedState;
      },
    }
  )
);