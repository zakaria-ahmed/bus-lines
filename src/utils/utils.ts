export function countStopsForBuses(busData: any[]): any {
  return busData.reduce((accumulator, entry) => {
    accumulator[entry.LineNumber] = (accumulator[entry.LineNumber] || 0) + 1;
    return accumulator;
  }, {});
}

export function fetchStopNamesForEachBusline(stopNamesData: any): {
  [key: string]: string;
} {
  let stopIdToNameMap: {[key: string]: string} = {};
  for (let stop of stopNamesData) {
    stopIdToNameMap[stop.StopPointNumber] = stop.StopPointName;
  }

  return stopIdToNameMap;
}

export function convertStopsToNames(busStopCounts: any): any {
  const busStopNames: {[key: string]: number} = {};

  for (let [line, count] of Object.entries(busStopCounts)) {
    busStopNames[line] = count as number;
  }

  return busStopNames;
}

export function sortBuslinesByStops(
  busStopCounts: Record<string, number>,
): [string, number][] {
  return Object.entries(busStopCounts).sort((a, b) => b[1] - a[1]);
}

export function getTop10BuslinesWithStops(
    top10Buslines: [string, number][],
    buslineStops: any[],
    stopIdToNameMap: { [key: string]: string }
  ) {
  return top10Buslines.map(([lineNumber]) => {
    const stopNames = buslineStops
      .filter((entry: any) => entry.LineNumber === lineNumber)
      .map((entry: any) => stopIdToNameMap[entry.JourneyPatternPointNumber]);

    return {
      lineNumber,
      stopNames: [...new Set(stopNames)],
    };
  });
}

export function mergeData(top10Buslines: any, buslineCount: any) {
  const buslineCountMap = new Map(buslineCount);

  return top10Buslines.map((busline: any, index: any) => {
    const count = buslineCountMap.get(busline.lineNumber) || 0;
    return {
      no: index + 1,
      line: busline.lineNumber,
      count,
      stops: busline.stopNames,
    };
  });
}
