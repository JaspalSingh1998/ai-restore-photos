"use client";
import Head from "next/head";
import React, { useState } from "react";
import Header from "../components/Header";
import { useAuth } from "@clerk/nextjs";
import Toggle from "../components/Toggle";
import { CompareSlider } from "../components/CompareSlider";
import { Rings } from "react-loader-spinner";
import { UploadDropzone } from "react-uploader";
import Link from "next/link";
import { Uploader } from "uploader";
import Footer from "../components/Footer";
import Image from "next/image";
import downloadImage from "../utils/downloadedImage";
import appendNewToName from "../utils/appendNewToName";

const uploader = Uploader({
  apiKey: !!process.env.NEXT_PUBLIC_UPLOAD_API_KEY
    ? process.env.NEXT_PUBLIC_UPLOAD_API_KEY
    : "free",
});

const Revive = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [revivedImage, setRevivedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [sideBySide, setSideBySide] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);
  const [revivedLoaded, setRevivedLoaded] = useState<boolean>(false);
  const { isSignedIn, isLoaded } = useAuth();

  const options = {
    maxFileCount: 1,
    mimeTypes: ["image/jpeg", "image/png", "image/jpg"],
    editor: { images: { crop: false } },
    styles: { colors: { primary: "#000" } },
  };
  async function generateImage(fileUrl: string) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    setLoading(true);

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageUrl: fileUrl }),
    });

    let newImage = await res.json();
    if (res.status !== 201) {
      setError(newImage);
    } else {
      setRevivedImage(newImage);
    }
    setLoading(false);
  }

  return (
    <div className="flex max-w-6xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Head>
        <title>Revive Images</title>
      </Head>
      <Header photo={undefined} />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-4 sm:mb-0 mb-8">
        <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-normal text-slate-900 sm:text-6xl mb-5">
          Revive any face
        </h1>
        {isSignedIn && (
          <p className="text-slate-500">
            You have <span className="font-semibold">{3} generations</span>
            left today. Your generation
            {Number(1 === 1) > 1 ? "s" : ""} will renew in{" "}
            <span className="semi-bold">
              {1} hours and {2} minutes
            </span>
          </p>
        )}
        <div className="flex justify-between items-center w-full flex-col mt-4">
          <Toggle
            className={`${revivedLoaded ? "visible mb-6" : "invisible"}`}
            setSideBySide={(newVal) => setSideBySide(newVal)}
            sideBySide={sideBySide}
          />
          {revivedLoaded && sideBySide && (
            <CompareSlider original={originalImage!} revived={revivedImage!} />
          )}
          {!isLoaded ? (
            <div className="max-w-[670px] h-[250px] flex justify-center items-center">
              <Rings
                height={100}
                width={100}
                color="black"
                radius={6}
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="rings-loading"
              />
            </div>
          ) : isSignedIn && !originalImage ? (
            <UploadDropzone
              uploader={uploader}
              options={options}
              onUpdate={(file) => {
                console.log(file);
                if (file.length !== 0) {
                  setImageName(file[0].originalFile.originalFileName);
                  setOriginalImage(file[0].fileUrl.replace("raw", "thumbnail"));
                  generateImage(file[0].fileUrl.replace("raw", "thumbnail"));
                }
              }}
              width="670px"
              height="250px"
            />
          ) : (
            !originalImage && (
              <div className="h-[250px] flex flex-col items-center space-y-6 max-w-[670px] -mt-8">
                <div className="max-w-xl text-gray-600">
                  Signin below or Create a new account.
                </div>
                <div className="flex gap-4">
                  <Link href="/sign-in">
                    <button className="bg-gray-200 text-black font-semibold py-3 px-6 rounded-xl flex items-center space-x-2">
                      <span>Sign in</span>
                    </button>
                  </Link>
                  <Link href="/sign-up">
                    <button className="text-white bg-black font-semibold py-3 px-6 rounded-xl flex items-center space-x-2">
                      <span>Sign up</span>
                    </button>
                  </Link>
                </div>
              </div>
            )
          )}
          {originalImage && !revivedImage && (
            <Image
              alt="original image"
              src={originalImage}
              className="rounded-2xl"
              width={475}
              height={475}
            />
          )}
          {revivedImage && originalImage && !sideBySide && (
            <div className="flex sm:space-x-4 sm:flex-row flex-col">
              <div>
                <h2 className="mb-1 font-medium text-lg">Original Image</h2>
                <Image
                  alt="Original Image"
                  src={originalImage}
                  className="rounded-2xl relative"
                  width={475}
                  height={475}
                />
              </div>
              <div className="sm:mt-0 mt-8">
                <h2 className="mb-1 font-medium text-lg">Revived Image</h2>
                <a href={revivedImage} target="_blank" rel="noreferrer">
                  <Image
                    alt="revived image"
                    src={revivedImage}
                    className="rounded-2xl relative sm:mt-0 mt-2 cursor-zoom-in"
                    width={475}
                    height={475}
                    onLoadingComplete={() => setRevivedLoaded(true)}
                  />
                </a>
              </div>
            </div>
          )}
          {loading && (
            <button
              disabled
              className="bg-black rounded-full text-white font-medium px-4 pt-2 pb-3 mt-8 hover:bg-black/80 w-40"
            >
              <span className="pt-4"></span>
            </button>
          )}
          {error && (
            <div
              className="bg-red-100 border-red-400 text-red-700 px-4 py-3 rounded-xl mt-8 max-w-[575px]"
              role="alert"
            >
              <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                Please try again in 24 hours.
              </div>
              <div className="border border-t-0 border-red-400 bg-red-100 px-4 py-3 text-red-700">
                {error}
              </div>
            </div>
          )}
          <div className="flex space-x-2 justify-center">
            {originalImage && !loading && (
              <button
                onClick={() => {
                  setOriginalImage(null);
                  setRevivedImage(null);
                  setRevivedLoaded(false);
                  setError(null);
                }}
                className="bg-black rounded-full text-white font-medium px-4 py-2 mt-8 hover:bg-black/80 transition"
              >
                Upload New Image
              </button>
            )}
            {revivedLoaded && (
              <button
                onClick={() => {
                  downloadImage(revivedImage!, appendNewToName(imageName!));
                }}
                className="bg-white rounded-full text-black border font-medium px-4 py-2 mt-8 hover:bg-gray-100 transition"
              >
                Download Revived Image
              </button>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Revive;
