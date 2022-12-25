import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

async function Search({ params, searchParams }) {
    const data = await getData(searchParams.q)
    // console.log(searchParams)
    return (
        <>
            <div className='w-full max-w-5xl md:mx-auto'>
                <div className='px-4 py-4 grid grid-cols-1 relative gap-y-4'>
                    <h2 className='font-semibold text-lg text-slate-900 dark:text-slate-100'>
                        Search for{' '}
                        {` '${JSON.stringify(
                            searchParams
                        )} ${JSON.stringify(params)}'`}
                    </h2>
                    {data.results.map((data, i) => {
                        return (
                            <Link key={i} href={`/anime/${data.id}`}>
                                <div className='flex items-start justify-start p-2 bg-gradient-to-t from-bg-slate-300 to-slate-50 dark:bg-gradient-to-t dark:from-slate-900 dark:to-slate-800 rounded-md border border-slate-50 dark:border dark:border-slate-800 relative'>
                                    <div className='w-28 relative'>
                                        <div className='aspect-w-3 aspect-h-4 rounded overflow-hidden'>
                                            <Image
                                                className='object-cover'
                                                src={data.img}
                                                width={300}
                                                height={400}
                                                alt={data.title}
                                            ></Image>
                                        </div>
                                    </div>
                                    <div className='text-slate-900 dark:text-white ml-4 w-[75%]'>
                                        <h2 className='font-semibold text-md '>
                                            {data.title}
                                        </h2>

                                        <div className='leading-5'>
                                            <p>Type : {data.type}</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default Search

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
