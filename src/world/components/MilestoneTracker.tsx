import { useState, useEffect, useCallback } from 'react';
import { useCommunityUnlock, type Milestone } from '../CommunityUnlockContext';
import { Users, Lock, Unlock, Sparkles, ChevronUp } from 'lucide-react';

interface MilestoneCelebrationProps {
  milestone: Milestone;
  onComplete: () => void;
}

const MilestoneCelebration = ({ milestone, onComplete }: MilestoneCelebrationProps) => {
  const [phase, setPhase] = useState<'pulse' | 'reveal' | 'complete'>('pulse');

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase('reveal'), 1500),
      setTimeout(() => setPhase('complete'), 3500),
      setTimeout(() => onComplete(), 5500),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(5, 5, 5, 0.95)', backdropFilter: 'blur(20px)' }}>
      <div className="max-w-md w-full text-center space-y-8">
        {/* Molecule pulse animation */}
        <div className="relative w-48 h-48 mx-auto">
          {/* Outer ring */}
          <div 
            className={`absolute inset-0 rounded-full border-2 transition-all duration-1000 ${
              phase === 'pulse' ? 'scale-100 opacity-100' : 'scale-150 opacity-0'
            }`}
            style={{ borderColor: '#D4A853' }}
          />
          {/* Middle ring */}
          <div 
            className={`absolute inset-4 rounded-full border-2 transition-all duration-1000 delay-150 ${
              phase === 'pulse' ? 'scale-100 opacity-100' : 'scale-125 opacity-0'
            }`}
            style={{ borderColor: '#E86A33' }}
          />
          {/* Inner ring */}
          <div 
            className={`absolute inset-8 rounded-full border-2 transition-all duration-1000 delay-300 ${
              phase === 'pulse' ? 'scale-100 opacity-100' : 'scale-110 opacity-0'
            }`}
            style={{ borderColor: '#1EBC9B' }}
          />
          
          {/* Center glow */}
          <div 
            className={`absolute inset-12 rounded-full transition-all duration-1000 ${
              phase === 'pulse' ? 'opacity-30 scale-50' : 'opacity-100 scale-100'
            }`}
            style={{ background: 'radial-gradient(circle, #D4A853 0%, transparent 70%)' }}
          />

          {/* Room icon reveal */}
          {phase !== 'pulse' && (
            <div className="absolute inset-0 flex items-center justify-center animate-in fade-in zoom-in duration-1000">
              <Unlock className="w-16 h-16" style={{ color: '#D4A853' }} />
            </div>
          )}
        </div>

        {/* Text content */}
        <div className="space-y-4">
          {phase === 'pulse' && (
            <p className="font-oswald text-xl tracking-[0.1em] animate-pulse" style={{ color: '#D4A853' }}>
              The Molecule Responds...
            </p>
          )}
          {phase === 'reveal' && (
            <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <p className="font-inter text-xs uppercase tracking-[0.2em]" style={{ color: '#6A5A4A' }}>
                Milestone Reached
              </p>
              <h2 className="font-oswald text-3xl tracking-[0.1em]" style={{ color: '#D4A853' }}>
                {milestone.memberCount.toLocaleString()} Members
              </h2>
            </div>
          )}
          {phase === 'complete' && (
            <div className="space-y-3 animate-in fade-in duration-700">
              <div className="flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5" style={{ color: '#E86A33' }} />
                <h3 className="font-oswald text-2xl tracking-[0.1em]" style={{ color: '#E86A33' }}>
                  {milestone.roomName} Unlocked
                </h3>
                <Sparkles className="w-5 h-5" style={{ color: '#E86A33' }} />
              </div>
              <p className="font-inter text-sm" style={{ color: '#8A7A6A' }}>
                A new room opens in the molecule.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const MilestoneTracker = () => {
  const { state, getNextMilestone, getUnlockProgress, celebrateMilestone, hasCelebrated } = useCommunityUnlock();
  const [showCelebration, setShowCelebration] = useState<Milestone | null>(null);

  // Auto-trigger celebration for newly unlocked milestones
  useEffect(() => {
    const newlyUnlocked = state.milestones.find(
      m => m.isUnlocked && !hasCelebrated(m.memberCount)
    );
    if (newlyUnlocked && !showCelebration) {
      setShowCelebration(newlyUnlocked);
    }
  }, [state.milestones, hasCelebrated, showCelebration]);

  const handleCelebrationComplete = useCallback(() => {
    if (showCelebration) {
      celebrateMilestone(showCelebration.memberCount);
      setShowCelebration(null);
    }
  }, [showCelebration, celebrateMilestone]);

  const nextMilestone = getNextMilestone();
  const progress = getUnlockProgress();
  const unlockedCount = state.milestones.filter(m => m.isUnlocked).length;

  return (
    <>
      {/* Milestone celebration overlay */}
      {showCelebration && (
        <MilestoneCelebration 
          milestone={showCelebration} 
          onComplete={handleCelebrationComplete}
        />
      )}

      {/* Tracker panel */}
      <div 
        className="w-full max-w-sm mx-auto p-4 rounded-lg"
        style={{ 
          background: 'rgba(8, 16, 16, 0.8)', 
          border: '1px solid rgba(212, 168, 83, 0.15)',
          backdropFilter: 'blur(10px)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" style={{ color: '#D4A853' }} />
            <span className="font-inter text-[10px] uppercase tracking-[0.2em]" style={{ color: '#6A5A4A' }}>
              Community
            </span>
          </div>
          <span className="font-oswald text-sm" style={{ color: '#D4A853' }}>
            {state.currentMemberCount.toLocaleString()}
          </span>
        </div>

        {/* Progress bar */}
        {nextMilestone && (
          <div className="mb-4">
            <div className="flex justify-between mb-1">
              <span className="font-inter text-[9px] uppercase tracking-wider" style={{ color: '#4A3A2A' }}>
                Next: {nextMilestone.roomName}
              </span>
              <span className="font-inter text-[9px]" style={{ color: '#4A3A2A' }}>
                {nextMilestone.memberCount.toLocaleString()}
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: '#1A0A0A' }}>
              <div 
                className="h-full rounded-full transition-all duration-1000"
                style={{ 
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #D4A853, #E86A33)',
                }}
              />
            </div>
          </div>
        )}

        {/* Milestone list */}
        <div className="space-y-2">
          {state.milestones.map((milestone) => (
            <div 
              key={milestone.memberCount}
              className="flex items-center gap-3 p-2 rounded transition-all duration-500"
              style={{
                background: milestone.isUnlocked ? 'rgba(212, 168, 83, 0.05)' : 'transparent',
                borderLeft: `2px solid ${milestone.isUnlocked ? '#D4A853' : '#2A1A0A'}`,
              }}
            >
              <div 
                className="w-6 h-6 rounded-full flex items-center justify-center"
                style={{
                  background: milestone.isUnlocked ? 'rgba(212, 168, 83, 0.2)' : 'rgba(42, 26, 10, 0.5)',
                }}
              >
                {milestone.isUnlocked ? (
                  <Unlock className="w-3 h-3" style={{ color: '#D4A853' }} />
                ) : (
                  <Lock className="w-3 h-3" style={{ color: '#4A3A2A' }} />
                )}
              </div>
              <div className="flex-1">
                <p 
                  className="font-inter text-[10px] uppercase tracking-wider"
                  style={{ color: milestone.isUnlocked ? '#D4A853' : '#4A3A2A' }}
                >
                  {milestone.roomName}
                </p>
                <p className="font-inter text-[9px]" style={{ color: '#3A2A1A' }}>
                  {milestone.isUnlocked ? 'Unlocked' : `Unlock at ${milestone.memberCount.toLocaleString()} members`}
                </p>
              </div>
              {milestone.isUnlocked && (
                <ChevronUp className="w-3 h-3" style={{ color: '#D4A853' }} />
              )}
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-3 pt-3 border-t" style={{ borderColor: 'rgba(42, 26, 10, 0.5)' }}>
          <p className="font-inter text-[9px] text-center" style={{ color: '#3A2A1A' }}>
            {unlockedCount} of {state.milestones.length} rooms unlocked
          </p>
        </div>
      </div>
    </>
  );
};

export default MilestoneTracker;
