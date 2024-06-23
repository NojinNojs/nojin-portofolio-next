import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta name="description" content="Nojin's programming portfolio. Discover projects, skills, and contact information for Raffi Aqsan, a dedicated programmer." />
          <meta name="keywords" content="Nojin programming, Nojin portfolio, Raffi Aqsan, programming, web development" />
          <meta property="og:title" content="Nojin's Programming Portfolio" />
          <meta property="og:description" content="Explore the programming projects and skills of Raffi Aqsan. Connect and collaborate with Nojin on various programming endeavors." />
          <meta property="og:image" content="/seo-banner.jpg" />
          <meta property="og:url" content="https://nojin.site" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Nojin's Programming Portfolio" />
          <meta name="twitter:description" content="Explore the programming projects and skills of Raffi Aqsan. Connect and collaborate with Nojin on various programming endeavors." />
          <meta name="twitter:image" content="/seo-banner.jpg" />
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
