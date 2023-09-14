export function countStopsForBuses(busData: any[]): any {
    return busData.reduce((accumulator, entry) => {
        if (!accumulator[entry.LineNumber]) {
            accumulator[entry.LineNumber] = 0;
        }
        accumulator[entry.LineNumber]++;
        return accumulator;
    }, {});
}
export function sortBusLinesByCount(countStopsForBuses: any[]): any[] {
    return countStopsForBuses.sort((a, b) => b.stopNames.length - a.stopNames.length);
}


export function fetchStopNamesForEachBusline(stopNamesData: any): { [key: string]: string } {
    let stopIdToNameMap: { [key: string]: string } = {};
    for (let stop of stopNamesData) {
        stopIdToNameMap[stop.StopPointNumber] = stop.StopPointName;
    }
    
    return stopIdToNameMap;
}

export function convertStopsToNames(busStopCounts: any): any {
    const busStopNames: { [key: string]: number } = {}; 

    for (let [line, count] of Object.entries(busStopCounts)) {
        busStopNames[line] = count as number;  // Use type assertion here
    }

    return busStopNames;
}

export function sortBusLinesByStopNames(busStopCounts: Record<string, number>): [string, number][] {
    return Object.entries(busStopCounts).sort((a, b) => b[1] - a[1]);
}

export function removeDuplicateEntries(busData: any[]): any[] {
    const seen = new Set();
    
    return busData.filter(entry => {
        const signature = `${entry.LineNumber}-${entry.JourneyPatternPointNumber}`;
        if (seen.has(signature)) {
            return false;
        }
        seen.add(signature);
        return true;
    });
}

export function mergeData(top10Buslines: any, buslineCount: any) {
    return top10Buslines.map((busline: any, index: any) => {
      const countData = buslineCount.find(
        ([line]: any) => line === busline.lineNumber,
      );

      return {
        no: index + 1,
        line: busline.lineNumber,
        count: countData ? countData[1] : 0, // Defaulting to 0 if no count is found
        stops: busline.stopNames,
      };
    });
  };