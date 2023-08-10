export const myApiURL = 'http://127.0.0.1:8000/api';

export const serverRoutes = {

    // START: Participants Constants

        participants: myApiURL + '/members',

    // END: Participants Constants

    // START: Event Types Constants

        eventTypes: myApiURL + '/event_types',

    // END: Event Types Constants

    // START: Events Constants

        events: myApiURL + '/events',
        getEvents: myApiURL + '/get_events',

    // END: Events Constants

    // START: Member Accounts Constants

        memberStatus: myApiURL + '/member_status',

    // END: Member Accounts Constants

    // START: Member Status Constants

        memberAccounts: myApiURL + '/member_accounts',

    // END: Member Status Constants

    // START: Attendance Constants

        attendances: myApiURL + '/attendances',
        attendanceList: myApiURL + '/attendance_list',
        showAttendances: myApiURL + '/show_attendances',

    // END: Attendance Constants

    // START: Login Constants

        login: myApiURL + '/member_accounts/login',

    // END: Login Constants

    // START: SE Constants

        se: myApiURL + '/SE',
        getSE: myApiURL + '/show_SE',
        updateSE: myApiURL + '/update_SE',
        seAttendance: myApiURL + '/seAttendance',

    // END: SE Constants

    // START: YE Constants

        getYE: myApiURL + '/show_YE',
        ye: myApiURL + '/YE',
        updateYE: myApiURL + '/update_YE',
        yeAttendance: myApiURL + '/yeAttendance',

    // END: YE Constants

    // START: ME Constants

        me: myApiURL + '/ME',
        getME: myApiURL + '/show_ME',
        updateME: myApiURL + '/update_ME',
        meAttendance: myApiURL + '/meAttendance',

    // END: ME Constants
}