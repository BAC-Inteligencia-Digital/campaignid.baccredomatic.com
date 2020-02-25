import { func } from "prop-types";


/*export class Header {
    constructor() {
        console.log(`This is header constructor`);
    }

    getFirstHeading() {
        return `Webpack Starter page`;
    }
}*/

const header = (() => {

    const init = () => {
        
    };

    const logOut = () => {
        window.top.location.href = 'index.html';
    }
    
    const currentDate = (date) => {
        const numDiaSem = date.getDay(); 
        let month = new Array("1","2","3","4","5","6","7","8","9","10","11","12");
        let mesLetras = month[date.getMonth()];
        let day = (date.getDate());
        let year = date.getFullYear();
        let hour = date.getHours()
        let min = date.getMinutes();
        let sec = date.getSeconds();

        if ((min >= 0) && (min < 10)) {
            min = "0" + min;
        }   
        if ((sec >= 0) && (sec < 10)) {
            sec = "0" + sec;
        }

        let getCurrentDay = day + "/" + mesLetras + "/" + year + " | " + hour + ":" + min + ":" + sec;
        let getDay = document.getElementById("lastLog");
        getDay.innerHTML = getCurrentDay;
    };

  const timeOfDay = () => {
      const hours = new Date();
      let isDay = hours.getHours();
      let message = "";
      if(isDay > 1 && isDay < 12){
         message = "Buenos días: ";
         return message;
      }else if(isDay >= 12 && isDay < 19){
        message = "Buenas tardes: ";
        return message;
      }else{
        message = "Buenas noches: ";
        return message;
      }
  }

    return{
        init,
        currentDate,
        timeOfDay,
        logOut,
        name: "header"
    }
    
})();

export { header };
