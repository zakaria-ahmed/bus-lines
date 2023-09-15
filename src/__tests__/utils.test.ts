import { 
    countStopsForBuses, 
    sortBuslinesByStops,
    mergeData,
    getTop10BuslinesWithStops,
    fetchStopNamesForEachBusline,
  } from '@/utils/utils';
  

  describe('Utility functions', () => {
    it('should count the amount of stops for each bus', () => {
      const mockData = [{ LineNumber: '636', JourneyPatternPointNumber: "63613", }, { LineNumber: '637', JourneyPatternPointNumber: "62122",  }, { LineNumber: '636', JourneyPatternPointNumber: "63000",  }];
      const result = countStopsForBuses(mockData);
      expect(result).toEqual({ '636': 2, '637': 1 });
    });
  
    it('should sort by amount of stops, to get the busses with most stops', () => {
      const mockData = {
        '650': 150, 
        '636': 256,
      };
      const result = sortBuslinesByStops(mockData);
      expect(result[0][1]).toBeGreaterThan(result[1][1]);
      
    });

    it('should transform stop data into a key-value map of StopPointNumber to StopPointName', () => {
      const mockStopData = [
        {
          "StopPointNumber": "90101",
          "StopPointName": "Hauptvägen",
        },
        {
          "StopPointNumber": "90369",
          "StopPointName": "Ekerö centrum",
        },
      ];

      const expectedMap = {
        '90101': 'Hauptvägen',
        '90369': 'Ekerö centrum',
      };
        const result = fetchStopNamesForEachBusline(mockStopData);
  
      expect(result).toEqual(expectedMap);
    });
    
    it('should return the top 10 bus lines with their associated stop names', () => {
      const top10Buslines: [string, number][] = [
        ['635', 3],
        ['640', 2],
      ];
  
      const buslineStops = [
        { LineNumber: '635', JourneyPatternPointNumber: '64979' },
        { LineNumber: '635', JourneyPatternPointNumber: '60063' },
        { LineNumber: '635', JourneyPatternPointNumber: '60061' },
        { LineNumber: '640', JourneyPatternPointNumber: '63702' },
        { LineNumber: '640', JourneyPatternPointNumber: '60050' },
      ];
  
      const stopIdToNameMap = {
        '60050': 'Stop A',
        '60063': 'Stop B',
        '63702': 'Stop C',
        '64979': 'Stop D',
        '60061': 'Stop E',
      };
  
      const result = getTop10BuslinesWithStops(top10Buslines, buslineStops, stopIdToNameMap);
  
      expect(result).toEqual([
        {
          lineNumber: '635',
          stopNames: ['Stop D', 'Stop B', 'Stop E'],
        },
        {
          lineNumber: '640',
          stopNames: ['Stop C', 'Stop A'],
        },
      ]);
    });

    it('should merge the the Top 10 bus lines with stopnames to busline count', () => {
      const mockTop10Buslines = [
        { lineNumber: '636', stopNames: ['A', 'B', 'C'] },
      ];
      const mockBuslineCount = [
        ['636', 252],
      ];
      const result = mergeData(mockTop10Buslines, mockBuslineCount);
      expect(result[0]).toEqual({
        no: 1,
        line: '636',
        count: 252,
        stops: ['A', 'B', 'C'],
      });
    });
  });
  