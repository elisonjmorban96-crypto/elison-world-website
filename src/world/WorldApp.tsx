import { useState } from 'react';
import { WorldProvider } from './WorldContext';
import Clearing from './rooms/Clearing';
import WorldMap from './components/WorldMap';

const WorldApp = () => {
  const [showMap, setShowMap] = useState(false);

  return (
    <WorldProvider>
      <Clearing onOpenMap={() => setShowMap(true)} />
      {showMap && <WorldMap onClose={() => setShowMap(false)} />}
    </WorldProvider>
  );
};

export default WorldApp;