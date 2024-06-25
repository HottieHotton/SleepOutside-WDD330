export default class Alert {
    constructor() {
        this.alertsPath = "../json/alerts.json";
    }

    async getAlerts() {
        const res = await fetch(this.alertsPath);
        const data = await res.json();
        console.log(data); // testing in console
        window.alert = function () {
            const alertSection = document.createElement("section");
            alertSection.classList.add("alert-list");

            const alert = document.createElement("p");
            alert.classList.add("alert");

            const alertButton = document.createElement("button");
            alertButton.innerHTML = "OK";
            alertButton.setAttribute("style", `
                        font-size:0.8em;
                        background-color: #ffc592;
                        color: ${data[0].color};
                        border-radius: 50px;
                        `);

            alert.setAttribute("style", `
                        padding: 20px;
                        margin: 5px;
                        border-radius: 2px;
                        border-left: solid 8px #f0a868;
                        box-shadow: 0 10px 5px 0 #00000022;

                        background-color: ${data[0].background};

                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        justify-content: center;
                        `);

            alert.innerHTML = `<span style="margin-right:25px; font-size:0.8em; color:${data[0].color}">${data[0].message}</span>`;
            alert.appendChild(alertButton);

            alertButton.addEventListener("click", (e) => {
                alert.remove();
            });

            if (document.querySelector(".alert-list")) {

                document.querySelector(".alert-list").appendChild(alert);
            } else {
                document.querySelector("main").prepend(alertSection);
                alertSection.prepend(alert);
            }

            alertSection.setAttribute("style", `
                        position: fixed;
                        top: 60px;
                        right: 20px;

                        display: flex;
                        flex-direction: column;
                        `);

        };
        data.forEach(alertItem => {
            alert(alertItem.message);
        });
    } 
}