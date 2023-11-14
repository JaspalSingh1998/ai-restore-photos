import React from 'react'

export default function Footer() {
  return (
    <footer className='text-center h-16 sm:h-20 w-full sm:pt-2 pt-4 border-t mt-5 flex sm:flex-row flex-col justify-center items-center px-3 space-y-3 sm:mb-0 mb-3'>
        <div className='text-center'>
            Powered by {" "}
            <a className='font-bold transition hover:text-black/50' href="">Replicate, {" "}</a>
            <a className='font-bold transition hover:text-black/50' href="">Upload, {" "}</a>
            <a className='font-bold transition hover:text-black/50' href="">Nextjs, {" "}</a>
            <a className='font-bold transition hover:text-black/50' href="">and {" "}</a>
            <a className='font-bold transition hover:text-black/50' href="">Vercel. {" "}</a>
        </div>
    </footer>
  )
}
