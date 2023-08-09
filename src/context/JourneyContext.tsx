import React, { createContext, useState, ReactNode } from 'react';
import { JourneyContextType } from '../common/types';

interface JourneyProviderProps {
  children: ReactNode;
}

export const JourneyContext = createContext<JourneyContextType>({
  origin: '',
  setOrigin: () => {},
  destination: '',
  setDestination: () => {},
});

export const JourneyProvider: React.FC<JourneyProviderProps> = ({ children }) => {
  const [origin, setOrigin] = useState<string>('initialStationCode');
  const [destination, setDestination] = useState<string>('initialStationCode');

  return (
    <JourneyContext.Provider value={{ origin, setOrigin, destination, setDestination }}>
      {children}
    </JourneyContext.Provider>
  );
};
