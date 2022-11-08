import '@scss/main.scss'
import { header } from '@/app/header';
import { dropDowns } from '@/app/editDrop';
import { procedurs } from '@/app/procedurs';
window.addEventListener("load", initEdit, false);

const initEdit =(() => {
    let date = new Date();
    header.currentDate(date);
    let getGetting = document.getElementById("getting");
    getGetting.innerHTML = header.timeOfDay();
    procedurs.getUser();
    dropDowns.getCountries();
    dropDowns.clientOrigin();
    dropDowns.getCategories();
    dropDowns.getPortfolio();
    dropDowns.getCampaignType();
    dropDowns.getObjectives();
    dropDowns.getDigitalChannels();
    procedurs.editBACIDcreado(bacId);
})();
let bacId = "";
const btnlogOut = document.getElementById("brnLogOut");
btnlogOut.onclick = () => header.logOut();

function checkLogin() {
    let data = localStorage.getItem('name');
    if(data === null) {
        window.top.location.href = 'index.html';
    }

}

