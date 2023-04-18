import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import DTRegistration from './Registration/DTRegistration';
import Registration from './Registration/Registration';
import Nations from './Nations/Nations';
import DTNations from './Nations/DTNations';
import CPW from './CPW/CPW';
import DTCPW from './CPW/DTCPW';
import WSC from './WSC/WSC';
import DTWSC from './WSC/DTWSC';

const Participants = () => {

  const [currentTab, setCurrentTab] = useState();
  const [showRegistration, setShowRegistration] = useState();
  const [showCPW, setShowCPW] = useState();
  const [showTribes, setShowTribes] = useState();
  const [showNations, setShowNations] = useState();

  const CurrentTab = (tab) => {
    setCurrentTab(tab);

    switch (tab) {
        case "registration":
            setShowRegistration(true);
            setShowCPW(false);
            setShowTribes(false);
            setShowNations(false);
            break;
        
        case "cpw":
            setShowRegistration(false);
            setShowCPW(true);
            setShowTribes(false);
            setShowNations(false);
            break;

        case "wsc":
          setShowRegistration(false);
          setShowCPW(false);
          setShowTribes(true);
          setShowNations(false);
          break;

        case "nations":
            setShowRegistration(false);
            setShowCPW(false);
            setShowTribes(false);
            setShowNations(true);
            break;

        default:
            break;
    }
  }  

  return (
    
    <>

      <div className="font-alegreya border-b border-gray-100 mb-10">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500">
                <li className="mr-2">
                    <Link onClick={() => CurrentTab("registration")} className={`inline-flex p-4 border-b-2 ${currentTab === 'registration' ? "text-Red border-Red rounded-t-lg active" : "border-transparent rounded-t-lg hover:text-Red hover:border-Red"} group`}>
                      <svg fill="none" stroke="currentColor" className={`w-5 h-5 mr-2 ${currentTab === 'registration' ? "text-Red" : "text-gray-500 group-hover:text-Red"}`} strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"></path>
                      </svg>
                      <label className='font-semibold'>Registration</label>
                    </Link>
                </li>
                <li className="mr-2">
                    <Link onClick={() => CurrentTab("cpw")} className={`inline-flex p-4 border-b-2 ${currentTab === 'cpw' ? "text-Red border-Red rounded-t-lg active" : "border-transparent rounded-t-lg hover:text-Red hover:border-Red"} group`}>
                      <svg fill="none" stroke="currentColor" className={`w-5 h-5 mr-2 ${currentTab === 'cpw' ? "text-Red" : "text-gray-500 group-hover:text-Red"}`} strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                      </svg>
                      <label className='font-semibold'>CPW Attendance</label>
                    </Link>
                </li>
                <li className="mr-2">
                    <Link onClick={() => CurrentTab("wsc")} className={`inline-flex p-4 border-b-2 ${currentTab === 'wsc' ? "text-Red border-Red rounded-t-lg active" : "border-transparent rounded-t-lg hover:text-Red hover:border-Red"} group`}>
                      <svg fill="none" stroke="currentColor" className={`w-5 h-5 mr-2 ${currentTab === 'wsc' ? "text-Red" : "text-gray-500 group-hover:text-Red"}`} strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                      </svg>
                      <label className='font-semibold'>WSC Attendance</label>
                    </Link>
                </li>
                <li className="mr-2">
                    <Link onClick={() => CurrentTab("nations")} className={`inline-flex p-4 border-b-2 ${currentTab === 'nations' ? "text-Red border-Red rounded-t-lg active" : "border-transparent rounded-t-lg hover:text-Red hover:border-Red"} group`}>
                      <svg fill="none" stroke="currentColor" className={`w-5 h-5 mr-2 ${currentTab === 'nations' ? "text-Red" : "text-gray-500 group-hover:text-Red"}`} strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5"></path>
                      </svg>
                      <label className='font-semibold'>Nations</label>
                    </Link>
                </li>
            </ul>
        </div>

        <Registration show={showRegistration}>
          <DTRegistration />
        </Registration>

        <CPW show={showCPW}>
          <DTCPW />
        </CPW>

        <WSC show={showTribes}>
          <DTWSC />
        </WSC>

        <Nations show={showNations}>
          <DTNations />
        </Nations>

    </>

  )
}

export default Participants;