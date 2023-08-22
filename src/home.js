import '@scss/main.scss'
import { header } from '@/app/header';
import { dropDown } from '@/app/dropdown';
import { effects } from '@/app/effects';
import { procedurs } from '@/app/procedurs';
import { func } from 'prop-types';
import { resolve } from 'q';

window.addEventListener("load", initController, false);

const initController = (() => {
    //wrappers
    const currentBody = document.getElementById("codIndex");
    /**
     * Método que se ejecuta en el load pero del body del index en específico
     * Funciona como un init pero fake init
     */
    
    currentBody.onload = () => {
        checkLogin()
        let date = new Date();
        header.currentDate(date);
        let getGetting = document.getElementById("getting");
        getGetting.innerHTML = header.timeOfDay();
        drops.getCountries();
        drops.clientOrigin();
        drops.getCategories();
        //drops.getChannels();
        //getChannels();
        drops.getPortfolio();
        drops.getDigitalChannels();
        procedurs.getUser();
        datePicker();
        procedurs.showUserAdminBtn();    
    };

})();
let check_call = document.getElementById("call_center");
let check_email = document.getElementById("email");
let check_pagweb = document.getElementById("pag_web");
let check_atm = document.getElementById("atm");
let check_bel = document.getElementById("bel");
let check_sms = document.getElementById("sms");
let check_canaldig = document.getElementById("canal_dig");
let check_notpush = document.getElementById("not_push");
let check_otro = document.getElementById("otro");
let lista = [check_email, check_call, check_pagweb, check_atm, check_bel, check_sms, check_canaldig, check_notpush, check_otro];
let adsWrapper = document.getElementById("adsWrapper");
var codigo_creado = '';
let subBacId = [];
//buttons
const firstBtnNext = document.getElementById("firstNext");
const backBtnFirst = document.getElementById("backBtnFirst");
const nextBtnThird = document.getElementById("nextBtnThird");
const getClose = document.querySelector(".close");
const btnSubmitCode = document.getElementById("btnSubmitCode");
const btnBackChannel = document.getElementById("btnBackChannel");
const firtsForm = document.getElementById("firstForm");
const btnlogOut = document.getElementById("brnLogOut");
const getchannelsWrap = document.getElementById("channelsWrap");
const firstFormBtnWrapper = document.getElementById("firstFormBtnWrapper");
const secondFormBtnWrapper = document.getElementById("secondFormBtnWrapper");
const lastFormBtnWrapper = document.getElementById("lastFormBtnWrapper");
const bacIdForm = document.getElementById("bacIdForm");
let firstSubmit = document.getElementById("firstSubmit");
let resultWrapper = "";
let getCurrentDay = "";
//Select options
const getdllCountries = document.getElementById("dllCountries");
const getdllClients = document.getElementById("dllClients");
const getdllProducts = document.getElementById("dllProducts");
const getCategoryBtn = document.querySelector('#dllCategory');
const getBtnChannel = document.getElementById("dllChannel");
const getdllportfolio = document.getElementById("dllportfolio");
const dllgetCampaignType = document.getElementById("dllgetCampaignType");
const dllObjective = document.getElementById("dllObjective");
let dllselectMultiProductos = document.getElementById("selectMultiProductos");
let getInputs = document.getElementsByTagName("INPUT");
const getComboGroup = document.querySelector(".dllAdsGroup");
const txtCampaignName = document.getElementById("txtCampaignName");
const addMore = document.querySelector(".addMore");
let getGroupSelected = '';
let dllAd = '';
let publicacionPost = '';
let getPublicacionText = '';
let canalDigitalWrap = document.querySelector(".canalDigital");

let sidebarCollapse = document.querySelector(".sidebarCollapse");
//Text Fields 
const txtAdsGroup = document.getElementById("txtAdsGroup");
let getAdname = "";
const txtCampaignCode = document.getElementById("txtCampaignCode");
//settings
const xhttp = new XMLHttpRequest();
const cnxn = 'https://bac-id-new.azurewebsites.net/'; // CONEXION A BD DE PRODUCCION
//const cnxn = 'http://localhost/API_BACKEND_BACID/'; //CAMBIARcambiar

let drops = new dropDown();
let current;
let countryCode = "";
let clientsCode = "";
let categoryCode = "";
let productsCode = "";
let portfolioCode = "";
let campaignTypeCode = "";
let objectiveCode = "";
let digitalChannelCode = "";
let adCode = "";
/////
let countrySelected = "";
let clientsSelected = "";
let categorySelected = "";
let productsSelected = "";
let channelSelected = "";
let portfolioSelected = "";
let campaignTypeSelected = "";
let objectiveSelectedType = "";
let digitalChannelSelected = "";
let adSelected = "";
let checksCount = 0;
let selected = 0;
let id_registrado;
let multiProduct = "";
let multi = "";
let setFirstName = "";
let setIndice = "";

//txtCampaignCode.value = countrySelected + clientsSelected + categorySelected + productsSelected + codigo_creado + portfolioSelected + campaignTypeSelected + objectiveSelectedType + digitalChannelSelected + adSelected;

var checksSelectedFB = [];

btnlogOut.onclick = () => header.logOut();
sidebarCollapse.onclick = () => effects.hideSideBar();

function checkLogin() {
    let data = localStorage.getItem('name');
    if(data === null) {
        window.top.location.href = 'index.html';
    }

}

getdllCountries.onchange = () => {
    countrySelected = getdllCountries.options[getdllCountries.selectedIndex].value;
    if (countrySelected !== "Seleccione país") {
        getSelectedCountry(countrySelected);    

    } else {
        getdllClients.disabled = true;
    }
    return countrySelected;

};

getdllClients.onchange = () => {
    current = getdllClients.options[getdllClients.selectedIndex].value;
    if (current !== "Seleccione cliente") {
        getSelectedClients(current);
    } else {
        getCategoryBtn.disabled = true;
    }
};

dllselectMultiProductos.onchange = () => {
    multiProduct = dllselectMultiProductos.options[dllselectMultiProductos.selectedIndex].value;
    getdllportfolio.disabled = false;
};


/**
 * Trigger que se ejecuta al cambiar el select de Categoria
 */
getCategoryBtn.onchange = () => {
//    debugger;
    current = getCategoryBtn.options[getCategoryBtn.selectedIndex].value;
    if (current !== "Seleccione categoría") {
        getSelectedCategory(current);
        loadProductsByCategory();
    } else {
        getdllProducts.disabled = true;
    }
    
};

getdllProducts.onchange = () => {
    current = getdllProducts.options[getdllProducts.selectedIndex].value;
    if (current !== "Seleccione un producto") {
        setTimeout(function () {
            getSelectedProducts(current);
        }, 300);

    } else {
        getdllportfolio.disabled = true;
    }

};
getdllportfolio.onchange = () => {
    current = getdllportfolio.options[getdllportfolio.selectedIndex].innerText;
    console.log(current);
    if (current !== "Seleccione objetivo") {
        getPortfolioSelected(current);
    } else {
        firstBtnNext.disabled = true;
    }

};

dllgetCampaignType.onchange = () => {
    current = dllgetCampaignType.options[dllgetCampaignType.selectedIndex].value;
    if (current !== "Seleccione tipo") {
        getCampaignType(current);
    } else {
        dllObjective.disabled = true;
    }
};

dllObjective.onchange = () => {
    current = dllObjective.options[dllObjective.selectedIndex].value;
    if (current !== "Seleccione objetivo") {
        getObjectiveSelected(current); //se activa los botones dentro del método
        
    } else {
        dllObjective.disabled = true;
        nextBtnThird.disabled = true;
        getBtnChannel.disabled = true;
    }

};
/*
    dllAd.onchange = () => {
        current = dllAd.options[dllAd.selectedIndex].value;
        if (current !== "Seleccione objetivo") {
            txtCampaignName.disabled = false;
            getAdSelected(current);
        } else {
            txtCampaignName.disabled = true;
        }

    };*/

/* Método que se ejecuta al cambiar el select de canal
* currentChannel obtiene el elemento actual seleccionado
* Se valida con el if que lo que selecciono el usuario es diferente a google etc.
* Luego se ejecuta el método de leer anuncios a mediante canal o según el canal se seleccionara
*/
getBtnChannel.onchange = () => {
    current = getBtnChannel.options[getBtnChannel.selectedIndex].value;
    if (current !== "Seleccione tipo") {
        getDigitalChannelSelected(current);
    } else {
        nextBtnThird.disabled = true;
    }
    /*if (current === "google" || current === "prensa digital" || current === "banca en línea" || current === "youtube" || current === "Banca Móvil") {
        //document.getElementById("txtAdsGroup").disabled = false;
        loadAdsByChannel();
        loadsAdsGroupsByChannel();
    } else {
        // document.getElementById("txtAdsGroup").disabled = true;
        loadAdsByChannel();
        loadsAdsGroupsByChannel();
    }
    */
};

getComboGroup.onchange = () => {
    //debugger
    current = getComboGroup.options[getComboGroup.selectedIndex].value;
    getGroupSelected = current.split(" ").join("").toLowerCase();
    getPublicacionText = document.querySelectorAll(".txtTipoCanal");
    publicacionPost = document.querySelectorAll(".adCheck");
    getAdname = document.querySelectorAll(".adName");
    lastFormBtnWrapper.classList.remove("d-none");
    lastFormBtnWrapper.classList.add("d-block");
    if (current !== "null") {
        btnSubmitCode.disabled = false;
        for (let a = 0; a < getPublicacionText.length; a++) {
            if (getPublicacionText[a].value.length !== 0) {
                getPublicacionText[a].value = "";
            }
        }

        for (let a = 0; a < getAdname.length; a++) {
            if (getAdname[a].value.length !== 0) {
                getAdname[a].value = "";
                getAdname[a].disabled = true;
            }
        }

        for (let a = 0; a < publicacionPost.length; a++) {
            publicacionPost[a].checked = false;
            publicacionPost[a].disabled = false;
        }
    } else {
        btnSubmitCode.disabled = true;
        for (let a = 0; a < getPublicacionText.length; a++) {
            if (getPublicacionText[a].value.length !== 0) {
                getPublicacionText[a].value = "";
            }
        }

        for (let a = 0; a < getAdname.length; a++) {
            if (getAdname[a].value.length !== 0) {
                getAdname[a].value = "";
                getAdname[a].disabled = true;
            }
        }

        for (let a = 0; a < publicacionPost.length; a++) {
            publicacionPost[a].checked = false;
            publicacionPost[a].disabled = true;
        }
    }


};
/**
 * Método de click que se ejecuta para desplegar la segunda parte del formulario
 * Se obtiene el contenedor de canales y se elimina la clase display none
 * Se obtiene el contenedor de los botones y se elimina la clase display none
 * Se obtiene el contendor del primer form y se agrega un display none
 * Se obtiene el contenedor de los botones de siguiente del primer form y se agrega display none
 * Se ejecuta el método que obtiene el objeto  tipo de campaña y objetivos
 * Se ejecuta el método prevent default para que el boton no haga el postback
 */
firstBtnNext.onclick = (e) => {
    let onlyOne = false;
    let checkCanales = document.getElementsByClassName("canales");
    if (txtCampaignName.value == 0 || txtCampaignName.value == "") {
        alert("Debe de completar el nombre de la campaña");
        return false;
    }
    for (let i = 0; i < checkCanales.length; i++) {
        if (checkCanales[i].checked) {
            onlyOne = true;
        }

    }
    if (!onlyOne) {
        alert("Debe seleccionar al menos un canal");
        return false;
    }

    if(check_canaldig.checked == true && check_email.checked == true || check_canaldig.checked == true && check_call.checked || check_canaldig.checked == true && check_pagweb.checked == true || check_canaldig.checked == true && check_atm.checked == true || check_canaldig.checked == true && check_bel.checked == true || check_canaldig.checked == true && check_sms.checked == true || check_canaldig.checked == true && check_notpush.checked == true || check_canaldig.checked == true && check_otro.checked == true || check_canaldig.checked == true){
        getchannelsWrap.classList.remove("d-none");
        secondFormBtnWrapper.classList.remove("d-none");
        firstForm.classList.add("d-none");
        firstFormBtnWrapper.classList.remove("d-block");
        firstFormBtnWrapper.classList.add("d-none");
        nextBtnThird.classList.remove("d-none");
        firstSubmit.classList.add("d-none");
        canalDigitalWrap.classList.remove("d-none");
        canalDigitalWrap.classList.add("d-block");
        drops.getCampaignType();
        drops.getObjectives();
        e.preventDefault();
    } else {
        getchannelsWrap.classList.remove("d-none");
        secondFormBtnWrapper.classList.remove("d-none");
        firstForm.classList.add("d-none");
        firstSubmit.classList.remove("d-none");
        firstFormBtnWrapper.classList.remove("d-block");
        firstFormBtnWrapper.classList.add("d-none");
        nextBtnThird.classList.add("d-none");
        canalDigitalWrap.classList.add("d-none");
        drops.getCampaignType();
        drops.getObjectives();
        e.preventDefault();
    }
    
};

backBtnFirst.onclick = (e) => {
    firtsForm.classList.remove("d-none");
    firstFormBtnWrapper.classList.remove("d-none");
    firstFormBtnWrapper.classList.add("d-block");
    getchannelsWrap.classList.add("d-none");
    secondFormBtnWrapper.classList.remove("d-block");
    secondFormBtnWrapper.classList.add("d-none");
    dllObjective.innerHTML = "";
    e.preventDefault();
};

nextBtnThird.onclick = (e) => {
    adsWrapper.classList.remove("d-none");
    firtsForm.classList.add("d-none");
    getchannelsWrap.classList.add("d-none");
    secondFormBtnWrapper.classList.add("d-none");
    secondFormBtnWrapper.classList.remove("d-block")
    lastFormBtnWrapper.classList.add("d-block");
    checksSelectedFB = [];
    loadAdsByChannel();
    loadsAdsGroupsByChannel();
    e.preventDefault();
}

btnBackChannel.onclick = (e) => {
    adsWrapper.classList.add("d-none");
    lastFormBtnWrapper.classList.remove("d-block");
    lastFormBtnWrapper.classList.add("d-none");
    getchannelsWrap.classList.remove("d-none");
    secondFormBtnWrapper.classList.add("d-block");
    e.preventDefault();
}

getClose.onclick = (e) => {
    document.querySelector(".alert-success").classList.remove("show");
    document.querySelector(".alert-success").classList.add("hide");
    e.preventDefault();
}

/**
 * Método que se ejecuta cuando el usuario presiona las letras del teclado en el campo de  grupo de anuncio
 * So obtiene lo que presiono el usuario
 * Pattern es la expresión regular que se ejecuta para no permitir caracteres especiales 
 * Se eliminan los espacioes en el campo
 * se retorna el patron y se imprime en el campo de texto
 */
function textFieldRegistred() {
    txtAdsGroup.onkeypress = (e) => {
        let key = (document.all) ? e.keyCode : e.which;
        if (key == 8) {
            return true;
        }
        let pattern = /^[a-z0-9\s\-]+$/i;
        let final_key = String.fromCharCode(key)();
        let eraseSpaces = final_key.split(" ").join("").toUpperCase();

        return pattern.test(eraseSpaces);

    };
};

/**
 * Método que se ejecuta cuando el usuario presiona las letras del teclado en el campo de  grupo de anuncio
 * So obtiene lo que presiono el usuario
 * Pattern es la expresión regular que se ejecuta para no permitir caracteres especiales 
 * Se eliminan los espacioes en el campo
 * se retorna el patron y se imprime en el campo de texto
 * @param {*} e 
 * es el parametro que utilizamos para poder identificar el event
 * 
 */


/**
 * Funcion que se ejecuta para obtener la fecha actual del usuario
 * date es una nueva instancia de fecha
 * se crea el array meses para pasar los meses a numéricos
 * Se asigna a mes el número correspondiente pasando los datos del arrya creado anteriormente
 * Se obtiene el día médiante el método getDay al igual que el año
 * Validamos que si el día no es de 2 digitos, se le agrega un 0 al inicio
 * Obtenemos el día actual y se imprime el campo de fecha para el header
 */
const datePicker = () => {
    let date = new Date();
    let month = new Array("1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12");
    let monthNumber = month[date.getMonth()];
    let day = (date.getDate());
    let year = date.getFullYear();
    if ((day >= 0) && (day < 10)) {
        day = "0" + day;
    }
    getCurrentDay = day + "/" + monthNumber + "/" + year;
    document.getElementById("datepicker").value = getCurrentDay;
};
/**
 * 
 * @param {*} categorySelected 
 * Es la categoría que se obtiene al seleccionar el campo categoría
 * se crea un array vacío para poder pasar la info que se obtiene del api
 * Se abre la conexión y se obtienen los objetos enviados y se agregan al array
 * Se recorre el array productos y se agregan uno por uno los datos al select
 */
const getProducts = (categorySelected) => {

    if (categorySelected == "Multiproducto") {
        drops.getMultiProducts();
        dllselectMultiProductos.classList.remove("d-none");
        dllselectMultiProductos.classList.add("d-block");
        getdllProducts.classList.add("d-none");
        getdllProducts.disabled = true;
        getdllportfolio.disabled = false;
    } else {
        dllselectMultiProductos.classList.remove("d-block");
        dllselectMultiProductos.classList.add("d-none");
        getdllProducts.classList.remove("d-none");
        getdllProducts.classList.add("d-block");
        
        var valor = new FormData();
        
        valor.append('valor', categorySelected);    
        
        const xhr = new XMLHttpRequest();
        xhr.ontimeout = () => {
            console.error('The request for /consultas_para_dropdownlist/obtener_producto.php timed out. Retrying...');
            getProducts(categorySelected);
        };
        xhr.onreadystatechange = () => {
            if ( xhr.readyState == 4){
                if( xhr.status == 200){
                    let data = JSON.parse(xhr.responseText);
                    for (let item of data.data) {
                        let products = item.nombre_producto;
                        document.getElementById("dllProducts").innerHTML += "<option value='" + products + "'>" + products + "</option>";
                    }
                    getdllProducts.disabled = false;
                } 
            }
        };
        xhr.open('POST', cnxn + 'option/producto/', true);
        xhr.timeout = 2000;
        xhr.send(valor);
    }

};
/**
 * Función que se ejecuta para obtener los productos mediante la categoría previamente seleccionada
 */
const loadProductsByCategory = () => {
    document.getElementById("dllProducts").length = 0;
    getProducts(document.getElementById("dllCategory").value);
};

/**
 * Funcion que se ejecuta para obtener los anuncios que el usuario puede seleccionar
 * Se filtran mediante el paramámetro que vemos a continuación
 * @param {*} channelSelected 
 * Una vez seleccionado el canal, se filtran para solo permitir ciertas opciones 
 * Crea el array vacío para posteriomente agregar los datos obtenidos mediante el api
 * Para cada item del datos se agregan al array ad
 * Se recorre el array as para agregar cada  item al select
 */


const getAd = (channelSelected) => {
    //debugger
    
    let index = "";
    let gedCont = document.getElementsByClassName("dllAd");
    const xhr = new XMLHttpRequest();

    xhr.ontimeout = () => {
        console.error('The request for /consultas_para_dropdownlist/obtener_tipo_anuncio.php. Retrying...');
        getAd(channelSelected);
    };

    xhr.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            //debugger
            let data = JSON.parse(xhr.responseText);
            for (let item of data.data) {

                for (let i = 0; i < gedCont.length; i++) {
                    index = i;
                    let codeAd = item.codigo;
                    let ads = item.nombre_tipo_anuncio;
                    let ids = ads.split(" ").join("");
                    document.getElementsByClassName("dllAd")[index].innerHTML += "<div class='row mt-2'>" + "<div class='col-12 col-md-4'>" + "<label class='w-100' for=''>Seleccione tipo</label>" + "<label><input disabled id='"+codeAd+"' class='custom-checkbox adCheck " + ids + "'" + "type='checkbox'" + "value='" + codeAd + "'" + "name='" + ids + "'>" + ads + "</label>" + "</div>" + "<div class='col-12 col-md-4'>" + "<label class='col-12' for=''>Nombre de Anuncio</label>" + "<input disabled type='text' class='form-control adName' id='addNameId"+codeAd+"' maxlength='5' name='nombre-anuncio' />" + "</div>" + "<div class='col-12 col-md-4'>" + "<label class='col-12' for=''>Código creado</label>" + "<input type='text' class='form-control txtTipoCanal txt" + ids + "'" + "maxlength='5' name='codigo' disabled='true'/>" + "</div>" + "</div>" + "<hr>";
                    //document.getElementsByClassName("dllAd")[index].innerHTML += "<div class='row mt-2'>" + "<div class='col-12 col-md-4'>" + "<label class='w-100' for=''>Seleccione tipo</label>" + "<label><input disabled class='custom-checkbox adCheck " + ids + "'" + "type='checkbox'" + "value='" + codeAd + "'" + "name='" + ids + "'>" + ads + "</label>" + "</div>" + "<div class='col-12 col-md-4'>" + "<label class='col-12' for=''>Nombre de Anuncio</label>" + "<input disabled type='text' class='form-control adName' id='idAdName' maxlength='5' name='nombre-anuncio' />" + "</div>" + "<div class='col-12 col-md-4'>" + "<label class='col-12' for=''>Código creado</label>" + "<input type='text' class='form-control txtTipoCanal txt" + ids + "'" + "maxlength='5' name='codigo' disabled='true'/>" + "</div>" + "</div>" + "<hr>";
                    
                }
            }
        }
    };
    xhr.open('GET', cnxn + 'option/tipoanuncio/'+channelSelected+'/', true);
    xhr.timeout = 2000;
    xhr.send();
    /*
    let index = "";
    let gedCont = document.getElementsByClassName("dllAd");
    xhttp.open('GET', cnxn + '/consultas_para_dropdownlist/obtener_tipo_anuncio.php?canal_digital=' + channelSelected, true);
    xhttp.send();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let data = JSON.parse(this.responseText);
            for (let item of data) {
                for (let i = 0; i < gedCont.length; i++) {
                    index = i;
                    let codeAd = item.codigo;
                    let ads = item.nombre;
                    let ids = ads.split(" ").join("");
                    document.getElementsByClassName("dllAd")[index].innerHTML += "<div class='row mt-2'>" + "<div class='col-12 col-md-4'>" + "<label class='w-100' for=''>Seleccione tipo</label>" + "<label><input disabled class='custom-checkbox adCheck " + ids + "'" + "type='checkbox'" + "value='" + codeAd + "'" + "name='" + ids + "'>" + ads + "</label>" + "</div>" + "<div class='col-12 col-md-4'>" + "<label class='col-12' for=''>Nombre de Anuncio</label>" + "<input disabled type='text' class='form-control adName' id='' maxlength='5' name='nombre-anuncio' />" + "</div>" + "<div class='col-12 col-md-4'>" + "<label class='col-12' for=''>Código creado</label>" + "<input type='text' class='form-control txtTipoCanal txt" + ids + "'" + "maxlength='5' name='codigo' disabled='true'/>" + "</div>" + "</div>" + "<hr>";
                }


            }
        }
     

    }*/
};

function getGroups(channelSelected) {
    //debugger
    var grupos = [];
    const xhr = new XMLHttpRequest();

    xhr.ontimeout = () => {
        console.error('The request for /consultas_para_dropdownlist/obtener_grupos_anuncios.php timed out. Retrying...');
        getGroups(channelSelected);
    };

    xhr.onreadystatechange = function () {

      
        if (this.readyState == 4 && this.status == 200) {
            let datos = JSON.parse(xhr.responseText);
            for (let item of datos.data) {
                //debugger
                let groupCode = item.codigo_grupo;
                let groups = item.nombre_categoria;
                // grupos.push(item.nombre_categoria);
                document.querySelector(".dllAdsGroup").innerHTML += "<option value='" + groupCode + "'>" + groups + "</option>";
            }

        }
    }

    xhr.open('GET', cnxn + 'option/grupoanuncio/'+channelSelected+'/', true);
    xhr.timeout = 2000;
    xhr.send();
    /*
    var grupos = [];
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', cnxn + '/consultas_para_dropdownlist/obtener_grupos_anuncios.php?canal_digital=' + channelSelected, true);
    xhttp.send();
    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            let datos = JSON.parse(this.responseText);
            for (let item of datos) {
                let groupCode = item.codigo_grupo;
                let groups = item.nombre_categoria;
                // grupos.push(item.nombre_categoria);
                document.querySelector(".dllAdsGroup").innerHTML += "<option value='" + groupCode + "'>" + groups + "</option>";
            }

        }

    }*/
}
/**
 * Función que se ejecuta para cargar los anuncios mediante el canal seleccionado
 * 
 */
function este(valor) {
    return getAd(document.getElementById("dllChannel").value)
}

const loadAdsByChannel = () => {
    dllAd = document.getElementsByClassName("dllAd");
    let getSection = document.querySelectorAll(".line-selects");
    let index;
    for (let b = 0; b < dllAd.length; b++) {
        index = dllAd[b];
    }
    if (dllAd.length == 1) {
        dllAd[0].innerHTML = '';
        getAd(document.getElementById("dllChannel").value, index);
    } else {
        clear();
        for (let e = 0; e < dllAd.length; e++) {
            let ts = e;
            let bs = dllAd[e];
            console.log(bs);
            este(bs);
            console.log(bs);

        }
        //getAd(document.getElementById("dllChannel").value);
    }
    //document.querySelector("dllAd").length = 0;

};

const loadsAdsGroupsByChannel = () => {

    document.querySelector(".dllAdsGroup").length = 0;;
    getGroups(document.getElementById("dllChannel").value);
}

const getSelectedCountry = (current) => {
    
    var valor = new FormData();
    valor.append('valor', current);

    const xhr = new XMLHttpRequest();
    xhr.ontimeout = () => {
        console.error('The request for /consultas_generar_bac_id/obtener_pais_seleccionado.php timed out. Retrying...');
        getSelectedCountry(current);
    };
    xhr.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            let data = JSON.parse(xhr.responseText);
            for (let item of data.data) {
                countryCode = item.abreviatura;
            }
            countrySelected = countryCode;
            txtCampaignCode.value = countrySelected + clientsSelected + categorySelected + productsSelected + codigo_creado + portfolioSelected + campaignTypeSelected + objectiveSelectedType + digitalChannelSelected + adSelected
            getdllClients.disabled = false; //activa el siguiente paso
        }

    }
    xhr.open('POST', cnxn + '/select/pais/', true);
    xhr.timeout = 2000;
    xhr.send(valor);
    
    /*
    xhttp.open('GET', cnxn + '/consultas_generar_bac_id/obtener_pais_seleccionado.php?pais_seleccionado=' + current, true);
    xhttp.send();
    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            let data = JSON.parse(this.responseText);
            for (let item of data) {
                countryCode = item.abreviatura;
            }
            countrySelected = countryCode;
            txtCampaignCode.value = countrySelected + clientsSelected + categorySelected + productsSelected + codigo_creado + portfolioSelected + campaignTypeSelected + objectiveSelectedType + digitalChannelSelected + adSelected
        }

    }
*/
};

const getSelectedClients = (current) => {
 
    var valor = new FormData();
    valor.append('valor', current);

    const xhr = new XMLHttpRequest();
    xhr.ontimeout = () => {
        console.error('The request for /consultas_generar_bac_id/obtener_origen_clientes_seleccionado.php timed out. Retrying...');
        getSelectedClients(current);
    };
    
    xhr.onreadystatechange = function () {
        
        if (this.readyState == 4 && this.status == 200) {
            let data = JSON.parse(xhr.responseText);
            for (let item of data.data) {
                clientsCode = item.codigo;
            }
            clientsSelected = clientsCode;
            txtCampaignCode.value = countrySelected + clientsSelected + categorySelected + productsSelected + codigo_creado + portfolioSelected + campaignTypeSelected + objectiveSelectedType + digitalChannelSelected + adSelected
            getCategoryBtn.disabled = false;
        }
    
    
    };

    xhr.open('POST', cnxn + '/select/origen/', true);
    xhr.timeout = 2000;
    xhr.send(valor);
    /*
    xhttp.open('GET', cnxn + '/consultas_generar_bac_id/obtener_origen_clientes_seleccionado.php?origen_seleccionado=' + current, true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let data = JSON.parse(this.responseText);
            for (let item of data) {
                clientsCode = item.codigo;
            }
            clientsSelected = clientsCode;
            txtCampaignCode.value = countrySelected + clientsSelected + categorySelected + productsSelected + codigo_creado + portfolioSelected + campaignTypeSelected + objectiveSelectedType + digitalChannelSelected + adSelected
        }

    }
    */
};

const getSelectedCategory = (current) => {
    var valor = new FormData();
    valor.append('valor', current);

    const xhr = new XMLHttpRequest();
    xhr.ontimeout = () => {
        console.error('The request for /consultas_generar_bac_id/obtener_categoria_seleccionada.php timed out. Retrying...');
        getSelectedCategory(current);
    };

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let data = JSON.parse(xhr.responseText);
            for (let item of data.data) {
                categoryCode = "-" + item.codigo;
            }
            categorySelected = categoryCode;
            if(current !== "Multiproducto"){
                txtCampaignCode.value = countrySelected + clientsSelected + categorySelected + productsSelected + codigo_creado + portfolioSelected + campaignTypeSelected + objectiveSelectedType + digitalChannelSelected + adSelected
            }else{
                txtCampaignCode.value = countrySelected + clientsSelected + categorySelected + multi + codigo_creado + portfolioSelected + campaignTypeSelected + objectiveSelectedType + digitalChannelSelected + adSelected
            }
           
        }

    };
    xhr.open('POST', cnxn + '/select/categoria/', true);
    xhr.timeout = 2000;
    xhr.send(valor);
    
    /*
    xhttp.open('GET', cnxn + '/consultas_generar_bac_id/obtener_categoria_seleccionada.php?categoria_seleccionada=' + current, true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let data = JSON.parse(this.responseText);
            for (let item of data) {
                categoryCode = "-" + item.codigo;
            }
            categorySelected = categoryCode;
            if(current !== "Multiproducto"){
                txtCampaignCode.value = countrySelected + clientsSelected + categorySelected + productsSelected + "-" + codigo_creado + portfolioSelected + campaignTypeSelected + objectiveSelectedType + digitalChannelSelected + adSelected
            }else{
                txtCampaignCode.value = countrySelected + clientsSelected + categorySelected + multi + "-" + codigo_creado + portfolioSelected + campaignTypeSelected + objectiveSelectedType + digitalChannelSelected + adSelected
            }
           
        }

    }
    */

};

const getSelectedProducts = (current) => {
    var valor = new FormData();
    valor.append('valor', current);

    const xhr = new XMLHttpRequest();
    xhr.ontimeout = () => {
        console.error('The request for /consultas_generar_bac_id/obtener_producto_seleccionado.php timed out. Retrying...');
        getSelectedProducts(current);
    };

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let data = JSON.parse(xhr.responseText);
            for (let item of data.data) {
                productsCode = item.codigo;
            }
            productsSelected = "-" + productsCode;
            txtCampaignCode.value = countrySelected + clientsSelected + categorySelected + productsSelected + codigo_creado + portfolioSelected + campaignTypeSelected + objectiveSelectedType + digitalChannelSelected + adSelected
            getdllportfolio.disabled = false;
        }

    };
    xhr.open('POST', cnxn + 'select/producto/', true);
    xhr.timeout = 2000;
    xhr.send(valor);
    /*
    xhttp.open('GET', cnxn + '/consultas_generar_bac_id/obtener_producto_seleccionado.php?producto_seleccionado=' + current, true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let data = JSON.parse(this.responseText);
            for (let item of data) {
                productsCode = item.codigo;
            }
            productsSelected = "-" + productsCode;
            txtCampaignCode.value = countrySelected + clientsSelected + categorySelected + productsSelected + "-" + codigo_creado + portfolioSelected + campaignTypeSelected + objectiveSelectedType + digitalChannelSelected + adSelected
        }

    }
    */
};

const getPortfolioSelected = (current) => {

    var valor = new FormData();
    valor.append('valor', current);

    const xhr = new XMLHttpRequest();
    xhr.ontimeout = () => {
        console.error('The request for /consultas_generar_bac_id/obtener_portafolio_seleccionado.php timed out. Retrying...');
        getPortfolioSelected(current);
    };

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let data = JSON.parse(xhr.responseText);
            for (let item of data.data) {
                portfolioCode = item.codigo;
            }
            portfolioSelected = "-" + portfolioCode;
            txtCampaignCode.value = countrySelected + clientsSelected + categorySelected + productsSelected + codigo_creado + portfolioSelected + campaignTypeSelected + objectiveSelectedType + digitalChannelSelected + adSelected
            firstBtnNext.disabled = false;
        }
    };
    xhr.open('POST', cnxn + 'select/portafolio/', true);
    xhr.timeout=2000;
    xhr.send(valor);
    /*
    xhttp.open('GET', cnxn + '/consultas_generar_bac_id/obtener_portafolio_seleccionado.php?portafolio_seleccionado=' + current, true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let data = JSON.parse(this.responseText);
            for (let item of data) {
                portfolioCode = item.codigo;
            }
            portfolioSelected = "-" + portfolioCode;
            txtCampaignCode.value = countrySelected + clientsSelected + categorySelected + productsSelected + "-" + codigo_creado + portfolioSelected + campaignTypeSelected + objectiveSelectedType + digitalChannelSelected + adSelected
        }

    }
    */
};

const getCampaignType = (current) => {

    var valor = new FormData();
    valor.append('valor', current);

    const xhr = new XMLHttpRequest();
    
    xhr.ontimeout = () => {
        console.error('The request for /consultas_generar_bac_id/obtener_tipo_campana_seleccionado.php timed out. Retrying...');
        getCampaignType(current);
    };

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let data = JSON.parse(xhr.responseText);
            for (let item of data.data) {
                campaignTypeCode = "-" + item.codigo;
            }
            campaignTypeSelected = campaignTypeCode;
            txtCampaignCode.value = countrySelected + clientsSelected + categorySelected + productsSelected + codigo_creado + portfolioSelected + campaignTypeSelected + objectiveSelectedType + digitalChannelSelected + adSelected
            dllObjective.disabled = false;
        }

    };
    xhr.open('POST', cnxn + 'select/tipocampana/', true);
    xhr.timeout = 2000;
    xhr.send(valor);
    /*
    xhttp.open('GET', cnxn + '/consultas_generar_bac_id/obtener_tipo_campana_seleccionado.php?tipo_seleccionado=' + current, true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let data = JSON.parse(this.responseText);
            for (let item of data) {
                campaignTypeCode = "-" + item.codigo;
            }
            campaignTypeSelected = campaignTypeCode;
            txtCampaignCode.value = countrySelected + clientsSelected + categorySelected + productsSelected + "-" + codigo_creado + portfolioSelected + campaignTypeSelected + objectiveSelectedType + digitalChannelSelected + adSelected
        }

    }
    */
};

const getObjectiveSelected = (current) => {
    
    var valor = new FormData();
    valor.append('valor', current);

    const xhr = new XMLHttpRequest();
    xhr.ontimeout = () => {
        console.error('The request for /consultas_generar_bac_id/obtener_objetivo_seleccionado.php timed out. Retrying...');
        getObjectiveSelected(current);
    };

    xhr.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            let data = JSON.parse(this.responseText);
            for (let item of data.data) {
                objectiveCode = "-" + item.codigo;
            }
            objectiveSelectedType = objectiveCode;
            txtCampaignCode.value = countrySelected + clientsSelected + categorySelected + productsSelected + codigo_creado + portfolioSelected + campaignTypeSelected + objectiveSelectedType + digitalChannelSelected + adSelected
            if(check_canaldig.checked == false ){
                nextBtnThird.disabled = false;
            }
            else{
                getBtnChannel.disabled = false;
            }  
        }

    };
    xhr.open('POST', cnxn + 'select/objetivo/', true);
    xhr.timeout = 2000;
    xhr.send(valor);

    /*
    xhttp.open('GET', cnxn + '/consultas_generar_bac_id/obtener_objetivo_seleccionado.php?objetivo_seleccionado=' + current, true);
    xhttp.send();
    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            let data = JSON.parse(this.responseText);
            for (let item of data) {
                objectiveCode = "-" + item.codigo;
            }
            objectiveSelectedType = objectiveCode;
            txtCampaignCode.value = countrySelected + clientsSelected + categorySelected + productsSelected + "-" + codigo_creado + portfolioSelected + campaignTypeSelected + objectiveSelectedType + digitalChannelSelected + adSelected
        }

    }
    */
};

const getDigitalChannelSelected = (current) => {

    var valor = new FormData();
    valor.append('valor', current);

    const xhr = new XMLHttpRequest();

    xhr.ontimeout = () => {
        console.error('The request for /obtener_canal_digital_seleccionado.php. timed out. Retrying...');
        getDigitalChannelSelected(current);
    };
    
    xhr.onreadystatechange = () => {
        
        if ( xhr.readyState == 4){
            if( xhr.status == 200){
                let data = JSON.parse(xhr.responseText);
                for (let item of data.data) {
                    digitalChannelCode = "-" + item.codigo;
                }
                digitalChannelSelected = digitalChannelCode;
                console.log(digitalChannelSelected);
                txtCampaignCode.value = countrySelected + clientsSelected + categorySelected + productsSelected + codigo_creado + portfolioSelected + campaignTypeSelected + objectiveSelectedType + digitalChannelSelected + adSelected
                nextBtnThird.disabled = false;
            } 
        } 
    };
    
    xhr.open('POST', cnxn + 'select/canaldigital/', true);
    xhr.timeout = 2000;
    xhr.send(valor);
    /*
    xhttp.open('GET', cnxn + '/consultas_generar_bac_id/obtener_canal_digital_seleccionado.php?canal_digital_seleccionado=' + current, true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        
        if (this.readyState == 4 && this.status == 200) {
            let data = JSON.parse(this.responseText);
            for (let item of data) {
                digitalChannelCode = "-" + item.codigo;
            }
            digitalChannelSelected = digitalChannelCode;
            console.log(digitalChannelSelected);
            txtCampaignCode.value = countrySelected + clientsSelected + categorySelected + productsSelected + "-" + codigo_creado + portfolioSelected + campaignTypeSelected + objectiveSelectedType + digitalChannelSelected + adSelected
        }

    }
    */
};

const getAdSelected = (current) => {
    
    var valor = new FormData();
    valor.append('valor', current);

    const xhr = new XMLHttpRequest();

    xhr.ontimeout = () => {
        console.error('The request for /consultas_generar_bac_id/obtener_tipo_anuncio_seleccionado.php timed out. Retrying...');
        getAdSelected(current);
    };

    xhr.onreadystatechange = function () {
        
        if (this.readyState == 4 && this.status == 200) {
            let data = JSON.parse(xhr.responseText);
            for (let item of data.data) {
                adCode = item.codigo;
            }
            adSelected = "-" + adCode;
            txtCampaignCode.value = countrySelected + clientsSelected + categorySelected + productsSelected + codigo_creado + portfolioSelected + campaignTypeSelected + objectiveSelectedType + digitalChannelSelected + adSelected;
        }

    };
    xhr.open('POST', cnxn + 'select/tipoanuncio/', true);
    xhr.timeout = 2000;
    xhr.send(valor);
    /*
    xhttp.open('GET', cnxn + '/consultas_generar_bac_id/obtener_tipo_anuncio_seleccionado.php?tipo_anuncio_seleccionado=' + current, true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let data = JSON.parse(this.responseText);
            for (let item of data) {
                adCode = item.codigo;
            }
            adSelected = "-" + adCode;
            txtCampaignCode.value = countrySelected + clientsSelected + categorySelected + productsSelected + "-" + codigo_creado + portfolioSelected + campaignTypeSelected + objectiveSelectedType + digitalChannelSelected + adSelected;
        }

    }
    */
};

function obtenerMultiProductosSeleccionados(productsSelected) {
    
    var codigo_multiproductos = "";
    var multiseleccion = document.getElementById("selectMultiProductos");
    var multiproductos = [];

    for (var i = 0; i < multiseleccion.selectedOptions.length; i++) {
        multiproductos.push(multiseleccion.selectedOptions[i].value);
    }

    var valor = new FormData();
    valor.append('producto1', multiproductos[0]);
    valor.append('producto2', multiproductos[1]);
    valor.append('producto3', multiproductos[2]);

    const xhr = new XMLHttpRequest();
    xhr.ontimeout = () => {
        console.error('The request for /consultas_generar_bac_id/obtener_multiproductos_seleccionados.php timed out. Retrying...');
        obtenerMultiProductosSeleccionados(productsSelected);
    };

    xhr.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {

            var datos = JSON.parse(xhr.responseText);

            for (let item of datos.data) {
                codigo_multiproductos = codigo_multiproductos + item.codigo;
            }

        }
        txtCampaignCode.value = countrySelected + clientsSelected + categorySelected + productsSelected + "-" + portfolioSelected + campaignTypeSelected + objectiveSelectedType + digitalChannelSelected + adSelected;
    };
    xhr.open('POST', cnxn + 'select/multiproducto/', true);
    xhr.timeout = 2000;
    xhr.send(valor);
    /*
    const xhttp = new XMLHttpRequest();

    xhttp.open('GET', cnxn + '/consultas_generar_bac_id/obtener_multiproductos_seleccionados.php?producto1_seleccionado=' + multiproductos[0] +
        "&producto2_seleccionado=" + multiproductos[1] + "&producto3_seleccionado=" + multiproductos[2], true);

    xhttp.send();

    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {

            var datos = JSON.parse(this.responseText);

            for (let item of datos) {
                codigo_multiproductos = codigo_multiproductos + item.codigo;
            }

        }
        txtCampaignCode.value = countrySelected + clientsSelected + categorySelected + productsSelected + "-" + portfolioSelected + campaignTypeSelected + objectiveSelectedType + digitalChannelSelected + adSelected;
    }
    */
}

/*
    var deleteItem = function(index) {
    var divElements = document.getElementsByClassName("line-selects");
      for (var i = 0; i < divElements.length; i++) {
          if (i == index) {
            divElements[i].parentNode.removeChild(divElements[i]);
          reAssignDeleteFunctionality();
          break;
        }
      }
    };
    
    var reAssignDeleteFunctionality = function() {
        var addButtons = document.getElementsByClassName("addMore");
        var deleteButtons = document.getElementsByClassName("delete-select");
      for (var i = 0; i < deleteButtons.length; i++) {
          
        //To remove all the previous click listeners, clone the node
        var newDeleteBtn = deleteButtons[i].cloneNode(true);
            deleteButtons[i].parentNode.replaceChild(newDeleteBtn, deleteButtons[i]);	
        
        //closure to save index
        (function(index){
              deleteButtons[i].addEventListener('click', function() {
                deleteItem(index);
                loadsAdsGroupsByChannel();
              }, false); 
          })(i);    
      }

      for (var i = 0; i < addButtons.length; i++) {
          
        //To remove all the previous click listeners, clone the node
        var newAddBtn = addButtons[i].cloneNode(true);
            addButtons[i].parentNode.replaceChild(newAddBtn, addButtons[i]);	
        
        //closure to save index
        
        (function(index){
                addButtons[i].addEventListener('click', function() {
                  addItem(index);
                  loadsAdsGroupsByChannel();
              }, false); 
          })(i);    
      }
    };
    
    reAssignDeleteFunctionality();

var addItem = function(index) {
 var divElements = document.getElementsByClassName("line-selects");
  for (var i = 0; i < divElements.length; i++) {
        if (i == index) {
        var clone = document.querySelector(".line-selects").cloneNode(true);
        document.getElementById("groupContent").appendChild(clone);
        //divElements[i].parentNode.appendChild(divElements[i]);
        reAssignAddFunctionality();
      break;
    }
  }
};

var reAssignAddFunctionality = function() {
    var addButtons = document.getElementsByClassName("addMore");
    var deleteButtons = document.getElementsByClassName("delete-select");
    for (var i = 0; i < addButtons.length; i++) {
        
      //To remove all the previous click listeners, clone the node
      var newAddBtn = addButtons[i].cloneNode(true);
          addButtons[i].parentNode.replaceChild(newAddBtn, addButtons[i]);	
      
      //closure to save index
      
      (function(index){
              addButtons[i].addEventListener('click', function() {
                addItem(index);
                loadsAdsGroupsByChannel();
            }, false); 
        })(i);    
    }
    
    for (var i = 0; i < deleteButtons.length; i++) {
        
      //To remove all the previous click listeners, clone the node
      var newDeleteBtn = deleteButtons[i].cloneNode(true);
          deleteButtons[i].parentNode.replaceChild(newDeleteBtn, deleteButtons[i]);	
      
      //closure to save index
      (function(index){
            deleteButtons[i].addEventListener('click', function() {
              deleteItem(index);
              loadsAdsGroupsByChannel();
            }, false); 
        })(i);    
    }
  };
  reAssignAddFunctionality();

const getAllChecks = () => {
    let getAllChecks = document.getElementsByClassName('dllCheck');
    for(let i = 0; i < getAllChecks.length; i++){
        getAllChecks[i].disabled = false;
        getAllChecks[i].addEventListener('change', function(e){

        });
    }
};*/

/*
const doIt = () => {
    document.addEventListener('change', function(e){
        let getAllLabels = document.getElementsByClassName('lblCheck');
        let getChecks = document.getElementsByClassName('dllCheck');
        let label;
        let getI;
        if(selected >= 6 && checksCount >= 6){
            for(let item in getChecks){
                if(item.checked != true){
                    item.disabled = true;
                }
            }
        }else{
            getAllChecks.disabled = false;
        }
        for(let i = 0; i < getAllLabels.length; i++){
            getI = getAllLabels[i].tagName;
            if (e.target.checked) {
                label = next(e.target,getI);
                if (label) {
                    checksCount = checksCount + 1;
                }
                if(label.previousSibling.checked == true){
                    selected = selected + 1;
                }else{
                    checksCount = checksCount - 1;
                    selected = selected - 1;
                }
                return;
                /*
                for(let a = 0; a < getChecks.length; a++){
                    let inputGet = getChecks[i];
                    console.log(inputGet);
                    if(inputGet.checked == true){
                        selected = selected + 1;
                        return
                    }else{
                        selected = selected - 1;
                    }
                }
            }  
        }
    });
};

doIt();*/

/*const listener = () => {
    document.addEventListener('change', function(e) {
        let input;
        let getI;
        let getAllLabels = document.getElementsByClassName('adCheck');
        for(let i = 0; i < getAllLabels.length; i++){
            //getI = getAllLabels[i].tagName;
            getI = getAllLabels[i];
            if (e.target.checked) {
                let valor = getI.value;
                console.log(valor);
                //input = next(e.target, getI);

                if (input) {
                    console.log("entro");
                }
            };
            return;
        }

    });
};*/
//listener();
/*const next = (src, tag) => {
    tag = tag.toUpperCase();
    while (src && src.tagName !== tag) {
        src = src.nextSibling;
    }
    return src;    
}*/

txtCampaignName.onkeypress = (e) => {
    let key = (document.all) ? e.keyCode : e.which;
    if (key == 8) {
        return true;
    }
    let pat = /^[a-z0-9\s\-]+$/i;
    let final_key = String.fromCharCode(key).toUpperCase();
    let eraseSpaces = final_key.split(" ").join("");
    return pat.test(eraseSpaces);
};

check_email.onchange = function () {
    let getValor = check_email.value;
    validarCheckbox(getValor);
    determinarCodigoCanales();
    txtCampaignCode.value = countrySelected + clientsSelected + categorySelected + productsSelected + codigo_creado + portfolioSelected;
  
};

check_call.onchange = function () {
    let getValor = check_call.value;
    validarCheckbox(getValor);
    determinarCodigoCanales();
    txtCampaignCode.value = countrySelected + clientsSelected + categorySelected + productsSelected + codigo_creado + portfolioSelected;

};

check_pagweb.onchange = function () {
    let getValor = check_call.value;
    validarCheckbox(getValor);
    determinarCodigoCanales();
    txtCampaignCode.value = countrySelected + clientsSelected + categorySelected + productsSelected + codigo_creado + portfolioSelected;

};

check_atm.onchange = function () {
    let getValor = check_call.value;
    validarCheckbox(getValor);
    determinarCodigoCanales();
    txtCampaignCode.value = countrySelected + clientsSelected + categorySelected + productsSelected + codigo_creado + portfolioSelected;
    nextBtnThird.classList.add("d-none");

};
check_bel.onchange = function () {
    let getValor = check_call.value;
    validarCheckbox(getValor);
    determinarCodigoCanales();
    txtCampaignCode.value = countrySelected + clientsSelected + categorySelected + productsSelected + codigo_creado + portfolioSelected;

};
check_sms.onchange = function () {
    let getValor = check_call.value;
    validarCheckbox(getValor);
    determinarCodigoCanales();
    txtCampaignCode.value = countrySelected + clientsSelected + categorySelected + productsSelected + codigo_creado + portfolioSelected;

};
check_canaldig.onchange = function () {
    let getValor = check_call.value;
    validarCheckbox(getValor);
    determinarCodigoCanales();
    txtCampaignCode.value = countrySelected + clientsSelected + categorySelected + productsSelected + codigo_creado + portfolioSelected;
};
check_notpush.onchange = function () {
    let getValor = check_call.value;
    validarCheckbox(getValor);
    determinarCodigoCanales();
    txtCampaignCode.value = countrySelected + clientsSelected + categorySelected + productsSelected + codigo_creado + portfolioSelected;

};
check_otro.onchange = function () {
    let getValor = check_call.value;
    validarCheckbox(getValor);
    determinarCodigoCanales();
    txtCampaignCode.value = countrySelected + clientsSelected + categorySelected + productsSelected + codigo_creado + portfolioSelected;

};

function validarCheckbox(valor) {

    var contador = 0;
    var validador = 0;

    while (contador != lista.length - 1) {
        if (lista[contador].checked) {
            validador++;
            if (validador == 6) {
                desactivarCheckbox();
            }
            else {
                activarCheckbox();
            }
        }
        contador++;
    }

}

function desactivarCheckbox() {

    var contador = 0;

    while (contador != lista.length) {

        if (!lista[contador].checked) {
            lista[contador].disabled = true;
        }
        contador++;
    }

}
function activarCheckbox() {

    var contador = 0;

    while (contador != lista.length) {

        lista[contador].disabled = false;
        contador++;
    }

}


function determinarCodigoCanales() { // esta función determina el consecutivo Ejemplo:000012
    var newString = txtCampaignCode.value.split("-");
    var getString = newString.length;
    if (getString > 3) {
        var stringText = txtCampaignCode.value.split("-");
        var newStringElem = stringText.slice(0, -1).join("-");
        txtCampaignCode.value = newStringElem;
    }
    var contador = 0;
    codigo_creado = '';
    while (contador != lista.length - 1) {

        if (lista[contador].checked) {

            codigo_creado = codigo_creado + (contador + 1).toString();
        }
        contador++;
    }

    var contador2 = 6 - codigo_creado.length;

    while (contador2 != 0) {
        codigo_creado = '0' + codigo_creado;
        contador2--;
    }
    //txtCampaignCode.value += "-" + codigo_creado;
    codigo_creado = '-' + codigo_creado;
    return codigo_creado;

}

function clear() {
    let getSection = document.querySelectorAll(".line-selects");
    if (getSection.length == 1) {
        dllAd.innerHTML = '';
    } else {
        dllAd = document.getElementsByClassName("dllAd");
        for (let a = 0; a < dllAd.length; a++) {
            dllAd[a].innerHTML = '';
        }
    }

}

onchange = function () {
    //debugger
    var target = event.target ? event.target : event.srcElement;
    getPublicacionText = document.getElementsByClassName("txtTipoCanal");
    publicacionPost = document.getElementsByClassName("adCheck");
    getAdname = document.getElementsByClassName("adName");
    let result = "";
    let getKey = "";
    let partialValue = "";
    let element3 = [];
    let element1 = [];
    let element2 = [];
    for (let i = 0; i < getPublicacionText.length; i++) {
        console.log("txtCanal: "+getPublicacionText[i].value);
        element1.push(getPublicacionText[i]);
    };

    for (let i = 0; i < publicacionPost.length; i++) {
        element2.push(publicacionPost[i]);

    };

    for (let a = 0; a < getAdname.length; a++) {
        element3.push(getAdname[a]);
    };

    if (target.checked == false) {
        var getIndex = target.name;
        var num;
        for (let b = 0; b < element2.length; b++) {
            if (element2[b].name == getIndex) {
                num = b;
            }
        }
        if (element3[num]) {
            element3[num].value = "";
            element3[num].disabled = true;
        }
        if (element1[num]) {
            element1[num].value = "";
        }
         
    };

    if (target.checked == true) {
        let channelSelect = getBtnChannel.options[getBtnChannel.selectedIndex].value;
        //debugger;
        //if(channelSelect === "facebook" || channelSelect === "google") {
            //let getInputNameAdd = this.document.getElementById("addNameId"+target.id)
            console.log("TargetId " + target.id);
            checksSelectedFB.push(target.id)
        //}

        var getIndex = target.name;
        var num;
        for (let b = 0; b < element2.length; b++) {
            if (element2[b].name == getIndex) {
                num = b;
            }
        }
        if(element3[num]){
            element3[num].disabled = false;
            element3[num].value = "00000";
            element3[num].addEventListener("input", updateValue);
            element1[num].disabled = true;
            element1[num].value = getGroupSelected + "-" + target.defaultValue + "-" + element3[num].value + "/" + txtCampaignName.value;
            
                
            function updateValue(e) {
                getKey = e.target.value;
                element1[num].value = getGroupSelected + "-" + target.defaultValue + "-" + getKey + "/" + txtCampaignName.value;
            }
            element3[num].onfocus = () => {
                element3[num].value = "";
            }
            element3[num].onblur = () => {
                if(!element3[num].value){
                    element3[num].value = "00000";
                    element1[num].value = getGroupSelected + "-" + target.defaultValue + "-" + element3[num].value + "/" + txtCampaignName.value;
                }
            }
            element3[num].onkeypress = (e) => {

                let key = (document.all) ? e.keyCode : e.which;
                if (key == 46) {
                    return true;
                }
                if (key == 8) {
                    return true;
                }
                let pat = /^[a-z0-9\s\-]+$/i;
                let final_key = String.fromCharCode(key).toUpperCase();
                let eraseSpaces = final_key.split(" ").join("");
                return pat.test(eraseSpaces);
            };
        }

        

    }
}

addMore.onclick = () => {
    if(validarAdNameLleno()){
        document.querySelector(".alert-success").classList.remove("show");
        document.querySelector(".alert-success").classList.add("hide");
        getPublicacionText = document.querySelectorAll(".txtTipoCanal");
        publicacionPost = document.querySelectorAll(".adCheck");
        getAdname = document.querySelectorAll(".adName");

        for (let a = 0; a < getPublicacionText.length; a++) {
            if (getPublicacionText[a].value.length !== 0) {
                subBacId.push(getPublicacionText[a].value);
                getPublicacionText[a].value = "";
            }
        }

        for (let a = 0; a < getAdname.length; a++) {
            if (getAdname[a].value.length !== 0) {
                getAdname[a].value = "";
                getAdname[a].disabled = true;
            }
        }

        for (let a = 0; a < publicacionPost.length; a++) {
            publicacionPost[a].checked = false;
        }

        getComboGroup.selectedIndex = 0;

        document.querySelector(".alert-success").classList.remove("d-none");
        document.querySelector(".alert-success").classList.add("show");
        document.querySelector(".alert-success").classList.add("d-block");
        effects.scrollIt(
            document.querySelector('.sidebar-header'),
            300,
            'easeOutQuad'
        );

        setTimeout(function () {
            document.querySelector(".alert-success").classList.remove("show");
            document.querySelector(".alert-success").classList.remove("d-block");
            document.querySelector(".alert-success").classList.add("d-none");
        }, 4000);
    }
    

}

btnSubmitCode.onclick = function insertarBACID() {
    validate();
}

firstSubmit.onclick = () => {
    firstValidation();
};

function validate(e) {
    let onlyOne = false;

   // let channelSelected = document.getElementById("dllChannel").value;
   // let add

    getPublicacionText = document.querySelectorAll(".txtTipoCanal");
    publicacionPost = document.querySelectorAll(".adCheck");
    getAdname = document.querySelectorAll(".adName");

   // if(channelSelected === "facebook")

    if (getComboGroup.selectedIndex = 0) {
        alert("Debe de seleccionar un grupo de anuncio");
    }

    for (let i = 0; i < publicacionPost.length; i++) {
        if (publicacionPost[i].checked) {
            onlyOne = true;
        }

    }
    if (!onlyOne) {
        alert("Debe seleccionar al menos un tipo de anuncio y completar el nombre de anuncio");
        return;
    }
    
    
    console.log("valor combo: "+ getGroupSelected)
                
    if(validarAdNameLleno()){
        if (subBacId === undefined || subBacId.length == 0) {
            for (let a = 0; a < getPublicacionText.length; a++) {
                if (getPublicacionText[a].value.length !== 0) {
                    //subBacId.push(getPublicacionText[a].value + "/" + txtCampaignName.value);
                    subBacId.push(getPublicacionText[a].value);
                    getPublicacionText[a].value = "";
                }
            }
        }
        for (let a = 0; a < getPublicacionText.length; a++) {
            if (getPublicacionText[a].value.length !== 0) {
                //subBacId.push(getPublicacionText[a].value + "/" + txtCampaignName.value);
                subBacId.push(getPublicacionText[a].value);
                getPublicacionText[a].value = "";
            }
        }
    //debugger
        
        bacIdForm.remove();
        resultWrapper = document.getElementById("resultWrapper");
        resultWrapper.classList.remove("d-none");
        resultWrapper.classList.add("d-block");
    
        let userInfo = localStorage.getItem('name');
        let userData = JSON.parse(userInfo);
        let getUserIndex = userData.shift();
        let indexUser = parseInt(getUserIndex);
        let setIndice = indexUser;
    
        
    
        var bac_id = txtCampaignCode.value; //aqui te traes el valor del campo de bac_id
        console.log('BacID a insertar: ' + bac_id);
        var id_usuario = setIndice; //aqui nos traemos el id del usuario para asociarlo con los bac id creados
        var nombre_campana = txtCampaignName.value; // aquí va el nombre de la campaña que digita el usuario
        var fecha_creacion = getCurrentDay; //se ingresa la fecha de creación
        var lista_sub_bacids = subBacId;
    
        var valor = new FormData();
        valor.append('nombre_bac_id', bac_id.trim());
        valor.append('id_usuario', id_usuario);
        valor.append('nombre_campana', nombre_campana.toUpperCase());
        valor.append('fecha_creacion', fecha_creacion);
        valor.append('pais', bac_id.substring(0, 3));

        const xhttp = new XMLHttpRequest();
        xhttp.open('POST', cnxn + 'bacid/', true);
        xhttp.send(valor);
    
        xhttp.onreadystatechange = function () {
           
            if (this.readyState == 4 && this.status == 200) {
                consultarBACIDCreado(bac_id, nombre_campana, fecha_creacion); //llamamos esta función para mostrar los datos correspondientes al BAC ID Creado     
            }
            if (this.readyState == 4 && this.status == 400){
                alert("El Código de Campaña ya existe!!");
            }
        }

        setTimeout(function () {
            for (var i = 0; i < lista_sub_bacids.length; i++) {
                insertarSUBBACID(bac_id.trim(), lista_sub_bacids[i]); //se inserta uno por uno los sub_bac_id
            }
        }, 4000);
        
        consultarSUBACIDCreados(lista_sub_bacids);
    }
    

}

function firstValidation(){
    bacIdForm.remove();
    resultWrapper = document.getElementById("resultWrapper");
    resultWrapper.classList.remove("d-none");
    resultWrapper.classList.add("d-block");

    let userInfo = localStorage.getItem('name');
    let userData = JSON.parse(userInfo);
    let getUserIndex = userData.shift();
    let indexUser = parseInt(getUserIndex);
    let setIndice = indexUser;

    var bac_id = txtCampaignCode.value + "-00-000-00-00000"; //aqui te traes el valor del campo de bac_id
    var id_usuario = setIndice; //aqui nos traemos el id del usuario para asociarlo con los bac id creados
    var nombre_campana = txtCampaignName.value; // aquí va el nombre de la campaña que digita el usuario
    var fecha_creacion = getCurrentDay; //se ingresa la fecha de creación

    var valor = new FormData();
    valor.append('nombre_bac_id', bac_id.trim());
    valor.append('id_usuario', id_usuario);
    valor.append('nombre_campana', nombre_campana.toUpperCase());
    valor.append('fecha_creacion', fecha_creacion);
    valor.append('pais', bac_id.substring(0, 3));

    const xhttp = new XMLHttpRequest();
    xhttp.open('POST', cnxn + 'bacid/', true);
    xhttp.send(valor);

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {


        }

    }

    consultarBACIDCreado2(bac_id, nombre_campana, fecha_creacion); //llamamos esta función para mostrar los datos correspondientes al BAC ID Creado
}

function validarAdNameLleno(){
    if(checksSelectedFB.length > 0) {
        for(let checkCounter = 0; checkCounter < checksSelectedFB.length; checkCounter++) {
            console.log("error: "+"addNameId"+checksSelectedFB[checkCounter])
            let getInputNameAdd = document.getElementById("addNameId"+checksSelectedFB[checkCounter])
           //debugger
            if(getInputNameAdd.value === "0000" || getInputNameAdd.value === "00000") {
            
                alert("Se debe agregar el nombre de todos los anuncios")
                return false;
            }
            else{
                return true;
            }
        }
    }
}
function insertarSUBBACID(bac_id_padre, sub_bacid) {

    var valor = new FormData();
    valor.append('nombre_subbacid', sub_bacid);
    valor.append('bacid_padre', bac_id_padre);
   
    const xhttp = new XMLHttpRequest();

    xhttp.open('POST', cnxn + 'bacid/sub/', true);

    xhttp.send(valor);

    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {


        }

    }


}

function cleanStrings() {
    var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç",
        to = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
        mapping = {};

    for (var i = 0, j = from.length; i < j; i++)
        mapping[from.charAt(i)] = to.charAt(i);

    return function (str) {
        var ret = [];
        for (var i = 0, j = str.length; i < j; i++) {
            var c = str.charAt(i);
            if (mapping.hasOwnProperty(str.charAt(i)))
                ret.push(mapping[c]);
            else
                ret.push(c);
        }
        return ret.join('');
    }
}

function consultarBACIDCreado2(bac_id_registrado, nombre_campana, fecha_creacion) {
    id_registrado = bac_id_registrado
    document.getElementById("result_raiz_codigo").innerHTML = bac_id_registrado + "/" + nombre_campana.toUpperCase() + "<div class='col-12 text-center'><button onclick='getCopyCode(this);'  class='btn btn-outline-primary w-100 mt-2 copiar' value='' type='button' id='' name=''/><i class='far fa-copy'></i></button></div>"; //mostrar el codigo raiz en la tabla

    var valor = new FormData();
    valor.append('nombre_bac_id', bac_id_registrado);

    const xhttp = new XMLHttpRequest();

    xhttp.open('POST', cnxn + 'bacid/detail/', true);

    xhttp.send(valor);

    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {

            let datos = JSON.parse(this.responseText);
            
            document.getElementById("result_nombre_campana").innerHTML = nombre_campana;
            document.getElementById("result_creacion").innerHTML = fecha_creacion;
            document.getElementById("result_pais").innerHTML = datos[0].nombre_pais;
            document.getElementById("result_origen").innerHTML = datos[1].nombre_origen;
            document.getElementById("result_categoria").innerHTML = datos[2].nombre_categoria;
            document.getElementById("result_producto").innerHTML = datos[3].nombre_producto;
            obtenerCanalesInsertados(bac_id_registrado.substring(14, 20));//la función siguiente
            document.getElementById("result_portafolio").innerHTML = datos[4].nombre_portafolio;
            document.getElementById("result_tipocampana").innerHTML = datos[5].nombre_campana;
            document.getElementById("result_objetivos").innerHTML = datos[6].nombre_objetivo;

        }

    }

}

function consultarBACIDCreado(bac_id_registrado, nombre_campana, fecha_creacion) {
    id_registrado = bac_id_registrado
    document.getElementById("result_raiz_codigo").innerHTML = bac_id_registrado + "-00-000-00-00000" + "/" + nombre_campana.toUpperCase() + "<div class='col-12 text-center'><button onclick='getCopyCode(this);'  class='btn btn-outline-primary w-100 mt-2 copiar' value='' type='button' id='' name=''/><i class='far fa-copy'></i></button></div>"; //mostrar el codigo raiz en la tabla

    var valor = new FormData();
    valor.append('nombre_bac_id', bac_id_registrado);

    const xhttp = new XMLHttpRequest();

    xhttp.open('POST', cnxn + 'bacid/detail/', true);

    xhttp.send(valor);

    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {

            let datos = JSON.parse(this.responseText);
             
            document.getElementById("result_nombre_campana").innerHTML = nombre_campana;
            document.getElementById("result_creacion").innerHTML = fecha_creacion;
            document.getElementById("result_pais").innerHTML = datos[0].nombre_pais;
            document.getElementById("result_origen").innerHTML = datos[1].nombre_origen;
            document.getElementById("result_categoria").innerHTML = datos[2].nombre_categoria;
            document.getElementById("result_producto").innerHTML = datos[3].nombre_producto;
            obtenerCanalesInsertados(bac_id_registrado.substring(14, 20));//la función siguiente
            document.getElementById("result_portafolio").innerHTML = datos[4].nombre_portafolio;
            document.getElementById("result_tipocampana").innerHTML = datos[5].nombre_campaña;
            document.getElementById("result_objetivos").innerHTML = datos[6].nombre_objetivo;
            document.getElementById("result_canaldigital").innerHTML = datos[7].nombre_canal_digital;

        }

    }

}

function obtenerCanalesInsertados(codigo_canales) { //esta función es para obtener los nombres de los canales según el siguiente valor: Ejemplo:001236

    var listaCanales = [codigo_canales.substring(0, 1) , codigo_canales.substring(1, 2), codigo_canales.substring(2, 3), codigo_canales.substring(3, 4), codigo_canales.substring(4, 5), codigo_canales.substring(5, 6)]
            
            for (var i = 0; i < listaCanales.length; i++) {
                
                if(listaCanales[i] != 0){ 

                    const xhttp = new XMLHttpRequest();

                    xhttp.open('GET', cnxn + 'select/canal/'+listaCanales[i]+'/', true);

                    xhttp.send();

                    xhttp.onreadystatechange = function () {

                        if (this.readyState == 4 && this.status == 200) {

                            let datos = JSON.parse(this.responseText);

                            for (let item of datos.data) {
                                
                                document.getElementById("result_canales").innerHTML = document.getElementById("result_canales").innerHTML +' - '+ item.nombre_canal;
                            }                            
                            
                        }                        
                        
                    }
                    
                }                

            }


}

function consultarSUBACIDCreados(lista_sub_bacids) {
   // debugger;
    
    for (var i = 0; i < lista_sub_bacids.length; i++) {

        var valor = new FormData();
        valor.append('sub_bac_id', lista_sub_bacids[i]);

        const xhttp = new XMLHttpRequest();

        xhttp.open('POST', cnxn + 'bacid/detailsub/', true);

        xhttp.send(valor);

        xhttp.onreadystatechange = function () {

            if (this.readyState == 4 && this.status == 200) {
                //debugger
                let datos = JSON.parse(this.responseText);
                
                var table = document.getElementById("t02");
                {
                    var row = table.insertRow(1);
                    var cell1 = row.insertCell(0);
                    var cell2 = row.insertCell(1);
                    var cell3 = row.insertCell(2);
                    var cell4 = row.insertCell(3);
                    var cell5 = row.insertCell(4);
                    var cell6 = row.insertCell(5);

                    cell1.innerHTML = datos.nombre_categoria;
                    cell2.innerHTML = datos.descripcion;
                    cell3.innerHTML = datos.nombre_tipo_anuncio;
                    cell4.innerHTML = datos.nombre_anuncio;
                    cell5.innerHTML = txtCampaignCode.value + "-" + datos.sub_codigo.toUpperCase();
                    cell6.innerHTML = "<button onclick='getCopy(this);'  class='btn btn-outline-primary copiar' value='' type='button' id='' name=''/><i class='far fa-copy'></i></button>";
                }
            
            }

        }

    }
}

window.getCopy = function (ele) {
   // debugger;
    var row = ele.closest('tr');
    var getBacId = row.cells[4].textContent;
    var getValue = row.cells[5].value = /*"?bacid=" + */getBacId;
    var aux = document.createElement("input");

    aux.setAttribute("value", ele.value = getValue);

    document.body.appendChild(aux);

    aux.select();

    document.execCommand("copy");

    document.body.removeChild(aux);
    event.preventDefault();

    effects.scrollIt(
        document.querySelector('.sidebar-header'),
        300,
        'easeOutQuad'
    );

}

window.getCopyCode = function (elem) {
//    debugger;

    var getEle = elem.closest('label');
    var getBacId = /*"?bacid=" + */getEle.innerText;
    var aux = document.createElement("input");
  
    aux.setAttribute("value", elem.value = getBacId);
  
    document.body.appendChild(aux);
  
    aux.select();
  
    //getValue.select();
    document.execCommand("copy");
  
    document.body.removeChild(aux);
    event.preventDefault();
    document.querySelector(".alert-success").classList.remove("d-none");
    document.querySelector(".alert-success").classList.add("show");
    document.querySelector(".alert-success").classList.add("d-block");
    effects.scrollIt(
      document.querySelector('.sidebar-header'),
      300,
      'easeOutQuad'
    );
  
    setTimeout(function () {
      document.querySelector(".alert-success").classList.remove("show");
      document.querySelector(".alert-success").classList.remove("d-block");
      document.querySelector(".alert-success").classList.add("d-none");
    }, 4000);
  
  
  }

jQuery(document).ready(function () {
    var last_valid_selection = null;
    jQuery('#selectMultiProductos').mouseup(function () {
        var parameters =  "";
        if (jQuery(this).val().length >= 4) {
            jQuery(this).val(last_valid_selection);
        } else {
            last_valid_selection = jQuery(this).val();
        }
        parameters = jQuery('#selectMultiProductos').val();
        productsSelected =  "-" +  parameters.join("");
        obtenerMultiProductosSeleccionados(productsSelected);
        console.log(multi);
    });

    jQuery("#selectMultiProductos").mousedown(function (e) {
        e.preventDefault();

        var select = this;
        var scroll = select.scrollTop;
        e.target.selected = !e.target.selected;

        setTimeout(function () { select.scrollTop = scroll; }, 0);

        jQuery(select).focus();
    }).mousemove(function (e) { e.preventDefault() });

});
//# sourceMappingURL=sockjs.js.map