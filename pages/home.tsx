'use client'
import {useState, useEffect, useRef} from 'react';
import {Route, Routes, Switch, Redirect, Link} from 'react-router-dom'

export default function Home() {
    return(
        <div class = "grid ">
            <h1 class = "relative  text-gray-50 text-2xl min-[500px]:text-3xl sm:text-4xl md:text-5xl lg:text-6xl z-10 mx-auto mt-10 animate-pulse">Welcome to Synapse!</h1>


            <div class = "grid ">
                <h1 class = "relative  text-gray-50 text-2xl min-[500px]:text-3xl sm:text-4xl md:text-5xl lg:text-6xl z-10 mx-auto mt-10 animate-pulse">Welcome to Synapse!</h1>
                    
                <div class = "relative mt-10 mx-auto">
                        <a href="#" class="block max-w-xl p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                            <p class="font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                        </a>

                        </div>  

                <button type="button"  onClick={() => setShowInfo(true)} class="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-700 font-medium rounded-lg text-sm absolute bottom-5 right-5 px-5 py-2.5 text-center inline-flex items-center dark:bg-gray-700 dark:hover:bg-gray-800 dark:focus:ring-gray-800 z-10 md:text-xl md:px-7 md:py-3 md:bottom-7 md:right-7">
                <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z"/>
                Know More!
                </button>

            </div>
        </div>
    )
}