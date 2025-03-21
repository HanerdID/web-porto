// src/pages/_app.tsx
import dynamic from "next/dynamic";
import type { AppProps } from "next/app";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import "../styles/globals.css";

// Bungkus AppComponent dengan noSSR untuk menghindari hidratasi
const App = ({ Component, pageProps, router }: AppProps) => {
  // Inisialisasi AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  return <Component {...pageProps} key={router.route} />;
};

// Ekspor versi noSSR dari App
export default dynamic(() => Promise.resolve(App), {
  ssr: false,
});
