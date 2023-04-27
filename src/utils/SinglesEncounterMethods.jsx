import { serverRoutes } from "./constants";

export function AddParticipant (id, firstName, middleName, lastName,
    nickname, participantMobile, participantEmail, birthday, gender,
    civilStatus, religion, baptized, confirmed, memberAddressLine1,
    memberAddressLine2, memberCity, occupation, specialty, company,
    companyAddressLine1, companyAddressLine2, companyCity, contactList) {

        const myHeader = new Headers();
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
            emergency_contacts: contactList,
            created_by: id
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeader,
            body: raw,
            redirect: 'follow'
        }
        
        return fetch(serverRoutes.se, requestOptions);
}