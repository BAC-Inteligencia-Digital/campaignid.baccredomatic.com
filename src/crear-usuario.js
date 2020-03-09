import '@scss/main.scss'
import { header } from '@/app/header';
import { procedurs } from '@/app/procedurs';
import { dropDowns } from '@/app/editDrop';
window.addEventListener("load", initEdit, false);

const initEdit =(() => {
    let date = new Date();
    header.currentDate(date);
    let getGetting = document.getElementById("getting");
    getGetting.innerHTML = header.timeOfDay();
    procedurs.getUser();
    dropDowns.getCountries();
    procedurs.showUserAdminBtn();
})();

const btnlogOut = document.getElementById("brnLogOut");
const btnAddNewUser = document.getElementById("btnAddNewUser");
const btnEditUser = document.getElementById("btnEditUser");
const editUserForm = document.getElementById("editUserForm");
const btnUserFilter = document.getElementById("btnUserFilter");
const btnSaveUser = document.getElementById("btnSaveUser");
const btnUpdateUser = document.getElementById("btnUpdateUser");
const btnResetFilter = document.getElementById("btnResetFilter");
let closeModal = document.querySelector(".closeModal");
let modal = "";

const getId = () => {
    return document.getElementById("txtUserId").value;
}

const getName = () => {
    return document.getElementById("txtNombre").value;
}

const getFirstName = () => {
    return document.getElementById("txtApellido").value;
}

const netUser = () => {
    return document.getElementById("txtUsuarioRed").value;
}

const email = () => {
    return document.getElementById("txtEmail").value;
}

const password = () => {
    return document.getElementById("txtPassword").value;
}

const countrySelected = () => {
    let dllCountry = document.getElementById("dllCountries");
    return  dllCountry.options[dllCountry.selectedIndex].value;
}

const rolSelected = () => {
    let dllRol = document.getElementById("dllRol");
    let dllRollValue = dllRol.options[dllRol.selectedIndex].value;
    let getDllRollValue = parseInt(dllRollValue);
    return getDllRollValue;
}

const stateSelected = () => {
    let dllState = document.getElementById("dllState");
    let dllStateValue = dllState.options[dllState.selectedIndex].value;
    let getDllStateValue = parseInt(dllStateValue);
    return getDllStateValue;
}

const txtSearchUser = () => {
    return document.getElementById("txtSearchUser").value;
}

const clear = () => {
    document.getElementById("txtSearchUser").value = "";
    document.getElementById("txtUserId").value = "";
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtApellido").value = "";
    document.getElementById("txtUsuarioRed").value = "";
    document.getElementById("txtEmail").value = "";
    document.getElementById("txtPassword").value = "";
    document.getElementById("dllRol").options.selectedIndex = 0;
    document.getElementById("dllCountries").options.selectedIndex = 0;
    document.getElementById("dllState").options.selectedIndex = 0;
}

const popUp = (title, text) => {
    let div = document.createElement('DIV');
    div.id = "testing";
    modal = '<div class="modal showModal" tabindex="-1" role="dialog">' + 
    '<div class="modal-dialog" role="document">' + 
    '<div class="modal-content">' + 
    '<div class="modal-header text-center">' +
    '<h5 class="modal-title">' + title + '</h5>' +
    '<button type="button" onClick="closeModal(this);" class="close" data-dismiss="modal" aria-label="Close">' +
    '<span aria-hidden="true">&times;</span>' + 
    '</button>' +
    '</div>' +
    '<div class="modal-body">' +
    '<p>'+ text +'</p>' +
    '</div>' +
    '<div class="modal-footer">' +
    '<button type="button" onClick="closeModal(this);" class="btn btn-secondary closeModal" data-dismiss="modal">Cerrar</button>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>';
    div.innerHTML += modal
    document.querySelector('body').appendChild(div);
}

btnResetFilter.onclick = (e) => {
    e.preventDefault();
    clear();
}

btnSaveUser.onclick = (e) => {
    e.preventDefault();
    let message = "";
    let modalTitle = "";
    let name = getName();
    let firstName = getFirstName();
    let getNetUser = netUser();
    let getEmail = email();
    let getPassword = password();
    let getCountry = countrySelected();
    let getRolSelected = rolSelected();
    let getStateSelected = stateSelected();
    if(!name || !firstName || !getNetUser|| !getEmail || !getPassword || !getCountry || !getRolSelected || !getStateSelected){
        modalTitle += "¡Atención!";
        message += "Favor complete los siguientes campos antes de guardar el usuario: ";
        if(!name){
            message += "Nombre de usuario, ";
        }
        if(!firstName){
            message += "coloque al menos un Apellido, ";
        }
        if(!getCountry || getCountry.value == "Seleccione país"){
            message += "seleccione el país, ";
        }
        if(!getEmail){
            message += "indique el Correo electrónico, ";
        }
        if(!getPassword){
            message += "ingrese una Contraseña, ";
        }
        if(!getRolSelected){
            message += "seleccione el rol, ";
        }
        if(!getStateSelected){
            message += "seleccione estado.";
        }
        popUp(modalTitle, message);
    }else{
        switch(getCountry){
            case "Guatemala":
            getCountry = "GUA";
            break;
        case "Costa Rica":
            getCountry = "CRI";
            break;
        case "Salvador":
            getCountry = "ESA";
            break;
        case "Honduras":
            getCountry = "HON";
            break;
        case "Panama":
            getCountry = "PAN";
        case "Nicaragua":
            getCountry = "NIC";
            break;
        case "Regional":
            getCountry = "REG";
            break;
        }
        procedurs.insertarUsuario(getNetUser, getPassword, getEmail, getRolSelected, getCountry, name, firstName, getStateSelected);
        modalTitle += "Registro completado";
        message += "El usuario de " + name + " " + firstName + " ha sido creado correctamente. Puede validar los datos del mismo desde el módulo de edición de usuario."
        popUp(modalTitle,message);
        clear();
    }
    
}

btnUserFilter.onclick = (e) => {
    e.preventDefault();
    let userName = txtSearchUser();
    let message = "";
    let modalTitle = "";
    if(!userName){
        modalTitle += "¡Atención!";
        message += "Favor ingrese usuario de red o correo electrónico";
        popUp(modalTitle, message);
    }else{
        procedurs.buscarUsuario(userName);
    }
}

btnUpdateUser.onclick = () => {
    event.preventDefault();
    let message = "";
    let modalTitle = "";
    let idUser = getId();
    let name = getName();
    let firstName = getFirstName();
    let getNetUser = netUser();
    let getEmail = email();
    let getPassword = password();
    let getCountry = countrySelected();
    let getRolSelected = rolSelected();
    let getStateSelected = stateSelected();
    switch(getCountry){
        case "Guatemala":
        getCountry = "GUA";
        break;
    case "Costa Rica":
        getCountry = "CRI";
        break;
    case "Salvador":
        getCountry = "ESA";
        break;
    case "Honduras":
        getCountry = "HON";
        break;
    case "Panama":
        getCountry = "PAN";
    case "Nicaragua":
        getCountry = "NIC";
        break;
    case "Regional":
        getCountry = "REG";
        break;
    }
    procedurs.actualizarUsuario(idUser, getNetUser, getPassword, getEmail, getRolSelected, getCountry, name, firstName, getStateSelected);
    modalTitle += "Usuario actualizado";
    message += "El usuario de: " + name + " " + firstName + " ha sido actualizado correctamente."
    popUp(modalTitle,message);
    clear();
}

window.closeModal = () => {
    event.preventDefault();
    let getModal = document.querySelector(".showModal");
    setTimeout(function(){
        getModal.parentNode.removeChild(getModal);
    },500);
    
}

btnAddNewUser.onclick = () => {
    document.querySelector(".identidicador").classList.add("d-none");
    document.querySelector(".userEdit").classList.add("d-none");
    document.querySelector(".addUser").classList.remove("d-none");
    document.querySelector(".serchUser").classList.add("d-none");
    btnSaveUser.classList.remove("d-none");
    btnAddNewUser.classList.add("active");
    btnEditUser.classList.remove("active");
    btnUpdateUser.classList.add("d-none");
    clear();
}

btnEditUser.onclick = () => {
    document.querySelector(".identidicador").classList.remove("d-none");
    document.querySelector(".addUser").classList.add("d-none");
    document.querySelector(".userEdit").classList.remove("d-none");
    document.querySelector(".serchUser").classList.remove("d-none");
    btnSaveUser.classList.add("d-none");
    btnAddNewUser.classList.remove("active");
    btnEditUser.classList.add("active");
    btnUpdateUser.classList.remove("d-none");
    clear();

}

btnlogOut.onclick = () => header.logOut();