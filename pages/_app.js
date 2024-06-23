import "../styles/globals.css";
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  <Head>
    <title>Nojin's Programming Portfolio</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </Head>;
  return <Component {...pageProps} />;
}

export default MyApp;
