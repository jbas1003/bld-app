import React, { useState, useEffect } from 'react';
import { GetAttendanceList } from '../../../../utils/AttendanceMethod';
import { GetAllEvents } from '../../../../utils/EventsMethods';

const DTWSC = () => {
    const [attendanceData, setAttendanceData] = useState();
    const [attendanceStatus, setAttendanceStatus] = useState();

    const [eventStatus, setEventStatus] = useState();
    const [eventData, setEventData] = useState();
    const [eventId, setEventId] = useState();

    // const [selInput, setSelInput] = useState();
    // const [searchEvent, setSearchEvent] = useState();

    const event = 'Teaching';
    const [eventDate, setEventDate] = useState();

    function handleDateEvent (date) {
        setEventId('');
        setEventDate(date);
    }

    function handleEvent (eventId) {
        setEventDate('');
        setEventId(eventId);
    }

    function tableSearch() {
        // Declare variables
        var input,txtFilter, table, tr, td, i, txtValue;
        input = document.getElementById("table-search");
        txtFilter = input.value.toUpperCase();

        table = document.getElementById("CPWDTbl");
        tr = table.getElementsByTagName("tr");

        // Loop through all table rows, and hide those who don't match the        search query
        for (i = 1; i < tr.length; i++) {
            td = tr[i];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(txtFilter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }

    const getEvents = () => {
        GetAllEvents()
          .then(async result => {return await result.json()})
          .then(result => {
            if (result.status === 200) {
                setEventStatus(true);
              setEventData(result.body);
            } else {
                setEventStatus(false);
              alert('There are no events available. Please contact and request authorized personnel to create an event.');
            }
          })
      }

    const getAttendanceList = (eventDate, eventId) => {
        GetAttendanceList(event, eventDate, eventId)
            .then(async result => {return await result.json()})
            .then(async result => {
                if (result.status === 200) {
                    setAttendanceStatus(true);
                    setAttendanceData(result.body);
                } else {
                    setAttendanceStatus(false);
                    setAttendanceData(result.message);
                }
            })
    }

    useEffect(() => {
        getEvents();
        getAttendanceList(eventDate, eventId);
    }, [eventDate, eventId])
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="flex items-center justify-between px-2 py-4 bg-white dark:bg-gray-900">
                <label htmlFor="table-search" className="sr-only">Search</label>
                <div className="relative mt-1">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                    </div>
                    <input type="text" id="table-search"
                        onKeyUp={() => tableSearch()}
                        className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search"
                    />
                </div>

                <div>
                    <label htmlFor="default" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Event</label>
                    <select id="selSearch" className="w-72 bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                        onChange={(e) => {handleEvent(e.target.value)}}
                        value={
                            eventId !== null ?
                                eventId
                        : alert('No Event was selected. Please select an event.')
                        }
                    >
                        <option value={""}>Choose an event</option>
                        {
                            eventStatus ?
                                eventData !== null & eventData !== undefined ?
                                    eventData.map(event => (
                                        event.event_type_category === 9 ?
                                            <option value={event.event_id}>{event.event_subtitle}</option>
                                        : null
                                    ))
                                : <option>No events found...</option>
                            : null
                        }
                    </select>
                </div>

                <div>
                    <label htmlFor="default" className="block mb-2 -mt-5 text-sm font-medium text-gray-900 dark:text-white">Select Teaching Date</label>
                    <input id='fo_eventDate' type="date" className="block text-sm text-gray-900 bg-transparent border-gray-300 rounded-lg appearance-none w-60 border-1 dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Birthday"
                        onChange={e => {handleDateEvent(e.target.value)}}
                        value={
                            eventDate !== null ?
                                eventDate
                            :""
                        }
                    />
                </div>
            </div>
            <div className='overflow-x-auto overflow-scroll max-h-[600px]'>
                <table id='CPWDTbl' className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th className="px-6 py-3 whitespace-nowrap w-[30%]">
                                Name
                            </th>
                            <th className="px-6 py-3 whitespace-nowrap w-[10%]">
                                Birthday (YYYY-MM-DD)
                            </th>
                            <th className="px-6 py-3 whitespace-nowrap w-[10%]">
                                Gender
                            </th>
                            <th className="px-6 py-3 whitespace-nowrap w-[10%]">
                                Civil Status
                            </th>
                            <th className="px-6 py-3 whitespace-nowrap w-[30%]">
                                Event
                            </th>
                            <th className="px-6 py-3 whitespace-nowrap w-[10%]">
                                Attendance Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            attendanceStatus ?
                                attendanceData.map(data => (
                                    <tr>
                                        <td className="px-6 py-3 whitespace-nowrap w-[30%]">
                                            {data.first_name} {data.middle_name !== null & data.middle_name !== undefined & data.middle_name !== "" ? data.middle_name.charAt(0) + "." : ""} {data.last_name}
                                        </td>
                                        <td className="px-6 py-3 whitespace-nowrap w-[10%]">
                                            {data.birthday}
                                        </td>
                                        <td className="px-6 py-3 whitespace-nowrap w-[10%]">
                                            {data.gender}
                                        </td>
                                        <td className="px-6 py-3 whitespace-nowrap w-[10%]">
                                            {data.civil_status}
                                        </td>
                                        <td className="px-6 py-3 whitespace-nowrap w-[30%]">
                                            {data.event_subtitle}
                                        </td>
                                        <td className="px-6 py-3 whitespace-nowrap w-[10%]">
                                            {data.status}
                                        </td>
                                    </tr>
                                ))
                            :
                            <tr>
                                <th colSpan={6} className="px-6 py-3 text-center">{attendanceData} Probably because the event does not exist or is not active. Or maybe the event has not arrived yet.</th>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default DTWSC;