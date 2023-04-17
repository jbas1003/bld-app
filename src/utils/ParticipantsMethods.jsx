import { serverRoutes } from "./constants";

export function GetAllParticipants () {
    var myHeaders = new Headers();
    myHeaders.append("Content-type", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(serverRoutes.participants, requestOptions)
}

export function AddParticipant(id, firstName, middleName, lastName, nickname, mobile, email, birthday, gender, civilStatus, spouse, religion, baptized, confirmed, memberAddressLine1, memberAddressLine2, memberCity, occupation, specialty, company, companyAddressLine1, companyAddressLine2, companyCity) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        'first_name': firstName,
        "middle_name": middleName,
        "last_name": lastName,
        "nickname": nickname,
        "birthday": birthday,
        "gender": gender,
        "civil_status": civilStatus,
        "spouse_member_id": spouse,
        "religion": religion,
        "baptism": baptized,
        "confirmation": confirmed,
        "member_status_id": 1,
        "created_by": id,
        "member_address_line1": memberAddressLine1,
        "member_address_line2": memberAddressLine2,
        "member_city": memberCity,
        "member_mobile": mobile,
        "email": email,
        "occupation_name": occupation,
        "specialty": specialty,
        "company": company,
        "company_address_line1": companyAddressLine1,
        "company_address_line2": companyAddressLine2,
        "city": companyCity
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
    //   console.log(`${id}, ${firstName}, ${middleName}, ${lastName}, ${nickname}, ${mobile}, ${email}, ${birthday}, ${gender}, ${civilStatus}, ${spouse}, ${religion}, ${baptized}, ${confirmed}, ${memberAddressLine1}, ${memberAddressLine2}, ${memberCity}, ${occupation}, ${specialty}, ${company}, ${companyAddressLine1}, ${companyAddressLine2}, ${companyCity}`)
    return fetch(serverRoutes.participants, requestOptions)
}


export function UpdateParticipant (participant, firstName, middleName, lastName, nickname, mobile, email, birthday, gender, civilStatus, spouse, religion, baptized, confirmed, memberAddressLine1, memberAddressLine2, memberCity, occupation, specialty, company, companyAddressLine1, companyAddressLine2, companyCity) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        'member_id': participant,
        'first_name': firstName,
        "middle_name": middleName,
        "last_name": lastName,
        "nickname": nickname,
        "birthday": birthday,
        "gender": gender,
        "civil_status": civilStatus,
        "spouse_member_id": spouse,
        "religion": religion,
        "baptism": baptized,
        "confirmation": confirmed,
        "member_status_id": 1,
        "member_address_line1": memberAddressLine1,
        "member_address_line2": memberAddressLine2,
        "member_city": memberCity,
        "member_mobile": mobile,
        "email": email,
        "occupation_name": occupation,
        "specialty": specialty,
        "company": company,
        "company_address_line1": companyAddressLine1,
        "company_address_line2": companyAddressLine2,
        "city": companyCity
    });

    var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };
    // console.log(`${participant}, ${firstName}, ${middleName}, ${lastName}, ${nickname}, ${mobile}, ${email}, ${birthday}, ${gender}, ${civilStatus}, ${spouse}, ${religion}, ${baptized}, ${confirmed}, ${memberAddressLine1}, ${memberAddressLine2}, ${memberCity}, ${occupation}, ${specialty}, ${company}, ${companyAddressLine1}, ${companyAddressLine2}, ${companyCity}`)
    return fetch(serverRoutes.participants, requestOptions)
}