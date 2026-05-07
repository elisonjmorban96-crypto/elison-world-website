import { useState } from 'react';
import { useCommunityUnlock } from '../CommunityUnlockContext';
import { Lock, Unlock, Users, ArrowRight } from 'lucide-react';

interface RoomLockCardProps {
  roomId: string;
  roomName: string;
  description: string;
  requiredMembers: number;
  isUnlocked: boolean;
  onEnter: () => void;
}

const RoomLockCard = ({ 
  roomId: _roomId, 
  roomName, 
  description, 
  requiredMembers, 
  isUnlocked, 
  onEnter 
}: RoomLockCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative p-4 rounded-lg transition-all duration-700"
      style={{
        background: isUnlocked 
          ? 'rgba(8, 16, 16, 0.9)' 
          : 'rgba(8, 16, 16, 0.4)',
        border: `1px solid ${isUnlocked ? 'rgba(212, 168, 83, 0.3)' : 'rgba(42, 26, 10, 0.5)'}`,
        backdropFilter: 'blur(10px)',
        transform: isHovered && isUnlocked ? 'translateY(-4px)' : 'translateY(0)',
        cursor: isUnlocked ? 'pointer' : 'default',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={isUnlocked ? onEnter : undefined}
    >
      {/* Lock overlay for locked rooms */}
      {!isUnlocked && (
        <div 
          className="absolute inset-0 rounded-lg flex flex-col items-center justify-center gap-2"
          style={{ 
            background: 'rgba(5, 5, 5, 0.7)',
            backdropFilter: 'blur(2px)',
          }}
        >
          <Lock className="w-6 h-6" style={{ color: '#4A3A2A' }} />
          <p className="font-inter text-[10px] uppercase tracking-wider" style={{ color: '#4A3A2A' }}>
            Unlock at {requiredMembers.toLocaleString()} members
          </p>
        </div>
      )}

      {/* Room content */}
      <div className="flex items-start gap-3">
        <div 
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
          style={{
            background: isUnlocked 
              ? 'rgba(212, 168, 83, 0.15)' 
              : 'rgba(42, 26, 10, 0.3)',
          }}
        >
          {isUnlocked ? (
            <Unlock className="w-5 h-5" style={{ color: '#D4A853' }} />
          ) : (
            <Users className="w-5 h-5" style={{ color: '#4A3A2A' }} />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 
              className="font-oswald text-sm tracking-wider"
              style={{ color: isUnlocked ? '#D4A853' : '#4A3A2A' }}
            >
              {roomName}
            </h3>
            {isUnlocked && (
              <ArrowRight 
                className="w-4 h-4 transition-transform duration-300"
                style={{ 
                  color: '#D4A853',
                  transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
                }} 
              />
            )}
          </div>
          <p className="font-inter text-[10px] mt-1 leading-relaxed" style={{ color: '#5A4A3A' }}>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

interface RoomLockGridProps {
  onEnterRoom: (roomId: string) => void;
}

export const RoomLockGrid = ({ onEnterRoom }: RoomLockGridProps) => {
  const { state } = useCommunityUnlock();

  const rooms = [
    {
      id: 'love',
      name: 'Love',
      description: 'The warmth of connection. Where hearts align and souls find their mirror.',
      requiredMembers: 100,
    },
    {
      id: 'faith',
      name: 'Faith',
      description: 'Trust in the unseen. The bridge between doubt and knowing.',
      requiredMembers: 500,
    },
    {
      id: 'pain',
      name: 'Pain',
      description: 'The crucible of growth. Where breaking becomes becoming.',
      requiredMembers: 1000,
    },
    {
      id: 'full-molecule',
      name: 'Full Molecule',
      description: 'All 8 rooms revealed. The complete Elison World experience.',
      requiredMembers: 5000,
    },
  ];

  return (
    <div className="w-full max-w-md mx-auto space-y-3">
      {rooms.map((room) => {
        const milestone = state.milestones.find(m => m.roomId === room.id);
        const isUnlocked = milestone?.isUnlocked ?? false;

        return (
          <RoomLockCard
            key={room.id}
            roomId={room.id}
            roomName={room.name}
            description={room.description}
            requiredMembers={room.requiredMembers}
            isUnlocked={isUnlocked}
            onEnter={() => onEnterRoom(room.id)}
          />
        );
      })}
    </div>
  );
};

export default RoomLockGrid;
