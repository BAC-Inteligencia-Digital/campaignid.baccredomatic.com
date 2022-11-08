import '@scss/main.scss'
import { header } from '@/app/header';
import { effects } from '@/app/effects';
import { procedurs } from '@/app/procedurs';
import { copyBtns } from '@/app/copyBtn';


window.addEventListener("load", initSearch, false);

const initSearch = (() => {

  const currentBody = document.getElementById("codeDisplay");

  currentBody.onload = () => { 
    let date = new Date();
    header.currentDate(date);
    let getGetting = document.getElementById("getting");
    getGetting.innerHTML = header.timeOfDay();
    procedurs.getUser();
    procedurs.consularBACIDcreado(bacId);
    procedurs.showUserAdminBtn();
    }
  
})();

let bacId = "";
let sidebarCollapse = document.querySelector(".sidebarCollapse");
const btnlogOut = document.getElementById("brnLogOut");

window.getCopy = (ele) => copyBtns.copyCodeBtn(ele);
window.getCopyCode = (elem) => copyBtns.copyPrincipalCode(elem);
btnlogOut.onclick = () => header.logOut();
sidebarCollapse.onclick = () => effects.hideSideBar();

function checkLogin() {
  let data = localStorage.getItem('name');
  if(data === null) {
      window.top.location.href = 'index.html';
  }

}



