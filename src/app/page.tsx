import Head from "next/head";
import Image from "next/image";
import Header from "./components/Header";
import { SquingglyLines } from "./components/SquingglyLines";
import Link from "next/link";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="flex max-w-6xl mx-auto flex-col py-2 min-h-screen items-center justify-center">
      <Head>
        <title>Face Image Reviver</title>
      </Head>
      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 sm:mt-28 mt:20">
        <h1 className="mx-auto max-w-4xl text-5xl font-bold tracking-normal text-slate-900 sm:text-7xl">
          Reviving Old Photos
          <span className="relative whitespace-nowrap text-[#3290EE]">
            <SquingglyLines />
            <span className="relative">Using AI</span>
          </span>{" "}
          for everyone
        </h1>
        <p className="mx-auto mt-12 max-w-xl text-lg text-slate-700 leading-7">
          Have an old and blurry face images? Let our AI revive them so those
          memories can live on. 100% free - revive your images today
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            href="/revive"
            className="bg-black rounded-xl text-white font-medium px-4 py-3 sm:mt-10 mt-8 hover:bg-black/80"
          >
            Revive your Images
          </Link>
        </div>
        <div className="flex justify-between items-center w-full flex-col sm:mt-10 mt-6">
          <div className="flex flex-col space-y-10 mt-4 mb-16">
            <div className="flex sm:space-x-2 sm:flex-row flex-col">
              <div>
                <h2 className="mb-1 font-medium text-lg">Original Image</h2>
                <Image
                  alt="Original Image"
                  src="/srk-blur.jpg"
                  className="w-96 h-96 rounded-2xl object-cover"
                  width={400}
                  height={400}
                />
              </div>
              <div>
                <h2 className="mb-1 font-medium text-lg">Revived Image</h2>
                <Image
                  alt="Revived Image"
                  src="/srk-blur-new.jpg"
                  className="w-96 h-96 rounded-2xl object-cover"
                  width={400}
                  height={400}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
