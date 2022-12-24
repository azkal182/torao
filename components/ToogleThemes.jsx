'use client'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { IoDesktopOutline, IoSunnyOutline } from 'react-icons/io5'
import { RiMoonClearLine } from 'react-icons/ri'

const ThemeSwitcher = () => {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    // useEffect only runs on the client, so now we can safely show the UI
    useEffect(() => {
        setMounted(true)
    }, [])

    function handleSwitch(params) {
        switch (theme) {
            case 'system':
                setTheme('light')
                break
            case 'light':
                setTheme('dark')
                break
            default:
                setTheme('system')
                break
        }
    }

    if (!mounted) {
        return null
    }

    return (
        <>
            {theme === 'system' && (
                <button
                    className='px-3 py-2 dark:bg-slate-700/90 border border-slate-400 dark:border-slate-500 rounded-md hover:bg-slate-100 dark:hover:bg-slate-600'
                    onClick={handleSwitch}
                >
                    {' '}
                    <IoDesktopOutline size={20} />
                    {/* <IoDesktopOutline size={20} /> */}
                </button>
            )}
            {theme === 'light' && (
                <button
                    className='px-3 py-2 dark:bg-slate-700/90 border border-slate-400 dark:border-slate-500 rounded-md hover:bg-slate-100 dark:hover:bg-slate-600'
                    onClick={handleSwitch}
                >
                    {' '}
                    <IoSunnyOutline size={20} />
                    {/* <IoDesktopOutline size={20} /> */}
                </button>
            )}
            {theme === 'dark' && (
                <button
                    className='px-3 py-2 dark:bg-slate-700/90 border border-slate-400 dark:border-slate-500 rounded-md hover:bg-slate-100 dark:hover:bg-slate-600'
                    onClick={handleSwitch}
                >
                    {' '}
                    <RiMoonClearLine
                        className='text-yellow-300'
                        size={20}
                    />
                    {/* <IoDesktopOutline size={20} /> */}
                </button>
            )}
        </>
    )
}

export default ThemeSwitcher
