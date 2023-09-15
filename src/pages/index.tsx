import {Inter} from 'next/font/google';
import TableComponent from '@/components/TableComponent';
import TrafiklabApi from '@/services/TrafiklabApi';
import {
  countStopsForBuses,
  fetchStopNamesForEachBusline,
  mergeData,
  sortBusLines,
} from '@/utils/utils';

const inter = Inter({subsets: ['latin']});

export default function Home({data}: any) {
  return (
    <main
      className={`flex min-h-screen flex-col items-center p-24 ${inter.className}`}>
      <div className={`p-24 heading`}>Top 10 Bus Lines</div>
      <TableComponent data={data} />
    </main>
  );
}

export async function getStaticProps() {
  const api = new TrafiklabApi({
    apiKey: process.env.TRAFIKLAB_API_KEY!,
  });

  const [buslineStops, stopNames] = await Promise.all([
    api.getBusLineStops(),
    api.getStopNames(),
  ]);

  const stopsCounts = countStopsForBuses(buslineStops);
  const stopIdToNameMap = fetchStopNamesForEachBusline(stopNames);
  const sortedBusLines = sortBusLines(stopsCounts);
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

  return {
    props: {
      data: mergedData,
    },
    revalidate: 60,
  };
}
