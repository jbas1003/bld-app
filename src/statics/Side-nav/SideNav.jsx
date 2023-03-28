import React from 'react';
import { Link } from 'react-router-dom';

const SideNav = () => {
  return (
    <>
        
        <aside id="logo-sidebar" className="fixed font-alegreya top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-Red border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
            <div className="h-full px-3 pb-4 overflow-y-auto bg-Red">
                <ul className="space-y-2 font-medium">
                    <li>
                        <Link to="/admin/dashboard" className="flex items-center p-2 text-WhiteSmoke rounded-lg dark:text-white hover:bg-DarkRed">
                        <svg fill="none" className="flex-shrink-0 w-6 h-6 text-WhiteSmoke transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"></path>
                            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z"></path>
                        </svg>
                            <span className="ml-3 font-semibold text-WhiteSmoke">Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/participants" className="flex items-center p-2 text-WhiteSmoke rounded-lg dark:text-white hover:bg-DarkRed">
                            <svg fill="none" className="flex-shrink-0 w-6 h-6 text-WhiteSmoke transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"></path>
                            </svg>
                            <span className="flex-1 ml-3 whitespace-nowrap font-semibold text-WhiteSmoke">Participants</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </aside>

    </>
  )
}

export default SideNav