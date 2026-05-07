import { useState, useEffect, useCallback } from 'react';
import { useCommunityUnlock } from '../CommunityUnlockContext';
import { Users, ArrowUp, ArrowDown, RotateCcw } from 'lucide-react';

export const UnlockManager = () => {
  const { state, simulateMemberCount, celebrateMilestone } = useCommunityUnlock();
  const [showDevTools, setShowDevTools] = useState(false);
  const [inputCount, setInputCount] = useState(state.currentMemberCount.toString());

  useEffect(() => {
    setInputCount(state.currentMemberCount.toString());
  }, [state.currentMemberCount]);

  const handleSetCount = useCallback(() => {
    const count = parseInt(inputCount, 10);
    if (!isNaN(count) && count >= 0) {
      simulateMemberCount(count);
    }
  }, [inputCount, simulateMemberCount]);

  const handleIncrement = useCallback(() => {
    const next = state.currentMemberCount + 10;
    simulateMemberCount(next);
  }, [state.currentMemberCount, simulateMemberCount]);

  const handleDecrement = useCallback(() => {
    const next = Math.max(0, state.currentMemberCount - 10);
    simulateMemberCount(next);
  }, [state.currentMemberCount, simulateMemberCount]);

  const handleReset = useCallback(() => {
    simulateMemberCount(0);
    celebrateMilestone(0); // Reset celebrations
  }, [simulateMemberCount, celebrateMilestone]);

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Current status */}
      <div 
        className="p-4 rounded-lg mb-3"
        style={{ 
          background: 'rgba(8, 16, 16, 0.8)', 
          border: '1px solid rgba(212, 168, 83, 0.15)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" style={{ color: '#D4A853' }} />
            <span className="font-inter text-[10px] uppercase tracking-[0.2em]" style={{ color: '#6A5A4A' }}>
              Unlock Manager
            </span>
          </div>
          <span className="font-oswald text-lg" style={{ color: '#D4A853' }}>
            {state.currentMemberCount.toLocaleString()}
          </span>
        </div>

        {/* Quick actions */}
        <div className="flex gap-2">
          <button
            onClick={handleIncrement}
            className="flex-1 py-2 px-3 rounded font-inter text-[10px] uppercase tracking-wider transition-all hover:brightness-110 flex items-center justify-center gap-1"
            style={{ background: 'rgba(212, 168, 83, 0.15)', color: '#D4A853' }}
          >
            <ArrowUp className="w-3 h-3" />
            +10
          </button>
          <button
            onClick={handleDecrement}
            className="flex-1 py-2 px-3 rounded font-inter text-[10px] uppercase tracking-wider transition-all hover:brightness-110 flex items-center justify-center gap-1"
            style={{ background: 'rgba(42, 26, 10, 0.5)', color: '#4A3A2A' }}
          >
            <ArrowDown className="w-3 h-3" />
            -10
          </button>
          <button
            onClick={() => setShowDevTools(!showDevTools)}
            className="py-2 px-3 rounded font-inter text-[10px] uppercase tracking-wider transition-all hover:brightness-110"
            style={{ background: 'rgba(42, 26, 10, 0.5)', color: '#4A3A2A' }}
          >
            {showDevTools ? 'Hide' : 'Dev'}
          </button>
        </div>
      </div>

      {/* Dev tools */}
      {showDevTools && (
        <div 
          className="p-4 rounded-lg space-y-3"
          style={{ 
            background: 'rgba(8, 16, 16, 0.8)', 
            border: '1px solid rgba(232, 106, 51, 0.2)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <p className="font-inter text-[9px] uppercase tracking-wider" style={{ color: '#E86A33' }}>
            Developer Controls
          </p>
          
          <div className="flex gap-2">
            <input
              type="number"
              value={inputCount}
              onChange={(e) => setInputCount(e.target.value)}
              className="flex-1 py-2 px-3 rounded font-inter text-xs"
              style={{ 
                background: 'rgba(42, 26, 10, 0.5)', 
                color: '#D4A853',
                border: '1px solid rgba(42, 26, 10, 0.8)',
              }}
              placeholder="Member count"
            />
            <button
              onClick={handleSetCount}
              className="py-2 px-4 rounded font-inter text-[10px] uppercase tracking-wider transition-all hover:brightness-110"
              style={{ background: '#E86A33', color: 'white' }}
            >
              Set
            </button>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => simulateMemberCount(100)}
              className="flex-1 py-2 px-3 rounded font-inter text-[9px] uppercase tracking-wider transition-all hover:brightness-110"
              style={{ background: 'rgba(212, 168, 83, 0.1)', color: '#D4A853' }}
            >
              100 (Love)
            </button>
            <button
              onClick={() => simulateMemberCount(500)}
              className="flex-1 py-2 px-3 rounded font-inter text-[9px] uppercase tracking-wider transition-all hover:brightness-110"
              style={{ background: 'rgba(212, 168, 83, 0.1)', color: '#D4A853' }}
            >
              500 (Faith)
            </button>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => simulateMemberCount(1000)}
              className="flex-1 py-2 px-3 rounded font-inter text-[9px] uppercase tracking-wider transition-all hover:brightness-110"
              style={{ background: 'rgba(212, 168, 83, 0.1)', color: '#D4A853' }}
            >
              1K (Pain)
            </button>
            <button
              onClick={() => simulateMemberCount(5000)}
              className="flex-1 py-2 px-3 rounded font-inter text-[9px] uppercase tracking-wider transition-all hover:brightness-110"
              style={{ background: 'rgba(212, 168, 83, 0.1)', color: '#D4A853' }}
            >
              5K (Full)
            </button>
          </div>

          <button
            onClick={handleReset}
            className="w-full py-2 px-3 rounded font-inter text-[9px] uppercase tracking-wider transition-all hover:brightness-110 flex items-center justify-center gap-2"
            style={{ background: 'rgba(232, 106, 51, 0.1)', color: '#E86A33' }}
          >
            <RotateCcw className="w-3 h-3" />
            Reset All Progress
          </button>
        </div>
      )}
    </div>
  );
};

export default UnlockManager;
