import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

export interface WorldProgress {
  discoveredObjects: Set<string>;
  isUnlocked: boolean;
  currentAudio: string | null;
}

interface WorldContextType {
  progress: WorldProgress;
  discoverObject: (id: string) => void;
  unlock: () => void;
  setCurrentAudio: (id: string | null) => void;
  hasDiscovered: (id: string) => boolean;
}

const WorldContext = createContext<WorldContextType | null>(null);

const getInitialProgress = (): WorldProgress => {
  if (typeof window === 'undefined') {
    return {
      discoveredObjects: new Set<string>(),
      isUnlocked: false,
      currentAudio: null,
    };
  }
  
  try {
    const saved = localStorage.getItem('elisonworld-progress');
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...parsed,
        discoveredObjects: new Set(parsed.discoveredObjects),
      };
    }
  } catch {
    // ignore localStorage errors
  }
  
  return {
    discoveredObjects: new Set<string>(),
    isUnlocked: false,
    currentAudio: null,
  };
};

export const WorldProvider = ({ children }: { children: ReactNode }) => {
  const [progress, setProgress] = useState<WorldProgress>(getInitialProgress);

  const persist = useCallback((next: WorldProgress) => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem('elisonworld-progress', JSON.stringify({
        ...next,
        discoveredObjects: Array.from(next.discoveredObjects),
      }));
    } catch {
      // ignore localStorage errors
    }
  }, []);

  const discoverObject = useCallback((id: string) => {
    setProgress(prev => {
      const next = {
        ...prev,
        discoveredObjects: new Set([...prev.discoveredObjects, id]),
      };
      persist(next);
      return next;
    });
  }, [persist]);

  const unlock = useCallback(() => {
    setProgress(prev => {
      const next = { ...prev, isUnlocked: true };
      persist(next);
      return next;
    });
  }, [persist]);

  const setCurrentAudio = useCallback((id: string | null) => {
    setProgress(prev => ({ ...prev, currentAudio: id }));
  }, []);

  const hasDiscovered = useCallback((id: string) => {
    return progress.discoveredObjects.has(id);
  }, [progress.discoveredObjects]);

  return (
    <WorldContext.Provider value={{
      progress,
      discoverObject,
      unlock,
      setCurrentAudio,
      hasDiscovered,
    }}>
      {children}
    </WorldContext.Provider>
  );
};

export const useWorld = () => {
  const ctx = useContext(WorldContext);
  if (!ctx) throw new Error('useWorld must be used within WorldProvider');
  return ctx;
};