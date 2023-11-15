import { serverRoutes } from "./constants";

export function GetME (event) {
    const myHeader = new Headers();
    myHeader.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
        "event": event
    });

    const requestOptions = {
        method: 'POST',
        headers: myHeader,
        body: raw,
        redirect: 'follow'
    };

    return fetch(serverRoutes.getME, requestOptions);
}

export function AddParticipant (id, husbandFirstName, husbandMiddleName, husbandLastName, husbandNickname, husbandMobile,
    husbandEmail, husbandBirthday, husbandCivilStatus, husbandReligion,
    husbandBaptized, husbandConfirmed, husbandAddressLine1, husbandAddressLine2,
    husbandCity, husbandOccupation, husbandCompany, husbandCompanyAddressLine1,
    husbandCompanyAddressLine2, husbandCompanyCity, wifeFirstName, wifeMiddleName, wifeLastName,
    wifeNickname, wifeMobile, wifeEmail, wifeBirthday, wifeCivilStatus, wifeReligion, wifeBaptized, wifeConfirmed,
    wifeAddressLine1, wifeAddressLine2, wifeCity, wifeOccupation, wifeCompany, wifeCompanyAddressLine1,
    wifeCompanyAddressLine2, wifeCompanyCity, childrenList,
    inviteList, event) {

        const myHeader =new Headers();
        myHeader.append('Content-Type', 'application/json');

        const raw = JSON.stringify({
            "husband_first_name": husbandFirstName,
            "husband_middle_name": husbandMiddleName,
            "husband_last_name": husbandLastName,
            "husband_nickname": husbandNickname,
            "husband_mobile": husbandMobile,
            "husband_email": husbandEmail,
            "husband_birthday": husbandBirthday,
            "husband_gender": 'Male',
            "husband_civil_status": husbandCivilStatus,
            "husband_religion": husbandReligion,
            "husband_baptized": husbandBaptized,
            "husband_confirmed": husbandConfirmed,
            "husband_status_id": 1,
            "husband_addressLine1": husbandAddressLine1,
            "husband_addressLine2": husbandAddressLine2,
            "husband_city": husbandCity,
            "husband_occupation": husbandOccupation,
            "husband_company": husbandCompany,
            "husband_company_addressLine1": husbandCompanyAddressLine1,
            "husband_company_addressLine2": husbandCompanyAddressLine2,
            "husband_company_city": husbandCompanyCity,

            "wife_first_name": wifeFirstName,
            "wife_middle_name": wifeMiddleName,
            "wife_last_name": wifeLastName,
            "wife_nickname": wifeNickname,
            "wife_mobile": wifeMobile,
            "wife_email": wifeEmail,
            "wife_birthday": wifeBirthday,
            "wife_gender": 'Male',
            "wife_civil_status": wifeCivilStatus,
            "wife_religion": wifeReligion,
            "wife_baptized": wifeBaptized,
            "wife_confirmed": wifeConfirmed,
            "wife_status_id": 1,
            "wife_addressLine1": wifeAddressLine1,
            "wife_addressLine2": wifeAddressLine2,
            "wife_city": wifeCity,
            "wife_occupation": wifeOccupation,
            "wife_company": wifeCompany,
            "wife_company_addressLine1": wifeCompanyAddressLine1,
            "wife_company_addressLine2": wifeCompanyAddressLine2,
            "wife_company_city": wifeCompanyCity,

            "children": childrenList,
            "inviter": inviteList,
            "created_by": id,
            "event_id": event,
            "status": null
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
        "member_id": memberId,
        "created_by": userId,
        "first_name": firstName,
        "middle_name": middleName,
        "last_name": lastName,
        "nickname": nickname,
        "birthday": birthday,
        "gender": gender,
        "civil_status": civil_status,
        "religion": religion,
        "baptized": baptism,
        "confirmed": confirmation,
        "member_addressLine1": member_addressLine1,
        "member_addressLine2": member_addressLine2,
        "member_city": member_city,
        "member_mobile": memberMobile,
        "member_email": memberEmail,
        "occupation": occupation,
        "specialty": specialty,
        "company": company,
        "company_addressLine1": work_addressLine1,
        "company_addressLine2": work_addressLine2,
        "city": work_city,
        "children": children,
        "inviters": inviters
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
        "member_id": memberId,
        "event_id": eventId,
        "status": status,
        "created_by": userId
    });

    const requestOptions = {
        method: 'POST',
        headers: myHeader,
        body: raw,
        redirect: 'follow'
    }
    
    return fetch(serverRoutes.meAttendance, requestOptions);
}