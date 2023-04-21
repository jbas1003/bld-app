import React, { useState, useEffect } from 'react';
import useAuthContext from '../../../../utils/AuthContext';
import { CreateAccount, GetMemberAccounts } from '../../../../utils/MemberAccountsMethods';
import { GetAllParticipants } from '../../../../utils/ParticipantsMethods';
import CreateAccountModal from './Modals/CreateAccountModal';

function DTMemberAccounts() {
    const { loginResult } = useAuthContext();

    const [memberAccountsData, setMemberAccountsData] = useState();
    const [membersData, setMembersData] = useState()
    const [membersStatus, setMembersStatus] = useState();
    const [accountStatus, setAccountStatus] = useState();
    const [memberMessage, setMemberMessage] = useState();
    const [accountMessage, setAccountMessage] = useState();

    const [showCreateAccount, setShowCreateAccount] = useState();
    const [showEdit, setShowEdit] = useState();
    const [showDelete, setShowDelete] = useState();

    const [memberId, setMemberId] = useState();
    const [firstName, setFirstName] = useState();
    const [middleName, setMiddleName] = useState();
    const [lastName, setLastName] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const getMemberAccounts = () => {
        GetMemberAccounts()
            .then(async result => {return await result.json()})
            .then(async result => {
                if (await result.status === 200) {
                    setAccountStatus(true);
                    setMemberAccountsData(result.body)
                } else if (await result.status === 422) {
                    setAccountStatus(false);
                    setAccountMessage(result.message);
                } else {
                    setAccountStatus(false);
                    alert('Server Error. Please contact system administrator.');
                }
            })
    }

    const createAccount = () => {
        CreateAccount(loginResult.__, memberId, username, password)
            .then(async result => {return await result.json()})
            .then(async result => {
                if (await result.status === 200) {
                    alert(`Successfully created an account for ${firstName} ${lastName}.`)
                } else {
                    alert(`There was a problem when creating an account for ${firstName} ${lastName}. Please contact system administrator.`)
                }
            })
        
        setMemberId('');
        setFirstName('');
        setMiddleName('');
        setLastName('');
        getMemberAccounts();
        setShowCreateAccount(false);
    }

    function tableSearch() {
        // Declare variables
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("table-search");
        filter = input.value.toUpperCase();
        table = document.getElementById("memberAccountsDTbl");
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

    const showCreate = (memberId, firstName, middleName, lastName) => {
        setMemberId(memberId);
        setFirstName(firstName);
        setMiddleName(middleName);
        setLastName(lastName);
        setShowCreateAccount(true);
    }

    useEffect(() => {
        getMemberAccounts();
    }, [])

    return (
        <div className="mt-10 relative overflow-x-auto shadow-md sm:rounded-lg">
                <div className="flex items-center justify-between py-4 px-2 bg-white dark:bg-gray-900">
                    <label htmlFor="table-search" className="sr-only">Search</label>
                    <div className="relative mt-1">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                        </div>
                        <input type="text" id="table-search" onKeyUp={() => tableSearch()} className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" />
                    </div>
                </div>
                <table id='memberAccountsDTbl' className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Member Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Username
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            accountStatus ?
                                memberAccountsData.map(items => (
                                    
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                <p className='hover:cursor-pointer'>{items.first_name} {items.last_name}</p>
                                            </th>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                <p className='hover:cursor-pointer'>{
                                                    items.username !== null & items.username !== undefined & items.username !== '' ?
                                                        items.username
                                                    :<em><strong>'This member has no user account yet.'</strong></em>
                                                }</p>
                                            </th>
                                            <td className="px-6 py-4 whitespace-nowrap" style={{ cursor: "pointer", width: "20%" }}>

                                                {
                                                    accountStatus ?
                                                        items.username !== null & items.username !== undefined & items.username !== '' ?
                                                            <>
                                                                <button type="button"
                                                                    className="text-orange-400 border border-orange-400 hover:bg-orange-400 hover:text-white focus:ring-4 focus:outline-none focus:ring-white font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2"
                                                                    // onClick={() => editMemberstatus(items.memberStatus_id, items.status)}
                                                                >
                                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
                                                                    </svg>
                                                                </button>
                                                                <button type="button"
                                                                    className="text-green-800 border border-green-800 hover:bg-green-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-white font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2"
                                                                    // onClick={() => editMemberstatus(items.memberStatus_id, items.status)}
                                                                >
                                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                                    </svg>
                                                                </button>
                                                            </>
                                                        :
                                                        <button type="button"
                                                            className="text-yellow-400 border border-yellow-400 hover:bg-yellow-400 hover:text-white focus:ring-4 focus:outline-none focus:ring-white font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2"
                                                            onClick={() => showCreate(items.member_id, items.first_name, items.last_name)}
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                                                            </svg>
                                                        </button>
                                                    :
                                                        <button type="button"
                                                            className="text-yellow-400 border border-yellow-400 hover:bg-yellow-400 hover:text-white focus:ring-4 focus:outline-none focus:ring-white font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2"
                                                            onClick={() => showCreate(items.member_id, items.first_name, items.last_name)}
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                                                            </svg>
                                                        </button>
                                                }
                                                
                                        </td>
                                        </tr>
                                
                                ))
                            :
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td colSpan={3}  className="px-6 py-4 font-medium text-center text-gray-900 whitespace-nowrap dark:text-white">
                                        {memberMessage}
                                    </td>
                                </tr>
                                
                        }
                    </tbody>
                </table>

                <CreateAccountModal show={showCreateAccount} setShow={() => setShowCreateAccount(false)}>
                    <div className="grid gap-4 mb-4 sm:grid-cols-">
                        <h2>You are creating an account for {firstName} {middleName}. {lastName}</h2>
                    </div>
                    <div className="grid gap-4 mb-4 sm:grid-cols-2">
                        <div>
                            <div className="relative">
                                <input type="text" id="fo_username" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " 
                                    onChange={e => {setUsername(e.target.value)}}
                                    value={
                                        username !== null ?
                                            username
                                        :""
                                    }
                                />
                                <label htmlFor="fo_username" className="absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Username</label>
                            </div>
                        </div>
                        <div>
                            <div className="relative">
                                <input type="password" id="fo_password" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " 
                                    onChange={e => {setPassword(e.target.value)}}
                                    value={
                                        password !== null ?
                                            password
                                        :""
                                    }
                                />
                                <label htmlFor="fo_password" className="absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Password</label>
                            </div>
                        </div>
                    </div>
                    <div className='flex w-full justify-end items-end'>
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={createAccount}
                        >
                            Save
                        </button>
                    </div>
                </CreateAccountModal>

                {/* <EditMemberStatus show={showEdit} setShow={closeEdit}>
                    <div className="grid gap-4 mb-4 sm:grid-cols-1">
                        <div>
                            <div className="relative">
                                <input type="text" id="fo_eventTitle" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " 
                                    onChange={e => {setMemberStatus(e.target.value)}}
                                    value={
                                        memberStatus !== null ?
                                            memberStatus
                                        :""
                                    }
                                />
                                <label htmlFor="fo_eventTitle" className="absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Event Title</label>
                            </div>
                        </div>
                    </div>
                    <div className='flex w-full justify-end items-end'>
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={updateMemberStatus}
                        >
                            Save
                        </button>
                    </div>
                </EditMemberStatus> */}

                {/* <DeleteMemberStatusWarning show={showDeleteWarning} setShow={closeDeleteWarning}>
                    <div className="flex items-center justify-around gap-4 mb-4 sm:grid-cols-2 rounded-lg">
                        <div className='flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg'>
                            <svg fill="none" className='w-20 h-20 lg:w-24 lg:h-24 text-red-600' stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                            </svg>
                            <label className='font-semibold text-lg'>Are you sure you want to delete <strong><em>"{memberStatus}"</em></strong>?</label>
                        </div>
                    </div>
                    <div className="flex items-center justify-around gap-4 mb-4 sm:grid-cols-2 rounded-lg">
                        <div className='flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg'>
                            <button type="submit" className="mx-3 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                onClick={deleteMemberStatus}
                            >
                                Yes
                            </button>
                        </div>
                    </div>
                </DeleteMemberStatusWarning> */}
                                    
            </div>
    )
}

export default DTMemberAccounts