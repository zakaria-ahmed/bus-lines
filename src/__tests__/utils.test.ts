import { 
    countStopsForBuses, 
    sortBusLinesByCount,
    mergeData
  } from '../utils/utils';
  
  // REWRITE IT BETTER.... 
  describe('Utility functions', () => {
    test('countStopsForBuses', () => {
      const mockData = [{ LineNumber: '636' }, { LineNumber: '637' }, { LineNumber: '636' }];
      const result = countStopsForBuses(mockData);
      expect(result).toEqual({ '636': 2, '637': 1 });
    });
  
    test('sortBusLinesByCount', () => {
      const mockData = [{ stopNames: ["stop1", "stop2", "stop3"] }, { stopNames: ["stop1", "stop2"] }];
      const result = sortBusLinesByCount(mockData);
      expect(result[0].stopNames.length).toBeGreaterThan(result[1].stopNames.length);
    });
  
    test('mergeData', () => {
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
  