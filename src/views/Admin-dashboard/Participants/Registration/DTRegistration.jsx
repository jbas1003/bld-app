import React, { useState, useEffect } from 'react';
import useAuthContext from '../../../../utils/AuthContext';
import { AddParticipant, GetAllParticipants, UpdateParticipant } from '../../../../utils/ParticipantsMethods';
import AddParticipants from './Modals/AddParticipants';
import PersonalInfo from './Modals/PersonalInfo';
import AddressInfo from './Modals/AddressInfo';
import WorkInfo from './Modals/WorkInfo';
import Result from './Modals/Result';
import EditParticipant from './Modals/EditParticipant';
import { GetAllEvents } from '../../../../utils/EventsMethods';
import { CreateAttendanceRecord, DeleteAttendanceRecord, GetAttendance } from '../../../../utils/AttendanceMethod';
import AttendanceWarning from './Modals/AttendanceWarning';

const DTRegistration = () => {
    const { loginResult } = useAuthContext()

    const [participants, setParticipants] = useState();
    const [status, setStatus] = useState();
    const [errors, setErrors] = useState(true);
    const [message, setMessage] = useState();
    const [isLoading, setIsLoading] = useState();

    const [attendanceRecord, setAttendanceRecord] = useState();
    const [attendanceStatus, setAttendanceStatus] = useState();
    const [attendance, setAttendance] = useState();
    const [memberId, setMemberId] = useState();
    const [attendanceMessage, setAttendanceMessage] = useState();

    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDeleteWarning, setShowDeleteWarning] = useState(false);
    const [showAttendanceWarning, setShowAttendanceWarning] = useState(false);

    const [currentStep, setCurrentStep] = useState();
    const [previousStep, setPreviousStep] = useState();
    const [showPersonalInfo, setShowPersonalInfo] = useState();
    const [showAddressinfo, setShowAddressinfo] = useState();
    const [showWorkinfo, setShowWorkinfo] = useState();
    const [showResult, setShowResult] = useState();

    const [participant, setParticipant] = useState(); 
    const [firstName, setFirstName] = useState();
    const [middleName, setMiddleName] = useState();
    const [lastName, setLastName] = useState();
    const [nickname, setNickname] = useState();
    const [mobile, setMobile] = useState();
    const [email, setEmail] = useState();
    const [birthday, setBirthday] = useState();
    const [gender, setGender] = useState();
    const [civilStatus, setCivilStatus] = useState();
    const [spouse, setSpouse] = useState();
    const [religion, setReligion] = useState();
    const [baptized, setBaptized] = useState();
    const [confirmed, setconfirmed] = useState();
    const [memberAddressLine1, setMemberAddressLine1] = useState();
    const [memberAddressLine2, setMemberAddressLine2] = useState();
    const [memberCity, setMemberCity] = useState();
    const [occupation, setOccupation] = useState();
    const [specialty, setSpecialty] = useState();
    const [company, setCompany] = useState();
    const [companyAddressLine1, setCompanyAddressLine1] = useState();
    const [companyAddressLine2, setCompanyAddressLine2] = useState();
    const [companyCity, setCompanyCity] = useState();

    const [eventData, setEventData] = useState();
    const [event, setEvent] = useState()

    function changeEvent (selectedEvent) {
        getAttendanceRecords(selectedEvent);
        setEvent(selectedEvent);
    }

    const Stepper = (step) => {

        switch (step) {
            case "personal":
                setCurrentStep("personal");
                setShowPersonalInfo(true);
                setShowAddressinfo(false);
                setShowWorkinfo(false);
                setShowResult(false);
                break;
            
            case "address":
                setPreviousStep("personal")
                setCurrentStep("address");
                setShowPersonalInfo(false);
                setShowAddressinfo(true);
                setShowWorkinfo(false);
                setShowResult(false);
                break;
            
            case "work":
                setPreviousStep("address")
                setCurrentStep("work");
                setShowPersonalInfo(false);
                setShowAddressinfo(false);
                setShowWorkinfo(true);
                setShowResult(false);
                break;
            
            case "result":
                setPreviousStep("work")
                setCurrentStep("result");
                setShowPersonalInfo(false);
                setShowAddressinfo(false);
                setShowWorkinfo(false);
                setShowResult(true);
                break;
        
            default:
                break;
        }
    }

    const showAddParticipant = () => {
        Stepper('personal')
        setShowAdd(true)
    }

    const attendanceWarning = (memberId, attendanceStatus, firstName, middleName, lastName) => {
        setMemberId(memberId);
        setAttendance(attendanceStatus);
        setFirstName(firstName);
        setMiddleName(middleName);
        setLastName(lastName);
        setShowAttendanceWarning(true);
    }

    const closeAttendanceWarning = () => {
        setMemberId('');
        setAttendance('');
        setFirstName('');
        setMiddleName('');
        setLastName('');
        setShowAttendanceWarning(false);
    }

    const closeAdd = () => {
        setFirstName(null);
        setMiddleName(null);
        setLastName(null);
        setNickname(null);
        setMobile(null);
        setEmail(null);
        setBirthday(null);
        setGender(null);
        setCivilStatus(null);
        setSpouse(null);
        setReligion(null);
        setBaptized(null);
        setconfirmed(null);
        setMemberAddressLine1(null);
        setMemberAddressLine2(null);
        setMemberCity(null);
        setOccupation(null);
        setSpecialty(null);
        setCompany(null);
        setCompanyAddressLine1(null);
        setCompanyAddressLine2(null);
        setCompanyCity(null);

        setShowAdd(false);
    }

    const closeEdit = () => {
        setFirstName(null);
        setMiddleName(null);
        setLastName(null);
        setNickname(null);
        setMobile(null);
        setEmail(null);
        setBirthday(null);
        setGender(null);
        setCivilStatus(null);
        setSpouse(null);
        setReligion(null);
        setBaptized(null);
        setconfirmed(null);
        setMemberAddressLine1(null);
        setMemberAddressLine2(null);
        setMemberCity(null);
        setOccupation(null);
        setSpecialty(null);
        setCompany(null);
        setCompanyAddressLine1(null);
        setCompanyAddressLine2(null);
        setCompanyCity(null);

        setShowEdit(false);
    }

    const editParticipant = (step, participant, firstName, middleName, lastName, nickname, mobile, email, birthday, gender, civilStatus, spouse, religion, baptized, confirmed, memberAddressLine1, memberAddressLine2, memberCity, occupation, specialty, company, companyAddressLine1, companyAddressLine2, companyCity) => {
        setParticipant(participant);
        setFirstName(firstName);
        setMiddleName(middleName);
        setLastName(lastName);
        setNickname(nickname);
        setMobile(mobile);
        setEmail(email);
        setBirthday(birthday);
        setGender(gender);
        setCivilStatus(civilStatus);
        setSpouse(spouse);
        setReligion(religion);
        setBaptized(baptized);
        setconfirmed(confirmed);
        setMemberAddressLine1(memberAddressLine1);
        setMemberAddressLine2(memberAddressLine2);
        setMemberCity(memberCity);
        setOccupation(occupation);
        setSpecialty(specialty);
        setCompany(company);
        setCompanyAddressLine1(companyAddressLine1);
        setCompanyAddressLine2(companyAddressLine2);
        setCompanyCity(companyCity);
        
        // console.log(`${step}, ${participant}, ${firstName}, ${middleName}, ${lastName}, ${nickname}, ${mobile}, ${email}, ${birthday}, ${gender}, ${civilStatus}, ${spouse}, ${religion}, ${baptized}, ${confirmed}, ${memberAddressLine1}, ${memberAddressLine2}, ${memberCity}, ${occupation}, ${specialty}, ${company}, ${companyAddressLine1}, ${companyAddressLine2}, ${companyCity}`)

        setShowEdit(true);

        switch (step) {
            case "personal":
                setCurrentStep("personal");
                setShowPersonalInfo(true);
                setShowAddressinfo(false);
                setShowWorkinfo(false);
                setShowResult(false);
                break;
            
            case "address":
                setPreviousStep("personal")
                setCurrentStep("address");
                setShowPersonalInfo(false);
                setShowAddressinfo(true);
                setShowWorkinfo(false);
                setShowResult(false);
                break;
            
            case "work":
                setPreviousStep("address")
                setCurrentStep("work");
                setShowPersonalInfo(false);
                setShowAddressinfo(false);
                setShowWorkinfo(true);
                setShowResult(false);
                break;
            
            case "result":
                setPreviousStep("work")
                setCurrentStep("result");
                setShowPersonalInfo(false);
                setShowAddressinfo(false);
                setShowWorkinfo(false);
                setShowResult(true);
                break;
        
            default:
                break;
        }
    }

    const addParticipants = () => {
        setIsLoading(true);
        AddParticipant(loginResult.__, firstName, middleName, lastName, nickname, mobile, email, birthday, gender, civilStatus, spouse, religion, baptized, confirmed, memberAddressLine1, memberAddressLine2, memberCity, occupation, specialty, company, companyAddressLine1, companyAddressLine2, companyCity)
            .then(async result => {return await result.json()})
            .then(async result => {
                if (await result.status === 200) {
                    setErrors(false)
                    alert(result.message)
                } else {
                    setErrors(true)
                    alert(result.message)
                }
                setIsLoading(false)
            })
            .catch(errors => console.log(errors))

        // console.log(`${loginResult.__}, ${firstName}, ${middleName}, ${lastName}, ${nickname}, ${mobile}, ${email}, ${birthday}, ${gender}, ${civilStatus}, ${spouse}, ${religion}, ${baptized}, ${confirmed}, ${memberAddressLine1}, ${memberAddressLine2}, ${memberCity}, ${occupation}, ${specialty}, ${company}, ${companyAddressLine1}, ${companyAddressLine2}, ${companyCity}`)
        
        getAttendanceRecords();
        Stepper('result');
        closeAdd();
    }

    const updateParticipant = () => {
        UpdateParticipant(participant, firstName, middleName, lastName, nickname, mobile, email, birthday, gender, civilStatus, spouse, religion, baptized, confirmed, memberAddressLine1, memberAddressLine2, memberCity, occupation, specialty, company, companyAddressLine1, companyAddressLine2, companyCity)
            .then(async result => {return await result.json()})
            .then(async result => {
                if (await result.status === 200) {
                    alert(`${firstName} ${middleName.charAt(0)}. ${lastName}'s record has been successfully updated!`)
                } else {
                    alert(result.message)
                }
            })
        getAttendanceRecords();
        closeEdit();
    }

    const createAttendance = () => {
        CreateAttendanceRecord(loginResult.__, memberId, event, attendance)
            .then(async result => {return await result.json()})
            .then(async result => {
                if (await result.status === 200) {
                    alert(`${firstName} ${middleName.charAt(0)}. ${lastName} was successfully tagged as ${attendance}`)
                } else {
                    alert(result.message);
                }
            })
        closeAttendanceWarning();
        getAttendanceRecords(event);
    }

    const resetAttendance = (attendance, firstName, middleName, lastName) => {
        DeleteAttendanceRecord(attendance)
            .then(async result => {return await result.json()})
            .then(async result => {
                if (await result.status === 200) {
                    alert(`${firstName} ${middleName.charAt(0)}. ${lastName}'s attendance record has been reset.`);
                } else {
                    alert(result.message);
                }
            })
        getAttendanceRecords();
    }

    const getEvents = () => {
        GetAllEvents()
          .then(async result => {return await result.json()})
          .then(result => {
            if (result.status === 200) {
              setStatus(true);
              setEventData(result.body);
            } else {
              setStatus(false);
              alert('There are no events available. Please contact and request authorized personnel to create an event.');
            }
          })
      }

      const getAttendanceRecords = (event) => {
            GetAttendance(event)
                .then(async result => {return await result.json()})
                .then(async result => {
                    if (await result.status === 200) {
                        setAttendanceStatus(true);
                        setAttendanceRecord(result.body);
                    } else {
                        setAttendanceStatus(false);
                        setAttendanceMessage(result.message);
                    }
                })
      }

    function tableSearch() {
        // Declare variables
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("table-search");
        filter = input.value.toUpperCase();
        table = document.getElementById("participantDTbl");
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

    useEffect(() => {
        getAttendanceRecords(event);
        getEvents();
    }, [event])

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="flex items-center justify-between py-4 px-2 bg-white dark:bg-gray-900">
                <label htmlFor="table-search" className="sr-only">Search</label>
                <div className="relative mt-1">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                    </div>
                    <input type="text" id="table-search" onKeyUp={() => tableSearch()} className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" />
                </div>

                <div>
                    <label htmlFor="default" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Event</label>
                    <select id="default" className="w-72 bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                        onChange={(e) => {changeEvent(e.target.value)}}
                        value={
                        event !== null ?
                            event
                        : alert('No Event was selected. Please select an event.')
                        }
                    >
                        <option defaultValue={" "}>Choose an event</option>
                        {
                            status ?
                                eventData !== null & eventData !== undefined ?
                                    eventData.map(event => (
                                        event.status.toLowerCase() === 'active' ?
                                            <option value={event.event_id}>{event.event_name}</option>
                                        : null
                                    ))
                                : <option>No events found...</option>
                            : null
                        }
                    </select>
                </div>

                <div>
                    <button type="button"
                        className="flex items-center text-white bg-green-800 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-700 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
                        onClick={showAddParticipant}
                    >
                    <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="flex-1 ml-3 whitespace-nowrap">Add New Participant</span>
                    </button>
                </div>
            </div>
            <table id='participantDTbl' className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th className="px-6 py-3">
                            Participant
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
                            Spouse
                        </th>
                        <th className="px-6 py-3">
                            Attendance
                        </th>
                        <th className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        attendanceStatus === true ?
                            attendanceRecord.map(items => (
                                <tr>
                                    <td className="px-6 py-3">
                                        {items.first_name} {items.middle_name.charAt(0)}. {items.last_name}
                                    </td>
                                    <td className="px-6 py-3">
                                        {items.birthday}
                                    </td>
                                    <td className="px-6 py-3">
                                        {items.gender}
                                    </td>
                                    <td className="px-6 py-3">
                                        {items.civil_status}
                                    </td>
                                    <td className="px-6 py-3">
                                        {
                                            items.spouse_member_id === null ?
                                                items.civil_status === 'Married' | items.civil_status === 'Single Parent' ?
                                                    'Spouse not found'
                                                : null
                                                
                                            :
                                                attendanceRecord.map(getSpouse => (
                                                    getSpouse.member_id === items.spouse_member_id ?
                                                        getSpouse.first_name + ' ' + getSpouse.middle_name.charAt(0) + ' ' + getSpouse.last_name
                                                    : null
                                                ))
                                                
                                        }
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                    {
                                            items.status !== '' ?
                                                items.status
                                            :
                                                event !== " " & event !== null & event !== undefined ?
                                                    <select id="attendance" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-42 p-2.5"
                                                        onChange={e => {attendanceWarning(items.member_id, e.target.value, items.first_name, items.middle_name, items.last_name)}}
                                                        value={
                                                            items.status !== '' | items.status !== null | items.status !== undefined ?
                                                                items.status
                                                            : ''
                                                        }
                                                    >
                                                        <option defaultValue={''}>Choose a tag</option>
                                                        <option value="On time">On time</option>
                                                        <option value="Late">Late</option>
                                                    </select>
                                                : null
                                        }
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap" style={{ cursor: "pointer", width: "20%" }}>
                                        <button type="button"
                                                className="text-green-800 border border-green-800 hover:bg-green-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-white font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:focus:ring-green-800"
                                                onClick={() => editParticipant('personal', items.member_id, items.first_name, items.middle_name, items.last_name, items.nickname, items.mobile, items.email, items.birthday, items.gender, items.civil_status, items.spouse_member_id, items.religion, items.baptism, items.confirmation, items.address_line1, items.address_line2, items.city, items.occupation_name, items.specialty, items.company, items.work_address_line1, items.work_address_line2, items.work_city)}
                                            >
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                </svg>
                                            </button>
                                        {
                                            items.status !== '' & items.status !== null & items.status !== undefined ?
                                                <button type="button"
                                                className="text-orange-400 border border-orange-400 hover:bg-orange-400 hover:text-white focus:ring-4 focus:outline-none focus:ring-white font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800"
                                                onClick={() => resetAttendance(items.attendance_id, items.first_name, items.middle_name, items.last_name)}
                                                >
                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
                                                    </svg>
                                                </button>
                                            : null
                                        }
                                        <button type="button"
                                            className="text-red-800 border border-red-800 hover:bg-red-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-white font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800"
                                            // onClick={() => ShowDeleteWarning(items.id, items.first_name, items.last_name)}
                                        >
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        :
                        <tr>
                            <th colSpan={5} className="px-6 py-3 text-center">
                                {attendanceMessage}
                            </th>
                        </tr>
                    }
                </tbody>
            </table>

            <AddParticipants show={showAdd} setShow={closeAdd}>
                <ol className="flex items-center w-full mb-4 sm:mb-5">
                    <li className={`flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-4 after:inline-block
                        ${ currentStep === 'personal' ?
                            'text-green-100 after:border-green-100'
                            : 'text-green-600 after:border-green-600'}
                    `}>
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0
                            ${ currentStep === 'personal'?
                                'bg-green-100 '
                            : 'bg-green-100 '}
                        `}>
                            <svg aria-hidden="true" className={`w-5 h-5 lg:w-6 lg:h-6
                                ${ currentStep === 'personal' ?
                                    'text-gray-500'
                                : 'text-green-600'}
                            `} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clipRule="evenodd"></path>
                            </svg>
                        </div>
                    </li>
                    <li className={`flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-4 after:inline-block
                        ${ currentStep === 'address' && previousStep === 'personal' ?
                            'text-green-100 after:border-green-100'
                            : currentStep === 'work' | currentStep === 'result' ?
                                'text-green-600 after:border-green-600'
                                :'text-green-100 after:border-gray-100'}
                    `}>
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0
                            ${ currentStep === 'address' && previousStep === 'personal' ?
                                'bg-green-100'
                            : currentStep === 'work' | currentStep === 'result' ?
                                'bg-green-100'
                                :'bg-gray-100'}
                        `}>
                            <svg aria-hidden="true" className={`w-5 h-5 lg:w-6 lg:h-6
                                ${ currentStep === 'address' && previousStep === 'personal' ?
                                    'text-gray-500'
                                : currentStep === 'work' | currentStep === 'result' ?
                                    'text-green-600'
                                    :'text-gray-500'}
                            `} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                                <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                            </svg>
                        </div>
                    </li>
                    <li className={`flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-4 after:inline-block
                        ${ currentStep === 'work' && previousStep === 'address' ?
                            'text-green-100 after:border-green-100'
                            : currentStep === 'result' ?
                                'text-green-600 after:border-green-600'
                                :'text-green-100 after:border-gray-100'}
                    `}>
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0
                            ${ currentStep === 'work' && previousStep === 'address' ?
                                'bg-green-100'
                            : currentStep === 'result' ?
                                'bg-green-100'
                                :'bg-gray-100'}
                        `}>
                            <svg aria-hidden="true" className={`w-5 h-5 lg:w-6 lg:h-6
                                ${ currentStep === 'work' && previousStep === 'address' ?
                                    'text-gray-500'
                                : currentStep === 'result' ?
                                    'text-green-600'
                                    : 'text-gray-500'}
                            `} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path clipRule="evenodd" fillRule="evenodd" d="M7.5 5.25a3 3 0 013-3h3a3 3 0 013 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0112 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 017.5 5.455V5.25zm7.5 0v.09a49.488 49.488 0 00-6 0v-.09a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5zm-3 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" />
                                <path d="M3 18.4v-2.796a4.3 4.3 0 00.713.31A26.226 26.226 0 0012 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 01-6.477-.427C4.047 21.128 3 19.852 3 18.4z" />
                            </svg>
                        </div>
                    </li>
                </ol>
                
                <PersonalInfo show={showPersonalInfo}>
                    <h3 className="mb-4 text-lg font-medium leading-none text-gray-900 dark:text-white">Personal Info</h3>
                    <div className="grid gap-4 mb-4 sm:grid-cols-2">
                        <div>
                            <div className="relative">
                                <input type="text" id="fo_first-name" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                    onChange={e => {setFirstName(e.target.value)}}
                                    value={
                                        firstName !== null ?
                                            firstName
                                        :""
                                    }
                                />
                                <label htmlFor="fo_first-name" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">First Name</label>
                            </div>
                        </div>
                        <div>
                            <div className="relative">
                                <input type="text" id="fo_middle-name" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                    onChange={e => {setMiddleName(e.target.value)}}
                                    value={
                                        middleName !== null ?
                                            middleName
                                        :""
                                    }
                                />
                                <label htmlFor="fo_middle-name" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Middle Name</label>
                            </div>
                        </div>
                        <div>
                            <div className="relative">
                                <input type="text" id="fo_last-name" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                    onChange={e => {setLastName(e.target.value)}}
                                    value={
                                        lastName !== null ?
                                            lastName
                                        :""
                                    }
                                />
                                <label htmlFor="fo_last-name" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Last Name</label>
                            </div>
                        </div>
                        <div>
                            <div className="relative">
                                <input type="text" id="fo_nickname" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                    onChange={e => {setNickname(e.target.value)}}
                                    value={
                                        nickname !== null ?
                                            nickname
                                        :""
                                    }
                                />
                                <label htmlFor="fo_nickname" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Nickname</label>
                            </div>
                        </div>
                        <div>
                            <div className="relative">
                                <input type="text" id="fo_mobile-number" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                    onChange={e => {setMobile(e.target.value)}}
                                    value={
                                        mobile !== null ?
                                            mobile
                                        :""
                                    }
                                />
                                <label htmlFor="fo_mobile-number" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Mobile number</label>
                            </div>
                        </div>

                        <div>
                            <div className="relative">
                                <input type="email" id="fo_email" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                    onChange={e => {setEmail(e.target.value)}}
                                    value={
                                        email !== null ?
                                            email
                                        :""
                                    }
                                />
                                <label htmlFor="fo_mobile-number" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Email</label>
                            </div>
                        </div>

                        <div>
                            <div className="relative max-w-sm">
                                <input id='fo_birthday' type="date" className="block mt-6 px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Birthday"
                                    onChange={e => {setBirthday(e.target.value)}}
                                    value={
                                        birthday !== null ?
                                            birthday
                                        :""
                                    }
                                />
                                <label htmlFor="fo_birthday" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Birthday</label>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="pi_gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
                            <select id="pi_gender" className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={e => {setGender(e.target.value)}}
                                value={
                                        gender !== null ?
                                            gender
                                        :""
                                    }
                            >
                                <option defaultValue={" "}>Choose gender</option>
                                <option value={"Female"}>Female</option>
                                <option value={"Male"}>Male</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="pi_civileStatus" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Civil Status</label>
                            <select id="pi_civileStatus" className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={e => {setCivilStatus(e.target.value)}}
                                value={
                                        civilStatus !== null ?
                                            civilStatus
                                        :""
                                    }
                            >
                                <option selected>Choose Civil Status</option>
                                <option value={"Single"}>Single</option>
                                <option value={"Married"}>Married</option>
                                <option value={"Widow/Widower"}>Widow/Widower</option>
                                <option value={"Separated"}>Separated</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="pi_spouse" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Spouse</label>
                            <select id="pi_spouse" className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={(e) => {setSpouse(e.target.value)}}
                                value={
                                        spouse !== null ?
                                            spouse
                                        :""
                                    }
                            >
                                <option defaultValue={null}>Choose Spouse</option>
                                <option value={null}>No Spouse</option>
                                {
                                    attendanceStatus === true ?
                                        attendanceRecord.map(items => (
                                                items.civil_status !== 'Single' ?
                                                    <option value={items.member_id}>{items.first_name} {items.last_name}</option>
                                                :null
                                        ))
                                    : <option>No Records Found...</option>
                                }
                            </select>
                        </div>
                        <div>
                            <div className="relative mt-6">
                                <input type="text" id="fo_religion" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                    onChange={e => {setReligion(e.target.value)}}
                                    value={
                                        religion !== null ?
                                            religion
                                        :""
                                    }
                                />
                                <label htmlFor="fo_religion" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Religion</label>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="pi_baptism" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Baptized?</label>
                            <div className="flex">
                                <div className="flex items-center mr-4">
                                <input id="pi_baptism-yes" type="radio" value="Yes" name="baptism-radio-group" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
                                        onChange={e => {setBaptized(e.target.value)}}
                                        checked={
                                            baptized !== null & baptized === 'Yes' ?
                                                true
                                            : null
                                        }
                                    />
                                    <label htmlFor="pi_baptism" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Yes</label>
                                </div>
                                <div className="flex items-center mr-4">
                                <input id="pi_baptism-no" type="radio" value="No" name="baptism-radio-group" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
                                        onChange={e => {setBaptized(e.target.value)}}
                                        checked={
                                            baptized !== null & baptized === 'No' ?
                                                true
                                            : null
                                        }
                                    />
                                    <label htmlFor="pi_baptism-no" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">No</label>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="pi_confirmation" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirmed?</label>
                            <div className="flex">
                                <div className="flex items-center mr-4">
                                    <input id="pi_confirmation" type="radio" value="Yes" name="confirmation-radio-group" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
                                        onChange={e => {setconfirmed(e.target.value)}}
                                        checked={
                                            confirmed !== null & confirmed === 'Yes' ?
                                                true
                                            : null
                                        }
                                    />
                                    <label htmlFor="pi_confirmation" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Yes</label>
                                </div>
                                <div className="flex items-center mr-4">
                                    <input id="pi_confirmation" type="radio" value="No" name="confirmation-radio-group" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        onChange={e => {setconfirmed(e.target.value)}}
                                        checked={
                                            confirmed !== null & confirmed === 'No' ?
                                                true
                                            : null
                                        }
                                    />
                                    <label htmlFor="pi_confirmation" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">No</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="submit" onClick={() => {Stepper('address')}} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Next Step: Address Info
                    </button>
                </PersonalInfo>

                <AddressInfo show={showAddressinfo}>
                    <h3 className="mb-4 text-lg font-medium leading-none text-gray-900 dark:text-white">Address Info</h3>
                    <div className="grid gap-4 mb-4 sm:grid-cols-2">
                        <div>
                            <div className="relative">
                                <input type="text" id="fo_addressLine1" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " 
                                    onChange={e => {setMemberAddressLine1(e.target.value)}}
                                    value={
                                        memberAddressLine1 !== null ?
                                            memberAddressLine1
                                        :""
                                    }
                                />
                                <label htmlFor="fo_addressLine1" className="absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Address Line 1 (ex. PO-Box #)</label>
                            </div>
                        </div>
                        <div>
                            <div className="relative">
                                <input type="text" id="fo_addressLine2" className="block text-sm px-2.5 pb-2.5 pt-4 w-full text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                    onChange={e => {setMemberAddressLine2(e.target.value)}}
                                    value={
                                        memberAddressLine2 !== null ?
                                            memberAddressLine2
                                        :""
                                    }    
                                />
                                <label htmlFor="fo_addressLine2" className="absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Address Line 2 (House #, street, Brgy, Sbdivision, Disctrict)</label>
                            </div>
                        </div>
                        <div>
                            <div className="relative">
                                <input type="text" id="fo_city" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                    onChange={e => {setMemberCity(e.target.value)}}
                                    value={
                                        memberCity !== null ?
                                            memberCity
                                        :""
                                    }
                                />
                                <label htmlFor="fo_city" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">City</label>
                            </div>
                        </div>
                    </div>
                    <button onClick={() => Stepper('personal')} type="submit" className="text-white bg-gray-500 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                        Go Back to: Personal Info
                    </button>
                    <button onClick={() => Stepper('work')} type="submit" className="mx-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Next Step: Work Info
                    </button>
                </AddressInfo>

                <WorkInfo show={showWorkinfo}>
                    <h3 className="mb-4 text-lg font-medium leading-none text-gray-900 dark:text-white">Work Info</h3>
                    <div className="grid gap-4 mb-4 sm:grid-cols-2">
                        <div>
                            <div className="relative">
                                <input type="text" id="fo_occupation" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                    onChange={e => {setOccupation(e.target.value)}}
                                    value={
                                        occupation !== null ?
                                            occupation
                                        :""
                                    }
                                />
                                <label htmlFor="fo_occupation" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Occupation</label>
                            </div>
                        </div>
                        <div>
                            <div className="relative">
                                <input type="text" id="fo_specialty" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                    onChange={e => {setSpecialty(e.target.value)}}
                                    value={
                                        specialty!== null ?
                                            specialty
                                        :""
                                    }
                                />
                                <label htmlFor="fo_specialty" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Specialty (ex. Skill/Course)</label>
                            </div>
                        </div>
                        <div>
                            <div className="relative">
                                <input type="text" id="fo_company" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                    onChange={e => {setCompany(e.target.value)}}
                                    value={
                                        company !== null ?
                                            company
                                        :""
                                    }
                                />
                                <label htmlFor="fo_company" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Company</label>
                            </div>
                        </div>
                        <div>
                            <div className="relative">
                                <input type="text" id="fo_companyAddressLine1" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                    onChange={e => {setCompanyAddressLine1(e.target.value)}}
                                    value={
                                        companyAddressLine1 !== null ?
                                            companyAddressLine1
                                        :null
                                    }
                                />
                                <label htmlFor="fo_companyAddressLine1" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Address Line 1 (ex. PO-Box #)</label>
                            </div>
                        </div>
                        <div>
                            <div className="relative">
                                <input type="text" id="fo_companyAddressLine2" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                    onChange={e => {setCompanyAddressLine2(e.target.value)}}
                                    value={
                                        companyAddressLine2 !== null ?
                                            companyAddressLine2
                                        :""
                                    }
                                />
                                <label htmlFor="fo_companyAddressLine2" className="absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Address Line 2 (ex. Bldg #, Street, Brgy, Subdivision, District)</label>
                            </div>
                        </div>

                        <div>
                            <div className="relative">
                                <input type="text" id="fo_companyCity" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                    onChange={e => {setCompanyCity(e.target.value)}}
                                    value={
                                        companyCity !== null ?
                                            companyCity
                                        :""
                                    }
                                />
                                <label htmlFor="fo_companyCity" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">City</label>
                            </div>
                        </div>
                    </div>
                    <button onClick={() => Stepper('address')} type="submit" className="text-white bg-gray-500 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                        Go Back to: Address Info
                    </button>
                    <button onClick={addParticipants} type="submit" className="mx-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Save
                    </button>
                </WorkInfo>

                <Result show={showResult}>
                    {
                        isLoading ?
                        <div class="text-center">
                            <div role="status">
                                <svg aria-hidden="true" class="inline w-20 h-20 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                </svg>
                                <span class="sr-only">Loading...</span>
                            </div>
                        </div>
                        :
                            !errors ?
                                <div className="flex items-center justify-around gap-4 mb-4 sm:grid-cols-2 rounded-lg bg-green-50">
                                    <div className='flex items-center p-4 mb-4 text-sm text-green-800 rounded-lg'>
                                        <svg fill="none" className='w-20 h-20 lg:w-24 lg:h-24 text-green-600' stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                                        </svg>
                                        <label className='font-semibold text-3xl'>{message}</label>
                                    </div>
                                </div>
                            :
                                <div className="flex items-center justify-around gap-4 mb-4 sm:grid-cols-2 rounded-lg bg-red-50">
                                    <div className='flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg'>
                                        <svg fill="none" className='w-20 h-20 lg:w-24 lg:h-24 text-red-600' stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                                        </svg>
                                        <label className='font-semibold text-3xl'>{message}</label>
                                    </div>
                                </div>
                    }
                    <button onClick={() => Stepper('work')} type="submit" className="text-white bg-gray-500 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                        Go Back to: Work Info
                    </button>
                    <button onClick={closeAdd} type="submit" className="mx-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Close
                    </button>
                </Result>

            </AddParticipants>

            <EditParticipant show={showEdit} setShow={closeEdit}>
                <ol className="flex items-center w-full mb-4 sm:mb-5">
                    <li className={`flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-4 after:inline-block
                        ${ currentStep === 'personal' ?
                            'text-green-100 after:border-green-100'
                            : 'text-green-600 after:border-green-600'}
                    `}>
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0
                            ${ currentStep === 'personal'?
                                'bg-green-100 '
                            : 'bg-green-100 '}
                        `}>
                            <svg aria-hidden="true" className={`w-5 h-5 lg:w-6 lg:h-6
                                ${ currentStep === 'personal' ?
                                    'text-gray-500'
                                : 'text-green-600'}
                            `} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clipRule="evenodd"></path>
                            </svg>
                        </div>
                    </li>
                    <li className={`flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-4 after:inline-block
                        ${ currentStep === 'address' && previousStep === 'personal' ?
                            'text-green-100 after:border-green-100'
                            : currentStep === 'work' | currentStep === 'result' ?
                                'text-green-600 after:border-green-600'
                                :'text-green-100 after:border-gray-100'}
                    `}>
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0
                            ${ currentStep === 'address' && previousStep === 'personal' ?
                                'bg-green-100'
                            : currentStep === 'work' | currentStep === 'result' ?
                                'bg-green-100'
                                :'bg-gray-100'}
                        `}>
                            <svg aria-hidden="true" className={`w-5 h-5 lg:w-6 lg:h-6
                                ${ currentStep === 'address' && previousStep === 'personal' ?
                                    'text-gray-500'
                                : currentStep === 'work' | currentStep === 'result' ?
                                    'text-green-600'
                                    :'text-gray-500'}
                            `} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                                <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                            </svg>
                        </div>
                    </li>
                    <li className={`flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-4 after:inline-block
                        ${ currentStep === 'work' && previousStep === 'address' ?
                            'text-green-100 after:border-green-100'
                            : currentStep === 'result' ?
                                'text-green-600 after:border-green-600'
                                :'text-green-100 after:border-gray-100'}
                    `}>
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0
                            ${ currentStep === 'work' && previousStep === 'address' ?
                                'bg-green-100'
                            : currentStep === 'result' ?
                                'bg-green-100'
                                :'bg-gray-100'}
                        `}>
                            <svg aria-hidden="true" className={`w-5 h-5 lg:w-6 lg:h-6
                                ${ currentStep === 'work' && previousStep === 'address' ?
                                    'text-gray-500'
                                : currentStep === 'result' ?
                                    'text-green-600'
                                    : 'text-gray-500'}
                            `} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path clipRule="evenodd" fillRule="evenodd" d="M7.5 5.25a3 3 0 013-3h3a3 3 0 013 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0112 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 017.5 5.455V5.25zm7.5 0v.09a49.488 49.488 0 00-6 0v-.09a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5zm-3 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" />
                                <path d="M3 18.4v-2.796a4.3 4.3 0 00.713.31A26.226 26.226 0 0012 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 01-6.477-.427C4.047 21.128 3 19.852 3 18.4z" />
                            </svg>
                        </div>
                    </li>
                </ol>
                
                <PersonalInfo show={showPersonalInfo}>
                    <h3 className="mb-4 text-lg font-medium leading-none text-gray-900 dark:text-white">Personal Info</h3>
                    <div className="grid gap-4 mb-4 sm:grid-cols-2">
                        <div>
                            <div className="relative">
                                <input type="text" id="fo_first-name" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                    onChange={e => {setFirstName(e.target.value)}}
                                    value={
                                        firstName !== null ?
                                            firstName
                                        :""
                                    }
                                />
                                <label htmlFor="fo_first-name" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">First Name</label>
                            </div>
                        </div>
                        <div>
                            <div className="relative">
                                <input type="text" id="fo_middle-name" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                    onChange={e => {setMiddleName(e.target.value)}}
                                    value={
                                        middleName !== null ?
                                            middleName
                                        :""
                                    }
                                />
                                <label htmlFor="fo_middle-name" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Middle Name</label>
                            </div>
                        </div>
                        <div>
                            <div className="relative">
                                <input type="text" id="fo_last-name" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                    onChange={e => {setLastName(e.target.value)}}
                                    value={
                                        lastName !== null ?
                                            lastName
                                        :""
                                    }
                                />
                                <label htmlFor="fo_last-name" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Last Name</label>
                            </div>
                        </div>
                        <div>
                            <div className="relative">
                                <input type="text" id="fo_nickname" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                    onChange={e => {setNickname(e.target.value)}}
                                    value={
                                        nickname !== null ?
                                            nickname
                                        :""
                                    }
                                />
                                <label htmlFor="fo_nickname" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Nickname</label>
                            </div>
                        </div>
                        <div>
                            <div className="relative">
                                <input type="text" id="fo_mobile-number" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                    onChange={e => {setMobile(e.target.value)}}
                                    value={
                                        mobile !== null ?
                                            mobile
                                        :""
                                    }
                                />
                                <label htmlFor="fo_mobile-number" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Mobile number</label>
                            </div>
                        </div>

                        <div>
                            <div className="relative">
                                <input type="email" id="fo_email" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                    onChange={e => {setEmail(e.target.value)}}
                                    value={
                                        email !== null ?
                                            email
                                        :""
                                    }
                                />
                                <label htmlFor="fo_mobile-number" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Email</label>
                            </div>
                        </div>

                        <div>
                            <div className="relative max-w-sm">
                                <input id='fo_birthday' type="date" className="block mt-6 px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Birthday"
                                    onChange={e => {setBirthday(e.target.value)}}
                                    value={
                                        birthday !== null ?
                                            birthday
                                        :""
                                    }
                                />
                                <label htmlFor="fo_birthday" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Birthday</label>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="pi_gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
                            <select id="pi_gender" className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={e => {setGender(e.target.value)}}
                                value={
                                        gender !== null ?
                                            gender
                                        :""
                                    }
                            >
                                <option defaultValue={" "}>Choose gender</option>
                                <option value={"Female"}>Female</option>
                                <option value={"Male"}>Male</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="pi_civileStatus" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Civil Status</label>
                            <select id="pi_civileStatus" className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={e => {setCivilStatus(e.target.value)}}
                                value={
                                        civilStatus !== null ?
                                            civilStatus
                                        :""
                                    }
                            >
                                <option selected>Choose Civil Status</option>
                                <option value={"Single"}>Single</option>
                                <option value={"Married"}>Married</option>
                                <option value={"Widow/Widower"}>Widow/Widower</option>
                                <option value={"Separated"}>Separated</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="pi_spouse" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Spouse</label>
                            <select id="pi_spouse" className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={(e) => {setSpouse(e.target.value)}}
                                value={
                                        spouse !== null ?
                                            spouse
                                        :""
                                    }
                            >
                                <option defaultValue={" "}>Choose Spouse</option>
                                <option value={" "}>No Spouse</option>
                                {
                                    attendanceStatus === true ?
                                        attendanceRecord.map(items => (
                                                items.civil_status !== 'Single' ?
                                                    <option value={items.member_id}>{items.first_name} {items.last_name}</option>
                                                :null
                                        ))
                                    : <option>No Records Found...</option>
                                }
                            </select>
                        </div>
                        <div>
                            <div className="relative mt-6">
                                <input type="text" id="fo_religion" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                    onChange={e => {setReligion(e.target.value)}}
                                    value={
                                        religion !== null ?
                                            religion
                                        :""
                                    }
                                />
                                <label htmlFor="fo_religion" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Religion</label>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="pi_baptism" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Baptized?</label>
                            <div className="flex">
                                <div className="flex items-center mr-4">
                                    <input id="pi_baptism-yes" type="radio" value="Yes" name="baptism-radio-group" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
                                        onChange={e => {setBaptized(e.target.value)}}
                                        checked={
                                            baptized !== null & baptized === 'Yes' ?
                                                true
                                            : null
                                        }
                                    />
                                    <label htmlFor="pi_baptism" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Yes</label>
                                </div>
                                <div className="flex items-center mr-4">
                                    <input id="pi_baptism-no" type="radio" value="No" name="baptism-radio-group" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
                                        onChange={e => {setBaptized(e.target.value)}}
                                        checked={
                                            baptized !== null & baptized === 'No' ?
                                                true
                                            : null
                                        }
                                    />
                                    <label htmlFor="pi_baptism" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">No</label>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="pi_confirmation-yes" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirmed?</label>
                            <div className="flex">
                                <div className="flex items-center mr-4">
                                    <input id="pi_confirmation" type="radio" value="Yes" name="confirmation-radio-group" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
                                        onChange={e => {setconfirmed(e.target.value)}}
                                        checked={
                                            confirmed !== null & confirmed === 'Yes' ?
                                                true
                                            : null
                                        }
                                    />
                                    <label htmlFor="pi_confirmation-no" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Yes</label>
                                </div>
                                <div className="flex items-center mr-4">
                                    <input id="pi_confirmation" type="radio" value="No" name="confirmation-radio-group" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        onChange={e => {setconfirmed(e.target.value)}}
                                        checked={
                                            confirmed !== null & confirmed === 'No' ?
                                                true
                                            : null
                                        }
                                    />
                                    <label htmlFor="pi_confirmation" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">No</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="submit" onClick={() => {Stepper('address')}} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Next Step: Address Info
                    </button>
                </PersonalInfo>

                <AddressInfo show={showAddressinfo}>
                    <h3 className="mb-4 text-lg font-medium leading-none text-gray-900 dark:text-white">Address Info</h3>
                    <div className="grid gap-4 mb-4 sm:grid-cols-2">
                        <div>
                            <div className="relative">
                                <input type="text" id="fo_addressLine1" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " 
                                    onChange={e => {setMemberAddressLine1(e.target.value)}}
                                    value={
                                        memberAddressLine1 !== null ?
                                            memberAddressLine1
                                        :""
                                    }
                                />
                                <label htmlFor="fo_addressLine1" className="absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Address Line 1 (ex. PO-Box #)</label>
                            </div>
                        </div>
                        <div>
                            <div className="relative">
                                <input type="text" id="fo_addressLine2" className="block text-sm px-2.5 pb-2.5 pt-4 w-full text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                    onChange={e => {setMemberAddressLine2(e.target.value)}}
                                    value={
                                        memberAddressLine2 !== null ?
                                            memberAddressLine2
                                        :""
                                    }    
                                />
                                <label htmlFor="fo_addressLine2" className="absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Address Line 2 (House #, street, Brgy, Sbdivision, Disctrict)</label>
                            </div>
                        </div>
                        <div>
                            <div className="relative">
                                <input type="text" id="fo_city" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                    onChange={e => {setMemberCity(e.target.value)}}
                                    value={
                                        memberCity !== null ?
                                            memberCity
                                        :""
                                    }  
                                />
                                <label htmlFor="fo_city" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">City</label>
                            </div>
                        </div>
                    </div>
                    <button onClick={() => Stepper('personal')} type="submit" className="text-white bg-gray-500 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                        Go Back to: Personal Info
                    </button>
                    <button onClick={() => Stepper('work')} type="submit" className="mx-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Next Step: Work Info
                    </button>
                </AddressInfo>

                <WorkInfo show={showWorkinfo}>
                    <h3 className="mb-4 text-lg font-medium leading-none text-gray-900 dark:text-white">Work Info</h3>
                    <div className="grid gap-4 mb-4 sm:grid-cols-2">
                        <div>
                            <div className="relative">
                                <input type="text" id="fo_occupation" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                    onChange={e => {setOccupation(e.target.value)}}
                                    value={
                                        occupation !== null ?
                                            occupation
                                        :""
                                    }
                                />
                                <label htmlFor="fo_occupation" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Occupation</label>
                            </div>
                        </div>
                        <div>
                            <div className="relative">
                                <input type="text" id="fo_specialty" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                    onChange={e => {setSpecialty(e.target.value)}}
                                    value={
                                        specialty !== null ?
                                            specialty
                                        :""
                                    }
                                />
                                <label htmlFor="fo_specialty" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Specialty (ex. Skill/Course)</label>
                            </div>
                        </div>
                        <div>
                            <div className="relative">
                                <input type="text" id="fo_company" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                    onChange={e => {setCompany(e.target.value)}}
                                    value={
                                        company !== null ?
                                            company
                                        :""
                                    }
                                />
                                <label htmlFor="fo_company" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Company</label>
                            </div>
                        </div>
                        <div>
                            <div className="relative">
                                <input type="text" id="fo_companyAddressLine1" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                    onChange={e => {setCompanyAddressLine1(e.target.value)}}
                                    value={
                                        companyAddressLine1 !== null ?
                                            companyAddressLine1
                                        :""
                                    }
                                />
                                <label htmlFor="fo_companyAddressLine1" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Address Line 1 (ex. PO-Box #)</label>
                            </div>
                        </div>
                        <div>
                            <div className="relative">
                                <input type="text" id="fo_companyAddressLine2" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                    onChange={e => {setCompanyAddressLine2(e.target.value)}}
                                    value={
                                        companyAddressLine2 !== null ?
                                            companyAddressLine2
                                        :""
                                    }
                                />
                                <label htmlFor="fo_companyAddressLine2" className="absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Address Line 2 (ex. Bldg #, Street, Brgy, Subdivision, District)</label>
                            </div>
                        </div>

                        <div>
                            <div className="relative">
                                <input type="text" id="fo_companyCity" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                    onChange={e => {setCompanyCity(e.target.value)}}
                                    value={
                                        companyCity !== null ?
                                            companyCity
                                        :""
                                    }
                                />
                                <label htmlFor="fo_companyCity" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">City</label>
                            </div>
                        </div>
                    </div>
                    <button onClick={() => Stepper('address')} type="submit" className="text-white bg-gray-500 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                        Go Back to: Address Info
                    </button>
                    <button onClick={updateParticipant} type="submit" className="mx-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Save
                    </button>
                </WorkInfo>

                <Result show={showResult}>
                    {
                        isLoading ?
                        <div class="text-center">
                            <div role="status">
                                <svg aria-hidden="true" class="inline w-20 h-20 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                </svg>
                                <span class="sr-only">Loading...</span>
                            </div>
                        </div>
                        :
                            !errors ?
                                <div className="flex items-center justify-around gap-4 mb-4 sm:grid-cols-2 rounded-lg bg-green-50">
                                    <div className='flex items-center p-4 mb-4 text-sm text-green-800 rounded-lg'>
                                        <svg fill="none" className='w-20 h-20 lg:w-24 lg:h-24 text-green-600' stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                                        </svg>
                                        <label className='font-semibold text-3xl'>{message}</label>
                                    </div>
                                </div>
                            :
                                <div className="flex items-center justify-around gap-4 mb-4 sm:grid-cols-2 rounded-lg bg-red-50">
                                    <div className='flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg'>
                                        <svg fill="none" className='w-20 h-20 lg:w-24 lg:h-24 text-red-600' stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                                        </svg>
                                        <label className='font-semibold text-3xl'>{message}</label>
                                    </div>
                                </div>
                    }
                    <button onClick={() => Stepper('work')} type="submit" className="text-white bg-gray-500 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                        Go Back to: Work Info
                    </button>
                    <button onClick={closeAdd} type="submit" className="mx-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Close
                    </button>
                </Result>
            </EditParticipant>

            <AttendanceWarning show={showAttendanceWarning} setShow={closeAttendanceWarning}>
                <div className="flex items-center justify-around gap-4 mb-4 sm:grid-cols-2 rounded-lg">
                        <div className='flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg'>
                            <svg fill="none" className='w-20 h-20 lg:w-24 lg:h-24 text-red-600' stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                            </svg>
                            <label className='font-semibold text-lg'>Are you sure you want to tag <strong><em>"{firstName} {middleName === "" | middleName === null | middleName === undefined ? null : middleName.charAt(0)}. {lastName}"</em></strong> as <strong><em>"{attendance}"</em></strong>?</label>
                        </div>
                    </div>
                    <div className="flex items-center justify-around gap-4 mb-4 sm:grid-cols-2 rounded-lg">
                        <div className='flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg'>
                            <button type="submit" className="mx-3 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                onClick={createAttendance}
                            >
                                Yes
                            </button>
                        </div>
                    </div>
            </AttendanceWarning>
        </div>
    )
}

export default DTRegistration