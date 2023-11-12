import { serverRoutes } from "./constants";

export function GetAllEvents (event) {
    var myHeader = new Headers();
    myHeader.append('Content-type', 'application/json');

    var raw = JSON.stringify({
        'event_category': event
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeader,
        body: raw,
        redirect: 'follow'
    };

    return fetch(serverRoutes.getEvents, requestOptions);
}

export function AddEvents (eventTitle, eventSubtitle, eventDetails, eventLocation, startDate, endDate, eventTypeId, eventStatus, userId) {
    var myHeader = new Headers();
    myHeader.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
        "event_name": eventTitle,
        "event_subtitle": eventSubtitle,
        "event_details": eventDetails,
        "location": eventLocation,
        "start_date": startDate,
        "end_date": endDate,
        "status": eventStatus,
        "event_type_id": eventTypeId,
        "created_by": userId
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeader,
        body: raw,
        redirect: 'follow'
    };

    // console.log(`${eventTitle}, ${eventSubtitle}, ${eventDetails}, ${eventLocation}, ${startDate}, ${endDate}, ${eventTypeId}, ${eventStatus}`)
    return fetch(serverRoutes.events, requestOptions);
}

export function UpdateEvents (eventId, eventTitle, eventSubtitle, eventDetails, eventLocation, startDate, endDate, eventTypeId, eventStatus) {
    var myHeader = new Headers();
    myHeader.append('Content-type', 'application/json');

    var raw = JSON.stringify({
        "event_id": eventId,
        "event_name": eventTitle,
        "event_subtitle": eventSubtitle,
        "event_details": eventDetails,
        "location": eventLocation,
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
    // console.log(`${eventId}, ${eventTitle}, ${eventSubtitle}, ${eventDetails}, ${eventLocation}, ${startDate}, ${endDate}, ${eventTypeId}, ${eventStatus}`)
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