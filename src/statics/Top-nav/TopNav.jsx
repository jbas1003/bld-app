import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import React from 'react';
import useAuthContext from '../../utils/AuthContext';
import { Link } from 'react-router-dom';
// import Logo from '../../assets/logo.svg'

const TopNav = () => {
    const { memberLogout, loginResult } = useAuthContext();

    // const navigation = [
    //     { name: 'Dashboard', href: '#', current: true },
    //     { name: 'Team', href: '#', current: false },
    //     { name: 'Projects', href: '#', current: false },
    //     { name: 'Calendar', href: '#', current: false },
    //   ]

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
      }
  return (
    <>
        <Disclosure as="nav" className="fixed top-0 z-50 w-full p-3 border-b border-gray-200 font-alegreya bg-Red">
      {({ open }) => (
        <>
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
                            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                            className='h-8 mr-3' viewBox="0 0 539.000000 522.000000"
                            preserveAspectRatio="xMidYMid meet">

                                <g transform="translate(0.000000,522.000000) scale(0.100000,-0.100000)"
                                fill="WhiteSmoke" stroke="none">
                                    <path d="M1840 5180 c-208 -20 -398 -77 -605 -180 -288 -143 -482 -316 -667
                                    -595 -271 -408 -382 -845 -338 -1335 18 -191 56 -386 155 -790 124 -508 129
                                    -536 129 -750 0 -138 -3 -189 -18 -239 -57 -205 -181 -365 -385 -499 -47 -31
                                    -88 -58 -91 -60 -9 -7 60 -60 175 -136 439 -291 912 -455 1535 -533 209 -26
                                    794 -26 995 0 734 95 1301 364 1785 847 725 724 1044 1723 743 2325 -121 241
                                    -380 452 -635 517 -70 17 -102 20 -213 15 -145 -6 -238 -28 -394 -95 -122 -53
                                    -192 -102 -302 -211 -263 -261 -389 -614 -389 -1088 0 -427 -177 -808 -449
                                    -967 -240 -140 -518 -139 -921 3 -291 103 -464 116 -705 51 -180 -48 -165 -48
                                    -165 -9 0 57 27 164 56 226 36 75 115 158 184 193 69 34 76 36 243 55 304 35
                                    469 112 526 245 32 75 46 196 32 288 -24 163 -98 274 -372 557 -202 209 -236
                                    260 -264 392 -62 291 85 646 342 830 70 50 177 99 240 109 l40 6 -28 -84 c-41
                                    -123 -60 -218 -66 -343 -13 -260 64 -457 232 -595 99 -81 159 -151 201 -235
                                    87 -176 82 -360 -20 -650 -19 -55 -33 -102 -31 -104 8 -7 192 159 300 270 284
                                    294 471 606 557 929 28 104 31 133 36 313 7 292 -21 453 -108 629 -54 108 -90
                                    159 -185 257 -151 157 -376 307 -558 370 -178 62 -407 89 -597 71z m335 -1087
                                    c25 -87 79 -182 156 -275 174 -210 201 -247 238 -318 21 -41 46 -99 55 -129
                                    30 -101 18 -262 -31 -421 l-17 -55 -7 76 c-9 86 -41 174 -90 246 -18 26 -83
                                    100 -144 163 -60 63 -125 138 -142 165 -70 110 -103 277 -83 415 10 70 39 190
                                    46 190 1 0 10 -26 19 -57z m-751 -246 c-93 -259 -59 -547 89 -742 25 -33 74
                                    -84 110 -113 102 -82 234 -219 284 -295 63 -95 93 -183 93 -279 0 -42 -4 -80
                                    -10 -83 -5 -3 -10 0 -10 7 0 29 -61 140 -102 184 -47 51 -102 91 -248 179
                                    -190 114 -286 213 -361 370 -100 207 -89 466 28 663 35 59 141 187 149 180 2
                                    -2 -8 -34 -22 -71z"/>
                                </g>
                            </svg>
                            <span className="self-center text-xl font-semibold text-white sm:text-2xl whitespace-nowrap">BLD</span>
                        </Link>
                    </div>
                    
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        {/* Mobile menu button*/}
                        <Disclosure.Button className="relative inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Open main menu</span>
                            {open ? (
                            <XMarkIcon className="block w-6 h-6" aria-hidden="true" />
                            ) : (
                            <Bars3Icon className="block w-6 h-6" aria-hidden="true" />
                            )}
                        </Disclosure.Button>
                    </div>
                
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        {/* Profile dropdown */}
                        <Menu as="div" className="relative ml-3">
                            <div>
                                <Menu.Button className="relative flex text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                    <span className="absolute -inset-1.5" />
                                    <span className="sr-only">Open user menu</span>
                                    <img
                                    className="w-8 h-8 rounded-full"
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    alt=""
                                    />
                                </Menu.Button>
                            </div>
                            <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <Menu.Item>
                                    {({ active }) => (
                                        <span
                                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                        >
                                            {loginResult.first_name} {loginResult.middle_name !== null & loginResult.middle_name !== undefined & loginResult.middle_name !== "" ? loginResult.middle_name.charAt(0) + ". " : null} {loginResult.last_name}
                                        </span>
                                    )}
                                    </Menu.Item>
                                    <Menu.Item>
                                    {({ active }) => (
                                        <Link to=".." onClick={memberLogout}
                                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                        >
                                        Sign out
                                        </Link>
                                    )}
                                    </Menu.Item>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    </div>
                </div>
            </div>
        </>
      )}
    </Disclosure>

    </>
  )
}

export default TopNav