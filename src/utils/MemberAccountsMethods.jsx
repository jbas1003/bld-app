import { serverRoutes } from "./constants";

export function Login (username, password) {
    var myHeader = new Headers();
    myHeader.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
        "username": username,
        "password": password
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeader,
        body: raw,
        redirect: 'follow'
    };
    
    return fetch(serverRoutes.login, requestOptions);
}

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

export function CreateAccount (id, memberId, username, password) {
    var myHeader = new Headers();
    myHeader.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
        "member_id": memberId,
        "username": username,
        "password": password,
        "created_by": id
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeader,
        body: raw,
        redirect: 'follow'
    };
    
    return fetch(serverRoutes.memberAccounts, requestOptions);
}

export function ResetAccount (memberId) {
    var myHeader = new Headers();
    myHeader.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
        "memberAccount_id": memberId,
    });

    var requestOptions = {
        method: 'DELETE',
        headers: myHeader,
        body: raw,
        redirect: 'follow'
    };
    // console.log(raw);
    return fetch(serverRoutes.memberAccounts, requestOptions);
}