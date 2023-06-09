import { serverRoutes } from "./constants";

export function GetAttendance(id) {
    var myHeader = new Headers();
    myHeader.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
        'event_id': id
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeader,
        body: raw,
        redirect: 'follow'
    };

    return fetch(serverRoutes.showAttendances, requestOptions);
}

export function GetAttendanceList(event, eventDate, eventId) {
    var myHeader = new Headers();
    myHeader.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
        'event_category': event,
        'event_date': eventDate,
        'event_id': eventId
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeader,
        body: raw,
        redirect: 'follow'
    };

    return fetch(serverRoutes.attendanceList, requestOptions);
}

export function CreateAttendanceRecord (id, memberId, eventId, status) {
    var myHeader = new Headers();
    myHeader.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
        'member_id': memberId,
        'event_id': eventId,
        'status': status,
        'created_by': id
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeader,
        body: raw,
        redirect: 'follow'
    };
    
    return fetch(serverRoutes.attendances, requestOptions);
}

export function DeleteAttendanceRecord (attendance) {
    var myHeader = new Headers();
    myHeader.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
        'attendance_id': attendance
    });

    var requestOptions = {
        method: 'DELETE',
        headers: myHeader,
        body: raw,
        redirect: 'follow'
    };
    
    return fetch(serverRoutes.attendances, requestOptions);
}