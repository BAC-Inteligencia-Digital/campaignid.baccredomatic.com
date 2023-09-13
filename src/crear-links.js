import '@scss/main.scss';
import { header } from '@/app/header';
import { procedurs } from '@/app/procedurs';

window.addEventListener("load", initLinkCreation, false);

const initLinkCreation = (() => {
    
    const currentBody = document.getElementById("linkCreator");

    currentBody.onload = () => { 
        checkLogin()
        const date = new Date();
        header.currentDate(date);
        procedurs.showUserAdminBtn();
        procedurs.getUser();
        let getGetting = document.getElementById("getting");
        getGetting.innerHTML = header.timeOfDay();
    };
})();
$(document).off('.alert.data-api')

const btnCreateURL = document.getElementById("btnCreateURL");
const btnCopyLink = document.getElementById("copyURL");
const btnCreateNewLink = document.getElementById("createNewLink");
const btnlogOut = document.getElementById("brnLogOut");

btnCreateURL.onclick = function crearURL(event) {
    event.preventDefault();
    var urlValue = document.getElementById('url_name').value;
    var bacidValue = document.getElementById('bac_id').value;
    var errors = document.querySelectorAll(".error-msj");
    var isUrl;

    for (let i = 0; i < errors.length; i++) {
        errors[i].style.display = "none";
    }

    if(urlValue.length !== 0) isUrl = validURL(urlValue);

    if (urlValue !== "" && bacidValue !== "" && urlValue.indexOf("https:") > -1 && !bacidValue.includes("?=") && !bacidValue.includes("?bacid=") && isUrl) {
        var urlName = new URL(urlValue);
        var bacid = "bacid=" + bacidValue;
        var urlParams = new URLSearchParams(urlName);
        var urlListo;
        var paramVariable;

        if (urlName.search) {
            paramVariable = "&";
        } 
        if(!urlName.search) {
            paramVariable = "?";
        }


        urlListo = urlName.origin + urlName.pathname + urlName.search + paramVariable + bacid + urlName.hash;
        document.getElementById('url_listo').setAttribute('value', urlListo);
        document.getElementById('url_listo').value = urlListo;

        document.getElementById("copy_url_row").style.display = "block";
        document.getElementById("copy_btn").style.display = "block";
        document.getElementById("errorHolder").style.display = "none";
    } 
    if (urlValue == "") {
        document.getElementById("errorHolder").style.display = "block";
        document.getElementById("url_error").style.display = "block";

    } else if (urlValue.includes("http:")) {
        document.getElementById("errorHolder").style.display = "block";
        document.getElementById("protocolo_error").style.display = "block";
    }

    if (bacidValue == "") {
        document.getElementById("errorHolder").style.display = "block";
        document.getElementById("bacid_error").style.display = "block";
    }

    if (bacidValue.includes("?=")) {
        document.getElementById("errorHolder").style.display = "block";
        document.getElementById("bacid_valor_error").style.display = "block";
    }
    if (bacidValue.includes("?bacid=")) {
        document.getElementById("errorHolder").style.display = "block";
        document.getElementById("bacid_valor_error2").style.display = "block";
    }
    if(!isUrl && isUrl !==undefined) {
        document.getElementById("errorHolder").style.display = "block";
        document.getElementById("is_url_error").style.display = "block";
    }
}

btnCopyLink.onclick = function copiarURL(event) {
    event.preventDefault();
    var copyText = document.getElementById("url_listo");
    var modalMessage = document.getElementById("modal-msj");
    var copyMessage = document.getElementById("urlCopied");
    var modalHeader = document.getElementById("modal_header");
    var modalTitle = document.getElementById("exampleModalLongTitle");
    if(copyText.value !== "") {
        navigator.clipboard.writeText(copyText.value).then(function() {
            jQuery.noConflict();
            modalTitle.innerHTML = "Excelente";
            modalHeader.classList.add("bg-success");
            modalMessage.innerHTML = "El URL copiado es:";
            copyMessage.innerHTML = copyText.value;
           window.$('#copy-success-modal').modal('show');
           document.getElementById("new_link").style.display = "block";
        }, function(error) {
            alert("Han ocurrido problemas al copiar la url, error: "+error);
        });
    }
    if(copyText.value === "") {
        modalTitle.innerHTML = "Cuidado";
        modalHeader.classList.add("bg-warning");
        modalMessage.innerHTML = "No puedes copiar la URL si no está completa";
        window.$('#copy-success-modal').modal('show');
    }

}

btnCreateNewLink.onclick = function borrarDatos(event) {
    event.preventDefault();
    document.getElementById('url_name').value = "";
    document.getElementById('bac_id').value = "";
    document.getElementById('url_listo').value = "";
    document.getElementById('url_name').setAttribute("value", "");
    document.getElementById('bac_id').setAttribute("value", "");
    document.getElementById('url_listo').setAttribute("value", "");
    document.getElementById("errorHolder").style.display = "none";
    document.getElementById("urlCopied").innerHTML = "";
    var modalHeader = document.getElementById("modal_header");
    modalHeader.classList.remove("bg-success");
    modalHeader.classList.add("bg-warning")
    document.getElementById("copy_url_row").style.display = "none";
    document.getElementById("copy_btn").style.display = "none";
    document.getElementById("new_link").style.display = "none";
}

btnlogOut.onclick = () => header.logOut();

function validURL(string) {
    try {
        let realURL = new URL(string);
        return true
    } catch (_) {
        return false;  
    }
 }

 function checkLogin() {
    let data = localStorage.getItem('name');
    if(data === null) {
        window.top.location.href = 'index.html';
    }

}