/* eslint-disable @next/next/no-head-element */
import '../styles/globals.css'
import Providers from '../components/theme/Providers'
import Navbar from '../components/Navbar'
import { Inter } from '@next/font/google'
import Footer from '../components/Footer'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
    return (
        <html>
            <body
                className={`${inter.className} scrollbar-thin dark:scrollbar-thumb-slate-400 dark:scrollbar-track-slate-600 scrollbar-thumb-slate-600 scrollbar-track-slate-400 bg-gradient-to-t from-slate-300 to-slate-50 dark:bg-gradient-to-t dark:from-slate-900 dark:to-slate-800 bg-fixed`}
            >
                <Providers>
                    <Navbar />
                    <main>{children}</main>
                    <Footer />
                </Providers>
            </body>
        </html>
    )
}
