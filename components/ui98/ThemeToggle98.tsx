'use client';
import { useState, useEffect } from 'react';
import Button98 from './Button98';

type Theme = 'retro98' | 'dark';

export default function ThemeToggle98() {
  const [theme, setTheme] = useState<Theme>('retro98');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'retro98' ? 'dark' : 'retro98';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <Button98 onClick={toggleTheme} style={{ fontSize: '10px', padding: '2px 6px' }}>
      {theme === 'retro98' ? '🌙 Dark' : '☀️ Retro 98'}
    </Button98>
  );
}
