'use client'
import React, { Fragment, useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { Listbox, Transition } from '@headlessui/react'

import {
    HiCheck,
    HiChevronLeft,
    HiChevronRight,
    HiChevronUpDown,
    HiListBullet,
} from 'react-icons/hi2'
import Link from 'next/link'

const people = [
    { id: 1, name: 'Durward Reynolds', unavailable: false },
    { id: 2, name: 'Kenton Towne', unavailable: false },
    { id: 3, name: 'Therese Wunsch', unavailable: false },
    { id: 4, name: 'Benedict Kessler', unavailable: true },
    { id: 5, name: 'Katelyn Rohan', unavailable: false },
]
const Show = ({ params }) => {
    const [selectedPerson, setSelectedPerson] = useState(people[0])

    const [embed, setEmbed] = useState([])
    const [selected, setSelected] = useState([])
    const [download, setDownload] = useState([])
    const [stream, setStream] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [next, setNext] = useState('')
    const [prev, setPrev] = useState('')
    const [animeId, setAnimeId] = useState('')
    const iframeRef = useRef(null)

    useEffect(() => {
        axios(
            `https://encouraging-bat-sun-hat.cyclic.app/api/anime/oploverz/download?id=${params.id}`
        ).then((res) => {
            //console.log(res.data.results.embed);
            setDownload(res.data.results.download)
            setPrev(res.data.results.prev)
            setNext(res.data.results.next)
            setAnimeId(res.data.results.anime_id)

            setIsLoading(false)
            setEmbed(res.data.results.embed)

            //console.log(isLoading);
            setSelected(res.data.results.embed[0])
            //console.log(selected);
        })
        //setSelected(embed[0]);
    }, [params])
    const handleChange = () => {
        //console.log(embed);
    }

    useEffect(() => {
        setStream(selected.id)
    }, [selected])

    const requestFullScreenAndLandscape = () => {
        if (iframeRef.current.requestFullscreen) {
            iframeRef.current.requestFullscreen()
        } else if (iframeRef.current.mozRequestFullScreen) {
            iframeRef.current.mozRequestFullScreen()
        } else if (iframeRef.current.webkitRequestFullscreen) {
            iframeRef.current.webkitRequestFullscreen()
        } else if (iframeRef.current.msRequestFullscreen) {
            iframeRef.current.msRequestFullscreen()
        }

        if (screen.orientation && screen.orientation.lock) {
            screen.orientation.lock('landscape')
        }
    }

    // console.log(params)
    if (isLoading) {
        return (
            <div className='absolute inset-0 grid h-screen  place-items-center'>
                <div className='flex items-center'>
                    <div className='w-24 h-24 border-t-4 border-b-4 border-slate-900 dark:border-red-900 rounded-full animate-spin'></div>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <div className='mx-3'>
                    <div className='text-center'>
                        <h2 className='font-semibold text-red-500'>
                            apabila video tidak tersedia Silahkan
                            refresh atau ganti resolusi
                        </h2>
                    </div>
                    <div className='rounded aspect-[10/4] overflow-hidden mt-2 w-full max-w-5xl mx-auto bg-slate-700'>
                        {' '}
                        <iframe
                            ref={iframeRef}
                            className='w-full h-full'
                            src={
                                selected
                                    ? `https://acefile.co/player/${stream}`
                                    : `https://acefile.co/player/90423369`
                            }
                            frameBorder={0}
                            width='100%'
                            height='100%'
                            allowFullScreen={true}
                        ></iframe>
                        <div className='w-full flex items-center justify-between'>
                            <div className='p-2 bg-slate-700 z-100'>
                                <Listbox
                                    value={selected}
                                    onChange={setSelected}
                                >
                                    <div className='relative mt-1 w-32'>
                                        <Listbox.Button className='relative w-full cursor-default rounded-lg bg-white py-1 md:py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm'>
                                            <span className='block truncate'>
                                                {selected.resolution}
                                            </span>
                                            <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                                                <HiChevronUpDown
                                                    className='h-5 w-5 text-gray-400'
                                                    aria-hidden='true'
                                                />
                                            </span>
                                        </Listbox.Button>
                                        <Transition
                                            as={Fragment}
                                            leave='transition ease-in duration-100'
                                            leaveFrom='opacity-100'
                                            leaveTo='opacity-0'
                                        >
                                            <Listbox.Options className='absolute bottom-0 mb-9 md:mb-10 max-h-60 w-full overflow-auto rounded-md bg-slate-200 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                                                {embed.map(
                                                    (
                                                        person,
                                                        personIdx
                                                    ) => (
                                                        <Listbox.Option
                                                            key={
                                                                person.id
                                                            }
                                                            className={({
                                                                active,
                                                            }) =>
                                                                `relative cursor-default select-none py-1 md:py-2 px-3 ${
                                                                    active
                                                                        ? 'bg-amber-100 text-amber-900'
                                                                        : 'text-gray-900'
                                                                }`
                                                            }
                                                            value={
                                                                person
                                                            }
                                                        >
                                                            {({
                                                                selected,
                                                            }) => (
                                                                <>
                                                                    <span
                                                                        className={`block truncate ${
                                                                            selected
                                                                                ? 'font-medium'
                                                                                : 'font-normal'
                                                                        }`}
                                                                    >
                                                                        {
                                                                            person.resolution
                                                                        }
                                                                    </span>
                                                                    {selected ? (
                                                                        <span className='absolute inset-y-0 right-0 flex items-center pr-3 text-amber-600'>
                                                                            <HiCheck
                                                                                className='h-5 w-5'
                                                                                aria-hidden='true'
                                                                            />
                                                                        </span>
                                                                    ) : null}
                                                                </>
                                                            )}
                                                        </Listbox.Option>
                                                    )
                                                )}
                                            </Listbox.Options>
                                        </Transition>
                                    </div>
                                </Listbox>
                            </div>

                            <div>
                                <button
                                    className='mt-4 text-white'
                                    onClick={
                                        requestFullScreenAndLandscape
                                    }
                                >
                                    <span className=' mr-10'>
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            fill='none'
                                            viewBox='0 0 24 24'
                                            strokeWidth={1.5}
                                            stroke='currentColor'
                                            className='w-6 h-6'
                                        >
                                            <path
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                                d='M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15'
                                            />
                                        </svg>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='my-4 grid grid-cols-3 gap-x-1 w-full max-w-5xl md:mx-auto'>
                        <Link
                            href={`/show/${prev}`}
                            className={!prev && 'disable-link'}
                        >
                            <button
                                onClick={() => {
                                    setIsLoading(true)
                                }}
                                disabled={!prev && true}
                                className='rounded-l bg-slate-700 flex justify-center items-center text-white py-2 text-center w-full'
                            >
                                <HiChevronLeft size={16} />
                            </button>
                        </Link>
                        <Link href={`/anime/${animeId}`}>
                            <button className='bg-blue-600 text-white py-2 flex justify-center items-center text-center w-full'>
                                <HiListBullet size={16} />
                            </button>
                        </Link>

                        <Link
                            href={`/show/${next}`}
                            className={!next && 'disable-link'}
                        >
                            <button
                                onClick={() => {
                                    setIsLoading(true)
                                }}
                                disabled={!next && true}
                                className={`rounded-r bg-slate-700 flex justify-center items-center text-white py-2 text-center w-full`}
                            >
                                <HiChevronRight size={16} />
                            </button>
                        </Link>
                    </div>
                    <div className='p-2 md:p-4 mt-4 rounded shadow bg-slate-100 dark:bg-slate-700 w-full md:max-w-5xl md:mx-auto'>
                        <h2 className='text-slate-900 dark:text-slate-100 w-full text-center font-semibold'>
                            Download{' '}
                            {params.episode
                                ? params.episode.replaceAll('-', ' ')
                                : ''}
                        </h2>

                        <div className='flex flex-col gap-y-3 mt-3 text-white'>
                            {download.map((download, i) => {
                                return (
                                    <div key={i}>
                                        <h1 className='w-full bg-blue-600 px-2 py-1 rounded text-white'>
                                            {download.format}
                                        </h1>
                                        <div className='flex flex-col gap-y-2 mt-2 text-slate-900 dark:text-white '>
                                            {download.resolutions.map(
                                                (resolution, i) => {
                                                    return (
                                                        <div
                                                            key={i}
                                                            className='flex items-center gap-x-2'
                                                        >
                                                            <div className='bg-blue-600 w-14 text-center p-1 rounded text-white'>
                                                                {
                                                                    resolution.name
                                                                }
                                                            </div>
                                                            <div className='flex flex-wrap items-center divide-x gap-2 divide-slate-300 dark:divide-slate-500'>
                                                                {resolution.servers.map(
                                                                    (
                                                                        server,
                                                                        i
                                                                    ) => {
                                                                        return (
                                                                            <div
                                                                                key={
                                                                                    i
                                                                                }
                                                                                className='text-center pl-2'
                                                                            >
                                                                                <a
                                                                                    href={
                                                                                        server.link
                                                                                    }
                                                                                    target='_blank'
                                                                                >
                                                                                    {
                                                                                        server.name
                                                                                    }
                                                                                </a>
                                                                            </div>
                                                                        )
                                                                    }
                                                                )}
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            )}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Show
