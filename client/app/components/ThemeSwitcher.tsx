'use client'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react';
import { BiMoon, BiSun } from 'react-icons/bi';

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);


  if (!mounted) {
    return null; // Prevents hydration mismatch
  }

  return (
    <div className="flex items-center justify-center mx-4">
      {theme === 'Light' ? (
        <BiMoon
          className="cursor-pointer"
          fill='black'
          size={25}
          onClick={() => setTheme('dark')}
        />
      ) : (
        <BiSun
          className="cursor-pointer text-white"
          size={25}
          onClick={() => setTheme('Light')}
        />
      )}
    </div>
  );
};
