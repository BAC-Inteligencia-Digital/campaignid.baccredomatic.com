import '@scss/main.scss'
import { header } from '@/app/header';
import { effects } from '@/app/effects';
import { procedurs } from '@/app/procedurs';
import { copyBtns } from '@/app/copyBtn';


window.addEventListener("load", initSearch, false);

const initSearch = (() => {
  let date = new Date();
  header.currentDate(date);
  let getGetting = document.getElementById("getting");
  getGetting.innerHTML = header.timeOfDay();
  procedurs.getUser();
  procedurs.consularBACIDcreado(bacId);
})();

let bacId = "";
let sidebarCollapse = document.querySelector(".sidebarCollapse");
const btnlogOut = document.getElementById("brnLogOut");

window.getCopy = (ele) => copyBtns.copyCodeBtn(ele);
window.getCopyCode = (elem) => copyBtns.copyPrincipalCode(elem);
btnlogOut.onclick = () => header.logOut();
sidebarCollapse.onclick = () => effects.hideSideBar();



