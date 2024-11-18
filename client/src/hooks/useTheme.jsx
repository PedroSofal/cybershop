import { useEffect, useState } from 'react';

function useTheme() {
  const [ theme, setTheme ] = useState(null);
  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(() => {
    const lastChoice = localStorage.getItem('theme');
    const isLightPreferred = window.matchMedia('(prefers-color-scheme: light)');

    if (lastChoice) {
      setTheme(lastChoice);
    } else if (isLightPreferred) {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    if (theme) {
      document.documentElement.className = `${theme}-theme`;
      localStorage.setItem('theme', theme);

      const timeoutId = setTimeout(() => {
        setIsLoading(false);
      }, 500);
  
      return () => clearTimeout(timeoutId);
    }
  }, [theme]);

  function toggleLightDark() {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }

  return { isLoading, toggleLightDark }
}

export default useTheme;