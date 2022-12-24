import React from 'react'
import { HiBars3 } from 'react-icons/hi2'
import ToggleTheme from './ToogleThemes'
import Image from 'next/image'
import logo from '../public/logo.png'
import SearchModal from './SearchModal'
import Link from 'next/link'
export default function Navbar() {
    return (
        <>
            <div className='w-full py-3 dark:bg-slate-900 border-b dark:border-slate-600 text-gray-400 dark:text-slate-100 shadow-sm'>
                <div className='px-4 w-full mx-auto flex items-center justify-between'>
                    <div className='flex items-center gap-x-8 text-slate-600 dark:text-slate-300'>
                        <div className='leading-5'>
                            <Link
                                className='italic font-bold gap-x-2 text-xl lg:text-2xl text-black dark:text-white flex items-center'
                                href='/'
                            >
                                <Image
                                    src={logo}
                                    alt='Logo'
                                    width={32}
                                    height={32}
                                    // blurDataURL="data:..." automatically provided
                                    // placeholder="blur" // Optional blur-up while loading
                                />
                                ToraO
                            </Link>
                        </div>
                        {/* <div className='hidden lg:flex items-center justify-between gap-x-8'>
                            <div className='text-slate-900 dark:text-white'>
                                Beranda
                            </div>
                            <div>Screencast</div>
                            <div>Topik</div>
                            <div>Artikel</div>
                        </div> */}
                    </div>
                    <div className='hidden lg:flex items-center justify-between gap-x-1'>
                        <SearchModal />
                        <ToggleTheme />
                        {/* <button className='px-4 py-2 dark:bg-slate-700/90 border border-slate-400 dark:border-slate-500 text-sm font-semibold rounded-md'>
                            Masuk
                        </button>
                        <button className='px-4 py-2 dark:bg-slate-700/90  border border-slate-400 dark:border-slate-500 text-sm font-semibold rounded-md'>
                            Daftar
                        </button> */}
                    </div>
                    <div className='flex items-center gap-x-1 lg:hidden'>
                        <SearchModal />
                        <ToggleTheme />
                    </div>
                </div>
            </div>
        </>
    )
}
