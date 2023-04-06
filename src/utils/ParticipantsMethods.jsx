import { serverRoutes } from "./constants";

export function GetAllParticipants (callback) {
    var myHeaders = new Headers();
    myHeaders.append("Content-type", "application-json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(serverRoutes.participants, requestOptions)
}