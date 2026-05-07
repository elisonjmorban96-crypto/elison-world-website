import { useWorld } from '../WorldContext';

interface RoomNode {
  id: string;
  name: string;
  status: 'locked' | 'unlocked' | 'completed';
  position: { x: number; y: number };
  connections: string[];
}

const rooms: RoomNode[] = [
  {
    id: 'clearing',
    name: 'ROOM 001:\nTHE CLEARING',
    status: 'completed',
    position: { x: 50, y: 80 },
    connections: ['jungle'],
  },
  {
    id: 'jungle',
    name: 'ROOM 002:\nTHE JUNGLE',
    status: 'locked',
    position: { x: 50, y: 55 },
    connections: ['ruins'],
  },
  {
    id: 'ruins',
    name: 'ROOM 003:\nTHE RUINS',
    status: 'locked',
    position: { x: 30, y: 30 },
    connections: ['observatory'],
  },
  {
    id: 'observatory',
    name: 'ROOM 004:\nTHE OBSERVATORY',
    status: 'locked',
    position: { x: 70, y: 15 },
    connections: ['nexus'],
  },
  {
    id: 'nexus',
    name: 'THE NEXUS',
    status: 'locked',
    position: { x: 50, y: 5 },
    connections: [],
  },
];

export const WorldMap = ({ onClose }: { onClose: () => void }) => {
  const { progress } = useWorld();

  const getRoomStatus = (roomId: string): 'locked' | 'unlocked' | 'completed' => {
    if (roomId === 'clearing' && progress.isUnlocked) return 'completed';
    if (roomId === 'jungle' && progress.isUnlocked) return 'unlocked';
    return 'locked';
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(5, 5, 5, 0.95)', backdropFilter: 'blur(20px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md aspect-[3/4]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Map title */}
        <div className="absolute top-0 left-0 right-0 text-center">
          <p className="font-inter text-[10px] uppercase tracking-[0.3em] mb-1" style={{ color: '#4A3A2A' }}>
            Elison's World
          </p>
          <h2 className="font-oswald text-lg tracking-[0.15em]" style={{ color: '#6A5A4A' }}>
            THE UNIVERSE
          </h2>
        </div>

        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
          {rooms.map((room) =>
            room.connections.map((targetId) => {
              const target = rooms.find((r) => r.id === targetId);
              if (!target) return null;
              const status = getRoomStatus(room.id);
              return (
                <line
                  key={`${room.id}-${targetId}`}
                  x1={`${room.position.x}%`}
                  y1={`${room.position.y}%`}
                  x2={`${target.position.x}%`}
                  y2={`${target.position.y}%`}
                  stroke={status === 'completed' ? '#D4A853' : '#2A2A2A'}
                  strokeWidth="1"
                  strokeDasharray={status === 'locked' ? '4 4' : 'none'}
                  opacity={status === 'completed' ? 0.6 : 0.3}
                />
              );
            })
          )}
        </svg>

        {/* Room nodes */}
        {rooms.map((room) => {
          const status = getRoomStatus(room.id);
          return (
            <div
              key={room.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${room.position.x}%`,
                top: `${room.position.y}%`,
                zIndex: 2,
              }}
            >
              {/* Node dot */}
              <div
                className="w-4 h-4 rounded-full mx-auto mb-2 transition-all duration-500"
                style={{
                  background: status === 'completed' ? '#D4A853' : status === 'unlocked' ? '#1EBC9B' : '#2A2A2A',
                  boxShadow: status === 'completed'
                    ? '0 0 20px rgba(212, 168, 83, 0.6)'
                    : status === 'unlocked'
                      ? '0 0 15px rgba(30, 188, 155, 0.4)'
                      : 'none',
                }}
              />

              {/* Room label */}
              <div
                className="text-center px-3 py-2 rounded-lg"
                style={{
                  background: status === 'locked' ? 'rgba(42, 42, 42, 0.3)' : 'rgba(8, 16, 16, 0.8)',
                  border: `1px solid ${status === 'completed' ? 'rgba(212, 168, 83, 0.3)' : status === 'unlocked' ? 'rgba(30, 188, 155, 0.3)' : 'rgba(42, 42, 42, 0.5)'}`,
                }}
              >
                <p
                  className="font-oswald text-[10px] tracking-wider whitespace-pre-line leading-tight"
                  style={{
                    color: status === 'completed' ? '#D4A853' : status === 'unlocked' ? '#1EBC9B' : '#4A4A4A',
                  }}
                >
                  {room.name}
                </p>
                {status === 'locked' && (
                  <p className="font-inter text-[8px] mt-1" style={{ color: '#3A3A3A' }}>
                    🔒 Locked
                  </p>
                )}
                {status === 'unlocked' && (
                  <p className="font-inter text-[8px] mt-1" style={{ color: '#1EBC9B' }}>
                    ✓ Enter
                  </p>
                )}
                {status === 'completed' && (
                  <p className="font-inter text-[8px] mt-1" style={{ color: '#D4A853' }}>
                    ✓ Complete
                  </p>
                )}
              </div>
            </div>
          );
        })}

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 font-inter text-xs uppercase tracking-wider py-3 px-6 rounded-full transition-colors"
          style={{
            color: '#6A5A4A',
            border: '1px solid rgba(106, 90, 74, 0.3)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(212, 168, 83, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
          }}
        >
          Return to Room
        </button>
      </div>
    </div>
  );
};

export default WorldMap;