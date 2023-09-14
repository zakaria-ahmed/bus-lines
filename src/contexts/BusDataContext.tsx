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
  mergeData,
  sortBusLinesByStopNames,
} from '@/utils/utils';

type MergedBusLine = any;

type BusDataProviderProps = {
  children: React.ReactNode;
};

interface BusData {
  mergedBusData: MergedBusLine[] | null;
}

const BusDataContext = createContext<BusData | undefined>(undefined);

const api = new TrafiklabApi();

const BusDataProvider: React.FC<BusDataProviderProps> = ({children}) => {
  const [mergedBusData, setMergedBusData] = useState<MergedBusLine[] | null>(
    null,
  );

  const getTop10Buslines = useCallback(async () => {
    const buslineStops = await api.getBusLineStops();
    const stopNames = await api.getStopNames();
    const stopsCounts = countStopsForBuses(buslineStops);

    const stopIdToNameMap = fetchStopNamesForEachBusline(stopNames);
    const sortedBusLines = sortBusLinesByStopNames(stopsCounts);
    const top10Buslines = sortedBusLines.slice(0, 10);

    const top10BusLinesWithStops = top10Buslines.map(([lineNumber]) => {
      const stopNames = buslineStops
        .filter((entry: any) => entry.LineNumber === lineNumber)
        .map((entry: any) => stopIdToNameMap[entry.JourneyPatternPointNumber]);

      return {
        lineNumber,
        stopNames: [...new Set(stopNames)],
      };
    });

    const mergedData = mergeData(top10BusLinesWithStops, top10Buslines);
    setMergedBusData(mergedData);
  }, []);

  useEffect(() => {
    getTop10Buslines();
  }, [getTop10Buslines]);

  return (
    <BusDataContext.Provider value={{mergedBusData}}>
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
