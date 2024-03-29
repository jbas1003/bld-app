import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EventTypes from './EventTypes/EventTypes';
import DTEventTypes from './EventTypes/DTEventTypes';
import EventTypeCategories from './EventTypeCategories/EventTypeCategories';
import DTEventTypeCategories from './EventTypeCategories/DTEventTypeCategories';
import Events from './Events/Events';
import DTEvents from './Events/DTEvents';
import MemberStatus from './MemberStatus/MemberStatus';
import DTMemberStatus from './MemberStatus/DTMemberStatus';
import MemberAccounts from './MemberAccounts/MemberAccounts';
import DTMemberAccounts from './MemberAccounts/DTMemberAccounts';

const Config = () => {
    const [currentTab, setCurrentTab] = useState();
    const [showEventTypes, setShowEventTypes] = useState();
    const [showEvents, setShowEvents] = useState();
    const [showMemberStatus, setShowMemberStatus] = useState();
    const [showEventTypeCategories, setShowEventTypeCategories] = useState();
    const [showMemberAccounts, setShowMemberAccounts] = useState();

    const CurrentTab = (tab) => {
        setCurrentTab(tab);
        switch (tab) {
            
          case "events":
              setShowEventTypeCategories(false);
              setShowEventTypes(false);
              setShowEvents(true);
              setShowMemberStatus(false);
              setShowEventTypeCategories(false);
              setShowMemberAccounts(false);
              break;

          case "eventTypes":
              setShowEventTypeCategories(false);
              setShowEventTypes(true);
              setShowEvents(false);
              setShowMemberStatus(false);
              setShowEventTypeCategories(false);
              setShowMemberAccounts(false);
              break;

          case "eventTypeCategories":
            setShowEventTypeCategories(true);
            setShowEventTypes(false);
            setShowEvents(false);
            setShowMemberStatus(false);
            setShowMemberAccounts(false);
            break;

          case "memberStatus":
              setShowEventTypeCategories(false);
              setShowEventTypes(false);
              setShowEvents(false);
              setShowMemberStatus(true);
              setShowEventTypeCategories(false);
              setShowMemberAccounts(false);
              break;

          case "memberAccounts":
            setShowEventTypeCategories(false);
            setShowEventTypes(false);
            setShowEvents(false);
            setShowMemberStatus(false);
            setShowEventTypeCategories(false);
            setShowMemberAccounts(true);
            break;

          default:
              break;
        }
    }

    
    return (
        
        <div className="mb-10 border-b border-gray-100 font-alegreya">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500">
                <li className="mr-2">
                    <Link onClick={() => CurrentTab("events")} className={`inline-flex p-4 border-b-2 ${currentTab === 'events' ? "text-Red border-Red rounded-t-lg active" : "border-transparent rounded-t-lg hover:text-Red hover:border-Red"} group`}>
                      <svg fill="none" stroke="currentColor" className={`w-5 h-5 mr-2 ${currentTab === 'events' ? "text-Red" : "text-gray-500 group-hover:text-Red"}`} strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" />
                      </svg>
                      <label className='font-semibold'>Events</label>
                    </Link>
                </li>
                <li className="mr-2">
                    <Link onClick={() => CurrentTab("eventTypes")} className={`inline-flex p-4 border-b-2 ${currentTab === 'eventTypes' ? "text-Red border-Red rounded-t-lg active" : "border-transparent rounded-t-lg hover:text-Red hover:border-Red"} group`}>
                      <svg fill="none" stroke="currentColor" className={`w-5 h-5 mr-2 ${currentTab === 'eventTypes' ? "text-Red" : "text-gray-500 group-hover:text-Red"}`} strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
                      </svg>
                      <label className='font-semibold'>Event Types</label>
                    </Link>
                </li>
                <li className="mr-2">
                    <Link onClick={() => CurrentTab("eventTypeCategories")} className={`inline-flex p-4 border-b-2 ${currentTab === 'eventTypeCategories' ? "text-Red border-Red rounded-t-lg active" : "border-transparent rounded-t-lg hover:text-Red hover:border-Red"} group`}>
                      <svg fill="none" stroke="currentColor" className={`w-5 h-5 mr-2 ${currentTab === 'eventTypeCategories' ? "text-Red" : "text-gray-500 group-hover:text-Red"}`} strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z" />
                      </svg>
                      <label className='font-semibold'>Event Categories</label>
                    </Link>
                </li>
                <li className="mr-2">
                    <Link onClick={() => CurrentTab("memberStatus")} className={`inline-flex p-4 border-b-2 ${currentTab === 'memberStatus' ? "text-Red border-Red rounded-t-lg active" : "border-transparent rounded-t-lg hover:text-Red hover:border-Red"} group`}>
                      <svg fill="none" stroke="currentColor" className={`w-5 h-5 mr-2 ${currentTab === 'memberStatus' ? "text-Red" : "text-gray-500 group-hover:text-Red"}`} strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                      </svg>
                      <label className='font-semibold'>Member Status</label>
                    </Link>
                </li>
                
                <li className="mr-2">
                    <Link onClick={() => CurrentTab("memberAccounts")} className={`inline-flex p-4 border-b-2 ${currentTab === 'memberAccounts' ? "text-Red border-Red rounded-t-lg active" : "border-transparent rounded-t-lg hover:text-Red hover:border-Red"} group`}>
                      <svg fill="none" stroke="currentColor" className={`w-5 h-5 mr-2 ${currentTab === 'memberAccounts' ? "text-Red" : "text-gray-500 group-hover:text-Red"}`} strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                      </svg>
                      <label className='font-semibold'>Member Accounts</label>
                    </Link>
                </li>
            </ul>

            <EventTypeCategories show={showEventTypeCategories}>
              <DTEventTypeCategories />
            </EventTypeCategories>

            <EventTypes show={showEventTypes}>
                <DTEventTypes />
            </EventTypes>

            <Events show={showEvents}>
              <DTEvents />
            </Events>

            <MemberStatus show={showMemberStatus }>
              <DTMemberStatus />
            </MemberStatus>

            <MemberAccounts show={showMemberAccounts}>
                <DTMemberAccounts />
            </MemberAccounts>
        </div>

    )
}

export default Config