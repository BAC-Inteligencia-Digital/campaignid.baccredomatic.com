import '@scss/main.scss'

let ddlUserMail = document.getElementById("inputEmail");
let dllPassword = document.getElementById("inputPassword");
let btnLogin = document.getElementById("btnLogin");
let getCloseBtn = document.querySelector(".dangerClose");


btnLogin.onclick = () => {
    localStorage.clear();
    let id;
    let usuario = ddlUserMail.value; //aquí se captura el usuario de red o el correo 
    let contrasena = dllPassword.value; //aquí se captura la contraseña ingresada
    let userName;
    let userLastName;
    let country;

    const xhttp = new XMLHttpRequest();

    xhttp.open('GET', 'https://bac-id-new.azurewebsites.net/consulta_login/autenticar_usuario.php?usuario_ingresado=' + usuario + '&contrasena_ingresada=' + contrasena, true);
    xhttp.send();
    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            let datos = JSON.parse(this.responseText);
            debugger;
            for (let item of datos) {
                id = item.id; // si este ID es mayor a cero es por que el usuario está registrado
                userName = item.nombre_usuario;
                userLastName = item.apellidos_usuario;
                country = item.pais;
            }

            if (id < 0 || id === undefined) {
                let alertInfo = document.querySelector(".alert-danger");
                alertInfo.classList.remove("d-none");
                alertInfo.classList.remove("hide");
                alertInfo.classList.add("show");
                setTimeout(function(){
                    alertInfo.classList.add("d-none");
                    alertInfo.classList.add("hide");
                    alertInfo.classList.remove("show");
                },4000);
            } else {
                let loginItems = localStorage.getItem('name') ? JSON.parse(localStorage.getItem('name')) : [];
                const data = JSON.parse(localStorage.getItem('name'));
                let getFirstName = userLastName.split(" ").shift();
                loginItems.push(id, userName, getFirstName,country);
                localStorage.setItem('name', JSON.stringify(loginItems))
                window.location.href = "home.html";
            }

        }


    }



}

getCloseBtn.onclick = () => {
    let alertInfo = document.querySelector(".alert-danger");
    alertInfo.classList.add("d-none");
    alertInfo.classList.add("hide");
    alertInfo.classList.remove("show");
}






















