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
        <title>Search for health institutions</title>
      </Head>

      <Hero />
      <Features />
      <Footer />
      
    </>
  );
}
