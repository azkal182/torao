import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IoStarSharp } from "react-icons/io5";

async function page() {
  const api =
    process.env.server_api === "local"
      ? "http://localhost:3000/api/"
      : "https://encouraging-bat-sun-hat.cyclic.app/api/anime/oploverz/";
  const latest = await getLatest(api);
  //const popular = await getPopular();

  return (
    <>
      {/* <div className='mx-4 md:mx-6 lg:mx-auto lg:w-full max-w-5xl '>
                <section className='mt-2'>
                    <h2 className='text-xl font-semibold'>Popular</h2>
                    <div className='grid grid-cols-2 mt-2 md:grid-cols-4 gap-x-2 md:gap-x-4 gap-y-3 md:gap-y-4'>
                        {popular.results.map((data, i) => {
                            return (
                                <div key={i}>
                                    <div className='group'>
                                        <a href='#'>
                                            <div className='aspect-w-3 aspect-h-4 overflow-hidden rounded-md'>
                                                <Image
                                                    className='cursor-pointer group-hover:scale-105 transition duration-250 ease-in-out h-full shadow object-cover rounded-lg'
                                                    src={data.poster}
                                                    width={350}
                                                    height={500}
                                                    alt={data.title}
                                                />
                                                <div className='absolute inset-0 '></div>
                                            </div>
                                            <div className='flex flex-col bottom-0'>
                                                <span className='font-semibold text-blue-600'>
                                                    {data.type}
                                                </span>
                                                <span className='text-md font-semibold'>
                                                    {data.title}
                                                </span>
                                                <span className='text-slate-500'>
                                                    {data.episode
                                                        ? `${data.episode} episode`
                                                        : ''}
                                                </span>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </section>
            </div>
            <div className='w-full max-w-5xl md:mx-auto shadow'>
                <div className='px-4 py-4 grid grid-cols-1 relative divide-y divide-slate-200 dark:divide-slate-800 dark:bg-slate-900'>
                    <h2 className='py-2 font-semibold text-lg text-slate-900 dark:text-slate-100'>
                        Terbaru
                    </h2>
                    {latest.results.map((latest, i) => {
                        return (
                            <div
                                key={i}
                                className='flex items-start justify-start py-2'
                            >
                                <div className='w-28 relative'>
                                    <Link href={`/anime/${latest.id}`}>
                                        <div className='aspect-w-3 aspect-h-4 rounded overflow-hidden'>
                                            <Image
                                                className='object-cover'
                                                src={latest.poster}
                                                width={300}
                                                height={400}
                                                alt={latest.title}
                                            ></Image>
                                        </div>
                                        <div className='absolute bg-blue-500 text-sm rounded text-white px-1 p-[1px] top-0 right-0 mr-2 mt-2'>
                                            {latest.type}
                                        </div>
                                        <div className='pt-10 absolute w-full bottom-0 bg-gradient-to-t from-black text-center text-white'>
                                            Eps {latest.episode}
                                        </div>
                                    </Link>
                                </div>
                                <div className='text-slate-900 dark:text-white ml-4 w-[75%]'>
                                    <Link href={`/anime/${latest.id}`}>
                                        <h2 className='font-semibold text-md '>
                                            {latest.title}
                                        </h2>
                                    </Link>
                                    <div className='leading-5'>
                                        <p>Status : {latest.status}</p>
                                        <p>Posted by : {latest.posted_by}</p>
                                        <p>
                                            Released on : {latest.released_on}
                                        </p>
                                        <p>Series : {latest.series}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div> */}

      <div className="w-full max-w-5xl md:mx-auto">
        <div className="px-4 py-4 grid grid-cols-1 relative gap-y-4">
          <h2 className="font-semibold text-lg text-slate-900 dark:text-slate-100">
            Terbaru
          </h2>
          {latest.results.map((latest, i) => {
            return (
              <Link key={i} href={`/${latest.id}`}>
                <div className="flex items-start justify-start p-2 bg-gradient-to-t from-bg-slate-300 to-slate-50 dark:bg-gradient-to-t dark:from-slate-900 dark:to-slate-800 rounded-md border border-slate-50 dark:border dark:border-slate-900 relative">
                  <div className="w-28 shirk-0 relative">
                    <div className="aspect-w-3 aspect-h-5 rounded overflow-hidden">
                      <Image
                        className="object-cover"
                        src={latest.poster}
                        width={300}
                        height={400}
                        alt={latest.title}
                      ></Image>
                    </div>
                    <div className="absolute bg-blue-500 text-sm rounded text-white px-1 p-[1px] top-0 right-0 mr-2 mt-2">
                      {latest.type}
                    </div>
                    <div className="pt-10 absolute w-full bottom-0 bg-gradient-to-t from-black text-center text-white">
                      Eps {latest.episode}
                    </div>
                  </div>
                  <div className="text-slate-900 dark:text-white ml-4 w-[75%]">
                    <h2 className="font-semibold text-md ">
                      {latest.title
                        .replace("Subtitle Indonesia", "")
                        .replace(/episode\s\d+/i, "")}
                    </h2>

                    <div className="leading-5">
                      <p>Status : {latest.status}</p>
                      <p>Posted by : {latest.posted_by}</p>
                      <p>Released on : {latest.released_on}</p>
                      <p className="text-sm dark:text-slate-400 mt-2">
                        Series : {latest.series}
                      </p>
                    </div>
                    <div className="absolute flex items-center gap-x-1 right-2 top-8 bg-yellow-400 rounded-full px-2 text-sm text-slate-900">
                      <IoStarSharp />
                      <span>{latest.score}</span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default page;

async function getPopular() {
  const res = await fetch(
    "https://encouraging-bat-sun-hat.cyclic.app/api/anime/oploverz/popular"
  );
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getLatest(api) {
  const res = await fetch(`${api}latest_update`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
