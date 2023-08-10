import { serverRoutes } from "./constants";

export function GetME (event) {
    const myHeader = new Headers();
    myHeader.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
        event: event
    });

    const requestOptions = {
        method: 'POST',
        headers: myHeader,
        body: raw,
        redirect: 'follow'
    };

    return fetch(serverRoutes.getME, requestOptions);
}

export function AddParticipant (id, firstName, middleName, lastName,
    nickname, participantMobile, participantEmail, birthday, gender,
    civilStatus, religion, baptized, confirmed, memberAddressLine1,
    memberAddressLine2, memberCity, occupation, specialty, company,
    companyAddressLine1, companyAddressLine2, companyCity, childrenList,
    inviteList, event) {

        const myHeader =new Headers();
        myHeader.append('Content-Type', 'application/json');

        const raw = JSON.stringify({
            first_name: firstName,
            middle_name: middleName,
            last_name: lastName,
            nickname: nickname,
            member_mobile: participantMobile,
            member_email: participantEmail,
            birthday: birthday,
            gender: gender,
            civil_status: civilStatus,
            religion: religion,
            baptized: baptized,
            confirmed: confirmed,
            member_status_id: 1,
            member_addressLine1: memberAddressLine1,
            member_addressLine2: memberAddressLine2,
            member_city: memberCity,
            occupation: occupation,
            specialty: specialty,
            company: company,
            company_addressLine1: companyAddressLine1,
            company_addressLine2: companyAddressLine2,
            company_city: companyCity,
            children: childrenList,
            inviter: inviteList,
            created_by: id,
            event_id: event,
            status: null
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeader,
            body: raw,
            redirect: 'follow'
        }
        // console.log(event);
        return fetch(serverRoutes.me, requestOptions);
    }

    export function UpdateParticipant (userId, memberId, firstName, middleName,
                                    lastName, nickname, memberMobile, memberEmail,
                                    birthday, gender, civil_status, religion, baptism,
                                    confirmation, member_addressLine1, member_addressLine2,
                                    member_city, occupation, specialty, company,
                                    work_addressLine1, work_addressLine2, work_city,
                                    children, inviters) {
    
    const myHeader = new Headers();
    myHeader.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
        member_id: memberId,
        created_by: userId,
        first_name: firstName,
        middle_name: middleName,
        last_name: lastName,
        nickname: nickname,
        birthday: birthday,
        gender: gender,
        civil_status: civil_status,
        religion: religion,
        baptized: baptism,
        confirmed: confirmation,
        member_addressLine1: member_addressLine1,
        member_addressLine2: member_addressLine2,
        member_city: member_city,
        member_mobile: memberMobile,
        member_email: memberEmail,
        occupation: occupation,
        specialty: specialty,
        company: company,
        company_addressLine1: work_addressLine1,
        company_addressLine2: work_addressLine2,
        city: work_city,
        children: children,
        inviters: inviters
    });

    const requestOptions = {
        method: 'PUT',
        headers: myHeader,
        body: raw,
        redirect: 'follow'
    }
    
    return fetch(serverRoutes.updateME, requestOptions);
}

export function CreateMEAttendance(userId, memberId, eventId, status) {
    const myHeader = new Headers();
    myHeader.append('Content-type', 'application/json');

    const raw = JSON.stringify({
        member_id: memberId,
        event_id: eventId,
        status: status,
        created_by: userId
    });

    const requestOptions = {
        method: 'POST',
        headers: myHeader,
        body: raw,
        redirect: 'follow'
    }
    
    return fetch(serverRoutes.meAttendance, requestOptions);
}