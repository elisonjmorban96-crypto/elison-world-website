import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';

export interface Milestone {
  memberCount: number;
  roomId: string;
  roomName: string;
  isUnlocked: boolean;
  unlockedAt: string | null;
}

export interface CommunityUnlockState {
  currentMemberCount: number;
  milestones: Milestone[];
  lastCelebratedMilestone: number | null;
}

interface CommunityUnlockContextType {
  state: CommunityUnlockState;
  isMilestoneUnlocked: (memberCount: number) => boolean;
  getNextMilestone: () => Milestone | null;
  getUnlockProgress: () => number;
  simulateMemberCount: (count: number) => void;
  celebrateMilestone: (memberCount: number) => void;
  hasCelebrated: (memberCount: number) => boolean;
}

const MILESTONES: Milestone[] = [
  { memberCount: 100, roomId: 'love', roomName: 'Love', isUnlocked: false, unlockedAt: null },
  { memberCount: 500, roomId: 'faith', roomName: 'Faith', isUnlocked: false, unlockedAt: null },
  { memberCount: 1000, roomId: 'pain', roomName: 'Pain', isUnlocked: false, unlockedAt: null },
  { memberCount: 5000, roomId: 'full-molecule', roomName: 'Full Molecule', isUnlocked: false, unlockedAt: null },
];

const STORAGE_KEY = 'elisonworld-community-unlocks';

const getInitialState = (): CommunityUnlockState => {
  if (typeof window === 'undefined') {
    return {
      currentMemberCount: 0,
      milestones: MILESTONES.map(m => ({ ...m })),
      lastCelebratedMilestone: null,
    };
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        currentMemberCount: parsed.currentMemberCount || 0,
        milestones: parsed.milestones || MILESTONES.map(m => ({ ...m })),
        lastCelebratedMilestone: parsed.lastCelebratedMilestone || null,
      };
    }
  } catch {
    // ignore localStorage errors
  }

  return {
    currentMemberCount: 0,
    milestones: MILESTONES.map(m => ({ ...m })),
    lastCelebratedMilestone: null,
  };
};

const CommunityUnlockContext = createContext<CommunityUnlockContextType | null>(null);

export const CommunityUnlockProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<CommunityUnlockState>(getInitialState);

  const persist = useCallback((next: CommunityUnlockState) => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore localStorage errors
    }
  }, []);

  // Check and auto-unlock milestones when member count changes
  useEffect(() => {
    setState(prev => {
      const updatedMilestones = prev.milestones.map(m => {
        if (!m.isUnlocked && prev.currentMemberCount >= m.memberCount) {
          return {
            ...m,
            isUnlocked: true,
            unlockedAt: new Date().toISOString(),
          };
        }
        return m;
      });

      const next = {
        ...prev,
        milestones: updatedMilestones,
      };

      // Only persist if something changed
      const hasChanges = updatedMilestones.some((m, i) => m.isUnlocked !== prev.milestones[i].isUnlocked);
      if (hasChanges) {
        persist(next);
      }

      return next;
    });
  }, [state.currentMemberCount, persist]);

  const isMilestoneUnlocked = useCallback((memberCount: number): boolean => {
    const milestone = state.milestones.find(m => m.memberCount === memberCount);
    return milestone?.isUnlocked ?? false;
  }, [state.milestones]);

  const getNextMilestone = useCallback((): Milestone | null => {
    return state.milestones.find(m => !m.isUnlocked) || null;
  }, [state.milestones]);

  const getUnlockProgress = useCallback((): number => {
    const next = getNextMilestone();
    if (!next) return 100;
    const prevMilestone = state.milestones
      .filter(m => m.isUnlocked)
      .sort((a, b) => b.memberCount - a.memberCount)[0];
    const prevCount = prevMilestone?.memberCount ?? 0;
    const range = next.memberCount - prevCount;
    const progress = state.currentMemberCount - prevCount;
    return Math.min(100, Math.max(0, (progress / range) * 100));
  }, [state.milestones, state.currentMemberCount, getNextMilestone]);

  const simulateMemberCount = useCallback((count: number) => {
    setState(prev => {
      const next = { ...prev, currentMemberCount: count };
      persist(next);
      return next;
    });
  }, [persist]);

  const celebrateMilestone = useCallback((memberCount: number) => {
    setState(prev => {
      const next = { ...prev, lastCelebratedMilestone: memberCount };
      persist(next);
      return next;
    });
  }, [persist]);

  const hasCelebrated = useCallback((memberCount: number): boolean => {
    return state.lastCelebratedMilestone === memberCount;
  }, [state.lastCelebratedMilestone]);

  return (
    <CommunityUnlockContext.Provider value={{
      state,
      isMilestoneUnlocked,
      getNextMilestone,
      getUnlockProgress,
      simulateMemberCount,
      celebrateMilestone,
      hasCelebrated,
    }}>
      {children}
    </CommunityUnlockContext.Provider>
  );
};

export const useCommunityUnlock = () => {
  const ctx = useContext(CommunityUnlockContext);
  if (!ctx) throw new Error('useCommunityUnlock must be used within CommunityUnlockProvider');
  return ctx;
};
