// BusDataContext.tsx

import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import TrafiklabApi from '@/services/TrafiklabApi';
import {
  countStopsForBuses,
  fetchStopNamesForEachBusline,
  sortBusLinesByStopNames,
} from '@/utils/utils';

type BusLine = any;

type BusDataProviderProps = {
  children: React.ReactNode;
};

interface BusData {
  busLines: BusLine[] | null;
  top10Buslines: BusLine[] | null;
}

const BusDataContext = createContext<BusData | undefined>(undefined);

const api = new TrafiklabApi();

const BusDataProvider: React.FC<BusDataProviderProps> = ({children}) => {
  const [busLines, setBusLines] = useState<BusLine[] | null>(null);
  const [top10Buslines, setTop10Buslines] = useState<BusLine[] | null>(null);

  const getTop10Buslines = useCallback(async () => {
    const buslineStops = await api.getBusLineStops();
    const stopNames = await api.getStopNames();
    const stopsCounts = countStopsForBuses(buslineStops);

    const stopIdToNameMap = fetchStopNamesForEachBusline(stopNames);
    const sortedBusLines = sortBusLinesByStopNames(stopsCounts);
    const top10Buslines = sortedBusLines.slice(0, 10);
    setBusLines(top10Buslines);
    let top10BusLinesWithStops = top10Buslines.map(([lineNumber]) => {
      let stopNames = buslineStops
        .filter((entry: any) => entry.LineNumber === lineNumber)
        .map((entry: any) => stopIdToNameMap[entry.JourneyPatternPointNumber]);
      return {
        lineNumber,
        stopNames: [...new Set(stopNames)],
      };
    });
    setTop10Buslines(top10BusLinesWithStops);
  }, []);

  useEffect(() => {
    getTop10Buslines();
  }, [getTop10Buslines]);

  return (
    <BusDataContext.Provider value={{busLines, top10Buslines}}>
      {children}
    </BusDataContext.Provider>
  );
};

const useBusData = (): BusData => {
  const context = useContext(BusDataContext);
  if (!context) {
    throw new Error('useBusData must be used within a BusDataProvider');
  }
  return context;
};

export {BusDataContext, BusDataProvider, useBusData};
