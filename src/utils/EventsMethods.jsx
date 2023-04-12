import { serverRoutes } from "./constants";

export function GetAllEvents () {
    var myHeader = new Headers();
    myHeader.append('Content-type', 'application/json');

    var requestOptions = {
        method: 'GET',
        headers: myHeader,
        redirect: 'follow'
    };

    return fetch(serverRoutes.events, requestOptions);
}

export function AddEvents (eventTitle, eventSubtitle, startDate, endDate, eventTypeId, eventStatus) {
    var myHeader = new Headers();
    myHeader.append('Content-type', 'application/json');

    var raw = JSON.stringify({
        "event_name": eventTitle,
        "event_subtitle": eventSubtitle,
        "start_date": startDate,
        "end_date": endDate,
        "status": eventStatus,
        "event_type_id": eventTypeId,
        "created_by": 1
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeader,
        body: raw,
        redirect: 'follow'
    };

    return fetch(serverRoutes.events, requestOptions);
}

export function UpdateEvents (eventId, eventTitle, eventSubtitle, startDate, endDate, eventTypeId, eventStatus) {
    var myHeader = new Headers();
    myHeader.append('Content-type', 'application/json');

    var raw = JSON.stringify({
        "event_id": eventId,
        "event_name": eventTitle,
        "event_subtitle": eventSubtitle,
        "start_date": startDate,
        "end_date": endDate,
        "status": eventStatus,
        "event_type_id": eventTypeId
    });
    
    var requestOptions = {
        method: 'PUT',
        headers: myHeader,
        body: raw,
        redirect: 'follow'
    };
    
    return fetch(serverRoutes.events, requestOptions);
}

export function DeleteEvent (eventId) {
    var myHeader = new Headers();
    myHeader.append('Content-type', 'application/json');

    var raw = JSON.stringify({
        "event_id": eventId
    });

    var requestOptions = {
        method: 'DELETE',
        headers: myHeader,
        body: raw,
        redirect: 'follow'
    };

    return fetch(serverRoutes.events, requestOptions);
}