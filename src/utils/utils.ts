export function countStopsForBuses(busData: any[]): any {
    return busData.reduce((accumulator, entry) => {
        accumulator[entry.LineNumber] = (accumulator[entry.LineNumber] || 0) + 1;
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

export function sortBusLines(busStopCounts: Record<string, number>): [string, number][] {
    return Object.entries(busStopCounts).sort((a, b) => b[1] - a[1]);
}

export function mergeData(top10Buslines: any, buslineCount: any) {
    const buslineCountMap = new Map(buslineCount);

    return top10Buslines.map((busline:any, index:any) => {
        const count = buslineCountMap.get(busline.lineNumber) || 0;
        return {
            no: index + 1,
            line: busline.lineNumber,
            count,
            stops: busline.stopNames,
        };
    });
  };