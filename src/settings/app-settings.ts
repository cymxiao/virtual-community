export class AppSettings{
    public static API_SERVICES_URL = "http://localhost:3000";

    public static getCurrentUser(){
        return JSON.parse(localStorage.getItem('user'));
    }
}