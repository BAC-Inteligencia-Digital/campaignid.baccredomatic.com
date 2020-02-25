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
                    document.getElementById("dllCountries").innerHTML += "<option value='" + countries[i] + "'>" + countries[i] + "</option>";
                }
            }
        }
    };

    clientOrigin() {
        let cnxn = 'https://bac-id-new.azurewebsites.net/consultas_para_dropdownlist/';
        const xhttp = new XMLHttpRequest();
        let clientsOrigin = [];
        xhttp.open('GET', cnxn + 'obtener_origen_clientes.php', true);
        xhttp.send();

        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let data = JSON.parse(this.responseText);
                for (let item of data) {
                    clientsOrigin.push(item.nombre_origen);
                }
                for (let i in clientsOrigin) {
                    document.getElementById("dllClients").innerHTML += "<option value='" + clientsOrigin[i] + "'>" + clientsOrigin[i] + "</option>";
                }
            }
        }
    };

    getCategories() {
        let categories = [];
        let cnxn = 'https://bac-id-new.azurewebsites.net/consultas_para_dropdownlist/';
        const xhttp = new XMLHttpRequest();
        xhttp.open('GET', cnxn + 'obtener_categoria.php', true);
        xhttp.send();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let data = JSON.parse(this.responseText);
                for (let item of data) {
                    categories.push(item.nombre_categoria);
                }
            }
            for (let i in categories) {
                document.getElementById("dllCategory").innerHTML += "<option value='" + categories[i] + "'>" + categories[i] + "</option>";

            }
        }
    };

    getPortfolio() {
        //let portafolios = [];
        let cnxn = 'https://bac-id-new.azurewebsites.net/consultas_para_dropdownlist/';
        const xhttp = new XMLHttpRequest();
        xhttp.open('GET', cnxn + 'obtener_portafolio.php', true);
        xhttp.send();

        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let data = JSON.parse(this.responseText);
                for (let item of data) {
                    let portName = item.nombre_portafolio;
                    let portCode = item.codigo;
                    document.getElementById("dllportfolio").innerHTML += "<option value='" + portCode + "' id='" + portCode + "'>" + portName + "</option>";
                    //portafolios.push(item.nombre_portafolio);
                }

            }
            //for (let i in portafolios) {
                //document.getElementById("dllportfolio").innerHTML += "<option value='" + portafolios[i] + "'>" + portafolios[i] + "</option>";

            //}

        }

    };

    getCampaignType() {
        document.getElementById("dllgetCampaignType").innerHTML = "<option>Seleccine tipo</option>";
        let types = [];
        const xhttp = new XMLHttpRequest();
        let cnxn = 'https://bac-id-new.azurewebsites.net/consultas_para_dropdownlist/';
        xhttp.open('GET', cnxn + 'obtener_tipo_campana.php', true);
        xhttp.send();

        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let data = JSON.parse(this.responseText);
                for (let item of data) {
                    types.push(item.nombre);
                }

            }
            for (let i in types) {
                document.getElementById("dllgetCampaignType").innerHTML += "<option value='" + types[i] + "'>" + types[i] + "</option>";

            }

        }
    };

    getObjectives() {
        const xhttp = new XMLHttpRequest();
        let cnxn = 'https://bac-id-new.azurewebsites.net/consultas_para_dropdownlist/';
        xhttp.open('GET', cnxn + 'obtener_objetivos.php', true);
        xhttp.send();

        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let data = JSON.parse(this.responseText);
                for (let item of data) {
                    let objectives = item.nombre_objetivo;
                    document.getElementById("dllObjective").innerHTML += "<option value='" + objectives + "'>" + objectives+ "</option>";
                }

            }

        }
    };

    getDigitalChannels() {
        let channels = [];
        const xhttp = new XMLHttpRequest();
        let cnxn = 'https://bac-id-new.azurewebsites.net/consultas_para_dropdownlist/';
        xhttp.open('GET', cnxn + 'obtener_canal_digital.php', true);
        xhttp.send();

        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let data = JSON.parse(this.responseText);
                for (let item of data) {
                    channels.push(item.nombre);
                }
            }
            for (let i in channels) {
                document.getElementById("dllChannel").innerHTML += "<option value='" + channels[i] + "'>" + channels[i] + "</option>";

            }
        }
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
        };*/

    getMultiProducts() {
        let cnxn = 'https://bac-id-new.azurewebsites.net/consultas_para_dropdownlist/';

        const xhttp = new XMLHttpRequest();
        xhttp.open('GET', cnxn + 'obtener_multiproducto.php', true);
        xhttp.send();

        xhttp.onreadystatechange = function () {

            if (this.readyState == 4 && this.status == 200) {

                let datos = JSON.parse(this.responseText);


                for (let item of datos) {
                    let nombre = item.nombre_campana;
                    let valor = item.codigo;
                    document.getElementById("selectMultiProductos").innerHTML += "<option value='" + valor + "'>" + nombre + "</option>";
                    //multiproductos.push(item.nombre_campana);
                }

            }

        }
    }

}
