import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="id">
      <Head>
        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="/fonts/CabinetGrotesk-Variable.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/ClashDisplay-Variable.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        {/* Favicon dengan berbagai ukuran */}
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Meta tags for SEO and accessibility */}
        <meta name="theme-color" content="#0284c7" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="application-name" content="Fikri Prasetya Portfolio" />
        <meta
          name="apple-mobile-web-app-title"
          content="Fikri Prasetya Portfolio"
        />

        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Fikri Prasetya Nurhidayat" />
        <meta
          property="og:title"
          content="Fikri Prasetya Nurhidayat | Frontend Developer"
        />
        <meta
          property="og:description"
          content="Portfolio of Fikri Prasetya Nurhidayat, Frontend Developer & Computer Science Graduate"
        />
        <meta
          property="og:image"
          content="https://yourwebsite.com/images/og-image.jpg"
        />
        <meta property="og:url" content="https://yourwebsite.com" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Fikri Prasetya Nurhidayat | Frontend Developer"
        />
        <meta
          name="twitter:description"
          content="Portfolio of Fikri Prasetya Nurhidayat, Frontend Developer & Computer Science Graduate"
        />
        <meta
          name="twitter:image"
          content="https://yourwebsite.com/images/og-image.jpg"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
