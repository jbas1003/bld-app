import React, { useState, useEffect } from 'react';
import useAuthContext from '../../../../utils/AuthContext';
import AddMemberStatus from './Modals/AddMemberStatus';
import { AddNewMemberStatus, DeleteMemberStatus, GetMemberStatus, UpdateMemberStatus } from '../../../../utils/MemberStatusMethods';
import EditMemberStatus from './Modals/EditMemberStatus';
import DeleteMemberStatusWarning from './Modals/DeleteMemberStatusWarning';

function DTMemberStatus() {
    const { loginResult } = useAuthContext();

    const [memberStatusData, setMemberStatusData] = useState();
    const [message, setMessage] = useState();
    const [status, setStatus] = useState();

    const [prevMemberStatus, setPrevMemberStatus] = useState();

    const [memberStatus, setMemberStatus] = useState();
    const [memberStatusId, setMemberStatusId] = useState();

    const [showAdd, setShowAdd] = useState();
    const [showEdit, setShowEdit] = useState();
    const [showDeleteWarning, setShowDeleteWarning] = useState();

    const getMemberStatus = () => {
        GetMemberStatus()
            .then(async result => {return await result.json()})
            .then(async result => {
                if (await result.status === 200) {
                    setStatus(true);
                    setMemberStatusData(result.body);
                } else {
                    setStatus(false);
                    setMessage(result.message);
                }
            });
    }

    const addMemberstatus = () => {
        AddNewMemberStatus(loginResult.__, memberStatus)
            .then(async result => {return await result.json()})
            .then(async result => {
                if (await result.status === 200) {
                    alert(`${memberStatus} was added successfully!`);
                } else {
                    // alert(`There was a problem while adding ${memberStatus} in the records. Please contact system administrator.`);
                    alert(result.message);
                }
            });
        
            if (status) {
                setMemberStatusId('')
                setMemberStatus('');
            }

            setShowAdd(false);
            getMemberStatus();
    }

    const updateMemberStatus = () => {
        UpdateMemberStatus(memberStatusId, memberStatus)
            .then(async result => {return await result.json()})
            .then(async result => {
                if (await result.status === 200) {
                    alert(`Member status successfully changed from "${prevMemberStatus}" to "${memberStatus}"`);
                } else {
                    alert(result.message);
                }
            })
        
        setMemberStatus('');
        setMemberStatusId('');
        setPrevMemberStatus('');
        getMemberStatus()
        setShowEdit(false);
    }

    const deleteMemberStatus = () => {
        DeleteMemberStatus(memberStatusId)
            .then(async result => {return await result.json()})
            .then(async result => {
                if (await result.status === 200) {
                    alert(`${memberStatus} was successfully deleted.`)
                } else {
                    alert(result.message);
                }
            });

        setMemberStatusId('');
        setMemberStatus('');
        getMemberStatus();
        setShowDeleteWarning(false);
    }

    function tableSearch() {
        // Declare variables
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("table-search");
        filter = input.value.toUpperCase();
        table = document.getElementById("memberStatusDTbl");
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

    const editMemberstatus = (memberStatisId, memberStatus) => {
        setMemberStatusId(memberStatisId);
        setPrevMemberStatus(memberStatus);
        setMemberStatus(memberStatus);
        setShowEdit(true);
    }

    const closeEdit = () => {
        setMemberStatusId('');
        setMemberStatus('')
        setShowEdit(false);
    }

    const showDelete = (memberStatusId, memberStatus) => {
        setMemberStatusId(memberStatusId);
        setMemberStatus(memberStatus);
        setShowDeleteWarning(true);
    }

    const closeDeleteWarning = () => {
        setMemberStatusId('');
        setMemberStatus('');
        setShowDeleteWarning(false);
    }

    useEffect(() => {
        getMemberStatus();
    }, []);

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

                    <div>
                        <button type="button"
                            className="flex items-center text-white bg-green-800 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-700 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
                            onClick={() => setShowAdd(true)}
                        >
                        <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="flex-1 ml-3 whitespace-nowrap">Add New Event</span>
                        </button>
                    </div>
                </div>
                <div className='overflow-x-auto overflow-scroll max-h-[600px]'>
                    <table id='memberStatusDTbl' className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-2 py-3 whitespace-nowrap w-[85%]">
                                    Member Status
                                </th>
                                <th scope="col" className="px-2 py-3 whitespace-nowrap w-[15%]">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                status ?
                                    memberStatusData.map(items => (
                                        
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                <th scope="row" className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    <p className='hover:cursor-pointer'>{items.status}</p>
                                                </th>
                                                <td className="px-2 py-4 whitespace-nowrap" style={{ cursor: "pointer", width: "20%" }}>
                                                    <button type="button"
                                                        className="text-red-800 border border-red-800 hover:bg-red-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-white font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800"
                                                        onClick={() => showDelete(items.memberStatus_id, items.status)}
                                                    >
                                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                        </svg>
                                                    </button>

                                                    <button type="button"
                                                        className="text-green-800 border border-green-800 hover:bg-green-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-white font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:focus:ring-green-800"
                                                        onClick={() => editMemberstatus(items.memberStatus_id, items.status)}
                                                    >
                                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                        </svg>
                                                    </button>
                                            </td>
                                            </tr>
                                    
                                    ))
                                :
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td colSpan={2}  className="px-2 py-4 font-medium text-center text-gray-900 whitespace-nowrap dark:text-white">
                                            {message}
                                        </td>
                                    </tr>
                                    
                            }
                        </tbody>
                    </table>
                </div>

                <AddMemberStatus show={showAdd} setShow={() => setShowAdd(false)}>
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
                            onClick={addMemberstatus}
                        >
                            Save
                        </button>
                    </div>
                </AddMemberStatus>

                <EditMemberStatus show={showEdit} setShow={closeEdit}>
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
                </EditMemberStatus>

                <DeleteMemberStatusWarning show={showDeleteWarning} setShow={closeDeleteWarning}>
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
                </DeleteMemberStatusWarning>
                                    
            </div>
    )
}

export default DTMemberStatus