import '@scss/main.scss'

let ddlUserMail = document.getElementById("inputEmail");
let dllPassword = document.getElementById("inputPassword");
let btnLogin = document.getElementById("btnLogin");
let getCloseBtn = document.querySelector(".dangerClose");

//const cnxn = 'https://bac-id-new.azurewebsites.net'; // CONEXION A BD DE PRODUCCION
const cnxn = 'https://bac-id-new-test.azurewebsites.net'; // CONEXION A BD DE TEST

btnLogin.onclick = () => {
    localStorage.clear();
    let id;
    let usuario = ddlUserMail.value; //aquí se captura el usuario de red o el correo 
    let contrasena = dllPassword.value; //aquí se captura la contraseña ingresada
    let userName;
    let userLastName;
    let country;
    let userState;
    let message = "";

    if (!usuario || !contrasena) {
        message += "Favor completar el campo de: ";
        if (!usuario) {
            message += "usuario ";
        }
        if (!contrasena) {
            message += "contraseña";
        }
        alettMessage(message);
    } else {

        const xhttp = new XMLHttpRequest();

        xhttp.open('GET', cnxn + '/consulta_login/autenticar_usuario.php?usuario_ingresado=' + usuario + '&contrasena_ingresada=' + contrasena, true);
        xhttp.send();
        xhttp.onreadystatechange = function () {

            if (this.readyState == 4 && this.status == 200) {
                let datos = JSON.parse(this.responseText);
                for (let item of datos) {
                    id = item.id; // si este ID es mayor a cero es por que el usuario está registrado
                    userName = item.nombre_usuario;
                    userLastName = item.apellidos_usuario;
                    country = item.pais;
                    userState = item.estado;
                }

                if (id < 0 || id === undefined) {
                    message = "El usuario o la contraseña es incorrecta, favor intente de nuevo.";
                    alettMessage(message);
                } else {
                    if (userState == 0) {
                        message = "El usuario se encuentra inactivo, favor comunicarse con el administrador";
                        alettMessage(message);
                    } else {
                        let loginItems = localStorage.getItem('name') ? JSON.parse(localStorage.getItem('name')) : [];
                        let userCountry = localStorage.getItem('country') ? JSON.parse(localStorage.getItem('country')) : [];
                        let getFirstName = userLastName.split(" ").shift();
                        userCountry.push(country);
                        loginItems.push(id, userName, getFirstName, country);
                        localStorage.setItem('name', JSON.stringify(loginItems));
                        localStorage.setItem('country', JSON.stringify(userCountry));
                        window.location.href = "home.html";
                    }

                }
            }
        }
    }

}

const alettMessage = (message) => {
    let alertInfo = document.querySelector(".alert-danger");
    document.getElementById("message").innerText = "";
    alertInfo.classList.remove("d-none");
    alertInfo.classList.remove("hide");
    document.getElementById("message").innerText = message;
    alertInfo.classList.add("show");
    setTimeout(function () {
        alertInfo.classList.add("d-none");
        alertInfo.classList.add("hide");
        alertInfo.classList.remove("show");
    }, 4000);
}

getCloseBtn.onclick = () => {
    let alertInfo = document.querySelector(".alert-danger");
    alertInfo.classList.add("d-none");
    alertInfo.classList.add("hide");
    alertInfo.classList.remove("show");
}






















