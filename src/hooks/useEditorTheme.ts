import { useEffect } from 'react';
import { useEditor } from '../context/EditorContext';
import { EditorTheme } from '../types';

export const useEditorTheme = () => {
  const { theme, setTheme } = useEditor();

  const toggleTheme = () => {
    setTheme({
      ...theme,
      mode: theme.mode === 'light' ? 'dark' : 'light'
    });
  };

  const setLightMode = () => {
    setTheme({ ...theme, mode: 'light' });
  };

  const setDarkMode = () => {
    setTheme({ ...theme, mode: 'dark' });
  };

  const setCustomTheme = (customTheme: EditorTheme) => {
    setTheme(customTheme);
  };

  // Sync with system preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(prev => ({
        ...prev,
        mode: e.matches ? 'dark' : 'light'
      }));
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [setTheme]);

  return {
    theme,
    toggleTheme,
    setLightMode,
    setDarkMode,
    setCustomTheme
  };
};

