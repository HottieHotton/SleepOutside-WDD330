export default class Alert {
    constructor() {
        this.alertsPath = "../public/json/alerts.json";
    }

    getAlerts() {
        return fetch(this.alertsPath)
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
    } 
}