import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const SideNav = () => {
    const location = useLocation();

    const { pathname } = location;

    const splitLocation = pathname.split("/admin/");
  return (
    <>
    
        <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen pt-[89px] transition-transform -translate-x-full border-r border-gray-200 font-alegreya bg-Red sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
            <div className="h-full overflow-y-auto bg-Red">
                <ul className="pl-4 space-y-2 font-medium">
                    <li className={`rounded-r-xl ${splitLocation[1] === "dashboard" ? "bg-DarkRed" : "hover:bg-DarkRed"}`}>
                        <Link to="/admin/dashboard" className="flex items-center p-2 text-WhiteSmoke dark:text-whiteselection:bg-DarkRed">
                            <svg fill="none" className="flex-shrink-0 w-6 h-6 transition duration-75 text-WhiteSmoke dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"></path>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z"></path>
                            </svg>
                            <span className="ml-3 font-semibold text-WhiteSmoke">Dashboard</span>
                        </Link>
                    </li>
                    <li className={`rounded-r-xl ${splitLocation[1] === "attendance" ? "bg-DarkRed" : "hover:bg-DarkRed"}`}>
                        <Link to="/admin/attendance" className="flex items-center p-2 text-WhiteSmoke dark:text-white">
                            <svg fill="none" className="flex-shrink-0 w-6 h-6 transition duration-75 text-WhiteSmoke dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                            </svg>
                            <span className="flex-1 ml-3 font-semibold whitespace-nowrap text-WhiteSmoke">Attendance</span>
                        </Link>
                    </li>

                    <li className={`rounded-r-xl ${splitLocation[1] === "marriage_encounter" ? "bg-DarkRed" : "hover:bg-DarkRed"}`}>
                        <Link to="/admin/marriage_encounter" className="flex items-center p-2 text-WhiteSmoke dark:text-white">
                            <svg fill="none" className="flex-shrink-0 w-6 h-6 transition duration-75 text-WhiteSmoke dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                            </svg>
                            <span className="flex-1 ml-3 font-semibold whitespace-nowrap text-WhiteSmoke">Marriage Encounter</span>
                        </Link>
                    </li>
                    
                    <li className={`rounded-r-xl ${splitLocation[1] === "singles_encounter" ? "bg-DarkRed" : "hover:bg-DarkRed"}`}>
                        <Link exact to="/admin/singles_encounter" className="flex items-center p-2 text-WhiteSmoke dark:text-white">
                            <svg fill="none" className="flex-shrink-0 w-6 h-6 transition duration-75 text-WhiteSmoke dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                            </svg>
                            <span className="flex-1 ml-3 font-semibold whitespace-nowrap text-WhiteSmoke">Singles Encounter</span>
                        </Link>
                    </li>

                    <li className={`rounded-r-xl ${splitLocation[1] === "youth_encounter" ? "bg-DarkRed" : "hover:bg-DarkRed"}`}>
                        <Link to="/admin/youth_encounter" className="flex items-center p-2 text-WhiteSmoke dark:text-white">
                            <svg fill="none" className="flex-shrink-0 w-6 h-6 transition duration-75 text-WhiteSmoke dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                            </svg>
                            <span className="flex-1 ml-3 font-semibold whitespace-nowrap text-WhiteSmoke">Youth Encounter</span>
                        </Link>
                    </li>

                    <li className={`rounded-r-xl ${splitLocation[1] === "config" ? "bg-DarkRed" : "hover:bg-DarkRed"}`}>
                        <Link to="/admin/config" className="flex items-center p-2 text-WhiteSmoke dark:text-white">
                            <svg fill="none" className="flex-shrink-0 w-6 h-6 transition duration-75 text-WhiteSmoke dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="flex-1 ml-3 font-semibold whitespace-nowrap text-WhiteSmoke">Configurations</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </aside>

    </>
  )
}

export default SideNav