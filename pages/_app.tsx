import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { NextUIProvider } from '@nextui-org/react';
import 'bootstrap/dist/css/bootstrap.min.css'
import "@fortawesome/fontawesome-svg-core/styles.css"; 
import Head from 'next/head';

import { config } from "@fortawesome/fontawesome-svg-core";
// Tell Font Awesome to skip adding the CSS automatically 
// since it's already imported above
config.autoAddCss = false; 

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
       <Head>
       <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Lato&display=swap" rel="stylesheet"/>
      </Head>
      <Component {...pageProps} />
    </NextUIProvider>)
}
