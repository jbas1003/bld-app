import React, { useState, useEffect } from 'react';
import Datepicker from "tailwind-datepicker-react";
import { GetAllParticipants } from '../../../../utils/ParticipantsMethods';
import AddParticipants from './Modals/AddParticipants';
import PersonalInfo from './Modals/PersonalInfo';
import AddressInfo from './Modals/AddressInfo';
import WorkInfo from './Modals/WorkInfo';

const DTRegistration = () => {
    const [participants, setParticipants] = useState();
    const [status, setStatus] = useState();

    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDeleteWarning, setShowDeleteWarning] = useState(false);

    const [currentStep, setCurrentStep] = useState();
    const [previousStep, setPreviousStep] = useState();
    const [showPersonalInfo, setShowPersonalInfo] = useState();
    const [showAddressinfo, setShowAddressinfo] = useState();
    const [showWorkinfo, setShowWorkinfo] = useState();

    const [firstName, setFirstName] = useState(null);
    const [middleName, setMiddleName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [nickname, setNickname] = useState(null);
    const [mobile, setMobile] = useState(null);
    const [email, setEmail] = useState(null);
    const [birthday, setBirthday] = useState(null);
    const [gender, setGender] = useState(null);
    const [civilStatus, setCivilStatus] = useState(null);
    const [spouse, setSpouse] = useState();
    const [religion, setReligion] = useState(null);
    const [baptized, setBaptized] = useState(null);
    const [confirmed, setconfirmed] = useState(null);
    const [memberAddressLine1, setMemberAddressLine1] = useState(null);
    const [memberAddressLine2, setMemberAddressLine2] = useState(null);
    const [memberCity, setMemberCity] = useState(null);
    const [occupation, setOccupation] = useState(null);
    const [specialty, setSpecialty] = useState(null);
    const [company, setCompany] = useState(null);
    const [companyAddressLine1, setCompanyAddressLine1] = useState(null);
    const [companyAddressLine2, setCompanyAddressLine2] = useState(null);
    const [companyCity, setCompanyCity] = useState(null);

    const Stepper = (step) => {
        setShowAdd(true)

        switch (step) {
            case "personal":
                setCurrentStep("personal");
                setShowPersonalInfo(true);
                setShowAddressinfo(false);
                setShowWorkinfo(false);
                break;
            
            case "address":
                setPreviousStep("personal")
                setCurrentStep("address");
                setShowPersonalInfo(false);
                setShowAddressinfo(true);
                setShowWorkinfo(false);
                break;
            
                case "work":
                setPreviousStep("address")
                setCurrentStep("work");
                setShowPersonalInfo(false);
                setShowAddressinfo(false);
                setShowWorkinfo(true);
                break;
        
            default:
                break;
        }
    }

    const getParticipants = async () => {
        
        GetAllParticipants()
        .then(async result => {return await result.json()})
        .then(result => {
            if (result.status === 200) {
                setStatus(true)
                setParticipants(result.body)
            } else {
                setStatus(false)
                setParticipants(result.errors)
            }
        })
    }

    function tableSearch() {
        // Declare variables
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("tableSearch");
        filter = input.value.toUpperCase();
        table = document.getElementById("employeeDTbl");
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
        getParticipants();
    }, [])

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="flex items-center justify-between py-4 px-2 bg-white dark:bg-gray-900">
                <label htmlFor="table-search" className="sr-only">Search</label>
                <div className="relative mt-1">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                    </div>
                </div>

                <div>
                    <button type="button"
                        className="flex items-center text-white bg-green-800 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-700 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
                        onClick={() => Stepper("personal")}
                    >
                    <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="flex-1 ml-3 whitespace-nowrap">Add New Participant</span>
                    </button>
                </div>
            </div>
            <table id='employeeDTbl' className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th className="px-6 py-3">
                            Participant
                        </th>
                        <th className="px-6 py-3">
                            Birthday (MM/DD/YYYY)
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
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        status ?
                            participants.map(items => (
                                <tr>
                                    <td className="px-6 py-3">
                                        {items.first_name} {items.last_name}
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
                                                participants.map(getSpouse => (
                                                    getSpouse.member_id === items.spouse_member_id ?
                                                        getSpouse.first_name + ' ' + getSpouse.last_name
                                                    : null
                                                ))
                                                
                                        }
                                    </td>
                                    <td className="px-6 py-3">
                                        Action
                                    </td>
                                </tr>
                            ))
                        :
                        <tr>
                            <th colSpan={5} className="px-6 py-3">
                                {participants}
                            </th>
                        </tr>
                    }
                </tbody>
            </table>

            <AddParticipants show={showAdd} setShow={setShowAdd}>
                <ol class="flex items-center w-full mb-4 sm:mb-5">
                    <li class={`flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-4 after:inline-block
                        ${ currentStep === 'personal' ?
                            'text-green-100 after:border-green-100'
                            : 'text-green-600 after:border-green-600'}
                    `}>
                        <div class={`flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0
                            ${ currentStep === 'personal'?
                                'bg-green-100 '
                            : 'bg-green-100 '}
                        `}>
                            <svg aria-hidden="true" className={`w-5 h-5 lg:w-6 lg:h-6
                                ${ currentStep === 'personal' ?
                                    'text-gray-500'
                                : 'text-green-600'}
                            `} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clipRule="evenodd"></path>
                            </svg>
                        </div>
                    </li>
                    <li class={`flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-4 after:inline-block
                        ${ currentStep === 'address' && previousStep === 'personal' ?
                            'text-green-100 after:border-green-100'
                            : currentStep === 'work' ?
                                'text-green-600 after:border-green-600'
                                :'text-green-100 after:border-gray-100'}
                    `}>
                        <div class={`flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0
                            ${ currentStep === 'address' && previousStep === 'personal' ?
                                'bg-green-100'
                            : currentStep === 'work' ?
                                'bg-green-100'
                                :'bg-gray-100'}
                        `}>
                            <svg aria-hidden="true" className={`w-5 h-5 lg:w-6 lg:h-6
                                ${ currentStep === 'address' && previousStep === 'personal' ?
                                    'text-gray-500'
                                : currentStep === 'work' ?
                                    'text-green-600'
                                    :'text-gray-500'}
                            `} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                                <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                            </svg>
                        </div>
                    </li>
                    <li class={`flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-4 after:inline-block
                        ${ currentStep === 'work' && previousStep === 'address' ?
                            'text-green-100 after:border-green-100'
                            : ''}
                    `}>
                        <div class={`flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0
                            ${ currentStep === 'work' && previousStep === 'address' ?
                                'bg-green-100'
                            : 'bg-gray-100 '}
                        `}>
                            <svg aria-hidden="true" className={`w-5 h-5 lg:w-6 lg:h-6
                                ${ currentStep === 'work' && previousStep === 'address' ?
                                    'text-gray-500'
                                : 'text-gray-500'}
                            `} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path clipRule="evenodd" fillRule="evenodd" d="M7.5 5.25a3 3 0 013-3h3a3 3 0 013 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0112 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 017.5 5.455V5.25zm7.5 0v.09a49.488 49.488 0 00-6 0v-.09a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5zm-3 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" />
                                <path d="M3 18.4v-2.796a4.3 4.3 0 00.713.31A26.226 26.226 0 0012 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 01-6.477-.427C4.047 21.128 3 19.852 3 18.4z" />
                            </svg>
                        </div>
                    </li>
                </ol>
                
                <PersonalInfo show={showPersonalInfo}>
                    <h3 class="mb-4 text-lg font-medium leading-none text-gray-900 dark:text-white">Personal Info</h3>
                    <div class="grid gap-4 mb-4 sm:grid-cols-2">
                        <div>
                            <div class="relative">
                                <input type="text" id="fo_first-name" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                    onChange={e => {setFirstName(e.target.value)}}
                                    value={
                                        firstName !== null ?
                                            firstName
                                        :""
                                    }
                                />
                                <label htmlFor="fo_first-name" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">First Name</label>
                            </div>
                        </div>
                        <div>
                            <div class="relative">
                                <input type="text" id="fo_middle-name" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                    onChange={e => {setMiddleName(e.target.value)}}
                                    value={
                                        middleName !== null ?
                                            middleName
                                        :""
                                    }
                                />
                                <label htmlFor="fo_middle-name" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Middle Name</label>
                            </div>
                        </div>
                        <div>
                            <div class="relative">
                                <input type="text" id="fo_last-name" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                    onChange={e => {setLastName(e.target.value)}}
                                    value={
                                        lastName !== null ?
                                            lastName
                                        :""
                                    }
                                />
                                <label htmlFor="fo_last-name" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Last Name</label>
                            </div>
                        </div>
                        <div>
                            <div class="relative">
                                <input type="text" id="fo_nickname" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                    onChange={e => {setNickname(e.target.value)}}
                                    value={
                                        nickname !== null ?
                                            nickname
                                        :""
                                    }
                                />
                                <label htmlFor="fo_nickname" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Nickname</label>
                            </div>
                        </div>
                        <div>
                            <div class="relative">
                                <input type="text" id="fo_mobile-number" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                    onChange={e => {setMobile(e.target.value)}}
                                    value={
                                        mobile !== null ?
                                            mobile
                                        :""
                                    }
                                />
                                <label htmlFor="fo_mobile-number" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Mobile number</label>
                            </div>
                        </div>

                        <div>
                            <div class="relative">
                                <input type="email" id="fo_email" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                    onChange={e => {setEmail(e.target.value)}}
                                    value={
                                        email !== null ?
                                            email
                                        :""
                                    }
                                />
                                <label htmlFor="fo_mobile-number" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Email</label>
                            </div>
                        </div>

                        <div>
                            <div class="relative max-w-sm">
                                <input id='fo_birthday' type="date" class="block mt-6 px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Birthday"
                                    onChange={e => {setBirthday(e.target.value)}}
                                    value={
                                        birthday !== null ?
                                            birthday
                                        :""
                                    }
                                />
                                <label htmlFor="fo_birthday" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Birthday</label>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="pi_gender" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
                            <select id="pi_gender" class="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={e => {setGender(e.target.value)}}
                                value={
                                        gender !== null ?
                                            gender
                                        :""
                                    }
                            >
                                <option selected>Choose gender</option>
                                <option value="Female">Female</option>
                                <option value="Male">Male</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="pi_civileStatus" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Civil Status</label>
                            <select id="pi_civileStatus" class="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={e => {setCivilStatus(e.target.value)}}
                                value={
                                        civilStatus !== null ?
                                            civilStatus
                                        :""
                                    }
                            >
                                <option selected>Choose Civil Status</option>
                                <option value="Single">Single</option>
                                <option value="Married">Married</option>
                                <option value="Widow/Widower">Widow/Widower</option>
                                <option value="Separated">Separated</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="pi_spouse" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Spouse</label>
                            <select id="pi_spouse" class="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={(e) => {setSpouse(e.target.value)}}
                                value={
                                        spouse !== null ?
                                            spouse
                                        :""
                                    }
                            >
                                <option selected value={'null'}>Choose Spouse</option>
                                {
                                    status ?
                                        participants.map(items => (
                                                items.civil_status !== 'Single' ?
                                                    <option value={items.member_id}>{items.first_name} {items.last_name}</option>
                                                :null
                                        ))
                                    : <option>No Records Found...</option>
                                }
                            </select>
                        </div>
                        <div>
                            <div class="relative mt-6">
                                <input type="text" id="fo_religion" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                    onChange={e => {setReligion(e.target.value)}}
                                    value={
                                        religion !== null ?
                                            religion
                                        :""
                                    }
                                />
                                <label htmlFor="fo_religion" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Religion</label>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="pi_baptism" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Baptized?</label>
                            <div class="flex">
                                <div class="flex items-center mr-4">
                                    <input id="pi_baptism" type="radio" value="Yes" name="baptism-radio-group" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
                                        onChange={e => {setBaptized(e.target.value)}}
                                        checked={
                                            baptized === 'Yes' ?
                                                true
                                            :false
                                        }
                                    />
                                    <label htmlFor="pi_baptism" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Yes</label>
                                </div>
                                <div class="flex items-center mr-4">
                                    <input id="pi_baptism" type="radio" value="No" name="baptism-radio-group" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
                                        onChange={e => {setBaptized(e.target.value)}}
                                        checked={
                                            baptized === 'No' ?
                                                true
                                            :false
                                        }
                                    />
                                    <label htmlFor="pi_baptism" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">No</label>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="pi_confirmation" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirmed?</label>
                            <div class="flex">
                                <div class="flex items-center mr-4">
                                    <input id="pi_confirmation" type="radio" value="Yes" name="confirmation-radio-group" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
                                        onChange={e => {setconfirmed(e.target.value)}}
                                        checked={
                                            confirmed === 'Yes' ?
                                                true
                                            :false
                                        }
                                    />
                                    <label htmlFor="pi_confirmation" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Yes</label>
                                </div>
                                <div class="flex items-center mr-4">
                                    <input id="pi_confirmation" type="radio" value="No" name="confirmation-radio-group" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        onChange={e => {setconfirmed(e.target.value)}}
                                        checked={
                                            confirmed === 'No' ?
                                                true
                                            :false
                                        }
                                    />
                                    <label htmlFor="pi_confirmation" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">No</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="submit" onClick={() => {Stepper('address')}} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Next Step: Address Info
                    </button>
                </PersonalInfo>

                <AddressInfo show={showAddressinfo}>
                    <h3 class="mb-4 text-lg font-medium leading-none text-gray-900 dark:text-white">Address Info</h3>
                    <div class="grid gap-4 mb-4 sm:grid-cols-2">
                        <div>
                            <div class="relative">
                                <input type="text" id="fo_addressLine1" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                <label htmlFor="fo_addressLine1" class="absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Address Line 1 (ex. PO-Box #)</label>
                            </div>
                        </div>
                        <div>
                            <div class="relative">
                                <input type="text" id="fo_addressLine2" class="block text-sm px-2.5 pb-2.5 pt-4 w-full text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                <label htmlFor="fo_addressLine2" class="absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Address Line 2 (House #, street, Brgy, Sbdivision, Disctrict)</label>
                            </div>
                        </div>
                        <div>
                            <div class="relative">
                                <input type="text" id="fo_city" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                <label htmlFor="fo_city" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">City</label>
                            </div>
                        </div>
                    </div>
                    <button onClick={() => Stepper('personal')} type="submit" class="text-white bg-gray-500 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                        Go Back to: Personal Info
                    </button>
                    <button onClick={() => Stepper('work')} type="submit" class="mx-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Next Step: Work Info
                    </button>
                </AddressInfo>

                <WorkInfo show={showWorkinfo}>
                    <h3 class="mb-4 text-lg font-medium leading-none text-gray-900 dark:text-white">Work Info</h3>
                    <div class="grid gap-4 mb-4 sm:grid-cols-2">
                        <div>
                            <div class="relative">
                                <input type="text" id="fo_occupation" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                <label htmlFor="fo_occupation" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Occupation</label>
                            </div>
                        </div>
                        <div>
                            <div class="relative">
                                <input type="text" id="fo_specialty" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                <label htmlFor="fo_specialty" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Specialty (ex. Skill/Course)</label>
                            </div>
                        </div>
                        <div>
                            <div class="relative">
                                <input type="text" id="fo_company" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                <label htmlFor="fo_company" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Company</label>
                            </div>
                        </div>
                        <div>
                            <div class="relative">
                                <input type="text" id="fo_companyAddressLine1" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                <label htmlFor="fo_companyAddressLine1" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Address Line 1 (ex. PO-Box #)</label>
                            </div>
                        </div>
                        <div>
                            <div class="relative">
                                <input type="text" id="fo_companyAddressLine2" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                <label htmlFor="fo_companyAddressLine2" class="absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Address Line 2 (ex. Bldg #, Street, Brgy, Subdivision, District)</label>
                            </div>
                        </div>

                        <div>
                            <div class="relative">
                                <input type="text" id="fo_companyCity" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                <label htmlFor="fo_companyCity" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">City</label>
                            </div>
                        </div>
                    </div>
                    <button onClick={() => Stepper('address')} type="submit" class="text-white bg-gray-500 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                        Go Back to: Address Info
                    </button>
                    <button onClick={() => Stepper('work')} type="submit" class="mx-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Save
                    </button>
                </WorkInfo>

            </AddParticipants>
        </div>
    )
}

export default DTRegistration