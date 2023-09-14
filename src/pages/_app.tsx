import '@/styles/globals.css';
import type {AppProps} from 'next/app';
import {BusDataProvider} from '@/contexts/BusDataContext';

export default function App({Component, pageProps}: AppProps) {
  return (
    <BusDataProvider>
      <Component {...pageProps} />
    </BusDataProvider>
  );
}
