import {Inter} from 'next/font/google';
import TableComponent from '@/components/TableComponent';
import TrafiklabApi from '@/services/TrafiklabApi';
import {
  countStopsForBuses,
  fetchStopNamesForEachBusline,
  getTop10BuslinesWithStops,
  mergeData,
  sortBuslinesByStops,
} from '@/utils/utils';

const inter = Inter({subsets: ['latin']});

export default function Home({data}: any) {
  if (!data) return null;
  return (
    <main
      className={`flex min-h-screen flex-col items-center p-24 ${inter.className}`}>
      <div className={`p-24 heading`}>Top 10 Bus Lines</div>
      <TableComponent data={data} />
    </main>
  );
}

export async function getStaticProps() {
  // Creates an instance of the TrafiklabApi class
  const api = new TrafiklabApi({
    apiKey: process.env.TRAFIKLAB_API_KEY!,
  });

  // Fetch the bus data in parallel
  const [buslineStops, stopNames] = await Promise.all([
    api.getBusLineStops(),
    api.getStopNames(),
  ]);

  // Process the data
  // 1. Count the number of stops for each bus line
  const stopsCounts = countStopsForBuses(buslineStops);

  // 2. Sort the bus lines by the number of stops
  const sortedBuslines = sortBuslinesByStops(stopsCounts);

  // 3. Get the top 10 bus lines with most stops
  const top10Buslines = sortedBuslines.slice(0, 10);

  // 4. transform stop data into a key-value map of StopPointNumber to StopPointName'
  const stopIdToNameMap = fetchStopNamesForEachBusline(stopNames);

  // 5. Get the top 10 bus lines with their stop names
  const top10BusLinesWithStops = getTop10BuslinesWithStops(
    top10Buslines,
    buslineStops,
    stopIdToNameMap,
  );
  // 6. Merge the data
  const mergedData = mergeData(top10BusLinesWithStops, top10Buslines);

  return {
    props: {
      data: mergedData,
    },
    // revalidate, is a next.js feature to re-generate the page after a certain time, in this case 60 seconds. to refresh the data
    revalidate: 60,
  };
}
