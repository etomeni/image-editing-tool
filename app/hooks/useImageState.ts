import { useState, useEffect } from 'react';

export const useImageState = (initialState: any, key: string) => {
  const [state, setState] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedState = window.localStorage.getItem(key);
      return savedState ? JSON.parse(savedState) : initialState;
    }
    return initialState;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(key, JSON.stringify(state));
    }
  }, [state]);

  return [state, setState];
};
