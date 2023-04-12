import { serverRoutes } from "./constants";

export function GetMemberStatus () {
    var myHeader = new Headers();
    myHeader.append('Content-type', 'application/json');

    var requestOptions = {
        method: 'GET',
        headers: myHeader,
        redirect: 'follow'
    };

    return fetch(serverRoutes.memberStatus, requestOptions);
}

export function AddNewMemberStatus (memberStatus) {
    var myheader = new Headers();
    myheader.append('Content-type', 'application/json');

    var raw = JSON.stringify({
        "status": memberStatus,
        "created_by": 1
    });

    var requestOptions = {
        "method": 'POST',
        "headers": myheader,
        "body": raw,
        "redirect": 'follow'
    };

    return fetch(serverRoutes.memberStatus, requestOptions);
}

export function UpdateMemberStatus (memberStatusId, memberStatus) {
    var myHeader = new Headers();
    myHeader.append('Content-type', 'application/json');

    var raw = JSON.stringify({
        'memberStatus_id': memberStatusId,
        'status': memberStatus
    });

    var requestOptions = {
        method: 'PUT',
        headers: myHeader,
        body: raw,
        redirect: 'follow'
    };

    return fetch(serverRoutes.memberStatus, requestOptions);
}

export function DeleteMemberStatus (memberStatusId) {
    var myHeader = new Headers();
    myHeader.append('Content-type', 'application/json');

    var raw = JSON.stringify({
        'memberStatus_id': memberStatusId
    });

    var requestOptions = {
        method: 'DELETE',
        headers: myHeader,
        body: raw,
        redirect: 'follow'
    };

    return fetch(serverRoutes.memberStatus, requestOptions);
}