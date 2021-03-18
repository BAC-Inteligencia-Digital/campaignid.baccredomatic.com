import '@scss/main.scss'
import { header } from '@/app/header';
import { procedurs } from '@/app/procedurs';
import { effects } from '@/app/effects';
import datepicker from 'js-datepicker';
import DataTable from 'datatables';

window.addEventListener("load", initConsulta, false);

const initConsulta = (() => {
    let getGetting = document.getElementById("getting");
    let date = new Date();
    header.currentDate(date);
    getGetting.innerHTML = header.timeOfDay();
    procedurs.consultaHistoricoBACID('consultar');
    procedurs.getUser();
    localStorage.removeItem('items');
    getUserCountry();
    procedurs.showUserAdminBtn();
})();

const btnlogOut = document.getElementById("brnLogOut");
const getStartPicker = document.getElementById("startPicker");
const getEndPicker = document.getElementById("endPicker");
const getSearchCampaignName = document.getElementById("searchCampaignName");
const btnIdFilter = document.getElementById("btnIdFilter");
const dllCountry = document.getElementById("dllCountry");
const campaignNameHidden = document.getElementById("campaignNameHidden");
const btnReload = document.getElementById('btnReload');
let sidebarCollapse = document.querySelector(".sidebarCollapse");
let countrySelected = "";
let keySearch = "";

btnlogOut.onclick = () => header.logOut();   
sidebarCollapse.onclick = () => effects.hideSideBar();
window.getConfirmation = (ele) => procedurs.seeCode(ele); 
//window.editConfirmation = (ele) => procedurs.editCode(ele); 

const start = datepicker(getStartPicker, {
    id: 1,
    startDay: 1,
    customDays: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sáb"],
    customMonths: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"],
    startDate: new Date(),
    dateSelected: new Date(),
    showAllDates: false,
    formatter: (input, date, instance) => {
        const value = date.toLocaleDateString()
        input.value = value // => '1/1/2099'
    },
    onSelect: instance => {
        // Show which date was selected.
        //console.log(instance.dateSelected);
        console.log(getStartPicker.value);  
    }
});
const end = datepicker(endPicker, {
    id: 1,
    customDays: ["Lun", "Mar", "Mie", "Jue", "Vie", "Sáb", "Dom"],
    customMonths: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"],
    startDate: new Date(),
    dateSelected: new Date(),
    showAllDates: false,
    minDate: new Date(2016, 5, 1),
    formatter: (input, date, instance) => {
        const value = date.toLocaleDateString()
        input.value = value // => '1/1/2099'
    },
    onSelect: instance => {
        // Show which date was selected.
        //console.log(instance.dateSelected);
        let endDate = document.getElementById("endPicker");
        console.log(endDate.value);
    }
});

start.getRange(); // { start: <JS date object>, end: <JS date object> }
end.getRange(); // Gives you the same as above!

getSearchCampaignName.addEventListener("input", updateValue);
getSearchCampaignName.onkeypress = (e) => {
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

function updateValue(e) {
    keySearch = e.target.value;
    campaignNameHidden.value = keySearch;
}

dllCountry.onchange = () => {
    countrySelected = dllCountry.options[dllCountry.selectedIndex].value;
    console.log(countrySelected);
}

function getUserCountry(){
    debugger;
    const dllCountry = document.getElementById("dllCountry");
    console.log(dllCountry);
    let userInfo = localStorage.getItem('name');
    let userData = JSON.parse(userInfo);
    let countryCode = userData[3];
    console.log(userData[3]);
    for(let i = 0; i < dllCountry.options.length; i++){
        console.log(dllCountry[i].innerText);
        if(dllCountry[i].innerText == "Seleccione País" || countryCode == "REG"){
            dllCountry[i].disabled = false;
        }else if(dllCountry[i].innerText == countryCode){
            dllCountry[i].disabled = false;
        }else{
            dllCountry[i].classList.add("d-none");
        }

    }
}


btnIdFilter.onclick = () => {
    if(!countrySelected){
        alert("Favor seleccionar país");
    }else{
        console.log(countrySelected);
        let nombre_campana = campaignNameHidden.value;
        let nombre_pais = countrySelected;
        let fecha_inicial = getStartPicker.value;
        let fecha_final = getEndPicker.value;
        procedurs.filters(nombre_campana, nombre_pais, fecha_inicial, fecha_final, 'consultar');
    }
};

btnReload.onclick = () => {
    let getGetting = document.getElementById("getting");
    let date = new Date();
    header.currentDate(date);
    getGetting.innerHTML = header.timeOfDay();
    procedurs.consultaHistoricoBACID('consultar');
    procedurs.getUser();
    localStorage.removeItem('items');
}



