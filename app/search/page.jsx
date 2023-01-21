"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { useSearchParams } from "next/navigation";

const fetcher = (url) => fetch(url).then((res) => res.json());
function Search() {
  //const data = await getData(searchParams.q)
  // const [data, setData] = useState([])
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  // console.log(query)
  const { data, error, isLoading } = useSWR(
    `https://encouraging-bat-sun-hat.cyclic.app/api/anime/oploverz/search?q=${query}`,
    fetcher
  );
  console.log(data);
  if (error) return <div>failed to load</div>;
  if (isLoading) return (
    <div className='h-screen absolute inset-0 w-full flex items-center justify-center'>
                <div className='flex items-center'>
                    <div className='w-24 h-24 border-t-4 border-b-4 border-slate-900 dark:border-slate-600 rounded-full animate-spin'></div>
                </div>
            </div>
    )

  return (
    <>
      <div className="w-full max-w-5xl md:mx-auto">
        <div className="px-4 py-4 grid grid-cols-1 relative gap-y-4">
          <h2 className="font-semibold text-lg text-slate-900 dark:text-slate-100">
            Search for {query}
          </h2>

          {data.results.map((data, i) => {
            return (
              <Link key={i} href={`/anime/${data.id}`}>
                <div className="flex items-start justify-start p-2 bg-gradient-to-t from-bg-slate-300 to-slate-50 dark:bg-gradient-to-t dark:from-slate-900 dark:to-slate-800 rounded-md border border-slate-300 dark:border dark:border-slate-800 relative">
                  <div className="w-28 relative">
                    <div className="aspect-w-3 aspect-h-4 rounded overflow-hidden">
                      <Image
                        className="object-cover"
                        src={data.poster}
                        width={300}
                        height={400}
                        alt={data.title}
                      ></Image>
                    </div>
                  </div>
                  <div className="text-slate-900 dark:text-white ml-4 w-[75%]">
                    <h2 className="font-semibold text-md ">{data.title}</h2>

                    <div className="leading-5">
                    <p className="text-sm mt-2">Genres : {data.genres.split(',').slice(0,3)}
                    </p>
                      
                      <p className="text-sm">Type : {data.type}</p>
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

export default Search;
/*
async function getData(query) {
    const res = await fetch(
        `https://encouraging-bat-sun-hat.cyclic.app/api/anime/oploverz/search?q=${query}`
    )
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}
*/
