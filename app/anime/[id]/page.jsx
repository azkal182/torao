import React from "react";
import Image from "next/image";
import Link from "next/link"
async function page({ params, searchParams }) {
  const id = params.id;
  const data = await getData(id);
  

  return (
    <>
      <div className="w-full p-4">
        <div className="w-full bg-white shadow dark:bg-slate-700 dark:text-slate-100 rounded p-4 text-slate-700">
          <div className="flex flex-col">
            <div className="w-[120px] aspect-[3/4] mx-auto rounded overflow-hidden">
              <Image
                className="object-cover"
                src={data.results.poster}
                alt={data.results.title}
                width={120}
                height={100}
              />
            </div>

            <div className="my-2">
              <h1 className="text-center font-bold text-lg mb-4">
                {data.results.title}
              </h1>

              <p className="line-clamp-[20]">{data.results.description}</p>
              <div className="py-2">
                <ul>
                  <li>Status : {data.results.status}</li>
                  <li>Studio : {data.results.studio}</li>
                  <li>Released : {data.results.released}</li>
                  <li>Duration : {data.results.duration}</li>
                  <li>Season : {data.results.season}</li>
                  <li>Episodes : {data.results.episodes}</li>
                  <li>Type : {data.results.type}</li>
                  <li>Posted by : {data.results.posted_by}</li>
                  <li>Uploaded : {data.results.released_on}</li>
                  <li>Updated : {data.results.updated_on}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 text-slate-100">
          <Link href={`/${data.results.list_episode.slice(-1)[0].id}`} className="bg-blue-600 rounded-md py-2 text-center">
            <span className="block">first episode</span>
            <span className="text-lg font-bold">Episode {data.results.list_episode.slice(-1)[0].episode}</span>
          </Link>
          <Link href={data.results.list_episode[0].id} className="bg-blue-600 rounded-md py-2 text-center">
          <span className="block">New episode</span>
            <span className="text-lg font-bold">Episode {data.results.list_episode[0].episode}</span>
          
          
            
          </Link>
        </div>

        <div className="mt-4 p-4 rounded w-full bg-white dark:bg-slate-700 dark:text-slate-100 shadow text-slate-700">
        <div class="table-wrp block max-h-96 overflow-y-auto">
          <table class="table-fixed w-full ">
            <thead className="sticky top-0 bg-slate-200 dark:bg-slate-800 dark:text-slate-100">
              <tr>
                <th className="w-10 p-2">Eps</th>
                <th className="p-2">Title</th>
                <th className="hidden md-block p-2">Date</th>
              </tr>
            </thead>
            <tbody className="w-full h-72 overflow-y-auto divide-y px-2">
              {data.results.list_episode.map((item, i) => (
                <tr key={i}>
                  <td className="text-center">{item.episode}</td>
                  <td className="p-2">
                  <Link href={item.id}>
                  {item.title.replace("Subtitle Indonesia", "")}
                  </Link>
                  
                  
                  </td>
                  <td className="hidden md-block">{item.uploaded}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
      </div>
    </>
  );
}

export default page;

async function getData(id) {
  const res = await fetch(
    `https://encouraging-bat-sun-hat.cyclic.app/api/anime/oploverz/detail?id=${id}`
  );
  const data = await res.json();

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return data;
}
