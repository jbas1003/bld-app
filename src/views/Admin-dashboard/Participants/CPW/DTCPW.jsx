import React, { useState, useEffect } from 'react';
import { GetAttendanceList } from '../../../../utils/AttendanceMethod';

const DTCPW = () => {
    // const [eventData, setEventData] = useState();
    // const [eventStatus, setEventStatus] = useState();

    const [attendanceData, setAttendanceData] = useState();
    const [attendanceStatus, setAttendanceStatus] = useState();

    const event = 'CPW';
    const [eventDate, setEventDate] = useState();

    function tableSearch() {
        // Declare variables
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("table-search");
        filter = input.value.toUpperCase();
        table = document.getElementById("CPWDTbl");
        tr = table.getElementsByTagName("tr");

        // Loop through all table rows, and hide those who don't match the        search query
        for (i = 1; i < tr.length; i++) {
            td = tr[i];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }

    const getAttendanceList = (eventDate) => {
        GetAttendanceList(event, eventDate)
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
        getAttendanceList(eventDate);
    }, [eventDate])
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex items-center justify-between py-4 px-2 bg-white dark:bg-gray-900">
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
                <label htmlFor="default" className="block -mt-5 mb-2 text-sm font-medium text-gray-900 dark:text-white">Select CPW Date</label>
                <input id='fo_eventDate' type="date" className="block w-60 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Birthday"
                    onChange={e => {setEventDate(e.target.value)}}
                    value={
                        eventDate !== null ?
                            eventDate
                        :""
                    }
                />
            </div>

            <div></div>
        </div>
        <div className='overflow-x-auto overflow-scroll max-h-[600px]'>
            <table id='CPWDTbl' className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th className="px-6 py-3">
                            Name
                        </th>
                        <th className="px-6 py-3">
                            Birthday (YYYY-MM-DD)
                        </th>
                        <th className="px-6 py-3">
                            Gender
                        </th>
                        <th className="px-6 py-3">
                            Civil Status
                        </th>
                        <th className="px-6 py-3">
                            Event
                        </th>
                        <th className="px-6 py-3">
                            Attendance Status
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        attendanceStatus ?
                            attendanceData.map(data => (
                                <tr>
                                    <td className="px-6 py-3">
                                        {data.first_name} {data.middle_name.charAt(0)}. {data.last_name}
                                    </td>
                                    <td className="px-6 py-3">
                                        {data.birthday}
                                    </td>
                                    <td className="px-6 py-3">
                                        {data.gender}
                                    </td>
                                    <td className="px-6 py-3">
                                        {data.civil_status}
                                    </td>
                                    <td className="px-6 py-3">
                                        {data.event_subtitle}
                                    </td>
                                    <td className="px-6 py-3">
                                        {data.status}
                                    </td>
                                </tr>
                            ))
                        :
                        <tr>
                            <th colSpan={5} className="px-6 py-3 text-center">{attendanceData} Probably because the event does not exist or is not active. Or maybe the event has not arrived yet.</th>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
                </div>
    )
}

export default DTCPW;