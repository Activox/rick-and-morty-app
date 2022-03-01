
import Head from "next/head";
import Image from "next/image";

import Footer from "../components/Footer.jsx";
import MainLogo from "../components/MainLogo.jsx";
import HomeResults from "../components/HomeResults.jsx";
import Search from "../components/Search.jsx";

export default function Home() {
  return (
    <div>
      <Head>
        <title>¡A Rick and Morty App with NextJS and TailwindCSS!</title>
        <meta name="description" content="A Rick and Morty App with NextJS and TailwindCSS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <MainLogo />
        <Search />
        <HomeResults />
      </main>

      <Footer />
    </div>
  );
}
