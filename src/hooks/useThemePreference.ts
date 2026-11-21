import { useEffect, useState } from 'react';
import { themes, type ThemeName } from '../styles/theme';

export type ThemePreference = ThemeName | 'system';
const storageKey = 'quiet-leaf.theme';
const darkQuery = '(prefers-color-scheme: dark)';

export function isThemePreference(value: string | null): value is ThemePreference {
  return value === 'system' || value === 'light' || value === 'dark' || value === 'amber';
}

function readPreference(): ThemePreference {
  try {
    const saved = window.localStorage.getItem(storageKey);
    return isThemePreference(saved) ? saved : 'system';
  } catch {
    return 'system';
  }
}

export function useThemePreference() {
  const [preference, setPreference] = useState<ThemePreference>(readPreference);
  const [systemDark, setSystemDark] = useState(() => window.matchMedia(darkQuery).matches);
  const name: ThemeName = preference === 'system' ? (systemDark ? 'dark' : 'light') : preference;

  useEffect(() => {
    const media = window.matchMedia(darkQuery);
    const sync = () => setSystemDark(media.matches);
    media.addEventListener('change', sync);
    sync();
    return () => media.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = name;
  }, [name]);

  useEffect(() => {
    try {
      if (preference === 'system') window.localStorage.removeItem(storageKey);
      else window.localStorage.setItem(storageKey, preference);
    } catch {
      // Если хранилище недоступно, выбор всё равно действует в этой вкладке.
    }
  }, [preference]);

  return { preference, setPreference, theme: themes[name] };
}
