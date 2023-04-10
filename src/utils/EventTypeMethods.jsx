import { serverRoutes } from "./constants";

export function GetAllEventTypes () {
    var myHeaders = new Headers();
    myHeaders.append('Content-type', 'application/json');

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(serverRoutes.eventTypes, requestOptions);
}


export function AddNewEventTypes (eventTypeName, eventTypeCategory) {
    var myHeaders = new Headers();
    myHeaders.append('Content-type', 'application/json');

    var raw = JSON.stringify({
        "event_type_name": eventTypeName,
        "event_type_category": eventTypeCategory,
        "created_by": 1
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    }

    return fetch(serverRoutes.eventTypes, requestOptions);
}

export function UpdateEventType (eventTypeId, eventTypeName) {
    var myHeaders = new Headers();
    myHeaders.append('Content-type', 'application/json');

    var raw = JSON.stringify({
        'event_type_id': eventTypeId,
        'event_type_name': eventTypeName
    });

    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    return fetch(serverRoutes.eventTypes, requestOptions);
}


export function DeleteEventType (eventTypeId) {
    var myHeaders = new Headers();
    myHeaders.append('Content-type', 'application/json');

    var raw = JSON.stringify({
        'event_type_id': eventTypeId
    });

    var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    return fetch(serverRoutes.eventTypes, requestOptions);
}