import { useEffect, useState } from 'react';

function useTheme() {
  const [ theme, setTheme ] = useState(null);

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
    }
  }, [theme]);

  function toggleLightDark() {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }

  return { toggleLightDark }
}

export default useTheme;