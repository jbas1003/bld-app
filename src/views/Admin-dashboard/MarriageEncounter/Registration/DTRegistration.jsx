import React, { Fragment, useState, useEffect } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import useAuthContext from '../../../../utils/AuthContext';
// import { Link } from 'react-router-dom';
import AddMEParticipant from './Modals/AddMEParticipant';
import PersonalInfo from './Modals/PersonalInfo';
import AddressInfo from './Modals/AddressInfo';
import WorkInfo from './Modals/WorkInfo';
import EmergencyContacts from './Modals/EmergencyContacts';
// import Result from './Modals/Result';
import { AddParticipant, CreateMEAttendance, GetME, UpdateParticipant } from '../../../../utils/MarriageEncounterMethods';
import { GetAllEvents } from '../../../../utils/EventsMethods';
import EditMEParticipant from './Modals/EditMEParticipant';
import MEAttendanceWarning from './Modals/MEAttendanceWarning';
import Inviter from './Modals/Inviter';


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function DTRegistration() {
    const [selected, setSelected] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    // START: Utils Constants

        const { loginResult } = useAuthContext();

        const event_type = 'Marriage Encounter';

        const [eventStatus, setEventStatus] = useState();
        const [eventData, setEventData] = useState();
        const [event, setEvent] = useState('');

        const [MEData, setMEData] = useState();
        const [MEStatus, setMEStatus] = useState();

    // END: Utils Constants

    // START: Chidlren and Inviter Constatns

        const [childrenList, setChildrenList] = useState([{firstName: '', middleName: '', lastName: '', birthday: '', created_by: loginResult.__}]);
        const [inviteList, setInviteList] = useState([{name: '', relationship: '', created_by: loginResult.__}]);
        const [updateChildrenList, setUpdateChildrenList] = useState([]);

    // END: Chidlren and Inviter Constants

    // START: Stepper Constants

        const [currentStep, setCurrentStep] = useState();
        const [previousStep, setPreviousStep] = useState();
        const [showPersonalInfo, setShowPersonalInfo] = useState();
        const [showAddressInfo, setShowAddressinfo] = useState();
        const [showWorkInfo, setShowWorkinfo] = useState();
        const [showEmergencyContact, setShowEmergencyContact] = useState();
        const [showInvite, setShowInvite] = useState();

    // END: Stepper Constants

    // START: Modal Constants

        const [showAdd, setShowAdd] = useState();
        const [showEdit, setShowEdit] = useState();
        const [showAttendanceWarning, setShowAttendanceWarning] = useState();
        // const [showDeleteWarning, setShowDeleteWarning] = useState();

    // END: Modal Constants

    // START: Personal Info Constants

        const [memberId, setMemberId] = useState();
        const [meId, setMEId] = useState();
        const [firstName, setFirstName] = useState();
        const [middleName, setMiddleName] = useState();
        const [lastName, setLastName] = useState();
        const [nickname, setNickname] = useState();
        const [participantMobile, setParticipantMobile] = useState();
        const [participantEmail, setParticipantEmail] = useState()
        const [birthday, setBirthday] = useState();
        const [gender, setGender] = useState();
        const [civilStatus, setCivilStatus] = useState();
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

    // START: Husband Info Constants

    const [husbandId, setHusbandId] = useState();
    // const [husbandMeId, setHusbandMEId] = useState();
    const [husbandFirstName, setHusbandFirstName] = useState();
    const [husbandMiddleName, setHusbandMiddleName] = useState();
    const [husbandLastName, setHusbandLastName] = useState();
    const [husbandNickname, setHusbandNickname] = useState();
    const [husbandMobile, setHusbandMobile] = useState();
    const [husbandEmail, setHusbandEmail] = useState()
    const [husbandBirthday, setHusbandBirthday] = useState();
    const [husbandCivilStatus, setHusbandCivilStatus] = useState();
    const [husbandSpouse, setHusbandSpouse] = useState();
    const [husbandReligion, setHusbandReligion] = useState();
    const [husbandBaptized, setHusbandBaptized] = useState();
    const [husbandConfirmed, setHusbandConfirmed] = useState();


    // END: Husband Info Constants


    // START: Husband Address Info Constants

        const [husbandAddressLine1, setHusbandAddressLine1] = useState();
        const [husbandAddressLine2, setHusbandAddressLine2] = useState();
        const [husbandCity, setHusbandCity] = useState();

    // END: Husband Address Info Constants

    // START: Work info Constants

        const [husbandOccupation, setHusbandOccupation] = useState();
        const [husbandCompany, setHusbandCompany] = useState();
        const [husbandCompanyAddressLine1, setHusbandCompanyAddressLine1] = useState();
        const [husbandCompanyAddressLine2, setHusbandCompanyAddressLine2] = useState();
        const [husbandCompanyCity, setHusbandCompanyCity] = useState();

    // END: Husband Work info Constants

    // START: Wife Info Constants

        const [wifeId, setWifeId] = useState();
        // const [wifeMeId, setWifeMEId] = useState();
        const [wifeFirstName, setWifeFirstName] = useState();
        const [wifeMiddleName, setWifeMiddleName] = useState();
        const [wifeLastName, setWifeLastName] = useState();
        const [wifeNickname, setWifeNickname] = useState();
        const [wifeMobile, setWifeMobile] = useState();
        const [wifeEmail, setWifeEmail] = useState()
        const [wifeBirthday, setWifeBirthday] = useState();
        const [wifeCivilStatus, setWifeCivilStatus] = useState();
        const [wifeSpouse, setWifeSpouse] = useState();
        const [wifeReligion, setWifeReligion] = useState();
        const [wifeBaptized, setWifeBaptized] = useState();
        const [wifeConfirmed, setWifeConfirmed] = useState();


    // END: Wife Info Constants


    // START: Wife Address Info Constants

        const [wifeAddressLine1, setWifeAddressLine1] = useState();
        const [wifeAddressLine2, setWifeAddressLine2] = useState();
        const [wifeCity, setWifeCity] = useState();

    // END: Wife Address Info Constants

    // START: Work info Constants

        const [wifeOccupation, setWifeOccupation] = useState();
        const [wifeCompany, setWifeCompany] = useState();
        const [wifeCompanyAddressLine1, setWifeCompanyAddressLine1] = useState();
        const [wifeCompanyAddressLine2, setWifeCompanyAddressLine2] = useState();
        const [wifeCompanyCity, setWifeCompanyCity] = useState();

    // END: Wife Work info Constants

    // START: Stepper function
        const Stepper = (step) => {

            switch (step) {
                case "personal":
                    setCurrentStep("personal");
                    setShowPersonalInfo(true);
                    setShowAddressinfo(false);
                    setShowWorkinfo(false);
                    setShowEmergencyContact(false);
                    setShowInvite(false)
                    break;
                
                case "address":
                    setPreviousStep("personal");
                    setCurrentStep("address");
                    setShowPersonalInfo(false);
                    setShowAddressinfo(true);
                    setShowWorkinfo(false);
                    setShowEmergencyContact(false);
                    setShowInvite(false)
                    break;
                
                case "work":
                    setPreviousStep("address")
                    setCurrentStep("work");
                    setShowPersonalInfo(false);
                    setShowAddressinfo(false);
                    setShowWorkinfo(true);
                    setShowEmergencyContact(false);
                    setShowInvite(false);
                    break;
                
                case "emergency":
                    setPreviousStep("address")
                    setCurrentStep("emergency");
                    setShowPersonalInfo(false);
                    setShowAddressinfo(false);
                    setShowWorkinfo(false);
                    setShowEmergencyContact(true);
                    setShowInvite(false);
                    break;
            
                case "invite":
                    setPreviousStep("emergency")
                    setCurrentStep("invite");
                    setShowPersonalInfo(false);
                    setShowAddressinfo(false);
                    setShowWorkinfo(false);
                    setShowEmergencyContact(false);
                    setShowInvite(true);
                    break;
                
                case "result":
                    setPreviousStep("invite")
                    setCurrentStep("result");
                    setShowPersonalInfo(false);
                    setShowAddressinfo(false);
                    setShowWorkinfo(false);
                    setShowEmergencyContact(false);
                    setShowInvite(false);
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
        setHusbandId('');
        // setHusbandMEId('');
        setHusbandFirstName('');
        setHusbandMiddleName('');
        setHusbandLastName('');
        setHusbandNickname('');
        setHusbandMobile('');
        setHusbandEmail('');
        setHusbandBirthday('');
        setHusbandCivilStatus('');
        setHusbandSpouse('');
        setHusbandReligion('');
        setHusbandBaptized('');
        setHusbandConfirmed('');
        setHusbandAddressLine1('');
        setHusbandAddressLine2('');
        setHusbandCity('');
        setHusbandOccupation('');
        setHusbandCompany('');
        setHusbandCompanyAddressLine1('');
        setHusbandCompanyAddressLine2('');
        setHusbandCompanyCity('');

        setWifeId('');
        // setWifeMEId('');
        setWifeFirstName('');
        setWifeMiddleName('');
        setWifeLastName('');
        setWifeNickname('');
        setWifeMobile('');
        setWifeEmail('');
        setWifeBirthday('');
        setWifeCivilStatus('');
        setWifeSpouse('');
        setWifeReligion('');
        setWifeBaptized('');
        setWifeConfirmed('');
        setWifeAddressLine1('');
        setWifeAddressLine2('');
        setWifeCity('');
        setWifeOccupation('');
        setWifeCompany('');
        setWifeCompanyAddressLine1('');
        setWifeCompanyAddressLine2('');
        setWifeCompanyCity('');

        setChildrenList([{firstName: '', middleName: '', lastName: '', birthday: '', created_by: loginResult.__}]);
        setInviteList([{name: '', relationship: '', created_by: loginResult.__}]);
        
        setShowAdd(false)
    }

    const attendanceWarning = (memberId, meId, attendanceStatus, firstName, middleName, lastName) => {
        setMemberId(memberId);
        setMEId(meId);
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
        CreateMEAttendance(loginResult.__, memberId, meId, attendance)
            .then(async result => { return await result.json()})
            .then(async result => {
                if (await result.status === 200) {
                    alert('Attendance updated successfully!')
                } else{
                    alert('An error occured while updating the attendance. Please contact system administrator.')
                }
            });
        getME();
        closeAttendanceWarning();
    }

    const showEditParticipant = (husbandId, husbandMeId, husbandFirstName, husbandMiddleName, husbandLastName, husbandNickname, husbandMobile,
                                husbandEmail, husbandBirthday, husbandCivilStatus, husbandReligion,
                                husbandBaptized, husbandConfirmed, husbandAddressLine1, husbandAddressLine2,
                                husbandCity, husbandOccupation, husbandCompany, husbandCompanyAddressLine1,
                                husbandCompanyAddressLine2, husbandCompanyCity, relationships, inviters) => {
        
        setHusbandId(husbandId);
        // setHusbandMEId(husbandMeId);
        setHusbandFirstName(husbandFirstName);
        setHusbandMiddleName(husbandMiddleName);
        setHusbandLastName(husbandLastName);
        setHusbandNickname(husbandNickname);
        setHusbandMobile(husbandMobile);
        setHusbandEmail(husbandEmail);
        setHusbandBirthday(husbandBirthday);
        setHusbandCivilStatus(husbandCivilStatus);
        setHusbandSpouse(husbandSpouse);
        setHusbandReligion(husbandReligion);
        setHusbandBaptized(husbandBaptized);
        setHusbandConfirmed(husbandConfirmed);
        setHusbandAddressLine1(husbandAddressLine1);
        setHusbandAddressLine2(husbandAddressLine2);
        setHusbandCity(husbandCity);
        setHusbandOccupation(husbandOccupation);
        setHusbandCompany(husbandCompany);
        setHusbandCompanyAddressLine1(husbandCompanyAddressLine1);
        setHusbandCompanyAddressLine2(husbandCompanyAddressLine2);
        setHusbandCompanyCity(husbandCompanyCity);

        if (relationships.length > 0) {
            relationships
                .filter(spouse => {
                    return (
                        spouse.relationship.toLowerCase() === "wife" || spouse.relationship.toLowerCase() === "husband"
                    );
                })
                .map(spouse => {
                    setWifeId(spouse.member_id);
                    setWifeFirstName(spouse.first_name);
                    setWifeMiddleName(spouse.middle_name);
                    setWifeLastName(spouse.last_name);
                    setWifeNickname(spouse.nickname);
                    setWifeMobile(spouse.mobile);
                    setWifeEmail(spouse.email);
                    setWifeBirthday(spouse.birthday);
                    setWifeCivilStatus(spouse.civil_status);
                    setWifeReligion(spouse.religion);
                    setWifeBaptized(spouse.baptized);
                    setWifeConfirmed(spouse.confirmed);
                    setWifeAddressLine1(spouse.address_line1);
                    setWifeAddressLine2(spouse.address_line2);
                    setWifeCity(spouse.city);
                    setWifeOccupation(spouse.occupation_name);
                    setWifeCompany(spouse.company);
                    setWifeCompanyAddressLine1(spouse.work_addressLine1);
                    setWifeCompanyAddressLine2(spouse.work_addressLine2);
                    setWifeCompanyCity(spouse.work_city);
                });

            relationships
                .filter(children => {
                    return (
                        children.relationship.toLowerCase() === "child"
                    );
                })
                .map(children => {
                    setChildrenList([...childrenList, { firstName: children.first_name, middleName: children.middle_name, lastName: children.last_name, birthday: children.birthday, created_by: loginResult.__ }])
                });

        }
        
        // if (children.length > 0) {
        //     setChildrenList(children);
        // }

        // if (inviters.length > 0) {
        //     setInviteList(inviters);
        // }

        // console.log(inviters);
        Stepper('personal');

        setShowEdit(true);
    }

    const closeEdit = () => {
        setHusbandId('');
        // setHusbandMEId('');
        setHusbandFirstName('');
        setHusbandMiddleName('');
        setHusbandLastName('');
        setHusbandNickname('');
        setHusbandMobile('');
        setHusbandEmail('');
        setHusbandBirthday('');
        setHusbandCivilStatus('');
        setHusbandSpouse('');
        setHusbandReligion('');
        setHusbandBaptized('');
        setHusbandConfirmed('');
        setHusbandAddressLine1('');
        setHusbandAddressLine2('');
        setHusbandCity('');
        setHusbandOccupation('');
        setHusbandCompany('');
        setHusbandCompanyAddressLine1('');
        setHusbandCompanyAddressLine2('');
        setHusbandCompanyCity('');

        setWifeId('');
        // setWifeMEId('');
        setWifeFirstName('');
        setWifeMiddleName('');
        setWifeLastName('');
        setWifeNickname('');
        setWifeMobile('');
        setWifeEmail('');
        setWifeBirthday('');
        setWifeCivilStatus('');
        setWifeSpouse('');
        setWifeReligion('');
        setWifeBaptized('');
        setWifeConfirmed('');
        setWifeAddressLine1('');
        setWifeAddressLine2('');
        setWifeCity('');
        setWifeOccupation('');
        setWifeCompany('');
        setWifeCompanyAddressLine1('');
        setWifeCompanyAddressLine2('');
        setWifeCompanyCity('');

        setChildrenList([{firstName: '', middleName: '', lastName: '', birthday: '', created_by: loginResult.__}]);
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

    // START: Children Handle

        const handleChildrenChange = (e, index) => {
            const {name, value} = e.target;
            const children = [...childrenList];
            children[index][name] = value;
            setChildrenList(children);
        }

        const handleadd = () => {
            setChildrenList([...childrenList, { firstName: '', middleName: '', lastName: '', birthday: '', created_by: loginResult.__}]);
        }

        const handleremove = (index) => {
            childrenList.splice(index,1);
            setChildrenList([...childrenList]);
        }

    // END: Children Handle

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
        AddParticipant(loginResult.__, husbandFirstName, husbandMiddleName, husbandLastName, husbandNickname, husbandMobile,
                                husbandEmail, husbandBirthday, husbandCivilStatus, husbandSpouse, husbandReligion,
                                husbandBaptized, husbandConfirmed, husbandAddressLine1, husbandAddressLine2,
                                husbandCity, husbandOccupation, husbandCompany, husbandCompanyAddressLine1,
                                husbandCompanyAddressLine2, husbandCompanyCity, wifeFirstName, wifeMiddleName, wifeLastName,
                                wifeNickname, wifeMobile, wifeEmail, wifeBirthday, wifeCivilStatus, wifeReligion, wifeBaptized, wifeConfirmed,
                                wifeAddressLine1, wifeAddressLine2, wifeCity, wifeOccupation, wifeCompany, wifeCompanyAddressLine1,
                                wifeCompanyAddressLine2, wifeCompanyCity, childrenList, inviteList, event)
            .then(async result => { return await result.json()})
            .then(async result => {
                if (await result.status === 200) {
                    alert(result.message);
                } else {
                    alert(result.message);
                }

            });
        getME();
        Stepper('result');
        closeAddParticipant();
    }

    const updateParticipant = () => {
        UpdateParticipant(loginResult.__, husbandId, memberId, husbandFirstName, husbandMiddleName, husbandLastName, husbandNickname, husbandMobile,
                            husbandEmail, husbandBirthday, husbandCivilStatus, husbandSpouse, husbandReligion,
                            husbandBaptized, husbandConfirmed, husbandAddressLine1, husbandAddressLine2,
                            husbandCity, husbandOccupation, husbandCompany, husbandCompanyAddressLine1,
                            husbandCompanyAddressLine2, husbandCompanyCity, wifeId, wifeFirstName, wifeMiddleName, wifeLastName,
                            wifeNickname, wifeMobile, wifeEmail, wifeBirthday, wifeCivilStatus, wifeReligion, wifeBaptized, wifeConfirmed,
                            wifeAddressLine1, wifeAddressLine2, wifeCity, wifeOccupation, wifeCompany, wifeCompanyAddressLine1,
                            wifeCompanyAddressLine2, wifeCompanyCity,
                            childrenList, inviteList)
            .then(async result => {return await result.json()})
            .then(async result => {
                if (await result.status === 200) {
                    alert(`${firstName} ${middleName !== null & middleName !== undefined & middleName !== "" ? middleName.charAt(0) + "." : ""} ${lastName}'s record has been successfully updated!`);
                } else {
                    alert(result.message);
                }

            });
        
        closeEdit();
        getME();
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

      const getME = (event) => {
        GetME(event)
            .then(async result => {return await result.json()})
            .then(async result => {
                if (await result.status === 200) {
                    setMEStatus(true);
                    setMEData(result.body);

                } else {
                    setMEStatus(false);
                }
            })
      }

    // END: API Functions

    useEffect(() => {
        getEvents();
        getME(event)
    }, [event])

    return (
        
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="flex items-center justify-between px-2 py-4 bg-white dark:bg-gray-900">
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
                                        event.status.toLowerCase() === 'active' & event.event_type_name === event_type ?
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
                                Age
                            </th>

                            <th scope="col" className="px-6 py-3" align='center'>
                                Spouse
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
                            MEStatus === true ?
                                MEData.map(items => (
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

                                        <td className="px-6 py-4" align='center'>
                                            { items.Age }
                                        </td>

                                        {
                                            items.relationships.length > 0 ?
                                                <td className="px-6 py-4" align='center'>
                                                    {
                                                        items.relationships
                                                        .filter(relative => {
                                                            return (
                                                                relative.relationship.toLowerCase() === "wife" || relative.relationship.toLowerCase() === "husband"
                                                            );
                                                        })
                                                        .map(relative => {
                                                            return (
                                                                <p>{relative.first_name} {(relative.middle_name !== undefined | relative.middle_name !== null | relative.middle_name !== " " ? relative.middle_name.charAt(0) + ". " : null)} {relative.last_name}</p>
                                                            )
                                                        })
                                                    }
                                                </td>
                                            :
                                                <td className="px-6 py-4" align='center'>
                                                    No Spouse
                                                </td>
                                        }

                                        <td className="flex justify-center px-6 py-4">
                                            {
                                                event !== "" & event !== null & event !== undefined ?
                                                    <div className="flex items-center">
                                                        <input id="link-checkbox" type="checkbox" value={`${items.attendance_status === "Yes" ? "No" : "Yes"}`} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                                            onChange={e => {attendanceWarning(items.member_id, items.meId, e.target.value, items.first_name, items.middle_name, items.last_name)}}
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
                                                    onClick={() => showEditParticipant(items.member_id, items.meId,
                                                                                        items.first_name, items.middle_name,
                                                                                        items.last_name, items.nickname, items.mobile,
                                                                                        items.email, items.birthday,
                                                                                        items.civil_status, items.religion,
                                                                                        items.baptism, items.confirmation,
                                                                                        items.address_line1, items.address_line2,
                                                                                        items.city, items.occupation_name,
                                                                                        items.company, items.work_addressLine1,
                                                                                        items.work_addressLine2, items.work_city, items.relationships,
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

            <AddMEParticipant show={showAdd} setShow={setShowAdd}>
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
                                <path fillRule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clipRule="evenodd"></path>
                            </svg>
                        </div>
                    </li>
                    <li className={`flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-4 after:inline-block
                        ${ currentStep === 'emergency' && previousStep === 'address' ?
                            'text-green-100 after:border-green-100'
                            : currentStep === 'invite' | currentStep === 'result' ?
                                'text-green-600 after:border-green-600'
                                :'text-green-100 after:border-gray-100'}
                    `}>
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0
                            ${ currentStep === 'emergency' && previousStep === 'address' ?
                                'bg-green-100'
                            : currentStep === 'invite' | currentStep === 'result' ?
                                'bg-green-100'
                                :'bg-gray-100'}
                        `}>
                            <svg aria-hidden="true" className={`w-5 h-5 lg:w-6 lg:h-6
                                ${ currentStep === 'emergency' && previousStep === 'address' ?
                                    'text-gray-500'
                                : currentStep === 'invite' | currentStep === 'result' ?
                                    'text-green-600'
                                    : 'text-gray-500'}
                            `} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.5 0A3.987 3.987 0 0 0 11 2.1a4.977 4.977 0 0 1 3.9 5.858A3.989 3.989 0 0 0 14.5 0ZM9 13h2a4 4 0 0 1 4 4v2H5v-2a4 4 0 0 1 4-4Z"/>
                                <path d="M5 19h10v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2ZM5 7a5.008 5.008 0 0 1 4-4.9 3.988 3.988 0 1 0-3.9 5.859A4.974 4.974 0 0 1 5 7Zm5 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm5-1h-.424a5.016 5.016 0 0 1-1.942 2.232A6.007 6.007 0 0 1 17 17h2a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5ZM5.424 9H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h2a6.007 6.007 0 0 1 4.366-5.768A5.016 5.016 0 0 1 5.424 9Z"/>
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
                </ol>
                
                <PersonalInfo show={showPersonalInfo}>
                    <h3 className="mb-4 text-lg font-medium leading-none text-gray-900 dark:text-white">Husband Info</h3>
                    <div className="grid gap-4 mb-4 sm:grid-cols-2">
                        <div>
                            <div className="relative">
                                <input type="text" id="fo_husband-first-name" name='husband_firstName' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                    onChange={e => {setHusbandFirstName(e.target.value)}}
                                    value={ husbandFirstName !== "" & husbandFirstName !== null & husbandFirstName !== undefined ? husbandFirstName : "" }
                                />
                                <label htmlFor="fo_husband-first-name" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">First Name</label>
                            </div>
                        </div>
                        <div>
                            <div className="relative">
                                <input type="text" id="fo_husband-middle-name" name='husband_middleName' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                    onChange={e => {setHusbandMiddleName(e.target.value)}}
                                    value={ husbandMiddleName !== "" & husbandMiddleName !== null & husbandMiddleName !== undefined ? husbandMiddleName : "" }
                                />
                                <label htmlFor="fo_husband-middle-name" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Middle Name</label>
                            </div>
                        </div>
                        <div>
                            <div className="relative">
                                <input type="text" id="fo_husband-last-name" name='husband_lastName' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                    onChange={e => {setHusbandLastName(e.target.value)}}
                                    value={ husbandLastName !== "" & husbandLastName !== null & husbandLastName !== undefined ? husbandLastName : "" }
                                />
                                <label htmlFor="fo_husband-last-name" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Last Name</label>
                            </div>
                        </div>
                        <div>
                            <div className="relative">
                                <input type="text" id="fo_husband-nickname" name='husband_nickname' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                    onChange={e => {setHusbandNickname(e.target.value)}}
                                    value={ husbandNickname !== "" & husbandNickname !== null & husbandNickname !== undefined ? husbandNickname : "" }
                                />
                                <label htmlFor="fo_husband-nickname" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Nickname</label>
                            </div>
                        </div>
                        <div>
                            <div className="relative">
                                <input type="text" id="fo_husband-mobile-number" name='husband_mobile' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                    onChange={e => {setHusbandMobile(e.target.value)}}
                                    value={ husbandMobile !== "" & husbandMobile !== null & husbandMobile !== undefined ? husbandMobile : "" }
                                />
                                <label htmlFor="fo_husband-mobile-number" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Mobile number</label>
                            </div>
                        </div>

                        <div>
                            <div className="relative">
                                <input type="email" id="husband-fo_email" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                    onChange={e => {setHusbandEmail(e.target.value)}}
                                    value={ husbandEmail !== "" & husbandEmail !== null & husbandEmail !== undefined ? husbandEmail : "" }
                                />
                                <label htmlFor="husband-fo_email" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Email</label>
                            </div>
                        </div>

                        <div>
                            <div className="relative max-w-sm">
                                <input id='fo_husband-birthday' type="date" name='husband_dob' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Birthday"
                                    onChange={e => {setHusbandBirthday(e.target.value)}}
                                    value={ husbandBirthday !== "" & husbandBirthday !== null & husbandBirthday !== undefined ? husbandBirthday : "" }
                                />
                                <label htmlFor="fo_husband-birthday" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Birthday</label>
                            </div>
                        </div>

                        <div>
                            <div className="relative">
                                <input type="text" id="fo_husband-spouse" name='husband_spouse' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                        onChange={e => {setHusbandSpouse(e.target.value)}}
                                        value={ husbandSpouse !== "" & husbandSpouse !== null & husbandSpouse !== undefined ? husbandSpouse : "" }
                                    />
                                <label htmlFor="fo_husband-spouse" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Spouse</label>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="pi_husband-civilStatus" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Civil Status</label>
                            <select id="pi_husband-civilStatus" name='husband_civilStatus' className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={e => {setHusbandCivilStatus(e.target.value)}}
                                value={ husbandCivilStatus !== "" & husbandCivilStatus !== null & husbandCivilStatus !== undefined ? husbandCivilStatus : "" }
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
                                <input type="text" id="fo_husband-religion" name='husband_religion' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                    onChange={e => {setHusbandReligion(e.target.value)}}
                                    value={ husbandReligion !== "" & husbandReligion !== null & husbandReligion !== undefined ? husbandReligion : "" }
                                />
                                <label htmlFor="fo_husband-religion" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Religion</label>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="pi_husband-baptism" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Baptized?</label>
                            <div className="flex">
                                <div className="flex items-center mr-4">
                                <input id="pi_husband-baptism-yes" type="radio" value="Yes" name="husband_baptism-radio-group" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
                                        onChange={e => {setHusbandBaptized(e.target.value)}}
                                        checked={
                                            husbandBaptized !== null & husbandBaptized === 'Yes' ?
                                                true
                                            : null
                                        }
                                    />
                                    <label htmlFor="pi_husband-baptism" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Yes</label>
                                </div>
                                <div className="flex items-center mr-4">
                                <input id="pi_husband-baptism-no" type="radio" value="No" name="husband_baptism-radio-group" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
                                        onChange={e => {setHusbandBaptized(e.target.value)}}
                                        checked={
                                            husbandBaptized !== null & husbandBaptized === 'No' ?
                                                true
                                            : null
                                        }
                                    />
                                    <label htmlFor="pi_husband-baptism-no" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">No</label>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="pi_husband-confirmation" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirmed?</label>
                            <div className="flex">
                                <div className="flex items-center mr-4">
                                    <input id="pi_husband-confirmation" type="radio" value="Yes" name="husband_confirmation-radio-group" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
                                        onChange={e => {setHusbandConfirmed(e.target.value)}}
                                        checked={
                                            husbandConfirmed !== null & husbandConfirmed === 'Yes' ?
                                                true
                                            : null
                                        }
                                    />
                                    <label htmlFor="pi_husband-confirmation" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Yes</label>
                                </div>
                                <div className="flex items-center mr-4">
                                    <input id="pi_husband-confirmation" type="radio" value="No" name="husband_confirmation-radio-group" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        onChange={e => {setHusbandConfirmed(e.target.value)}}
                                        checked={
                                            husbandConfirmed !== null & husbandConfirmed === 'No' ?
                                                true
                                            : null
                                        }
                                    />
                                    <label htmlFor="pi_husband-confirmation" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">No</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='mb-4'>
                        <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Home Address</label>
                        <div className='grid gap-1 sm:grid-cols-3'>
                            <div>
                                <div className="relative">
                                    <input type="text" id="fo_husband-addressLine1" name='husband_memberAddressLine1' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " 
                                        onChange={e => {setHusbandAddressLine1(e.target.value)}}
                                        value={ husbandAddressLine1 !== "" & husbandAddressLine1 !== null & husbandAddressLine1 !== undefined ? husbandAddressLine1 : "" }
                                    />
                                    <label htmlFor="fo_husband-addressLine1" className="absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Address Line 1 (ex. PO-Box #)</label>
                                </div>
                            </div>
                            <div>
                                <div className="relative">
                                    <input type="text" id="fo_husband-addressLine2" name='husband_memberAddressLine2' className="block text-sm px-2.5 pb-2.5 pt-4 w-[234px] text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                        onChange={e => {setHusbandAddressLine2(e.target.value)}}
                                        value={ husbandAddressLine2 !== "" & husbandAddressLine2 !== null & husbandAddressLine2 !== undefined ? husbandAddressLine2 : "" }    
                                    />
                                    <label htmlFor="fo_husband-addressLine2" className="absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Address Line 2 (House #, street, Brgy, Sbdivision, Disctrict)</label>
                                </div>
                            </div>
                            <div>
                                <div className="relative">
                                    <input type="text" id="fo_husband-city" name='husband_memberCity' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                        onChange={e => {setHusbandCity(e.target.value)}}
                                        value={ husbandCity !== "" & husbandCity !== null & husbandCity !== undefined ? husbandCity : "" }
                                    />
                                    <label htmlFor="fo_husband-city" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">City</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className='mb-4'>
                        <label className="mb-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Work</label>
                        <div className='grid mb-4 sm:grid-cols-2'>
                            <div className="relative mr-2">
                                <input type="text" id="fo_husband-occupation" name='husband_occupation' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " 
                                    onChange={e => {setHusbandOccupation(e.target.value)}}
                                    value={ husbandOccupation !== "" & husbandOccupation !== null & husbandOccupation !== undefined ? husbandOccupation : "" }
                                />
                                <label htmlFor="fo_husband-occupation" className="absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Occupation</label>
                            </div>
                            <div className="relative ml-2">
                                <input type="text" id="fo_husband-company" name='husband_company' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " 
                                    onChange={e => {setHusbandCompany(e.target.value)}}
                                    value={ husbandCompany !== "" & husbandCompany !== null & husbandCompany !== undefined ? husbandCompany : "" }
                                />
                                <label htmlFor="fo_husband-company" className="absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Company</label>
                            </div>
                        </div>
                        <div className='grid gap-1 sm:grid-cols-3'>
                            <div>
                                <div className="relative">
                                    <input type="text" id="fo_husband-WorkaddressLine1" name='husband_workAddressLine1' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " 
                                        onChange={e => {setHusbandCompanyAddressLine1(e.target.value)}}
                                        value={ husbandCompanyAddressLine1 !== "" & husbandCompanyAddressLine1 !== null & husbandCompanyAddressLine1 !== undefined ? husbandCompanyAddressLine1 : "" }
                                    />
                                    <label htmlFor="fo_husband-WorkaddressLine1" className="absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Company Address Line 1 (ex. PO-Box #)</label>
                                </div>
                            </div>
                            <div>
                                <div className="relative">
                                    <input type="text" id="fo_husband-WorkaddressLine2" name='husband_workAddressLine2' className="block text-sm px-2.5 pb-2.5 pt-4 w-[234px] text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                        onChange={e => {setHusbandCompanyAddressLine2(e.target.value)}}
                                        value={ husbandCompanyAddressLine2 !== "" & husbandCompanyAddressLine2 !== null & husbandCompanyAddressLine2 !== undefined ? husbandCompanyAddressLine2 : "" }    
                                    />
                                    <label htmlFor="fo_husband-WorkaddressLine2" className="absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Company Address Line 2 (House #, street, Brgy, Sbdivision, Disctrict)</label>
                                </div>
                            </div>
                            <div>
                                <div className="relative">
                                    <input type="text" id="fo_husband-Workcity" name='husband_workCity' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                        onChange={e => {setHusbandCompanyCity(e.target.value)}}
                                        value={ husbandCompanyCity !== "" & husbandCompanyCity !== null & husbandCompanyCity !== undefined ? husbandCompanyCity : "" }
                                    />
                                    <label htmlFor="fo_husband-Workcity" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">City</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="submit" onClick={() => {Stepper('address')}} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Next Step: Wife info
                    </button>
                </PersonalInfo>

                <AddressInfo show={showAddressInfo}>
                    <h3 className="mb-4 text-lg font-medium leading-none text-gray-900 dark:text-white">Wife Info</h3>
                    <div className="grid gap-4 mb-4 sm:grid-cols-2">
                        <div>
                            <Listbox value={selected} onChange={setSelected}>
                                {({ open }) => (
                                    <>
                                    <Listbox.Label className="block italic font-extrabold leading-6 text-md text-Red">*Select spouse here, if already in the record.</Listbox.Label>
                                        <div className="relative mt-2">
                                            <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                                            <span className="flex items-center">
                                                <span className="block ml-3 truncate">{ 
                                                    selected > 0 ?
                                                        `${selected.first_name} ${selected.middle_name !== null & selected.middle_name !== undefined & selected.middle_name !== "" ? selected.middle_name.charAt(0) + "." : ""} ${selected.last_name}`
                                                    :
                                                        "Pleae Select Spouse"
                                                }</span>
                                            </span>
                                            
                                            <span className="absolute inset-y-0 right-0 flex items-center pr-2 ml-3 pointer-events-none">
                                                <ChevronUpDownIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                                            </span>
                                            </Listbox.Button>

                                            <Transition
                                            show={open}
                                            as={Fragment}
                                            leave="transition ease-in duration-100"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-100"
                                            >
                                                <Listbox.Options static style={{ position: 'absolute !important ' }} className="z-10 w-full py-1 mt-1 overflow-scroll text-base bg-white rounded-md shadow-lg max-h-56 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                    
                                                    <div className="relative">
                                                        <div className="sticky top-0 z-20 px-1">
                                                            <div className="items-center block mt-1">
                                                                <input
                                                                type="text"
                                                                name="search"
                                                                id="search"
                                                                value={searchTerm}
                                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                                className="block w-full px-2 py-2 pr-12 font-bold border border-gray-300 rounded-md shadow-sm bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                                onKeyDown={(e) => e.stopPropagation()}
                                                                />
                                                                <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5 ">
                                                                {searchTerm && (
                                                                    <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    className="w-6 h-6 mr-1 font-bold text-blue-500"
                                                                    viewBox="0 0 20 20"
                                                                    fill="currentColor"
                                                                    onClick={() => {
                                                                        setSearchTerm("");
                                                                    }}
                                                                    >
                                                                    <path
                                                                        fillRule="evenodd"
                                                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                                        clipRule="evenodd"
                                                                    />
                                                                    </svg>
                                                                )}
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    className="w-6 h-6 mr-1 text-gray-500"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    stroke="currentColor"
                                                                >
                                                                    <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth="2"
                                                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                                                    />
                                                                </svg>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {MEData
                                                    .filter((person) => {
                                                        const fullName = `${person.first_name} ${person.middle_name !== null & person.middle_name !== undefined & person.middle_name !== "" ? person.middle_name.charAt(0) + "." : ""} ${person.last_name}`
                                                        return(
                                                            fullName.toLowerCase().includes(searchTerm.toLowerCase())
                                                        );
                                                    })
                                                        
                                                    .map((person) => (
                                                    <Listbox.Option
                                                        key={person.member_id}
                                                        className={({ active }) =>
                                                        classNames(
                                                            active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                                            'relative cursor-default select-none py-2 pl-3 pr-9'
                                                        )
                                                        }
                                                        value={person}
                                                    >
                                                        {({ selected, active }) => (
                                                        <>
                                                            <div className="flex items-center">
                                                            <span
                                                                className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                                                            >
                                                                {person.first_name} {person.middle_name !== null & person.middle_name !== undefined & person.middle_name !== "" ? person.middle_name.charAt(0) + "." : ""} {person.last_name}
                                                            </span>
                                                            </div>

                                                            {selected ? (
                                                            <span
                                                                className={classNames(
                                                                active ? 'text-white' : 'text-indigo-600',
                                                                'absolute inset-y-0 right-0 flex items-center pr-4'
                                                                )}
                                                            >
                                                                <CheckIcon className="w-5 h-5" aria-hidden="true" />
                                                            </span>
                                                            ) : null}
                                                        </>
                                                        )}
                                                    </Listbox.Option>
                                                    ))}
                                                </Listbox.Options>
                                            </Transition>
                                        </div>
                                    </>
                                )}
                            </Listbox>
                        </div>
                        <div></div>
                    </div>
                    <div className="grid gap-4 mb-4 sm:grid-cols-2">
                        <div>
                            <div className="relative">
                                <input type="text" id="fo_wife-first-name" name='wife_firstName' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                    onChange={e => {setWifeFirstName(e.target.value)}}
                                    value={ wifeFirstName !== "" & wifeFirstName !== null & wifeFirstName !== undefined ? wifeFirstName : "" }
                                />
                                <label htmlFor="fo_wife-first-name" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">First Name</label>
                            </div>
                        </div>
                        <div>
                            <div className="relative">
                                <input type="text" id="fo_wife-middle-name" name='wife_middleName' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                    onChange={e => {setWifeMiddleName(e.target.value)}}
                                    value={ wifeMiddleName !== "" & wifeMiddleName !== null & wifeMiddleName !== undefined ? wifeMiddleName : "" }
                                />
                                <label htmlFor="fo_wife-middle-name" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Middle Name</label>
                            </div>
                        </div>
                        <div>
                            <div className="relative">
                                <input type="text" id="fo_wife-last-name" name='wife_lastName' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                    onChange={e => {setWifeLastName(e.target.value)}}
                                    value={ wifeLastName !== "" & wifeLastName !== null & wifeLastName !== undefined ? wifeLastName : "" }
                                />
                                <label htmlFor="fo_wife-last-name" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Last Name</label>
                            </div>
                        </div>
                        <div>
                            <div className="relative">
                                <input type="text" id="fo_wife-nickname" name='wife_nickname' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                    onChange={e => {setWifeNickname(e.target.value)}}
                                    value={ wifeNickname !== "" & wifeNickname !== null & wifeNickname !== undefined ? wifeNickname : "" }
                                />
                                <label htmlFor="fo_wife-nickname" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Nickname</label>
                            </div>
                        </div>
                        <div>
                            <div className="relative">
                                <input type="text" id="fo_wife-mobile-number" name='wife_mobile' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                    onChange={e => {setWifeMobile(e.target.value)}}
                                    value={ wifeMobile !== "" & wifeMobile !== null & wifeMobile !== undefined ? wifeMobile : "" }
                                />
                                <label htmlFor="fo_wife-mobile-number" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Mobile number</label>
                            </div>
                        </div>

                        <div>
                            <div className="relative">
                                <input type="email" id="fo_wife-email" name='wife_email' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                    onChange={e => {setWifeEmail(e.target.value)}}
                                    value={ wifeEmail !== "" & wifeEmail !== null & wifeEmail !== undefined ? wifeEmail : "" }
                                />
                                <label htmlFor="fo_wife-email" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Email</label>
                            </div>
                        </div>

                        <div>
                            <div className="relative max-w-sm">
                                <input id='fo_wife-birthday' type="date" name='wife_dob' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Birthday"
                                    onChange={e => {setWifeBirthday(e.target.value)}}
                                    value={ wifeBirthday !== "" & wifeBirthday !== null & wifeBirthday !== undefined ? wifeBirthday : "" }
                                />
                                <label htmlFor="fo_wife-birthday" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Birthday</label>
                            </div>
                        </div>

                        <div>
                            <div className="relative">
                                <input type="text" id="fo_wife-spouse" name='wife_spouse' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                        onChange={e => {setWifeSpouse(e.target.value)}}
                                        value={ wifeSpouse !== "" & wifeSpouse !== null & wifeSpouse !== undefined ? wifeSpouse : "" }
                                    />
                                <label htmlFor="fo_wife-spouse" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Spouse</label>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="pi_wife-civilStatus" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Civil Status</label>
                            <select id="pi_wife-civilStatus" name='wife_civilStatus' className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={e => {setWifeCivilStatus(e.target.value)}}
                                value={
                                        wifeCivilStatus !== null ?
                                            wifeCivilStatus
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
                                <input type="text" id="fo_wife-religion" name='wife_religion' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                    onChange={e => {setWifeReligion(e.target.value)}}
                                    value={
                                        wifeReligion !== null ?
                                            wifeReligion
                                        :""
                                    }
                                />
                                <label htmlFor="fo_wife-religion" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Religion</label>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="pi_wife-baptism" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Baptized?</label>
                            <div className="flex">
                                <div className="flex items-center mr-4">
                                <input id="pi_wife-baptism-yes" type="radio" value="Yes" name="wife_baptism-radio-group" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
                                        onChange={e => {setWifeBaptized(e.target.value)}}
                                        checked={
                                            wifeBaptized !== null & wifeBaptized === 'Yes' ?
                                                true
                                            : null
                                        }
                                    />
                                    <label htmlFor="pi_wife-baptism" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Yes</label>
                                </div>
                                <div className="flex items-center mr-4">
                                <input id="pi_wife-baptism-no" type="radio" value="No" name="wife_baptism-radio-group" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
                                        onChange={e => {setWifeBaptized(e.target.value)}}
                                        checked={
                                            wifeBaptized !== null & wifeBaptized === 'No' ?
                                                true
                                            : null
                                        }
                                    />
                                    <label htmlFor="pi_wife-baptism-no" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">No</label>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="pi_wife-confirmation" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirmed?</label>
                            <div className="flex">
                                <div className="flex items-center mr-4">
                                    <input id="pi_wife-confirmation" type="radio" value="Yes" name="wife_confirmation-radio-group" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
                                        onChange={e => {setWifeConfirmed(e.target.value)}}
                                        checked={
                                            wifeConfirmed !== null & wifeConfirmed === 'Yes' ?
                                                true
                                            : null
                                        }
                                    />
                                    <label htmlFor="pi_wife-confirmation" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Yes</label>
                                </div>
                                <div className="flex items-center mr-4">
                                    <input id="pi_wife-confirmation" type="radio" value="No" name="wife_confirmation-radio-group" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        onChange={e => {setWifeConfirmed(e.target.value)}}
                                        checked={
                                            wifeConfirmed !== null & wifeConfirmed === 'No' ?
                                                true
                                            : null
                                        }
                                    />
                                    <label htmlFor="pi_wife-confirmation" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">No</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='mb-4'>
                        <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Home Address</label>
                        <div className='grid gap-1 sm:grid-cols-3'>
                            <div>
                                <div className="relative">
                                    <input type="text" id="fo_wife-addressLine1" name='wife_memberAddressLine1' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " 
                                        onChange={e => {setWifeAddressLine1(e.target.value)}}
                                        value={ wifeAddressLine1 !== "" & wifeAddressLine1 !== null & wifeAddressLine1 !== undefined ? wifeAddressLine1 : "" }
                                    />
                                    <label htmlFor="fo_wife-addressLine1" className="absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Address Line 1 (ex. PO-Box #)</label>
                                </div>
                            </div>
                            <div>
                                <div className="relative">
                                    <input type="text" id="fo_wife-addressLine2" name='wife_memberAddressLine2' className="block text-sm px-2.5 pb-2.5 pt-4 w-[234px] text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                        onChange={e => {setWifeAddressLine2(e.target.value)}}
                                        value={ wifeAddressLine2 !== "" & wifeAddressLine2 !== null & wifeAddressLine2 !== undefined ? wifeAddressLine2 : "" }    
                                    />
                                    <label htmlFor="fo_wife-addressLine2" className="absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Address Line 2 (House #, street, Brgy, Sbdivision, Disctrict)</label>
                                </div>
                            </div>
                            <div>
                                <div className="relative">
                                    <input type="text" id="fo_wife-city" name='wife_memberCity' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                        onChange={e => {setWifeCity(e.target.value)}}
                                        value={ wifeCity !== "" & wifeCity !== null & wifeCity !== undefined ? wifeCity : "" }
                                    />
                                    <label htmlFor="fo_wife-city" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">City</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className='mb-4'>
                        <label className="mb-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Work</label>
                        <div className='grid mb-4 sm:grid-cols-2'>
                        <div className="relative">
                                <input type="text" id="fo_wife-occupation" name='wife_memberOccupation' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " 
                                    onChange={e => {setWifeOccupation(e.target.value)}}
                                    value={ wifeOccupation !== "" & wifeOccupation !== null & wifeOccupation !== undefined ? wifeOccupation : "" }
                                />
                                <label htmlFor="fo_wife-occupation" className="absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Occupation</label>
                            </div>
                            <div className="relative">
                                <input type="text" id="fo_wife-company" name='wife_memberCompany' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " 
                                    onChange={e => {setWifeCompany(e.target.value)}}
                                    value={ wifeCompany !== "" & wifeCompany !== null & wifeCompany !== undefined ? wifeCompany : "" }
                                />
                                <label htmlFor="fo_wife-company" className="absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Company</label>
                            </div>
                        </div>
                        <div className='grid gap-1 sm:grid-cols-3'>
                            <div>
                                <div className="relative">
                                    <input type="text" id="fo_wife-WorkaddressLine1" name='wife_memberWorkAddressLine1' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " 
                                        onChange={e => {setWifeCompanyAddressLine1(e.target.value)}}
                                        value={ wifeCompanyAddressLine1 !== "" & wifeCompanyAddressLine1 !== null & wifeCompanyAddressLine1 !== undefined ? wifeCompanyAddressLine1 : "" }
                                    />
                                    <label htmlFor="fo_wife-WorkaddressLine1" className="absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Company Address Line 1 (ex. PO-Box #)</label>
                                </div>
                            </div>
                            <div>
                                <div className="relative">
                                    <input type="text" id="fo_wife-WorkaddressLine2" name='wife_memberWorkAddressLine2' className="block text-sm px-2.5 pb-2.5 pt-4 w-[234px] text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                        onChange={e => {setWifeCompanyAddressLine2(e.target.value)}}
                                        value={ wifeCompanyAddressLine2 !== "" & wifeCompanyAddressLine2 !== null & wifeCompanyAddressLine2 !== undefined ? wifeCompanyAddressLine2 : "" }    
                                    />
                                    <label htmlFor="fo_wife-WorkaddressLine2" className="absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Company Address Line 2 (House #, street, Brgy, Sbdivision, Disctrict)</label>
                                </div>
                            </div>
                            <div>
                                <div className="relative">
                                    <input type="text" id="fo_wife-Workcity" name='wife_memberWorkCity' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                        onChange={e => {setWifeCompanyCity(e.target.value)}}
                                        value={ wifeCompanyCity !== "" & wifeCompanyCity !== null & wifeCompanyCity !== undefined ? wifeCompanyCity : "" }
                                    />
                                    <label htmlFor="fo_wife-Workcity" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">City</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button onClick={() => Stepper('personal')} type="submit" className="text-white bg-gray-500 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-6 py-2.5 text-center ">
                        Go Back to: Husband Info
                    </button>
                    <button onClick={() => Stepper('emergency')} type="submit" className="mx-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Next Step: Children
                    </button>
                </AddressInfo>

                <EmergencyContacts show={showEmergencyContact}>
                    <h3 className="mb-4 text-lg font-medium leading-none text-gray-900 dark:text-white">Children Info</h3>
                    <div className="grid w-full gap-2 mb-4 sm:grid-cols-5">
                        {
                            childrenList.length > 0 ?
                                childrenList.map((x, i) => (
                                    <>
                                        <div className="relative">
                                            <input type="text" id="fo_child_firstName" name='firstName' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                                onChange={ e => handleChildrenChange(e,i)}
                                                value={ childrenList[i].firstName !== "" & childrenList[i].firstName !== null & childrenList[i].firstName !== undefined ? childrenList[i].firstName : ""}
                                            />
                                            <label htmlFor="fo_child_firstName" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">First Name</label>
                                        </div>
                                        <div className="relative">
                                            <input type="text" id="fo_child_middleName" name='middleName' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                                onChange={ e => handleChildrenChange(e,i) }

                                                value={ childrenList[i].middleName !== "" & childrenList[i].middleName !== null & childrenList[i].middleName !== undefined ? childrenList[i].middleName : ""}
                                            />
                                            <label htmlFor="fo_child_middleName" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Middle Name</label>
                                        </div>
                                        <div className="relative">
                                            <input type="text" id="fo_child_lastName" name='lastName' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                                onChange={ e => handleChildrenChange(e,i) }
                                                value={ childrenList[i].lastName !== "" & childrenList[i].lastName !== null & childrenList[i].lastName !== undefined ? childrenList[i].lastName : ""}
                                            />
                                            <label htmlFor="fo_child_lastName" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Last Name</label>
                                        </div>
                                        <div className="relative">
                                            <input type="date" id="fo_child_birthday" name='age' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                                onChange={ e => handleChildrenChange(e,i) }
                                                value={ childrenList[i].birthday !== "" & childrenList[i].birthday !== null & childrenList[i].birthday !== undefined ? childrenList[i].birthday : ""}
                                            />
                                            <label htmlFor="fo_child_birthday" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Birthday</label>
                                        </div>
                                        <div className="relative">
                                            {
                                                childrenList.length > 1 &&
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
                                                childrenList.length-1 === i &&
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
                    <button onClick={() => Stepper('address')} type="submit" className="text-white bg-gray-500 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-6 py-2.5 text-center ">
                        Go Back to: Wife Info
                    </button>
                    <button type="submit" className="mx-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2.5 text-center"
                        onClick={() => Stepper('invite')}
                    >
                        Next Step: Inviter Info
                    </button>
                </EmergencyContacts>

                <Inviter show={showInvite}>
                    <h3 className="mb-4 text-lg font-medium leading-none text-gray-900 dark:text-white">Inviter Info</h3>
                    <div className="grid w-full gap-2 mb-4 sm:grid-cols-5">
                        {
                            inviteList.length > 0 ?
                                inviteList.map((x, i) => (
                                    <>
                                        <div className="relative">
                                            <input type="text" id="fo_inviter_name" name='name' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                                onChange={ e => handleInviterChange(e,i)}
                                                value={ inviteList[i].name !== "" & inviteList[i].name !== null & inviteList[i].name !== undefined ? inviteList[i].name : ""}
                                            />
                                            <label htmlFor="fo_inviter_name" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Name</label>
                                        </div>
                                        <div className="relative">
                                            <input type="text" id="fo_inviter_mobile" name='mobile' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                                onChange={ e => handleInviterChange(e,i) }

                                                value={ inviteList[i].mobile !== "" & inviteList[i].mobile !== null & inviteList[i].mobile !== undefined ? inviteList[i].mobile : ""}
                                            />
                                            <label htmlFor="fo_inviter_mobile" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Mobile</label>
                                        </div>
                                        <div className="relative">
                                            <input type="text" id="fo_inviter_email" name='email' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                                onChange={ e => handleInviterChange(e,i) }
                                                value={ inviteList[i].email !== "" & inviteList[i].email !== null & inviteList[i].email !== undefined ? inviteList[i].email : ""}
                                            />
                                            <label htmlFor="fo_inviter_email" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Email</label>
                                        </div>
                                        <div className="relative">
                                            <input type="text" id="fo_inviter_relationship" name='relationship' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                                onChange={ e => handleInviterChange(e,i) }
                                                value={ inviteList[i].relationship !== "" & inviteList[i].relationship !== null & inviteList[i].relationship !== undefined ? inviteList[i].relationship : ""}
                                            />
                                            <label htmlFor="fo_inviter_relationship" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Relationship</label>
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
                        Go Back to: Children
                    </button>
                    <button type="submit" className="mx-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2.5 text-center"
                        onClick={addParticipant}
                    >
                        Save
                    </button>
                </Inviter>
            </AddMEParticipant>

            <EditMEParticipant show={showEdit} setShow={closeEdit}>
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
                                <path fillRule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clipRule="evenodd"></path>
                            </svg>
                        </div>
                    </li>
                    <li className={`flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-4 after:inline-block
                        ${ currentStep === 'emergency' && previousStep === 'address' ?
                            'text-green-100 after:border-green-100'
                            : currentStep === 'invite' | currentStep === 'result' ?
                                'text-green-600 after:border-green-600'
                                :'text-green-100 after:border-gray-100'}
                    `}>
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0
                            ${ currentStep === 'emergency' && previousStep === 'address' ?
                                'bg-green-100'
                            : currentStep === 'invite' | currentStep === 'result' ?
                                'bg-green-100'
                                :'bg-gray-100'}
                        `}>
                            <svg aria-hidden="true" className={`w-5 h-5 lg:w-6 lg:h-6
                                ${ currentStep === 'emergency' && previousStep === 'address' ?
                                    'text-gray-500'
                                : currentStep === 'invite' | currentStep === 'result' ?
                                    'text-green-600'
                                    : 'text-gray-500'}
                            `} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.5 0A3.987 3.987 0 0 0 11 2.1a4.977 4.977 0 0 1 3.9 5.858A3.989 3.989 0 0 0 14.5 0ZM9 13h2a4 4 0 0 1 4 4v2H5v-2a4 4 0 0 1 4-4Z"/>
                                <path d="M5 19h10v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2ZM5 7a5.008 5.008 0 0 1 4-4.9 3.988 3.988 0 1 0-3.9 5.859A4.974 4.974 0 0 1 5 7Zm5 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm5-1h-.424a5.016 5.016 0 0 1-1.942 2.232A6.007 6.007 0 0 1 17 17h2a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5ZM5.424 9H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h2a6.007 6.007 0 0 1 4.366-5.768A5.016 5.016 0 0 1 5.424 9Z"/>
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
                </ol>
                
                <PersonalInfo show={showPersonalInfo}>
                    <h3 className="mb-4 text-lg font-medium leading-none text-gray-900 dark:text-white">Husband Info</h3>
                    <div className="grid gap-4 mb-4 sm:grid-cols-2">
                        <div>
                            <div className="relative">
                                <input type="text" id="fo_husband-first-name" name='husband_firstName' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                    onChange={e => {setHusbandFirstName(e.target.value)}}
                                    value={ husbandFirstName !== "" & husbandFirstName !== null & husbandFirstName !== undefined ? husbandFirstName : "" }
                                />
                                <label htmlFor="fo_husband-first-name" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">First Name</label>
                            </div>
                        </div>
                        <div>
                            <div className="relative">
                                <input type="text" id="fo_husband-middle-name" name='husband_middleName' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                    onChange={e => {setHusbandMiddleName(e.target.value)}}
                                    value={ husbandMiddleName !== "" & husbandMiddleName !== null & husbandMiddleName !== undefined ? husbandMiddleName : "" }
                                />
                                <label htmlFor="fo_husband-middle-name" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Middle Name</label>
                            </div>
                        </div>
                        <div>
                            <div className="relative">
                                <input type="text" id="fo_husband-last-name" name='husband_lastName' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                    onChange={e => {setHusbandLastName(e.target.value)}}
                                    value={ husbandLastName !== "" & husbandLastName !== null & husbandLastName !== undefined ? husbandLastName : "" }
                                />
                                <label htmlFor="fo_husband-last-name" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Last Name</label>
                            </div>
                        </div>
                        <div>
                            <div className="relative">
                                <input type="text" id="fo_husband-nickname" name='husband_nickname' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                    onChange={e => {setHusbandNickname(e.target.value)}}
                                    value={ husbandNickname !== "" & husbandNickname !== null & husbandNickname !== undefined ? husbandNickname : "" }
                                />
                                <label htmlFor="fo_husband-nickname" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Nickname</label>
                            </div>
                        </div>
                        <div>
                            <div className="relative">
                                <input type="text" id="fo_husband-mobile-number" name='husband_mobile' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                    onChange={e => {setHusbandMobile(e.target.value)}}
                                    value={ husbandMobile !== "" & husbandMobile !== null & husbandMobile !== undefined ? husbandMobile : "" }
                                />
                                <label htmlFor="fo_husband-mobile-number" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Mobile number</label>
                            </div>
                        </div>

                        <div>
                            <div className="relative">
                                <input type="email" id="husband-fo_email" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                    onChange={e => {setHusbandEmail(e.target.value)}}
                                    value={ husbandEmail !== "" & husbandEmail !== null & husbandEmail !== undefined ? husbandEmail : "" }
                                />
                                <label htmlFor="husband-fo_email" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Email</label>
                            </div>
                        </div>

                        <div>
                            <div className="relative max-w-sm">
                                <input id='fo_husband-birthday' type="date" name='husband_dob' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Birthday"
                                    onChange={e => {setHusbandBirthday(e.target.value)}}
                                    value={ husbandBirthday !== "" & husbandBirthday !== null & husbandBirthday !== undefined ? husbandBirthday : "" }
                                />
                                <label htmlFor="fo_husband-birthday" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Birthday</label>
                            </div>
                        </div>

                        <div>
                            <div className="relative">
                                <input type="text" id="fo_husband-spouse" name='husband_spouse' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                        onChange={e => {setHusbandSpouse(e.target.value)}}
                                        value={ husbandSpouse !== "" & husbandSpouse !== null & husbandSpouse !== undefined ? husbandSpouse : "" }
                                    />
                                <label htmlFor="fo_husband-spouse" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Spouse</label>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="pi_husband-civilStatus" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Civil Status</label>
                            <select id="pi_husband-civilStatus" name='husband_civilStatus' className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={e => {setHusbandCivilStatus(e.target.value)}}
                                value={ husbandCivilStatus !== "" & husbandCivilStatus !== null & husbandCivilStatus !== undefined ? husbandCivilStatus : "" }
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
                                <input type="text" id="fo_husband-religion" name='husband_religion' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                    onChange={e => {setHusbandReligion(e.target.value)}}
                                    value={ husbandReligion !== "" & husbandReligion !== null & husbandReligion !== undefined ? husbandReligion : "" }
                                />
                                <label htmlFor="fo_husband-religion" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Religion</label>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="pi_husband-baptism" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Baptized?</label>
                            <div className="flex">
                                <div className="flex items-center mr-4">
                                <input id="pi_husband-baptism-yes" type="radio" value="Yes" name="husband_baptism-radio-group" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
                                        onChange={e => {setHusbandBaptized(e.target.value)}}
                                        checked={
                                            husbandBaptized !== null & husbandBaptized === 'Yes' ?
                                                true
                                            : null
                                        }
                                    />
                                    <label htmlFor="pi_husband-baptism" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Yes</label>
                                </div>
                                <div className="flex items-center mr-4">
                                <input id="pi_husband-baptism-no" type="radio" value="No" name="husband_baptism-radio-group" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
                                        onChange={e => {setHusbandBaptized(e.target.value)}}
                                        checked={
                                            husbandBaptized !== null & husbandBaptized === 'No' ?
                                                true
                                            : null
                                        }
                                    />
                                    <label htmlFor="pi_husband-baptism-no" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">No</label>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="pi_husband-confirmation" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirmed?</label>
                            <div className="flex">
                                <div className="flex items-center mr-4">
                                    <input id="pi_husband-confirmation" type="radio" value="Yes" name="husband_confirmation-radio-group" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
                                        onChange={e => {setHusbandConfirmed(e.target.value)}}
                                        checked={
                                            husbandConfirmed !== null & husbandConfirmed === 'Yes' ?
                                                true
                                            : null
                                        }
                                    />
                                    <label htmlFor="pi_husband-confirmation" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Yes</label>
                                </div>
                                <div className="flex items-center mr-4">
                                    <input id="pi_husband-confirmation" type="radio" value="No" name="husband_confirmation-radio-group" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        onChange={e => {setHusbandConfirmed(e.target.value)}}
                                        checked={
                                            husbandConfirmed !== null & husbandConfirmed === 'No' ?
                                                true
                                            : null
                                        }
                                    />
                                    <label htmlFor="pi_husband-confirmation" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">No</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='mb-4'>
                        <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Home Address</label>
                        <div className='grid gap-1 sm:grid-cols-3'>
                            <div>
                                <div className="relative">
                                    <input type="text" id="fo_husband-addressLine1" name='husband_memberAddressLine1' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " 
                                        onChange={e => {setHusbandAddressLine1(e.target.value)}}
                                        value={ husbandAddressLine1 !== "" & husbandAddressLine1 !== null & husbandAddressLine1 !== undefined ? husbandAddressLine1 : "" }
                                    />
                                    <label htmlFor="fo_husband-addressLine1" className="absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Address Line 1 (ex. PO-Box #)</label>
                                </div>
                            </div>
                            <div>
                                <div className="relative">
                                    <input type="text" id="fo_husband-addressLine2" name='husband_memberAddressLine2' className="block text-sm px-2.5 pb-2.5 pt-4 w-[234px] text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                        onChange={e => {setHusbandAddressLine2(e.target.value)}}
                                        value={ husbandAddressLine2 !== "" & husbandAddressLine2 !== null & husbandAddressLine2 !== undefined ? husbandAddressLine2 : "" }    
                                    />
                                    <label htmlFor="fo_husband-addressLine2" className="absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Address Line 2 (House #, street, Brgy, Sbdivision, Disctrict)</label>
                                </div>
                            </div>
                            <div>
                                <div className="relative">
                                    <input type="text" id="fo_husband-city" name='husband_memberCity' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                        onChange={e => {setHusbandCity(e.target.value)}}
                                        value={ husbandCity !== "" & husbandCity !== null & husbandCity !== undefined ? husbandCity : "" }
                                    />
                                    <label htmlFor="fo_husband-city" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">City</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className='mb-4'>
                        <label className="mb-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Work</label>
                        <div className='grid mb-4 sm:grid-cols-2'>
                            <div className="relative mr-2">
                                <input type="text" id="fo_husband-occupation" name='husband_occupation' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " 
                                    onChange={e => {setHusbandOccupation(e.target.value)}}
                                    value={ husbandOccupation !== "" & husbandOccupation !== null & husbandOccupation !== undefined ? husbandOccupation : "" }
                                />
                                <label htmlFor="fo_husband-occupation" className="absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Occupation</label>
                            </div>
                            <div className="relative ml-2">
                                <input type="text" id="fo_husband-company" name='husband_company' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " 
                                    onChange={e => {setHusbandCompany(e.target.value)}}
                                    value={ husbandCompany !== "" & husbandCompany !== null & husbandCompany !== undefined ? husbandCompany : "" }
                                />
                                <label htmlFor="fo_husband-company" className="absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Company</label>
                            </div>
                        </div>
                        <div className='grid gap-1 sm:grid-cols-3'>
                            <div>
                                <div className="relative">
                                    <input type="text" id="fo_husband-WorkaddressLine1" name='husband_workAddressLine1' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " 
                                        onChange={e => {setHusbandCompanyAddressLine1(e.target.value)}}
                                        value={ husbandCompanyAddressLine1 !== "" & husbandCompanyAddressLine1 !== null & husbandCompanyAddressLine1 !== undefined ? husbandCompanyAddressLine1 : "" }
                                    />
                                    <label htmlFor="fo_husband-WorkaddressLine1" className="absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Company Address Line 1 (ex. PO-Box #)</label>
                                </div>
                            </div>
                            <div>
                                <div className="relative">
                                    <input type="text" id="fo_husband-WorkaddressLine2" name='husband_workAddressLine2' className="block text-sm px-2.5 pb-2.5 pt-4 w-[234px] text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                        onChange={e => {setHusbandCompanyAddressLine2(e.target.value)}}
                                        value={ husbandCompanyAddressLine2 !== "" & husbandCompanyAddressLine2 !== null & husbandCompanyAddressLine2 !== undefined ? husbandCompanyAddressLine2 : "" }    
                                    />
                                    <label htmlFor="fo_husband-WorkaddressLine2" className="absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Company Address Line 2 (House #, street, Brgy, Sbdivision, Disctrict)</label>
                                </div>
                            </div>
                            <div>
                                <div className="relative">
                                    <input type="text" id="fo_husband-Workcity" name='husband_workCity' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                        onChange={e => {setHusbandCompanyCity(e.target.value)}}
                                        value={ husbandCompanyCity !== "" & husbandCompanyCity !== null & husbandCompanyCity !== undefined ? husbandCompanyCity : "" }
                                    />
                                    <label htmlFor="fo_husband-Workcity" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">City</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="submit" onClick={() => {Stepper('address')}} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Next Step: Wife info
                    </button>
                </PersonalInfo>

                <AddressInfo show={showAddressInfo}>
                    <h3 className="mb-4 text-lg font-medium leading-none text-gray-900 dark:text-white">Wife Info</h3>
                    <div className="grid gap-4 mb-4 sm:grid-cols-2">
                        <div>
                            <Listbox value={selected} onChange={setSelected}>
                                {({ open }) => (
                                    <>
                                    <Listbox.Label className="block italic font-extrabold leading-6 text-md text-Red">*Select spouse here, if already in the record.</Listbox.Label>
                                        <div className="relative mt-2">
                                            <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                                            <span className="flex items-center">
                                                <span className="block ml-3 truncate">{ 
                                                    selected !== undefined ?
                                                        `${selected.first_name} ${selected.middle_name !== null & selected.middle_name !== undefined & selected.middle_name !== "" ? selected.middle_name.charAt(0) + "." : ""} ${selected.last_name}`
                                                    :
                                                        "Please Select Spouse"
                                                }</span>
                                            </span>
                                            
                                            <span className="absolute inset-y-0 right-0 flex items-center pr-2 ml-3 pointer-events-none">
                                                <ChevronUpDownIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                                            </span>
                                            </Listbox.Button>

                                            <Transition
                                            show={open}
                                            as={Fragment}
                                            leave="transition ease-in duration-100"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-100"
                                            >
                                                <Listbox.Options static style={{ position: 'absolute !important ' }} className="z-10 w-full py-1 mt-1 overflow-scroll text-base bg-white rounded-md shadow-lg max-h-56 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                    
                                                    <div className="relative">
                                                        <div className="sticky top-0 z-20 px-1">
                                                            <div className="items-center block mt-1">
                                                                <input
                                                                type="text"
                                                                name="search"
                                                                id="search"
                                                                value={searchTerm}
                                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                                className="block w-full px-2 py-2 pr-12 font-bold border border-gray-300 rounded-md shadow-sm bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                                onKeyDown={(e) => e.stopPropagation()}
                                                                />
                                                                <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5 ">
                                                                {searchTerm && (
                                                                    <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    className="w-6 h-6 mr-1 font-bold text-blue-500"
                                                                    viewBox="0 0 20 20"
                                                                    fill="currentColor"
                                                                    onClick={() => {
                                                                        setSearchTerm("");
                                                                    }}
                                                                    >
                                                                    <path
                                                                        fillRule="evenodd"
                                                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                                        clipRule="evenodd"
                                                                    />
                                                                    </svg>
                                                                )}
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    className="w-6 h-6 mr-1 text-gray-500"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    stroke="currentColor"
                                                                >
                                                                    <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth="2"
                                                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                                                    />
                                                                </svg>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <Listbox.Option
                                                        key={selected.Status}
                                                        className={({ active }) =>
                                                        classNames(
                                                            active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                                            'relative cursor-default select-none py-2 pl-3 pr-9'
                                                        )
                                                        }
                                                        value={[{Status: "No Spouse"}]}
                                                    >
                                                        <div className="flex items-center">
                                                            <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}>
                                                                No Spouse
                                                            </span>
                                                        </div>
                                                    </Listbox.Option>

                                                    {MEData
                                                    .filter((person) => {
                                                        const fullName = `${person.first_name} ${person.middle_name !== null & person.middle_name !== undefined & person.middle_name !== "" ? person.middle_name.charAt(0) + "." : ""} ${person.last_name}`
                                                        return(
                                                            fullName.toLowerCase().includes(searchTerm.toLowerCase())
                                                        );
                                                    })
                                                        
                                                    .map((person) => (
                                                    <Listbox.Option
                                                        key={person.member_id}
                                                        className={({ active }) =>
                                                        classNames(
                                                            active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                                            'relative cursor-default select-none py-2 pl-3 pr-9'
                                                        )
                                                        }
                                                        value={person}
                                                    >
                                                        {({ selected, active }) => (
                                                        <>
                                                            <div className="flex items-center">
                                                                <span
                                                                    className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                                                                >
                                                                    {person.first_name} {person.middle_name !== null & person.middle_name !== undefined & person.middle_name !== "" ? person.middle_name.charAt(0) + "." : ""} {person.last_name}
                                                                </span>
                                                            </div>

                                                            {selected ? (
                                                            <span
                                                                className={classNames(
                                                                active ? 'text-white' : 'text-indigo-600',
                                                                'absolute inset-y-0 right-0 flex items-center pr-4'
                                                                )}
                                                            >
                                                                <CheckIcon className="w-5 h-5" aria-hidden="true" />
                                                            </span>
                                                            ) : null}
                                                        </>
                                                        )}
                                                    </Listbox.Option>
                                                    ))}
                                                </Listbox.Options>
                                            </Transition>
                                        </div>
                                    </>
                                )}
                            </Listbox>
                        </div>
                        <div></div>
                    </div>
                    <div className="grid gap-4 mb-4 sm:grid-cols-2">
                        <div>
                            <div className="relative">
                                <input type="text" id="fo_wife-first-name" name='wife_firstName' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                    onChange={e => {setWifeFirstName(e.target.value)}}
                                    value={ wifeFirstName !== "" & wifeFirstName !== null & wifeFirstName !== undefined ? wifeFirstName : "" }
                                />
                                <label htmlFor="fo_wife-first-name" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">First Name</label>
                            </div>
                        </div>
                        <div>
                            <div className="relative">
                                <input type="text" id="fo_wife-middle-name" name='wife_middleName' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                    onChange={e => {setWifeMiddleName(e.target.value)}}
                                    value={ wifeMiddleName !== "" & wifeMiddleName !== null & wifeMiddleName !== undefined ? wifeMiddleName : "" }
                                />
                                <label htmlFor="fo_wife-middle-name" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Middle Name</label>
                            </div>
                        </div>
                        <div>
                            <div className="relative">
                                <input type="text" id="fo_wife-last-name" name='wife_lastName' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                    onChange={e => {setWifeLastName(e.target.value)}}
                                    value={ wifeLastName !== "" & wifeLastName !== null & wifeLastName !== undefined ? wifeLastName : "" }
                                />
                                <label htmlFor="fo_wife-last-name" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Last Name</label>
                            </div>
                        </div>
                        <div>
                            <div className="relative">
                                <input type="text" id="fo_wife-nickname" name='wife_nickname' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                    onChange={e => {setWifeNickname(e.target.value)}}
                                    value={ wifeNickname !== "" & wifeNickname !== null & wifeNickname !== undefined ? wifeNickname : "" }
                                />
                                <label htmlFor="fo_wife-nickname" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Nickname</label>
                            </div>
                        </div>
                        <div>
                            <div className="relative">
                                <input type="text" id="fo_wife-mobile-number" name='wife_mobile' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                    onChange={e => {setWifeMobile(e.target.value)}}
                                    value={ wifeMobile !== "" & wifeMobile !== null & wifeMobile !== undefined ? wifeMobile : "" }
                                />
                                <label htmlFor="fo_wife-mobile-number" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Mobile number</label>
                            </div>
                        </div>

                        <div>
                            <div className="relative">
                                <input type="email" id="fo_wife-email" name='wife_email' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                    onChange={e => {setWifeEmail(e.target.value)}}
                                    value={ wifeEmail !== "" & wifeEmail !== null & wifeEmail !== undefined ? wifeEmail : "" }
                                />
                                <label htmlFor="fo_wife-email" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Email</label>
                            </div>
                        </div>

                        <div>
                            <div className="relative max-w-sm">
                                <input id='fo_wife-birthday' type="date" name='wife_dob' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Birthday"
                                    onChange={e => {setWifeBirthday(e.target.value)}}
                                    value={ wifeBirthday !== "" & wifeBirthday !== null & wifeBirthday !== undefined ? wifeBirthday : "" }
                                />
                                <label htmlFor="fo_wife-birthday" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Birthday</label>
                            </div>
                        </div>

                        <div>
                            <div className="relative">
                                <input type="text" id="fo_wife-spouse" name='wife_spouse' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                        onChange={e => {setWifeSpouse(e.target.value)}}
                                        value={ wifeSpouse !== "" & wifeSpouse !== null & wifeSpouse !== undefined ? wifeSpouse : "" }
                                    />
                                <label htmlFor="fo_wife-spouse" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Spouse</label>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="pi_wife-civilStatus" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Civil Status</label>
                            <select id="pi_wife-civilStatus" name='wife_civilStatus' className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={e => {setWifeCivilStatus(e.target.value)}}
                                value={
                                        wifeCivilStatus !== null ?
                                            wifeCivilStatus
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
                                <input type="text" id="fo_wife-religion" name='wife_religion' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                    onChange={e => {setWifeReligion(e.target.value)}}
                                    value={
                                        wifeReligion !== null ?
                                            wifeReligion
                                        :""
                                    }
                                />
                                <label htmlFor="fo_wife-religion" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Religion</label>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="pi_wife-baptism" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Baptized?</label>
                            <div className="flex">
                                <div className="flex items-center mr-4">
                                <input id="pi_wife-baptism-yes" type="radio" value="Yes" name="wife_baptism-radio-group" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
                                        onChange={e => {setWifeBaptized(e.target.value)}}
                                        checked={
                                            wifeBaptized !== null & wifeBaptized === 'Yes' ?
                                                true
                                            : null
                                        }
                                    />
                                    <label htmlFor="pi_wife-baptism" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Yes</label>
                                </div>
                                <div className="flex items-center mr-4">
                                <input id="pi_wife-baptism-no" type="radio" value="No" name="wife_baptism-radio-group" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
                                        onChange={e => {setWifeBaptized(e.target.value)}}
                                        checked={
                                            wifeBaptized !== null & wifeBaptized === 'No' ?
                                                true
                                            : null
                                        }
                                    />
                                    <label htmlFor="pi_wife-baptism-no" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">No</label>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="pi_wife-confirmation" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirmed?</label>
                            <div className="flex">
                                <div className="flex items-center mr-4">
                                    <input id="pi_wife-confirmation" type="radio" value="Yes" name="wife_confirmation-radio-group" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
                                        onChange={e => {setWifeConfirmed(e.target.value)}}
                                        checked={
                                            wifeConfirmed !== null & wifeConfirmed === 'Yes' ?
                                                true
                                            : null
                                        }
                                    />
                                    <label htmlFor="pi_wife-confirmation" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Yes</label>
                                </div>
                                <div className="flex items-center mr-4">
                                    <input id="pi_wife-confirmation" type="radio" value="No" name="wife_confirmation-radio-group" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        onChange={e => {setWifeConfirmed(e.target.value)}}
                                        checked={
                                            wifeConfirmed !== null & wifeConfirmed === 'No' ?
                                                true
                                            : null
                                        }
                                    />
                                    <label htmlFor="pi_wife-confirmation" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">No</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='mb-4'>
                        <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Home Address</label>
                        <div className='grid gap-1 sm:grid-cols-3'>
                            <div>
                                <div className="relative">
                                    <input type="text" id="fo_wife-addressLine1" name='wife_memberAddressLine1' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " 
                                        onChange={e => {setWifeAddressLine1(e.target.value)}}
                                        value={ wifeAddressLine1 !== "" & wifeAddressLine1 !== null & wifeAddressLine1 !== undefined ? wifeAddressLine1 : "" }
                                    />
                                    <label htmlFor="fo_wife-addressLine1" className="absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Address Line 1 (ex. PO-Box #)</label>
                                </div>
                            </div>
                            <div>
                                <div className="relative">
                                    <input type="text" id="fo_wife-addressLine2" name='wife_memberAddressLine2' className="block text-sm px-2.5 pb-2.5 pt-4 w-[234px] text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                        onChange={e => {setWifeAddressLine2(e.target.value)}}
                                        value={ wifeAddressLine2 !== "" & wifeAddressLine2 !== null & wifeAddressLine2 !== undefined ? wifeAddressLine2 : "" }    
                                    />
                                    <label htmlFor="fo_wife-addressLine2" className="absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Address Line 2 (House #, street, Brgy, Sbdivision, Disctrict)</label>
                                </div>
                            </div>
                            <div>
                                <div className="relative">
                                    <input type="text" id="fo_wife-city" name='wife_memberCity' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                        onChange={e => {setWifeCity(e.target.value)}}
                                        value={ wifeCity !== "" & wifeCity !== null & wifeCity !== undefined ? wifeCity : "" }
                                    />
                                    <label htmlFor="fo_wife-city" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">City</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className='mb-4'>
                        <label className="mb-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Work</label>
                        <div className='grid mb-4 sm:grid-cols-2'>
                        <div className="relative">
                                <input type="text" id="fo_wife-occupation" name='wife_memberOccupation' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " 
                                    onChange={e => {setWifeOccupation(e.target.value)}}
                                    value={ wifeOccupation !== "" & wifeOccupation !== null & wifeOccupation !== undefined ? wifeOccupation : "" }
                                />
                                <label htmlFor="fo_wife-occupation" className="absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Occupation</label>
                            </div>
                            <div className="relative">
                                <input type="text" id="fo_wife-company" name='wife_memberCompany' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " 
                                    onChange={e => {setWifeCompany(e.target.value)}}
                                    value={ wifeCompany !== "" & wifeCompany !== null & wifeCompany !== undefined ? wifeCompany : "" }
                                />
                                <label htmlFor="fo_wife-company" className="absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Company</label>
                            </div>
                        </div>
                        <div className='grid gap-1 sm:grid-cols-3'>
                            <div>
                                <div className="relative">
                                    <input type="text" id="fo_wife-WorkaddressLine1" name='wife_memberWorkAddressLine1' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " 
                                        onChange={e => {setWifeCompanyAddressLine1(e.target.value)}}
                                        value={ wifeCompanyAddressLine1 !== "" & wifeCompanyAddressLine1 !== null & wifeCompanyAddressLine1 !== undefined ? wifeCompanyAddressLine1 : "" }
                                    />
                                    <label htmlFor="fo_wife-WorkaddressLine1" className="absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Company Address Line 1 (ex. PO-Box #)</label>
                                </div>
                            </div>
                            <div>
                                <div className="relative">
                                    <input type="text" id="fo_wife-WorkaddressLine2" name='wife_memberWorkAddressLine2' className="block text-sm px-2.5 pb-2.5 pt-4 w-[234px] text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                        onChange={e => {setWifeCompanyAddressLine2(e.target.value)}}
                                        value={ wifeCompanyAddressLine2 !== "" & wifeCompanyAddressLine2 !== null & wifeCompanyAddressLine2 !== undefined ? wifeCompanyAddressLine2 : "" }    
                                    />
                                    <label htmlFor="fo_wife-WorkaddressLine2" className="absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Company Address Line 2 (House #, street, Brgy, Sbdivision, Disctrict)</label>
                                </div>
                            </div>
                            <div>
                                <div className="relative">
                                    <input type="text" id="fo_wife-Workcity" name='wife_memberWorkCity' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                        onChange={e => {setWifeCompanyCity(e.target.value)}}
                                        value={ wifeCompanyCity !== "" & wifeCompanyCity !== null & wifeCompanyCity !== undefined ? wifeCompanyCity : "" }
                                    />
                                    <label htmlFor="fo_wife-Workcity" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">City</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button onClick={() => Stepper('personal')} type="submit" className="text-white bg-gray-500 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-6 py-2.5 text-center ">
                        Go Back to: Husband Info
                    </button>
                    <button onClick={() => Stepper('emergency')} type="submit" className="mx-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Next Step: Children
                    </button>
                </AddressInfo>

                <EmergencyContacts show={showEmergencyContact}>
                    <h3 className="mb-4 text-lg font-medium leading-none text-gray-900 dark:text-white">Children Info</h3>
                    <div className="grid w-full gap-2 mb-4 sm:grid-cols-5">
                        {
                            childrenList.length > 0 ?
                                childrenList.map((x, i) => (
                                    <>
                                        <div className="relative">
                                            <input type="text" id="fo_child_firstName" name='firstName' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                                onChange={ e => handleChildrenChange(e,i)}
                                                value={ childrenList[i].firstName !== "" & childrenList[i].firstName !== null & childrenList[i].firstName !== undefined ? childrenList[i].firstName : ""}
                                            />
                                            <label htmlFor="fo_child_firstName" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">First Name</label>
                                        </div>
                                        <div className="relative">
                                            <input type="text" id="fo_child_middleName" name='middleName' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                                onChange={ e => handleChildrenChange(e,i) }

                                                value={ childrenList[i].middleName !== "" & childrenList[i].middleName !== null & childrenList[i].middleName !== undefined ? childrenList[i].middleName : ""}
                                            />
                                            <label htmlFor="fo_child_middleName" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Middle Name</label>
                                        </div>
                                        <div className="relative">
                                            <input type="text" id="fo_child_lastName" name='lastName' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                                onChange={ e => handleChildrenChange(e,i) }
                                                value={ childrenList[i].lastName !== "" & childrenList[i].lastName !== null & childrenList[i].lastName !== undefined ? childrenList[i].lastName : ""}
                                            />
                                            <label htmlFor="fo_child_lastName" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Last Name</label>
                                        </div>
                                        <div className="relative">
                                            <input type="date" id="fo_child_birthday" name='age' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                                onChange={ e => handleChildrenChange(e,i) }
                                                value={ childrenList[i].birthday !== "" & childrenList[i].birthday !== null & childrenList[i].birthday !== undefined ? childrenList[i].birthday : ""}
                                            />
                                            <label htmlFor="fo_child_birthday" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Birthday</label>
                                        </div>
                                        <div className="relative">
                                            {
                                                childrenList.length > 1 &&
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
                                                childrenList.length-1 === i &&
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
                    <button onClick={() => Stepper('address')} type="submit" className="text-white bg-gray-500 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-6 py-2.5 text-center ">
                        Go Back to: Wife Info
                    </button>
                    <button type="submit" className="mx-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2.5 text-center"
                        onClick={() => Stepper('invite')}
                    >
                        Next Step: Inviter Info
                    </button>
                </EmergencyContacts>

                <Inviter show={showInvite}>
                    <h3 className="mb-4 text-lg font-medium leading-none text-gray-900 dark:text-white">Inviter Info</h3>
                    <div className="grid w-full gap-2 mb-4 sm:grid-cols-5">
                        {
                            inviteList.length > 0 ?
                                inviteList.map((x, i) => (
                                    <>
                                        <div className="relative">
                                            <input type="text" id="fo_inviter_name" name='name' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                                onChange={ e => handleInviterChange(e,i)}
                                                value={ inviteList[i].name !== "" & inviteList[i].name !== null & inviteList[i].name !== undefined ? inviteList[i].name : ""}
                                            />
                                            <label htmlFor="fo_inviter_name" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Name</label>
                                        </div>
                                        <div className="relative">
                                            <input type="text" id="fo_inviter_mobile" name='mobile' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                                onChange={ e => handleInviterChange(e,i) }

                                                value={ inviteList[i].mobile !== "" & inviteList[i].mobile !== null & inviteList[i].mobile !== undefined ? inviteList[i].mobile : ""}
                                            />
                                            <label htmlFor="fo_inviter_mobile" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Mobile</label>
                                        </div>
                                        <div className="relative">
                                            <input type="text" id="fo_inviter_email" name='email' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                                onChange={ e => handleInviterChange(e,i) }
                                                value={ inviteList[i].email !== "" & inviteList[i].email !== null & inviteList[i].email !== undefined ? inviteList[i].email : ""}
                                            />
                                            <label htmlFor="fo_inviter_email" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Email</label>
                                        </div>
                                        <div className="relative">
                                            <input type="text" id="fo_inviter_relationship" name='relationship' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                                onChange={ e => handleInviterChange(e,i) }
                                                value={ inviteList[i].relationship !== "" & inviteList[i].relationship !== null & inviteList[i].relationship !== undefined ? inviteList[i].relationship : ""}
                                            />
                                            <label htmlFor="fo_inviter_relationship" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Relationship</label>
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
                        Go Back to: Children
                    </button>
                    <button type="submit" className="mx-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2.5 text-center"
                        onClick={addParticipant}
                    >
                        Save
                    </button>
                </Inviter>
            </EditMEParticipant>

            <MEAttendanceWarning show={showAttendanceWarning} setShow={setShowAttendanceWarning}>
                <div className="flex items-center justify-around gap-4 mb-4 rounded-lg sm:grid-cols-2">
                        <div className='flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg'>
                            <svg fill="none" className='w-20 h-20 text-red-600 lg:w-24 lg:h-24' stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                            </svg>
                            <label className='text-lg font-semibold'>Are you sure you want to tag <strong><em>"{firstName} {middleName === "" | middleName === null | middleName === undefined ? "" : middleName.charAt(0) + "."} {lastName}"</em></strong> as <strong><em>"{attendance}"</em></strong>?</label>
                        </div>
                    </div>
                    <div className="flex items-center justify-around gap-4 mb-4 rounded-lg sm:grid-cols-2">
                        <div className='flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg'>
                            <button type="submit" className="mx-3 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                onClick={createAttendance}
                            >
                                Yes
                            </button>
                        </div>
                    </div>
            </MEAttendanceWarning>
        </div>
    )
}

export default DTRegistration