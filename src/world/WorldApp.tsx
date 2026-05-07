import { WorldProvider } from './WorldContext';
import Clearing from './rooms/Clearing';

const WorldApp = () => {
  return (
    <WorldProvider>
      <Clearing />
    </WorldProvider>
  );
};

export default WorldApp;