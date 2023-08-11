const dropDowns = (() => {

    const getCountries = () => {
        //let cnxn = 'https://bac-id-new.azurewebsites.net/consultas_para_dropdownlist/';
        let cnxn = 'http://localhost/API_BACKEND_BACID/public/option/pais/'; //cambiarCAMBIAR
        const xhttp = new XMLHttpRequest();
        let countries = [];
        xhttp.open('GET', cnxn, true);
        xhttp.send();

        xhttp.onreadystatechange = function () {    
            if (this.readyState == 4 && this.status == 200) {
                let datos = JSON.parse(this.responseText);
                
                for (let item of datos.data) {
                    countries.push(item.nombre);
                }
                for (let i in countries) {
                    document.getElementById("dllCountries").innerHTML += "<option value='" + countries[i] + "' id='" + countries[i] + "'>" + countries[i] + "</option>";
                }
            }
        }
    }

    const clientOrigin = () => {
        //let cnxn = 'https://bac-id-new.azurewebsites.net/consultas_para_dropdownlist/';
        let cnxn = 'http://localhost/API_BACKEND_BACID/public/option/origen/'; //cambiarCAMBIAR
        const xhttp = new XMLHttpRequest();
        let clientsOrigin = [];
        xhttp.open('GET', cnxn, true);
        xhttp.send();

        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let data = JSON.parse(this.responseText);
                for (let item of data.data) {
                    clientsOrigin.push(item.nombre_origen);
                }
                for (let i in clientsOrigin) {
                    document.getElementById("dllClients").innerHTML += "<option value='" + clientsOrigin[i] + "' id='" + clientsOrigin[i] + "'>" + clientsOrigin[i] + "</option>";
                }
            }
        }
    }

    const getCategories = () =>  {
       // let categories = [];
        //let cnxn = 'https://bac-id-new.azurewebsites.net/consultas_para_dropdownlist/';
        let cnxn = 'http://localhost/API_BACKEND_BACID/public/option/categoria/'; //cambiarCAMBIAR
        const xhttp = new XMLHttpRequest();
        xhttp.open('GET', cnxn, true);
        xhttp.send();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let data = JSON.parse(this.responseText);
                for (let item of data.data) {
                    document.getElementById("dllCategory").innerHTML += "<option value='" + item.nombre_categoria  + "' id='" + item.codigo + "'>" + item.nombre_categoria + "</option>";
                    //categories.push(item.nombre_categoria);
                }
            }
        }
    }

    const getPortfolio = () => {
        //let cnxn = 'https://bac-id-new.azurewebsites.net/consultas_para_dropdownlist/';
        let cnxn = 'http://localhost/API_BACKEND_BACID/public/option/portafolio/'; //cambiarCAMBIAR
        const xhttp = new XMLHttpRequest();
        xhttp.open('GET', cnxn, true);
        xhttp.send();

        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let data = JSON.parse(this.responseText);
                for (let item of data.data) {
                    let portName = item.nombre_portafolio;
                    let portCode = item.codigo;
                    document.getElementById("dllportfolio").innerHTML += "<option value='" + portCode + "' id='" + portCode + "'>" + portName + "</option>";
                }

            }

        }
    }

    const getCampaignType = () => {
        document.getElementById("dllgetCampaignType").innerHTML = "<option>Seleccine tipo</option>";
        let types = [];
        const xhttp = new XMLHttpRequest();
        //let cnxn = 'https://bac-id-new.azurewebsites.net/consultas_para_dropdownlist/';
        let cnxn = 'http://localhost/API_BACKEND_BACID/public/option/tipocampana/'; //cambiarCAMBIAR
        xhttp.open('GET', cnxn, true);
        xhttp.send();

        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let data = JSON.parse(this.responseText);
                for (let item of data.data) {
                    let name = item.nombre_campana;
                    let code = item.codigo;
                    //types.push(item.nombre);
                    document.getElementById("dllgetCampaignType").innerHTML += "<option value='" + name + "' id='" + code +"'>" + name + "</option>";
                }

            }

        }
    }

    const getObjectives = () => {
        const xhttp = new XMLHttpRequest();
        //let cnxn = 'https://bac-id-new.azurewebsites.net/consultas_para_dropdownlist/';
        let cnxn = 'http://localhost/API_BACKEND_BACID/public/option/objetivo/'; //cambiarCAMBIAR
        xhttp.open('GET', cnxn, true);
        xhttp.send();

        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let data = JSON.parse(this.responseText);
                for (let item of data.data) {
                    let objectives = item.nombre_objetivo;
                    let code = item.codigo;
                    document.getElementById("dllObjective").innerHTML += "<option value='" + objectives + "' id='" + code + "'>" + objectives+ "</option>";
                }

            }

        }
    }

    const getDigitalChannels = () => {
        //let channels = [];
        const xhttp = new XMLHttpRequest();
        //let cnxn = 'https://bac-id-new.azurewebsites.net/consultas_para_dropdownlist/';
        let cnxn = 'http://localhost/API_BACKEND_BACID/public/option/canaldigital/'; //cambiarCAMBIAR
        
        xhttp.open('GET', cnxn, true);
        xhttp.send();

        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let data = JSON.parse(this.responseText);
                for (let item of data.data) {
                    let channel = item.nombre_canal_digital;
                    let code = item.codigo;
                    document.getElementById("dllChannel").innerHTML += "<option value='" + channel + "' id='" + code + "'>" + channel + "</option>";
                }
            }
        }
    }

    const getMultiProducts = () => {
        //let cnxn = 'https://bac-id-new.azurewebsites.net/consultas_para_dropdownlist/';
        let cnxn = 'http://localhost/API_BACKEND_BACID/public/option/multiproducto/'; //cambiarCAMBIAR
        
        const xhttp = new XMLHttpRequest();
        xhttp.open('GET', cnxn, true);
        xhttp.send();

        xhttp.onreadystatechange = function () {

            if (this.readyState == 4 && this.status == 200) {

                let datos = JSON.parse(this.responseText);


                for (let item of datos.data) {
                    let nombre = item.nombre_campana;
                    let valor = item.codigo;
                    document.getElementById("selectMultiProductos").innerHTML += "<option value='" + valor + "'>" + nombre + "</option>";
                    //multiproductos.push(item.nombre_campana);
                }

            }

        }
    }

    return {
        getCountries,
        clientOrigin,
        getCategories,
        getPortfolio,
        getCampaignType,
        getObjectives,
        getDigitalChannels,
        name: "dropDowns"
    }
})();

export { dropDowns }
/*
export class dropDown {



    getCountries() {
        let cnxn = 'https://bac-id-new.azurewebsites.net/consultas_para_dropdownlist/';
        const xhttp = new XMLHttpRequest();
        let countries = [];
        xhttp.open('GET', cnxn + 'obtener_paises.php', true);
        xhttp.send();

        xhttp.onreadystatechange = function () {    
            if (this.readyState == 4 && this.status == 200) {
                let datos = JSON.parse(this.responseText);
                console.log(datos);
                for (let item of datos) {
                    countries.push(item.nombre);
                }
                for (let i in countries) {
                    document.getElementById("dllCountries").innerHTML += "<option value='" + countries[i] + "' id='" + countries[i] + "'>" + countries[i] + "</option>";
                }
            }
        }
    };

    clientOrigin() {
        
    };

    getCategories() {
        
    };

    getPortfolio() {
        

    };

    getCampaignType() {
        
    };

    getObjectives() {
        
    };

    getDigitalChannels() {
       
    };
    /*
        getChannels() {
            const xhttp = new XMLHttpRequest();
            let cnxn = 'https://bac-id-new.azurewebsites.net/consultas_para_dropdownlist/';
            xhttp.open('GET', cnxn + 'obtener_canales.php', true);
            xhttp.send();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    let data = JSON.parse(this.responseText);
                    for (let item of data) {
                        let ids = item.nombre_canal.toLowerCase();
                        ids.split(" ").join("");
                        document.getElementById("channels-wrapper").innerHTML += "<div class='col-12 col-md-3'><div class='custom-control custom-checkbox'>" + 
                        "<input onchange='validarCheckbox(this.value);' disabled type='checkbox'" + "value='" + item.indice + "'" + " class='dllCheck'" + "id='" + ids + "'" + "/>" + 
                        "<label class=''" + "for='" + ids + "'" + ">" + item.nombre_canal + "</label>" + "</div>" + "</div>";
    
                    }
    
                }
            }
        };

    getMultiProducts() {
        
    }

}*/
