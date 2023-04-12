import { serverRoutes } from "./constants";

export function GetMemberAccounts () {
    var myHeader = new Headers();
    myHeader.append('Content-type', 'application/json');

    var requestOptions = {
        method: 'GET',
        headers: myHeader,
        redirect: 'follow'
    };

    return fetch(serverRoutes.memberAccounts, requestOptions);
}

export function CreateAccount (memberId, username, password) {
    var myHeader = new Headers();
    myHeader.append('Content-type', 'application/json()');

    var raw = JSON.stringify({
        "member_id": memberId,
        "username": username,
        "password": password,
        "created_by": 1,
    });

    var requestOptions = {
        method: 'POST',
        'headers': myHeader,
        'body': raw,
        'redirect': 'follow'
    };

    return fetch(serverRoutes.memberAccounts, requestOptions);
}