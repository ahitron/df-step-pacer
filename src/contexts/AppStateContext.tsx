import React, { createContext, useContext, useState } from 'react';
import { loadState, saveState } from '../lib/storage';
import type { AppState } from '../lib/storage';

interface AppStateContextType {
  state: AppState;
  update: (partial: Partial<AppState>) => void;
}

const AppStateContext = createContext<AppStateContextType | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export function useAppState(): AppStateContextType {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error('useAppState must be used within AppStateProvider');
  return ctx;
}

export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(loadState);

  const update = (partial: Partial<AppState>) => {
    setState(prev => {
      const next = { ...prev, ...partial };
      saveState(next);
      return next;
    });
  };

  return (
    <AppStateContext.Provider value={{ state, update }}>
      {children}
    </AppStateContext.Provider>
  );
};
