import React from 'react';
import useAuthContext from '../../utils/AuthContext';
import { Link } from 'react-router-dom';
import LogoWhite from '../../assets/brand-white.png';

const TopNav = () => {
    const { memberLogout, loginResult } = useAuthContext();
  return (
    <>
        <nav className="fixed font-alegreya top-0 z-50 w-full bg-Red border-b border-gray-200">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start">
                        <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                            <span className="sr-only">Open sidebar</span>
                            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                            </svg>
                        </button>
                        <Link to="https://flowbite.com" className="flex ml-2 md:mr-24">
                            <img src={LogoWhite} className="h-8 mr-3" alt="BLD-Logo" />
                            <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-white">BLD</span>
                        </Link>
                    </div>
                    <div className="flex items-center">
                        <div className="flex items-center ml-3">
                            <div>
                                <button id="dropdownUserAvatarButton" data-modal-target="dropdownAvatar" className="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-red-300" type="button">
                                    <span className="sr-only">Open user menu</span>
                                    <img className="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="userPhoto"/>
                                </button>
                            </div>
                            <div className="z-10 border border-solid border-gray-200 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow" id="dropdownAvatar">
                                <div className="px-4 py-3 bg-Red" role="none">
                                    <p className="text-sm font-semibold text-WhiteSmoke" role="none">
                                        {loginResult.first_name} {loginResult.middle_name !== null & loginResult.middle_name !== undefined & loginResult.middle_name !== "" ? loginResult.middle_name.charAt(0) + ". " : null} {loginResult.last_name}
                                    </p>
                                </div>
                                <ul className="py-1" role="none">
                                    <li>
                                        <Link to=".." onClick={memberLogout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-Red hover:text-WhiteSmoke" role="menuitem">Sign out</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </>
  )
}

export default TopNav