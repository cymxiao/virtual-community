export class AppSettings{
    public static API_SERVICES_URL = "http://localhost:3000";

    public static getCurrentUser(){
        return JSON.parse(localStorage.getItem('user'));
    }

    public static getCurrentCommunity(){
        return JSON.parse(localStorage.getItem('community'));
    }

    public static getCurrentCarport(){
        return JSON.parse(localStorage.getItem('carport'));
    }
}