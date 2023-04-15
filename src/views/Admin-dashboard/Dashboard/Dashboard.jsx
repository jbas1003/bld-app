import React, { useState, useEffect } from 'react';
import { GetAllEvents } from '../../../utils/EventsMethods';

const Dashboard = () => {

  const [eventData, setEventData] = useState();
  const [status, setStatus] = useState();
  const [currentEvent, setCurrentEvent] = useState();
  
  const getEvents = () => {
    GetAllEvents()
      .then(async result => {return await result.json()})
      .then(async result => {
        if (await result.status === 200) {
          setStatus(true);

          window.localStorage.setItem("eventData", JSON.stringify(result.body));
          setEventData(JSON.parse(window.localStorage.getItem("eventData")));
        } else {
          setStatus(false);
          alert('There are no events available. Please contact and request authorized personnel to create an event.');
        }
      })
  }

  const setEvent = (selectedEvent) => {
    if (selectedEvent !== currentEvent) {
      window.localStorage.clear();
      window.localStorage.setItem('event', JSON.stringify(selectedEvent));
      setCurrentEvent(JSON.parse(window.localStorage.getItem('event')));
      console.log(currentEvent)
    } else {
      setCurrentEvent('');
    }
  }

  useEffect(() => {
    getEvents();
  }, [])
  return (
    <>
      <label htmlFor="default" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Event</label>
      <select id="default" className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        onChange={e => {setEvent(e.target.value)}}
        value={
          currentEvent !== null ?
            currentEvent
          : " "
        }
      >
        <option defaultValue={" "}>Choose an event</option>
        {
          status ?
            eventData.map(event => (
              event.status.toLowerCase() === 'active' ?
                <option value={event.event_id}>{event.event_name}</option>
              : null
            ))
          :null
        }
      </select>
    </>
  )
}

export default Dashboard;