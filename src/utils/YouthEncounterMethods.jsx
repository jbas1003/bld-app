import { serverRoutes } from "./constants";

export function GetYE (event) {
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

    return fetch(serverRoutes.getYE, requestOptions);
}

export function AddYE (id, firstName, middleName, lastName,
                        nickname, participantMobile, participantEmail, birthday, gender,
                        religion, baptized, confirmed, memberAddressLine1,
                        memberAddressLine2, memberCity, educationalLevel, gradeLevel, course,
                        company, companyAddressLine1, companyAddressLine2, companyCity, contactList,
                        inviteList, event) {
    
    const myHeader = new Headers();
    myHeader.append('Content-type', 'application/json');

    const raw = JSON.stringify({
        first_name: firstName,
        middle_name: middleName,
        last_name: lastName,
        nickname: nickname,
        member_mobile: participantMobile,
        member_email: participantEmail,
        birthday: birthday,
        gender: gender,
        civil_status: "Single",
        religion: religion,
        baptized: baptized,
        confirmed: confirmed,
        member_status_id: 1,
        member_address_line1: memberAddressLine1,
        member_address_line2: memberAddressLine2,
        member_city: memberCity,
        occupation: `${educationalLevel} (${gradeLevel})`,
        specialty: course,
        company: company,
        company_addressLine1: companyAddressLine1,
        company_addressLine2: companyAddressLine2,
        company_city: companyCity,
        emergency_contacts: contactList,
        inviter: inviteList,
        created_by: id,
        event_id: event,
        status: null
    });
}