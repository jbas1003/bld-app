export const myApiURL = 'http:/127.0.0.1:8000/api';

export const serverRoutes = {
    participants: myApiURL + '/members',
    eventTypes: myApiURL + '/event_types',
    events: myApiURL + '/events',
    getEvents: myApiURL + '/get_events',
    memberStatus: myApiURL + '/member_status',
    memberAccounts: myApiURL + '/member_accounts',
    attendances: myApiURL + '/attendances',
    attendanceList: myApiURL + '/attendance_list',
    showAttendances: myApiURL + '/show_attendances',
    login: myApiURL + '/member_accounts/login',
}