import { useState } from 'react';
import { WorldProvider } from './WorldContext';
import { CommunityUnlockProvider } from './CommunityUnlockContext';
import Clearing from './rooms/Clearing';
import WorldMap from './components/WorldMap';

const WorldApp = () => {
  const [showMap, setShowMap] = useState(false);

  return (
    <WorldProvider>
      <CommunityUnlockProvider>
        <Clearing onOpenMap={() => setShowMap(true)} />
        {showMap && <WorldMap onClose={() => setShowMap(false)} />}
      </CommunityUnlockProvider>
    </WorldProvider>
  );
};

export default WorldApp;