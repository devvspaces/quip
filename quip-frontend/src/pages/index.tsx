import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Hero from "@/components/hero";
import Features from "@/components/features";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>CareCompass - Find nearby healthcare</title>
        <meta name="description" content="Instantly connect patients with nearby accredited healthcare facilities through smart, location-based search technology." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Hero />
      <Features />
    </>
  );
}
