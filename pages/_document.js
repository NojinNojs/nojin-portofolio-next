import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <meta name="description" content="Nojin's programming portfolio. Discover projects, skills, and contact information for Raffi Aqsan, a dedicated programmer." />
          <meta name="keywords" content="Nojin programming, Nojin portfolio, Raffi Aqsan, programming, web development, nojin site, nojin, nojs, nojsnojin, nojin.site, nojin.site, muhammad raffi aqsan, raffi dosq 15, website raffi, website nojin, portofolio nojin, portofolio raffi, Nojs Nojin, Photography, Portofolio, website" />
          <meta property="og:title" content="Nojin's Programming Portfolio" />
          <meta property="og:description" content="Explore the programming projects and skills of Raffi Aqsan. Connect and collaborate with Nojin on various programming endeavors." />
          <meta property="og:image" content="/banner-nojin-website.webp" />
          <meta property="og:url" content="https://nojin.site" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Nojin's Programming Portfolio" />
          <meta name="twitter:description" content="Explore the programming projects and skills of Raffi Aqsan. Connect and collaborate with Nojin on various programming endeavors." />
          <meta name="twitter:image" content="/banner-nojin-website.webp" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
