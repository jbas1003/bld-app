import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import DTRegistration from './Registration/DTRegistration';
import Registration from './Registration/Registration';
import CPW from './CPW/CPW';
import DTCPW from './CPW/DTCPW';
import WSC from './WSC/WSC';
import DTWSC from './WSC/DTWSC';
import Teachings from './Teachings/Teachings';
import DTTeachings from './Teachings/DTTeachings';

const Participants = () => {

  const [currentTab, setCurrentTab] = useState();
  const [showRegistration, setShowRegistration] = useState();
  const [showCPW, setShowCPW] = useState();
  const [showWSC, setShowWSC] = useState();
  const [showTeachings, setShowTeachings] = useState();

  const CurrentTab = (tab) => {
    setCurrentTab(tab);

    switch (tab) {
        case "registration":
            setShowRegistration(true);
            setShowCPW(false);
            setShowWSC(false);
            setShowTeachings(false);
            break;
        
        case "cpw":
            setShowRegistration(false);
            setShowCPW(true);
            setShowWSC(false);
            setShowTeachings(false);
            break;

        case "wsc":
          setShowRegistration(false);
          setShowCPW(false);
          setShowWSC(true);
          setShowTeachings(false);
          break;

        case "teachings":
            setShowRegistration(false);
            setShowCPW(false);
            setShowWSC(false);
            setShowTeachings(true);
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
                      <label className='font-semibold'>CPW Attendance Record</label>
                    </Link>
                </li>
                <li className="mr-2">
                    <Link onClick={() => CurrentTab("wsc")} className={`inline-flex p-4 border-b-2 ${currentTab === 'wsc' ? "text-Red border-Red rounded-t-lg active" : "border-transparent rounded-t-lg hover:text-Red hover:border-Red"} group`}>
                      <svg fill="none" stroke="currentColor" className={`w-5 h-5 mr-2 ${currentTab === 'wsc' ? "text-Red" : "text-gray-500 group-hover:text-Red"}`} strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                      </svg>
                      <label className='font-semibold'>WSC Attendance Record</label>
                    </Link>
                </li>
                <li className="mr-2">
                    <Link onClick={() => CurrentTab("teachings")} className={`inline-flex p-4 border-b-2 ${currentTab === 'teachings' ? "text-Red border-Red rounded-t-lg active" : "border-transparent rounded-t-lg hover:text-Red hover:border-Red"} group`}>
                      <svg fill="none" stroke="currentColor" className={`w-5 h-5 mr-2 ${currentTab === 'teachings' ? "text-Red" : "text-gray-500 group-hover:text-Red"}`} strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                      </svg>
                      <label className='font-semibold'>Teachings Attendance Record</label>
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

        <WSC show={showWSC}>
          <DTWSC />
        </WSC>

        <Teachings show={showTeachings}>
          <DTTeachings />
        </Teachings>

    </>

  )
}

export default Participants;