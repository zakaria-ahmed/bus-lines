import {useBusData} from '@/contexts/BusDataContext';
import {Inter} from 'next/font/google';
import {useTable} from 'react-table';
import Select from 'react-dropdown-select';
import TableComponent from '@/components/TableComponent';
import {useEffect, useState} from 'react';
import {mergeData} from '../utils/utils';

const inter = Inter({subsets: ['latin']});

export default function Home() {
  const [data, setData] = useState<any>([]);
  const {top10Buslines, busLines} = useBusData();

  useEffect(() => {
    if (!top10Buslines || !busLines) return;

    const data = mergeData(top10Buslines, busLines);
    setData(data);
  }, [top10Buslines, busLines]);

  if (top10Buslines === null || busLines === null) return null;
  return (
    <main
      className={`flex min-h-screen flex-col items-center p-24 ${inter.className}`}>
      <div className={`p-24`}>Top 10 Bus Lines</div>
      <TableComponent
        data={data}
        buslineCount={busLines}
        top10Buslines={top10Buslines}
      />
    </main>
  );
}
