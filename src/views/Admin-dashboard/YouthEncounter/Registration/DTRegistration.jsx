import React, { useState, useEffect } from 'react';
import useAuthContext from '../../../../utils/AuthContext';
import { Link } from 'react-router-dom';
import AddYEParticipant from './Modals/AddYEParticipant';
import PersonalInfo from './Modals/PersonalInfo';
import AddressInfo from './Modals/AddressInfo';
import SchoolInfo from './Modals/SchoolInfo';
import Guardians from './Modals/Guardians';
import Result from './Modals/Result';
import { AddParticipant, CreateSEAttendance, UpdateParticipant } from '../../../../utils/SinglesEncounterMethods';
import { AddYE, GetYE } from '../../../../utils/YouthEncounterMethods';
import { GetAllEvents } from '../../../../utils/EventsMethods';
import EditYEParticipant from './Modals/EditYEParticipant';
import YEAttendanceWarning from './Modals/YEAttendanceWarning';
import Inviter from './Modals/Inviter';

function DTRegistration() {
    // START: Utils Constants

        const { loginResult } = useAuthContext();
        const [addStatus, setAddStatus] = useState();
        const [updateStatus, setUpdateStatus] = useState();
        const [participants, setParticipants] = useState();

        const event_type = 'Singles Encounter';

        const [eventStatus, setEventStatus] = useState();
        const [eventData, setEventData] = useState();
        const [event, setEvent] = useState('');

        const [YEData, setYEData] = useState();
        const [YEStatus, setYEStatus] = useState();
        const [YEMessage, setYEMessage] = useState();

        const [isLoading, setIsLoading] = useState();

    // END: Utils Constants

    // START: Emergency Contacts Constatns

        const [contactList, setContactList] = useState([{name: '', mobile: '', email: '', relationship: '', created_by: loginResult.__}]);
        const [inviteList, setInviteList] = useState([{name: '', relationship: '', created_by: loginResult.__}]);
   
    // END: Emergency Contacts Constants

    // START: Stepper Constants

        const [currentStep, setCurrentStep] = useState();
        const [previousStep, setPreviousStep] = useState();
        const [showPersonalInfo, setShowPersonalInfo] = useState();
        const [showAddressInfo, setShowAddressinfo] = useState();
        const [showSchoolInfo, setShowSchoolInfo] = useState();
        const [showEmergencyContact, setShowEmergencyContact] = useState();
        const [showInvite, setShowInvite] = useState();
        const [showResult, setShowResult] = useState();

    // END: Stepper Constants

    // START: Modal Constants

        const [showAdd, setShowAdd] = useState();
        const [showEdit, setShowEdit] = useState();
        const [showAttendanceWarning, setShowAttendanceWarning] = useState();

    // END: Modal Constants

    // START: Personal Info Constants

        const [memberId, setMemberId] = useState();
        const [seId, setSEId] = useState();
        const [firstName, setFirstName] = useState();
        const [middleName, setMiddleName] = useState();
        const [lastName, setLastName] = useState();
        const [nickname, setNickname] = useState();
        const [participantMobile, setParticipantMobile] = useState();
        const [participantEmail, setParticipantEmail] = useState()
        const [birthday, setBirthday] = useState();
        const [gender, setGender] = useState();
        const [educationalLevel, setEducationalLevel] = useState();
        const [yearLevel, setYearLevel] = useState();
        const [course, setCourse] = useState();
        const [religion, setReligion] = useState();
        const [baptized, setBaptized] = useState();
        const [confirmed, setConfirmed] = useState();
        const [attendance, setAttendance] = useState();


    // END: Personal Info Constants

    // START: Address Info Constants

        const [memberAddressLine1, setMemberAddressLine1] = useState();
        const [memberAddressLine2, setMemberAddressLine2] = useState();
        const [memberCity, setMemberCity] = useState();

    // END: Address Info Constants

    // START: Work info Constants

        const [occupation, setOccupation] = useState();
        const [specialty, setSpecialty] = useState();
        const [company, setCompany] = useState();
        const [companyAddressLine1, setCompanyAddressLine1] = useState();
        const [companyAddressLine2, setCompanyAddressLine2] = useState();
        const [companyCity, setCompanyCity] = useState();

    // END: Work info Constants

    // START: Stepper function
        const Stepper = (step) => {

            switch (step) {
                case "personal":
                    setCurrentStep("personal");
                    setShowPersonalInfo(true);
                    setShowAddressinfo(false);
                    setShowSchoolInfo(false);
                    setShowEmergencyContact(false);
                    setShowInvite(false)
                    setShowResult(false);
                    break;
                
                case "address":
                    setPreviousStep("personal")
                    setCurrentStep("address");
                    setShowPersonalInfo(false);
                    setShowAddressinfo(true);
                    setShowSchoolInfo(false);
                    setShowEmergencyContact(false);
                    setShowInvite(false)
                    setShowResult(false);
                    break;
                
                case "work":
                    setPreviousStep("address")
                    setCurrentStep("work");
                    setShowPersonalInfo(false);
                    setShowAddressinfo(false);
                    setShowSchoolInfo(true);
                    setShowEmergencyContact(false);
                    setShowInvite(false)
                    setShowResult(false);
                    break;
                
                case "emergency":
                    setPreviousStep("work")
                    setCurrentStep("emergency");
                    setShowPersonalInfo(false);
                    setShowAddressinfo(false);
                    setShowSchoolInfo(false);
                    setShowEmergencyContact(true);
                    setShowInvite(false)
                    setShowResult(false);
                    break;
            
                case "invite":
                    setPreviousStep("emergency")
                    setCurrentStep("invite");
                    setShowPersonalInfo(false);
                    setShowAddressinfo(false);
                    setShowSchoolInfo(false);
                    setShowEmergencyContact(false);
                    setShowInvite(true)
                    setShowResult(false);
                    break;
                
                case "result":
                    setPreviousStep("invite")
                    setCurrentStep("result");
                    setShowPersonalInfo(false);
                    setShowAddressinfo(false);
                    setShowSchoolInfo(false);
                    setShowEmergencyContact(false);
                    setShowInvite(false)
                    setShowResult(true);
                    break;
            
                default:
                    break;
            }
        }
    
    // END: Stepper function

    const showAddParticipant = () => {
        Stepper('personal')
        setShowAdd(true)
    }

    const closeAddParticipant = () => {
        setMemberId('');
        setSEId('');
        setFirstName('');
        setMiddleName('');
        setLastName('');
        setNickname('');
        setParticipantMobile('');
        setParticipantEmail('');
        setBirthday('');
        setGender('');
        setEducationalLevel('');
        setYearLevel('')
        setCourse('')
        setReligion('');
        setBaptized('');
        setConfirmed('');
        setMemberAddressLine1('');
        setMemberAddressLine2('');
        setMemberCity('');
        setOccupation('');
        setSpecialty('');
        setCompany('');
        setCompanyAddressLine1('');
        setCompanyAddressLine2('');
        setCompanyCity('');
        setContactList([{name: '', mobile: '', email: '', relationship: '', created_by: loginResult.__}]);
        setInviteList([{name: '', relationship: '', created_by: loginResult.__}]);
        
        setShowAdd(false)
    }

    const attendanceWarning = (memberId, seId, attendanceStatus, firstName, middleName, lastName) => {
        setMemberId(memberId);
        setSEId(seId);
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

    const createAttendance = () => {
        CreateSEAttendance(loginResult.__, memberId, seId, attendance)
            .then(async result => { return await result.json()})
            .then(async result => {
                if (await result.status === 200) {
                    alert('Attendance updated successfully!')
                } else{
                    alert('An error occured while updating the attendance. Please contact system administrator.')
                }
            });
        getYE();
        closeAttendanceWarning();
    }

    const showEditParticipant = (memberId, seId, firstName, middleName, lastName, nickname, participantMobile,
                                participantEmail, birthday, gender, civilStatus, religion,
                                baptized, confirmed, memberAddressLine1, memberAddressLine2,
                                memberCity, occupation, specialty, company, companyAddressLine1,
                                companyAddressLine2, companyCity, emergency_contacts, inviters) => {
        
        setMemberId(memberId);
        setSEId(seId);
        setFirstName(firstName);
        setMiddleName(middleName);
        setLastName(lastName);
        setNickname(nickname);
        setParticipantMobile(participantMobile);
        setParticipantEmail(participantEmail);
        setBirthday(birthday);
        setGender(gender);
        setEducationalLevel('');
        setYearLevel('')
        setCourse('')
        setReligion(religion);
        setBaptized(baptized);
        setConfirmed(confirmed);
        setMemberAddressLine1(memberAddressLine1);
        setMemberAddressLine2(memberAddressLine2);
        setMemberCity(memberCity);
        setOccupation(occupation);
        setSpecialty(specialty);
        setCompany(company);
        setCompanyAddressLine1(companyAddressLine1);
        setCompanyAddressLine2(companyAddressLine2);
        setCompanyCity(companyCity);
        
        if (emergency_contacts.length > 0) {
            setContactList(emergency_contacts);
        }

        if (inviters.length > 0) {
            setInviteList(inviters);
        }

        // console.log(inviters);
        Stepper('personal');

        setShowEdit(true);
    }

    const closeEdit = () => {
        setMemberId('');
        setSEId('');
        setFirstName('');
        setMiddleName('');
        setLastName('');
        setNickname('');
        setParticipantMobile('');
        setParticipantEmail('');
        setBirthday('');
        setGender('');
        setEducationalLevel('');
        setYearLevel('')
        setCourse('')
        setReligion('');
        setBaptized('');
        setConfirmed('');
        setMemberAddressLine1('');
        setMemberAddressLine2('');
        setMemberCity('');
        setOccupation('');
        setSpecialty('');
        setCompany('');
        setCompanyAddressLine1('');
        setCompanyAddressLine2('');
        setCompanyCity('');
        setContactList([{name: '', mobile: '', email: '', relationship: '', created_by: loginResult.__}]);
        setInviteList([{name: '', relationship: '', created_by: loginResult.__}])

        setShowEdit(false);
    }

    function tableSearch() {
        // Declare variables
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("table-search");
        filter = input.value.toUpperCase();
        table = document.getElementById("SEDTRegistration");
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

    // START: Emergency Contacts Handle

        const handleContactChange = (e, index) => {
            const {name, value} = e.target;
            const contacts = [...contactList];
            contacts[index][name] = value;
            setContactList(contacts);
        }

        const handleadd = () => {
            setContactList([...contactList, { name: '', mobile: '', email: '', relationship: '', created_by: loginResult.__}]);
        }

        const handleremove = (index) => {
            contactList.splice(index,1);
            setContactList([...contactList]);
        }

    // END: Emergency Contacts Handle

    // START: Inviter Handle

        const handleInviterChange = (e, index) => {
            const {name, value} = e.target;
            const inviter = [...inviteList];
            inviter[index][name] = value;
            setInviteList(inviter);
        }

        const handleInviterAdd = () => {
            setInviteList([...inviteList, {name: '', relationship: '', created_by: loginResult.__}])
        }

        const handleInveterRemove = (index) => {
            inviteList.splice(index, 1);
            setInviteList([...inviteList]);
        }

    // END: Inviter Handle

    // START: API Functions

    const addParticipant = () => {
        setIsLoading(true);
        AddYE(loginResult.__, firstName, middleName, lastName,
            nickname, participantMobile, participantEmail, birthday, gender,
            religion, baptized, confirmed, memberAddressLine1,
            memberAddressLine2, memberCity, educationalLevel, yearLevel, course,
            occupation, specialty, company, companyAddressLine1, companyAddressLine2,
            companyCity, contactList, inviteList, event)
            .then(async result => { return await result.json()})
            .then(async result => {
                if (await result.status === 200) {
                    setAddStatus(true);
                    setParticipants(result.message);
                    alert(result.message);
                } else {
                    setAddStatus(false);
                    alert(result.message);
                }

                setIsLoading(false)
            });
        getYE();
        Stepper('result');
        closeAddParticipant();
    }

    const updateParticipant = () => {
        setIsLoading(true);
        UpdateParticipant(loginResult.__, memberId, firstName, middleName,
                            lastName, nickname, participantMobile, participantEmail,
                            birthday, gender, religion, baptized, confirmed, memberAddressLine1,
                            memberAddressLine2, memberCity, educationalLevel, yearLevel, course,
                            occupation, specialty, company, companyAddressLine1, companyAddressLine2,
                            companyCity, contactList, inviteList)
            .then(async result => {return await result.json()})
            .then(async result => {
                if (await result.status === 200) {
                    setUpdateStatus(true);
                    alert(`${firstName} ${middleName !== null & middleName !== undefined & middleName !== "" ? middleName.charAt(0) + "." : ""} ${lastName}'s record has been successfully updated!`);
                } else {
                    setUpdateStatus(false);
                    alert(result.message);
                }

                setIsLoading(false);
            });
        
        closeEdit();
        getYE();
    }

    const getEvents = () => {
        GetAllEvents()
          .then(async result => {return await result.json()})
          .then(async result => {
            if (await result.status === 200) {
                setEventStatus(true);
                setEventData(result.body);
            } else {
                setEventStatus(false);
                alert('There are no events available. Please contact and request authorized personnel to create an event.');
            }
          })
      }

      const getYE = (event) => {
        GetYE(event)
            .then(async result => {return await result.json()})
            .then(async result => {
                if (await result.status === 200) {
                    setYEStatus(true);
                    setYEData(result.body);
                } else {
                    setYEStatus(false);
                    setYEMessage(result.message);
                }
            })
      }

    // END: API Functions

    useEffect(() => {
        getEvents();
        getYE(event)
    }, [event])

    return (
        
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="flex items-center justify-between py-4 px-2 bg-white dark:bg-gray-900">
                <label htmlFor="table-search" className="sr-only">Search</label>
                <div className="relative mt-1">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                    </div>
                    <input type="text" id="table-search" className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items"
                        onKeyUp={() => tableSearch()}
                    />
                </div>

                <div>
                    <label htmlFor="default" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Event</label>
                    <select id="default" className="w-72 bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                        onChange={(e) => {setEvent(e.target.value)}}
                        value={
                        event !== null ?
                            event
                        : alert('No Event was selected. Please select an event.')
                        }
                    >
                        <option value={""}>Choose an event</option>
                        {
                            eventStatus ?
                                eventData !== null & eventData !== undefined ?
                                    eventData.map(event => (
                                        event.status.toLowerCase() === 'active' & event.event_type_name === "Youth Encounter" ?
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
                        className="flex items-center text-white bg-green-800 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-700 font-medium rounded-full text-sm px-6 py-2.5 text-center mr-2 mb-2"
                        onClick={showAddParticipant}
                    >
                    <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="flex-1 ml-3 whitespace-nowrap">Add New Participant</span>
                    </button>
                </div>
            </div>
            <div className='overflow-x-auto overflow-scroll max-h-[600px]'>
                <table id='SEDTRegistration' className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Participant
                            </th>
                            <th scope="col" className="px-6 py-3" align='center'>
                                Nickname
                            </th>
                            <th scope="col" className="px-6 py-3" align='center'>
                                Gender
                            </th>
                            <th scope="col" className="px-6 py-3" align='center'>
                                Birthday
                            </th>
                            
                            <th scope="col" className="px-6 py-3" align='center'>
                                Attendance Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            YEStatus === true ?
                                YEData.map(items => (
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {items.first_name} {items.middle_name !== null & items.middle_name !== undefined & items.middle_name !== "" ? items.middle_name.charAt(0) + "." : ""} {items.last_name}
                                        </th>
                                        <td className="px-6 py-4" align='center'>
                                            {items.nickname}
                                        </td>
                                        <td className="px-6 py-4" align='center'>
                                            {items.gender}
                                        </td>
                                        <td className="px-6 py-4" align='center'>
                                            {items.birthday}
                                        </td>
                                        <td className="px-6 py-4 flex justify-center">
                                            {
                                                event !== "" & event !== null & event !== undefined ?
                                                    <div className="flex items-center">
                                                        <input id="link-checkbox" type="checkbox" value={`${items.attendance_status === "Yes" ? "No" : "Yes"}`} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                                            onChange={e => {attendanceWarning(items.member_id, items.seId, e.target.value, items.first_name, items.middle_name, items.last_name)}}
                                                            checked={
                                                                items.attendance_status === "Yes" & items.attendace_status !== "" & items.attendance_status !== null & items.attendance_status !== undefined ?
                                                                    true
                                                                : false
                                                            }
                                                        />
                                                    </div>
                                                : 'Please select an event first.'
                                            }
                                        </td>
                                        <td className="px-6 py-4">
                                            <button type="button"
                                                    className="text-green-800 border border-green-800 hover:bg-green-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-white font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:focus:ring-green-800"
                                                    onClick={() => showEditParticipant(items.member_id, items.seId,
                                                                                        items.first_name, items.middle_name,
                                                                                        items.last_name, items.nickname, items.mobile,
                                                                                        items.email, items.birthday, items.gender,
                                                                                        items.civil_status, items.religion,
                                                                                        items.baptism, items.confirmation,
                                                                                        items.address_line1, items.address_line2,
                                                                                        items.city, items.occupation_name, items.specialty,
                                                                                        items.company, items.work_addressLine1,
                                                                                        items.work_addressLine2, items.work_city, items.emergency_contacts,
                                                                                        items.inviters)}
                                                >
                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                    </svg>
                                            </button>
                                            {
                                                event !== "" & event !== null & event !== undefined ?
                                                    items.status !== "" & items.status !== null & items.status !== undefined ?
                                                        <button type="button"
                                                            className="text-orange-400 border border-orange-400 hover:bg-orange-400 hover:text-white focus:ring-4 focus:outline-none focus:ring-white font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800"
                                                            // onClick={() => resetAttendance(items.attendance_id, items.first_name, items.middle_name, items.last_name)}
                                                        >
                                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
                                                            </svg>
                                                        </button>
                                                    : null
                                                : null
                                            }
                                        </td>
                                    </tr>
                                ))
                            : null
                        }
                    </tbody>
                </table>
            </div>

            <AddYEParticipant show={showAdd} setShow={setShowAdd}>
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
                            : currentStep === 'work' | currentStep === 'emergency' | currentStep === 'invite' | currentStep === 'result' ?
                                'text-green-600 after:border-green-600'
                                :'text-green-100 after:border-gray-100'}
                    `}>
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0
                            ${ currentStep === 'address' && previousStep === 'personal' ?
                                'bg-green-100'
                            : currentStep === 'work' | currentStep === 'emergency' | currentStep === 'invite' | currentStep === 'result' ?
                                'bg-green-100'
                                :'bg-gray-100'}
                        `}>
                            <svg aria-hidden="true" className={`w-5 h-5 lg:w-6 lg:h-6
                                ${ currentStep === 'address' && previousStep === 'personal' ?
                                    'text-gray-500'
                                : currentStep === 'work' | currentStep === 'emergency' | currentStep === 'invite' | currentStep === 'result' ?
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
                            : currentStep === 'emergency' | currentStep === 'invite' | currentStep === 'result' ?
                                'text-green-600 after:border-green-600'
                                :'text-green-100 after:border-gray-100'}
                    `}>
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0
                            ${ currentStep === 'work' && previousStep === 'address' ?
                                'bg-green-100'
                            : currentStep === 'emergency' | currentStep === 'invite' |  currentStep === 'result' ?
                                'bg-green-100'
                                :'bg-gray-100'}
                        `}>
                            <svg aria-hidden="true" className={`w-5 h-5 lg:w-6 lg:h-6
                                ${ currentStep === 'work' && previousStep === 'address' ?
                                    'text-gray-500'
                                : currentStep === 'emergency' | currentStep === 'invite' |  currentStep === 'result' ?
                                    'text-green-600'
                                    : 'text-gray-500'}
                            `} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path clipRule="evenodd" fillRule="evenodd" d="M7.5 5.25a3 3 0 013-3h3a3 3 0 013 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0112 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 017.5 5.455V5.25zm7.5 0v.09a49.488 49.488 0 00-6 0v-.09a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5zm-3 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" />
                                <path d="M3 18.4v-2.796a4.3 4.3 0 00.713.31A26.226 26.226 0 0012 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 01-6.477-.427C4.047 21.128 3 19.852 3 18.4z" />
                            </svg>
                        </div>
                    </li>
                    <li className={`flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-4 after:inline-block
                        ${ currentStep === 'emergency' && previousStep === 'work' ?
                            'text-green-100 after:border-green-100'
                            : currentStep === 'invite' | currentStep === 'result' ?
                                'text-green-600 after:border-green-600'
                                :'text-green-100 after:border-gray-100'}
                    `}>
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0
                            ${ currentStep === 'emergency' && previousStep === 'work' ?
                                'bg-green-100'
                            : currentStep === 'invite' | currentStep === 'result' ?
                                'bg-green-100'
                                :'bg-gray-100'}
                        `}>
                            <svg aria-hidden="true" className={`w-5 h-5 lg:w-6 lg:h-6
                                ${ currentStep === 'emergency' && previousStep === 'work' ?
                                    'text-gray-500'
                                : currentStep === 'invite' | currentStep === 'result' ?
                                    'text-green-600'
                                    : 'text-gray-500'}
                            `} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path clipRule="evenodd" fillRule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z" />
                            </svg>
                        </div>
                    </li>
                    <li className={`flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-4 after:inline-block
                        ${ currentStep === 'invite' && previousStep === 'emergency' ?
                            'text-green-100 after:border-green-100'
                            : currentStep === 'result' ?
                                'text-green-600 after:border-green-600'
                                :'text-green-100 after:border-gray-100'}
                    `}>
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0
                            ${ currentStep === 'invite' && previousStep === 'emergency' ?
                                'bg-green-100'
                            : currentStep === 'result' ?
                                'bg-green-100'
                                :'bg-gray-100'}
                        `}>
                            <svg aria-hidden="true" className={`w-5 h-5 lg:w-6 lg:h-6
                                ${ currentStep === 'invite' && previousStep === 'emergency' ?
                                    'text-gray-500'
                                : currentStep === 'result' ?
                                    'text-green-600'
                                    : 'text-gray-500'}
                            `} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
                                <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
                            </svg>
                        </div>
                    </li>
                    {/* <li className='flex w-full items-center'>
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0
                            ${ currentStep === 'result' && previousStep === 'emergency' ?
                                'bg-green-100'
                            : currentStep === 'result' ?
                                'bg-green-100'
                                :'bg-gray-100'}
                        `}>
                            <svg aria-hidden="true" className={`w-5 h-5 lg:w-6 lg:h-6
                                ${ currentStep === 'result' ?
                                    'text-green-600'
                                    : 'text-gray-500'}
                            `} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path clipRule="evenodd" fillRule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" />
                            </svg>
                        </div>
                    </li> */}
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
                                    onChange={e => {setParticipantMobile(e.target.value)}}
                                    value={
                                        participantMobile !== null ?
                                            participantMobile
                                        :""
                                    }
                                />
                                <label htmlFor="fo_mobile-number" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Mobile number</label>
                            </div>
                        </div>

                        <div>
                            <div className="relative">
                                <input type="email" id="fo_email" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                    onChange={e => {setParticipantEmail(e.target.value)}}
                                    value={
                                        participantEmail !== null ?
                                            participantEmail
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
                                <option value={null}>Choose Civil Status</option>
                                <option value={"Single"}>Single</option>
                                <option value={"Married"}>Married</option>
                                <option value={"Widow/Widower"}>Widow/Widower</option>
                                <option value={"Separated"}>Separated</option>
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
                                        onChange={e => {setConfirmed(e.target.value)}}
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
                                        // onChange={e => {setconfirmed(e.target.value)}}
                                        // checked={
                                        //     confirmed !== null & confirmed === 'No' ?
                                        //         true
                                        //     : null
                                        // }
                                    />
                                    <label htmlFor="pi_confirmation" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">No</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="submit" onClick={() => {Stepper('address')}} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Next Step: Address Info
                    </button>
                </PersonalInfo>

                <AddressInfo show={showAddressInfo}>
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
                    <button onClick={() => Stepper('personal')} type="submit" className="text-white bg-gray-500 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-6 py-2.5 text-center ">
                        Go Back to: Personal Info
                    </button>
                    <button onClick={() => Stepper('work')} type="submit" className="mx-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Next Step: Work Info
                    </button>
                </AddressInfo>

                <SchoolInfo show={showSchoolInfo}>
                    <h3 className="mb-4 text-lg font-medium leading-none text-gray-900 dark:text-white">School Info</h3>
                    <div className="grid gap-4 mb-4 sm:grid-cols-3">
                        <div>
                            <label htmlFor="pi_education" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Educational Level</label>
                            <select id="pi_education" className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={e => {setEducationalLevel(e.target.value)}}
                                value={
                                        educationalLevel !== null ?
                                            educationalLevel
                                        :""
                                    }
                            >
                                <option value={null}>Choose Educational Level</option>
                                <option value={"Single"}>High School</option>
                                <option value={"Married"}>College</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="pi_yearLevel" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Year Level</label>
                            <select id="pi_yearLevel" className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={e => {setYearLevel(e.target.value)}}
                                value={
                                        yearLevel !== null ?
                                            yearLevel
                                        :""
                                    }
                            >
                                <option value={null}>Choose Year Level</option>
                                <option value={"1st Year"}>1st Year</option>
                                <option value={"2nd Year"}>2nd Year</option>
                                <option value={"3rd Year"}>3rd Year</option>
                                <option value={"4th Year"}>4th Year</option>
                            </select>
                        </div>
                        <div>
                            <div className="relative mt-6">
                                <input type="text" id="fo_course" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                    onChange={e => {setCourse(e.target.value)}}
                                    value={
                                        course !== null ?
                                            course
                                        :""
                                    }
                                />
                                <label htmlFor="fo_course" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Course</label>
                            </div>
                        </div>
                    </div>
                    <div className="grid gap-4 mb-4 sm:grid-cols-2">
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
                    <button onClick={() => Stepper('address')} type="submit" className="text-white bg-gray-500 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-6 py-2.5 text-center ">
                        Go Back to: Address Info
                    </button>
                    <button onClick={() => Stepper('emergency')} type="submit" className="mx-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Next Step: Emergency Contacts
                    </button>
                </SchoolInfo>

                <Guardians show={showEmergencyContact}>
                    <h3 className="mb-4 text-lg font-medium leading-none text-gray-900 dark:text-white">Emergency Contact</h3>
                    <div className="w-full grid gap-2 mb-4 sm:grid-cols-5">
                        {
                            contactList.length > 0 ?
                                contactList.map((x, i) => (
                                    <>
                                        <div className="relative">
                                            <input type="text" id="fo_name" name='name' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                                onChange={ e => handleContactChange(e,i)}
                                                value={ contactList[i].name !== "" & contactList[i].name !== null & contactList[i].name !== undefined ? contactList[i].name : ""}
                                            />
                                            <label htmlFor="fo_name" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Name</label>
                                        </div>
                                        <div className="relative">
                                            <input type="text" id="fo_mobile" name='mobile' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                                onChange={ e => handleContactChange(e,i) }

                                                value={ contactList[i].mobile !== "" & contactList[i].mobile !== null & contactList[i].mobile !== undefined ? contactList[i].mobile : ""}
                                            />
                                            <label htmlFor="fo_mobile" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Mobile</label>
                                        </div>
                                        <div className="relative">
                                            <input type="text" id="fo_email" name='email' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                                onChange={ e => handleContactChange(e,i) }
                                                value={ contactList[i].email !== "" & contactList[i].email !== null & contactList[i].email !== undefined ? contactList[i].email : ""}
                                            />
                                            <label htmlFor="fo_email" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Email</label>
                                        </div>
                                        <div className="relative">
                                            <input type="text" id="fo_relationship" name='relationship' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                                onChange={ e => handleContactChange(e,i) }
                                                value={ contactList[i].relationship !== "" & contactList[i].relationship !== null & contactList[i].relationship !== undefined ? contactList[i].relationship : ""}
                                            />
                                            <label htmlFor="fo_relationship" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Relationship</label>
                                        </div>
                                        <div className="relative">
                                            {
                                                contactList.length > 1 &&
                                                    <button type="button" className="mx-1 text-red-700 border border-red-700 hover:bg-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
                                                    onClick={ () => handleremove(i) }
                                                    >
                                                        <svg fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                        </svg>
                                                        <span className="sr-only">Remove Contact</span>
                                                    </button>
                                            }
                                            {
                                                contactList.length-1 === i &&
                                                    <button type="button" className="mx-1 text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
                                                    onClick={ handleadd }
                                                    >
                                                        <svg fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                        </svg>
                                                        <span className="sr-only">Add Contact</span>
                                                    </button>
                                            }
                                        </div>
                                    </>
                                ))
                            : null
                        }
                    </div>
                    <button onClick={() => Stepper('work')} type="submit" className="text-white bg-gray-500 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-6 py-2.5 text-center ">
                        Go Back to: Work Info
                    </button>
                    <button type="submit" className="mx-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2.5 text-center"
                        onClick={() => Stepper('invite')}
                    >
                        Next Step: Inviter Info
                    </button>
                </Guardians>

                <Inviter show={showInvite}>
                    <h3 className="mb-4 text-lg font-medium leading-none text-gray-900 dark:text-white">Inviter Info</h3>
                    <div className="w-full grid gap-2 mb-4 sm:grid-cols-5">
                        {
                            inviteList.length > 0 ?
                                inviteList.map((x, i) => (
                                    <>
                                        <div className="relative">
                                            <input type="text" id="fo_name" name='name' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                                onChange={ e => handleInviterChange(e,i)}
                                                value={ inviteList[i].name !== "" & inviteList[i].name !== null & inviteList[i].name !== undefined ? inviteList[i].name : ""}
                                            />
                                            <label htmlFor="fo_name" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Name</label>
                                        </div>
                                        <div className="relative">
                                            <input type="text" id="fo_mobile" name='mobile' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                                onChange={ e => handleInviterChange(e,i) }

                                                value={ inviteList[i].mobile !== "" & inviteList[i].mobile !== null & inviteList[i].mobile !== undefined ? inviteList[i].mobile : ""}
                                            />
                                            <label htmlFor="fo_mobile" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Mobile</label>
                                        </div>
                                        <div className="relative">
                                            <input type="text" id="fo_email" name='email' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                                onChange={ e => handleInviterChange(e,i) }
                                                value={ inviteList[i].email !== "" & inviteList[i].email !== null & inviteList[i].email !== undefined ? inviteList[i].email : ""}
                                            />
                                            <label htmlFor="fo_email" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Email</label>
                                        </div>
                                        <div className="relative">
                                            <input type="text" id="fo_relationship" name='relationship' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                                onChange={ e => handleInviterChange(e,i) }
                                                value={ inviteList[i].relationship !== "" & inviteList[i].relationship !== null & inviteList[i].relationship !== undefined ? inviteList[i].relationship : ""}
                                            />
                                            <label htmlFor="fo_relationship" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Relationship</label>
                                        </div>
                                        <div className="relative">
                                            {
                                                inviteList.length > 1 &&
                                                    <button type="button" className="mx-1 text-red-700 border border-red-700 hover:bg-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
                                                    onClick={ () => handleInveterRemove(i) }
                                                    >
                                                        <svg fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                        </svg>
                                                        <span className="sr-only">Remove Contact</span>
                                                    </button>
                                            }
                                            {
                                                inviteList.length-1 === i &&
                                                    <button type="button" className="mx-1 text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
                                                    onClick={ handleInviterAdd }
                                                    >
                                                        <svg fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                        </svg>
                                                        <span className="sr-only">Add Contact</span>
                                                    </button>
                                            }
                                        </div>
                                    </>
                                ))
                            : null
                        }
                    </div>
                    <button onClick={() => Stepper('emergency')} type="submit" className="text-white bg-gray-500 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-6 py-2.5 text-center ">
                        Go Back to: Emergency Contacts
                    </button>
                    <button type="submit" className="mx-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2.5 text-center"
                        onClick={addParticipant}
                    >
                        Save
                    </button>
                </Inviter>

                {/* <Result show={showResult}>
                    {
                        isLoading ?
                        <div className="text-center">
                            <div role="status">
                                <svg aria-hidden="true" className="inline w-20 h-20 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                        :
                            addStatus ?
                                <div className="flex items-center justify-around gap-4 mb-4 sm:grid-cols-2 rounded-lg bg-green-50">
                                    <div className='flex items-center p-4 mb-4 text-sm text-green-800 rounded-lg'>
                                        <svg fill="none" className='w-20 h-20 lg:w-24 lg:h-24 text-green-600' stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                                        </svg>
                                        <label className='font-semibold text-3xl'>{SEMessage}</label>
                                    </div>
                                </div>
                            :
                                <div className="flex items-center justify-around gap-4 mb-4 sm:grid-cols-2 rounded-lg bg-red-50">
                                    <div className='flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg'>
                                        <svg fill="none" className='w-20 h-20 lg:w-24 lg:h-24 text-red-600' stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                                        </svg>
                                        <label className='font-semibold text-3xl'>{SEMessage}</label>
                                    </div>
                                </div>
                    }
                    <div className='flex justify-end'>
                        <button type="submit" className="mx-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            // onClick={closeAdd}
                        >
                            Close
                        </button>
                    </div>
                </Result> */}
            </AddYEParticipant>

            <EditYEParticipant show={showEdit} setShow={closeEdit}>
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
                            : currentStep === 'work' | currentStep === 'emergency' | currentStep === 'invite' | currentStep === 'result' ?
                                'text-green-600 after:border-green-600'
                                :'text-green-100 after:border-gray-100'}
                    `}>
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0
                            ${ currentStep === 'address' && previousStep === 'personal' ?
                                'bg-green-100'
                            : currentStep === 'work' | currentStep === 'emergency' | currentStep === 'invite' | currentStep === 'result' ?
                                'bg-green-100'
                                :'bg-gray-100'}
                        `}>
                            <svg aria-hidden="true" className={`w-5 h-5 lg:w-6 lg:h-6
                                ${ currentStep === 'address' && previousStep === 'personal' ?
                                    'text-gray-500'
                                : currentStep === 'work' | currentStep === 'emergency' | currentStep === 'invite' | currentStep === 'result' ?
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
                            : currentStep === 'emergency' | currentStep === 'invite' | currentStep === 'result' ?
                                'text-green-600 after:border-green-600'
                                :'text-green-100 after:border-gray-100'}
                    `}>
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0
                            ${ currentStep === 'work' && previousStep === 'address' ?
                                'bg-green-100'
                            : currentStep === 'emergency' | currentStep === 'invite' |  currentStep === 'result' ?
                                'bg-green-100'
                                :'bg-gray-100'}
                        `}>
                            <svg aria-hidden="true" className={`w-5 h-5 lg:w-6 lg:h-6
                                ${ currentStep === 'work' && previousStep === 'address' ?
                                    'text-gray-500'
                                : currentStep === 'emergency' | currentStep === 'invite' |  currentStep === 'result' ?
                                    'text-green-600'
                                    : 'text-gray-500'}
                            `} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path clipRule="evenodd" fillRule="evenodd" d="M7.5 5.25a3 3 0 013-3h3a3 3 0 013 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0112 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 017.5 5.455V5.25zm7.5 0v.09a49.488 49.488 0 00-6 0v-.09a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5zm-3 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" />
                                <path d="M3 18.4v-2.796a4.3 4.3 0 00.713.31A26.226 26.226 0 0012 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 01-6.477-.427C4.047 21.128 3 19.852 3 18.4z" />
                            </svg>
                        </div>
                    </li>
                    <li className={`flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-4 after:inline-block
                        ${ currentStep === 'emergency' && previousStep === 'work' ?
                            'text-green-100 after:border-green-100'
                            : currentStep === 'invite' | currentStep === 'result' ?
                                'text-green-600 after:border-green-600'
                                :'text-green-100 after:border-gray-100'}
                    `}>
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0
                            ${ currentStep === 'emergency' && previousStep === 'work' ?
                                'bg-green-100'
                            : currentStep === 'invite' | currentStep === 'result' ?
                                'bg-green-100'
                                :'bg-gray-100'}
                        `}>
                            <svg aria-hidden="true" className={`w-5 h-5 lg:w-6 lg:h-6
                                ${ currentStep === 'emergency' && previousStep === 'work' ?
                                    'text-gray-500'
                                : currentStep === 'invite' | currentStep === 'result' ?
                                    'text-green-600'
                                    : 'text-gray-500'}
                            `} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path clipRule="evenodd" fillRule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z" />
                            </svg>
                        </div>
                    </li>
                    <li className={`flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-4 after:inline-block
                        ${ currentStep === 'invite' && previousStep === 'emergency' ?
                            'text-green-100 after:border-green-100'
                            : currentStep === 'result' ?
                                'text-green-600 after:border-green-600'
                                :'text-green-100 after:border-gray-100'}
                    `}>
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0
                            ${ currentStep === 'invite' && previousStep === 'emergency' ?
                                'bg-green-100'
                            : currentStep === 'result' ?
                                'bg-green-100'
                                :'bg-gray-100'}
                        `}>
                            <svg aria-hidden="true" className={`w-5 h-5 lg:w-6 lg:h-6
                                ${ currentStep === 'invite' && previousStep === 'emergency' ?
                                    'text-gray-500'
                                : currentStep === 'result' ?
                                    'text-green-600'
                                    : 'text-gray-500'}
                            `} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
                                <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
                            </svg>
                        </div>
                    </li>
                    {/* <li className='flex w-full items-center'>
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0
                            ${ currentStep === 'result' && previousStep === 'emergency' ?
                                'bg-green-100'
                            : currentStep === 'result' ?
                                'bg-green-100'
                                :'bg-gray-100'}
                        `}>
                            <svg aria-hidden="true" className={`w-5 h-5 lg:w-6 lg:h-6
                                ${ currentStep === 'result' ?
                                    'text-green-600'
                                    : 'text-gray-500'}
                            `} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path clipRule="evenodd" fillRule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" />
                            </svg>
                        </div>
                    </li> */}
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
                                    onChange={e => {setParticipantMobile(e.target.value)}}
                                    value={
                                        participantMobile !== null ?
                                            participantMobile
                                        :""
                                    }
                                />
                                <label htmlFor="fo_mobile-number" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Mobile number</label>
                            </div>
                        </div>

                        <div>
                            <div className="relative">
                                <input type="email" id="fo_email" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                    onChange={e => {setParticipantEmail(e.target.value)}}
                                    value={
                                        participantEmail !== null ?
                                            participantEmail
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
                                <option value={null}>Choose Civil Status</option>
                                <option value={"Single"}>Single</option>
                                <option value={"Married"}>Married</option>
                                <option value={"Widow/Widower"}>Widow/Widower</option>
                                <option value={"Separated"}>Separated</option>
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
                                        onChange={e => {setConfirmed(e.target.value)}}
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
                                        onChange={e => {setConfirmed(e.target.value)}}
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
                    <button type="submit" onClick={() => {Stepper('address')}} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Next Step: Address Info
                    </button>
                </PersonalInfo>

                <AddressInfo show={showAddressInfo}>
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
                    <button onClick={() => Stepper('personal')} type="submit" className="text-white bg-gray-500 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-6 py-2.5 text-center ">
                        Go Back to: Personal Info
                    </button>
                    <button onClick={() => Stepper('work')} type="submit" className="mx-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Next Step: Work Info
                    </button>
                </AddressInfo>

                <SchoolInfo show={showSchoolInfo}>
                    <h3 className="mb-4 text-lg font-medium leading-none text-gray-900 dark:text-white">School Info</h3>
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
                    <button onClick={() => Stepper('address')} type="submit" className="text-white bg-gray-500 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-6 py-2.5 text-center ">
                        Go Back to: Address Info
                    </button>
                    <button onClick={() => Stepper('emergency')} type="submit" className="mx-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Next Step: Emergency Contacts
                    </button>
                </SchoolInfo>

                <Guardians show={showEmergencyContact}>
                    <h3 className="mb-4 text-lg font-medium leading-none text-gray-900 dark:text-white">Emergency Contact</h3>
                    <div className="w-full grid gap-2 mb-4 sm:grid-cols-5">
                        {
                            contactList.length > 0 ?
                                contactList.map((x, i) => (
                                    <>
                                        <div className="relative">
                                            <input type="text" id="fo_name" name='name' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                                onChange={ e => handleContactChange(e,i)}
                                                value={ contactList[i].name !== "" & contactList[i].name !== null & contactList[i].name !== undefined ? contactList[i].name : ""}
                                            />
                                            <label htmlFor="fo_name" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Name</label>
                                        </div>
                                        <div className="relative">
                                            <input type="text" id="fo_mobile" name='mobile' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                                onChange={ e => handleContactChange(e,i) }

                                                value={ contactList[i].mobile !== "" & contactList[i].mobile !== null & contactList[i].mobile !== undefined ? contactList[i].mobile : ""}
                                            />
                                            <label htmlFor="fo_mobile" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Mobile</label>
                                        </div>
                                        <div className="relative">
                                            <input type="text" id="fo_email" name='email' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                                onChange={ e => handleContactChange(e,i) }
                                                value={ contactList[i].email !== "" & contactList[i].email !== null & contactList[i].email !== undefined ? contactList[i].email : ""}
                                            />
                                            <label htmlFor="fo_email" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Email</label>
                                        </div>
                                        <div className="relative">
                                            <input type="text" id="fo_relationship" name='relationship' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                                onChange={ e => handleContactChange(e,i) }
                                                value={ contactList[i].relationship !== "" & contactList[i].relationship !== null & contactList[i].relationship !== undefined ? contactList[i].relationship : ""}
                                            />
                                            <label htmlFor="fo_relationship" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Relationship</label>
                                        </div>
                                        <div className="relative">
                                            {
                                                contactList.length > 1 &&
                                                    <button type="button" className="mx-1 text-red-700 border border-red-700 hover:bg-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
                                                    onClick={ () => handleremove(i) }
                                                    >
                                                        <svg fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                        </svg>
                                                        <span className="sr-only">Remove Contact</span>
                                                    </button>
                                            }
                                            {
                                                contactList.length-1 === i &&
                                                    <button type="button" className="mx-1 text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
                                                    onClick={ handleadd }
                                                    >
                                                        <svg fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                        </svg>
                                                        <span className="sr-only">Add Contact</span>
                                                    </button>
                                            }
                                        </div>
                                    </>
                                ))
                            : null
                        }
                    </div>
                    <button onClick={() => Stepper('work')} type="submit" className="text-white bg-gray-500 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-6 py-2.5 text-center ">
                        Go Back to: Work Info
                    </button>
                    <button type="submit" className="mx-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2.5 text-center"
                       onClick={() => Stepper('invite')}
                    >
                        Next Step: Inviter Info
                    </button>
                </Guardians>

                <Inviter show={showInvite}>
                    <h3 className="mb-4 text-lg font-medium leading-none text-gray-900 dark:text-white">Inviter Info</h3>
                    <div className="w-full grid gap-2 mb-4 sm:grid-cols-3">
                        {
                            inviteList.length > 0 ?
                                inviteList.map((x, i) => (
                                    <>
                                        <div className="relative">
                                            <input type="text" id="fo_name" name='name' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                                onChange={ e => handleInviterChange(e,i)}
                                                value={ inviteList[i].name !== "" & inviteList[i].name !== null & inviteList[i].name !== undefined ? inviteList[i].name : ""}
                                            />
                                            <label htmlFor="fo_name" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Name</label>
                                        </div>
                                        <div className="relative">
                                            <input type="text" id="fo_relationship" name='relationship' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                                onChange={ e => handleInviterChange(e,i) }
                                                value={ inviteList[i].relationship !== "" & inviteList[i].relationship !== null & inviteList[i].relationship !== undefined ? inviteList[i].relationship : ""}
                                            />
                                            <label htmlFor="fo_relationship" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Relationship</label>
                                        </div>
                                        <div className="relative">
                                            {
                                                inviteList.length > 1 &&
                                                    <button type="button" className="mx-1 text-red-700 border border-red-700 hover:bg-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
                                                    onClick={ () => handleInveterRemove(i) }
                                                    >
                                                        <svg fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                        </svg>
                                                        <span className="sr-only">Remove Contact</span>
                                                    </button>
                                            }
                                            {
                                                inviteList.length-1 === i &&
                                                    <button type="button" className="mx-1 text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
                                                    onClick={ handleInviterAdd }
                                                    >
                                                        <svg fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                        </svg>
                                                        <span className="sr-only">Add Contact</span>
                                                    </button>
                                            }
                                        </div>
                                    </>
                                ))
                            : null
                        }
                    </div>
                    <button onClick={() => Stepper('emergency')} type="submit" className="text-white bg-gray-500 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-6 py-2.5 text-center ">
                        Go Back to: Emergency Contacts
                    </button>
                    <button type="submit" className="mx-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2.5 text-center"
                        onClick={updateParticipant}
                    >
                        Save
                    </button>
                </Inviter>

                {/* <Result show={showResult}>
                    {
                        isLoading ?
                        <div className="text-center">
                            <div role="status">
                                <svg aria-hidden="true" className="inline w-20 h-20 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                        :
                            updateStatus ?
                                <div className="flex items-center justify-around gap-4 mb-4 sm:grid-cols-2 rounded-lg bg-green-50">
                                    <div className='flex items-center p-4 mb-4 text-sm text-green-800 rounded-lg'>
                                        <svg fill="none" className='w-20 h-20 lg:w-24 lg:h-24 text-green-600' stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                                        </svg>
                                        <label className='font-semibold text-3xl'>{SEMessage}</label>
                                    </div>
                                </div>
                            :
                                <div className="flex items-center justify-around gap-4 mb-4 sm:grid-cols-2 rounded-lg bg-red-50">
                                    <div className='flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg'>
                                        <svg fill="none" className='w-20 h-20 lg:w-24 lg:h-24 text-red-600' stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                                        </svg>
                                        <label className='font-semibold text-3xl'>{SEMessage}</label>
                                    </div>
                                </div>
                    }
                    <div className='flex justify-end'>
                        <button type="submit" className="mx-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={closeEdit}
                        >
                            Close
                        </button>
                    </div>
                </Result> */}
            </EditYEParticipant>

            <YEAttendanceWarning show={showAttendanceWarning} setShow={setShowAttendanceWarning}>
                <div className="flex items-center justify-around gap-4 mb-4 sm:grid-cols-2 rounded-lg">
                        <div className='flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg'>
                            <svg fill="none" className='w-20 h-20 lg:w-24 lg:h-24 text-red-600' stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                            </svg>
                            <label className='font-semibold text-lg'>Are you sure you want to tag <strong><em>"{firstName} {middleName === "" | middleName === null | middleName === undefined ? "" : middleName.charAt(0) + "."} {lastName}"</em></strong> as <strong><em>"{attendance}"</em></strong>?</label>
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
            </YEAttendanceWarning>
        </div>
    )
}

export default DTRegistration