import type { AppProps } from "next/app";
import AOS from "aos";
import "aos/dist/aos.css"; // Impor AOS CSS
import { useEffect } from "react";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
