import { serverRoutes } from "./constants";

export async function GetAllParticipants () {
    var myHeaders = new Headers();
    myHeaders.append("Content-type", "application-json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(serverRoutes.participants, requestOptions)
}