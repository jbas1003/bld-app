import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Registration from './Registration/Registration';
import DTRegistration from './Registration/DTRegistration';
import Nations from './Nations/Nations';
import DTNations from './Nations/DTNations';
import Rooms from './Rooms/Rooms';
import DTRooms from './Rooms/DTRooms';
import Tribes from './Tribes/Tribes';
import DTTribes from './Tribes/DTTribes';

function YouthEncounter() {
    const [currentTab, setCurrentTab] = useState();
  const [showRegistration, setShowRegistration] = useState();
  const [showRooms, setShowRooms] = useState();
  const [showTribes, setShowTribes] = useState();
  const [showNations, setShowNations] = useState();

  const CurrentTab = (tab) => {
    setCurrentTab(tab);

    switch (tab) {
        case "registration":
            setShowRegistration(true);
            setShowRooms(false);
            setShowTribes(false);
            setShowNations(false);
            break;
        
        case "rooms":
            setShowRegistration(false);
            setShowRooms(true);
            setShowTribes(false);
            setShowNations(false);
            break;

        case "tribes":
          setShowRegistration(false);
          setShowRooms(false);
          setShowTribes(true);
          setShowNations(false);
          break;

        case "nations":
            setShowRegistration(false);
            setShowRooms(false);
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
                    <Link onClick={() => CurrentTab("rooms")} className={`inline-flex p-4 border-b-2 ${currentTab === 'rooms' ? "text-Red border-Red rounded-t-lg active" : "border-transparent rounded-t-lg hover:text-Red hover:border-Red"} group`}>
                      <svg fill="none" stroke="currentColor" className={`w-5 h-5 mr-2 ${currentTab === 'rooms' ? "text-Red" : "text-gray-500 group-hover:text-Red"}`} strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                      </svg>
                      <label className='font-semibold'>Rooms</label>
                    </Link>
                </li>
                <li className="mr-2">
                    <Link onClick={() => CurrentTab("tribes")} className={`inline-flex p-4 border-b-2 ${currentTab === 'tribes' ? "text-Red border-Red rounded-t-lg active" : "border-transparent rounded-t-lg hover:text-Red hover:border-Red"} group`}>
                      <svg fill="none" stroke="currentColor" className={`w-5 h-5 mr-2 ${currentTab === 'tribes' ? "text-Red" : "text-gray-500 group-hover:text-Red"}`} strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                      </svg>
                      <label className='font-semibold'>Tribes</label>
                    </Link>
                </li>
                <li className="mr-2">
                    <Link onClick={() => CurrentTab("nations")} className={`inline-flex p-4 border-b-2 ${currentTab === 'nations' ? "text-Red border-Red rounded-t-lg active" : "border-transparent rounded-t-lg hover:text-Red hover:border-Red"} group`}>
                      <svg fill="none" stroke="currentColor" className={`w-5 h-5 mr-2 ${currentTab === 'nations' ? "text-Red" : "text-gray-500 group-hover:text-Red"}`} strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5" />
                      </svg>
                      <label className='font-semibold'>Nations</label>
                    </Link>
                </li>
            </ul>
        </div>

        <Registration show={showRegistration}>
          <DTRegistration />
        </Registration>

        <Rooms show={showRooms}>
          <DTRooms />
        </Rooms>

        <Tribes show={showTribes}>
          <DTTribes />
        </Tribes>

        <Nations show={showNations}>
          <DTNations />
        </Nations>

    </>

  )
}

export default YouthEncounter