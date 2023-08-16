export class dropDown {

    getCountries() {
        
       // let cnxn = 'https://bac-id-new.azurewebsites.net/public/option/pais/';
        let cnxn = 'http://localhost/API_BACKEND_BACID/public/option/pais/'; //cambiarCAMBIAR
        let countries = [];
        const xhr = new XMLHttpRequest();
        xhr.ontimeout = () => {
            console.error('The request for /consultas_para_dropdownlist/obtener_paises.php timed out. Retrying...');
            this.getCountries();
        };

        xhr.onreadystatechange = function () { 
            if ( xhr.readyState == 4){
                if( xhr.status == 200){
                    let datos = JSON.parse(xhr.responseText);
                    
                    for (let item of datos.data) {
                        countries.push(item.nombre);
                    }
                    for (let i in countries) {
                        document.getElementById("dllCountries").innerHTML += "<option id='" + countries[i] + "' value='" + countries[i] + "'>" + countries[i] + "</option>";
                    }
                } 
            }
        };
        xhr.open('GET', cnxn, true);
        xhr.timeout = 2000;
        xhr.send();
       /* let cnxn = 'https://bac-id-new.azurewebsites.net/consultas_para_dropdownlist/';
        const xhttp = new XMLHttpRequest();
        let countries = [];
        xhttp.open('GET', cnxn + 'obtener_paises.php', true);
        xhttp.onreadystatechange = function () {    
            if (this.readyState == 4 && this.status == 200) {
                let datos = JSON.parse(this.responseText);
                console.log(datos);
                for (let item of datos) {
                    countries.push(item.nombre);
                }
                for (let i in countries) {
                    document.getElementById("dllCountries").innerHTML += "<option id='" + countries[i] + "' value='" + countries[i] + "'>" + countries[i] + "</option>";
                }
            }
        }
        xhttp.send();*/
    };

    clientOrigin() {
        //let cnxn = 'https://bac-id-new.azurewebsites.net/public/option/origen/';
        let cnxn = 'http://localhost/API_BACKEND_BACID/public/option/origen/'; //cambiarCAMBIAR
        const xhr = new XMLHttpRequest();
        let clientsOrigin = [];

        xhr.ontimeout = () => {
            console.error('The request for /consultas_para_dropdownlist/obtener_origen_clientes.php timed out. Retrying...');
            this.clientOrigin();
        };

        xhr.onreadystatechange = function () {
            if ( xhr.readyState == 4){
                if( xhr.status == 200){
                    let data = JSON.parse(xhr.responseText);
                    for (let item of data.data) {
                        clientsOrigin.push(item.nombre_origen);
                    }
                    for (let i in clientsOrigin) {
                        document.getElementById("dllClients").innerHTML += "<option value='" + clientsOrigin[i] + "'>" + clientsOrigin[i] + "</option>";
                    }
                } 
            }
        };
        xhr.open('GET', cnxn, true);
        xhr.timeout = 2000;
        xhr.send();
        /*
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
        }*/
    };

    getCategories() {
        let categories = [];
        //let cnxn = 'https://bac-id-new.azurewebsites.net/public/option/categoria/';
        let cnxn = 'http://localhost/API_BACKEND_BACID/public/option/categoria/'; //cambiarCAMBIAR
        const xhr = new XMLHttpRequest();

        xhr.ontimeout = () => {
            console.error('The request for /consultas_para_dropdownlist/obtener_categoria.php timed out. Retrying...');
            this.getCategories();
        };

        xhr.onreadystatechange = function () {
            if ( xhr.readyState == 4){
                if( xhr.status == 200){
                    let data = JSON.parse(xhr.responseText);
                    for (let item of data.data) {
                        categories.push(item.nombre_categoria);
                    }
                    for (let i in categories) {
                        document.getElementById("dllCategory").innerHTML += "<option value='" + categories[i] + "'>" + categories[i] + "</option>";
        
                    }
                } 
            }
        };

        xhr.open('GET', cnxn, true);
        xhr.timeout = 2000;
        xhr.send();
        /*
        let categories = [];
        let cnxn = 'https://bac-id-new.azurewebsites.net/consultas_para_dropdownlist/';
        const xhttp = new XMLHttpRequest();
        xhttp.open('GET', cnxn + 'obtener_categoria.php', true);
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
        xhttp.send();
        */
    };

    getPortfolio() {
        //let cnxn = 'https://bac-id-new.azurewebsites.net/public/option/portafolio/';
        let cnxn = 'http://localhost/API_BACKEND_BACID/public/option/portafolio/'; //cambiarCAMBIAR
        const xhr = new XMLHttpRequest();

        xhr.ontimeout = () => {
            console.error('The request for /consultas_para_dropdownlist/obtener_portafolio.php timed out. Retrying...');
            this.getPortfolio();
        };

        xhr.onreadystatechange = function () {
            if ( xhr.readyState == 4){
                if( xhr.status == 200){
                    let data = JSON.parse(xhr.responseText);
                    for (let item of data.data) {
                        let portName = item.nombre_portafolio;
                        let portCode = item.codigo;
                        document.getElementById("dllportfolio").innerHTML += "<option value='" + portCode + "' id='" + portCode + "'>" + portName + "</option>";
                    }
                } 
            }
        };
        xhr.open('GET', cnxn, true);
        xhr.timeout = 2000;
        xhr.send();
        /*
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
        */
    };

    getCampaignType() {
        document.getElementById("dllgetCampaignType").innerHTML = "<option>Seleccine tipo</option>";
        let types = [];
        const xhr = new XMLHttpRequest();
        //let cnxn = 'https://bac-id-new.azurewebsites.net/public/option/tipocampana/';
        let cnxn = 'http://localhost/API_BACKEND_BACID/public/option/tipocampana/'; //cambiarCAMBIAR

        xhr.ontimeout = () => {
            console.error('The request for /consultas_para_dropdownlist/obtener_tipo_campana.php timed out. Retrying...');
            this.getCampaignType();
        };

        xhr.onreadystatechange = function () {
            if ( xhr.readyState == 4){
                if( xhr.status == 200){
                    let data = JSON.parse(xhr.responseText);
                    for (let item of data.data) {
                        types.push(item.nombre_campaña);
                    }
                    for (let i in types) {
                        document.getElementById("dllgetCampaignType").innerHTML += "<option value='" + types[i] + "'>" + types[i] + "</option>";
        
                    }
                } 
            }
        };

        xhr.open('GET', cnxn, true);
        xhr.timeout = 2000;
        xhr.send();
        /*
        document.getElementById("dllgetCampaignType").innerHTML = "<option>Seleccine tipo</option>";
        let types = [];
        const xhttp = new XMLHttpRequest();
        let cnxn = 'https://bac-id-new.azurewebsites.net/consultas_para_dropdownlist/';
        xhttp.open('GET', cnxn + 'obtener_tipo_campana.php', true);
        

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

        xhttp.send();
        */
    };

    getObjectives() {
        const xhr = new XMLHttpRequest();
        //let cnxn = 'https://bac-id-new.azurewebsites.net/public/option/objetivo/';
        let cnxn = 'http://localhost/API_BACKEND_BACID/public/option/objetivo/'; //cambiarCAMBIAR

        xhr.ontimeout = () => {
            console.error('The request for /consultas_para_dropdownlist/obtener_objetivos.php timed out. Retrying...');
            this.getObjectives();
        };

        xhr.onreadystatechange = function () {
            if ( xhr.readyState == 4){
                if( xhr.status == 200){
                    let data = JSON.parse(xhr.responseText);
                    for (let item of data.data) {
                        let objectives = item.nombre_objetivo;
                        document.getElementById("dllObjective").innerHTML += "<option value='" + objectives + "'>" + objectives+ "</option>";
                    }
                } 
            }
        };
        xhr.open('GET', cnxn, true);
        xhr.timeout = 2000;
        xhr.send();

        /*
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
        */
    };

    getDigitalChannels() {
        let channels = [];
        const xhr = new XMLHttpRequest();
        //let cnxn = 'https://bac-id-new.azurewebsites.net/public/option/canaldigital/';
        let cnxn = 'http://localhost/API_BACKEND_BACID/public/option/canaldigital/'; //cambiarCAMBIAR

        xhr.ontimeout = () => {
            console.error('The request for /consultas_para_dropdownlist/obtener_canal_digital.php timed out. Retrying...');
            this.getDigitalChannels();
        };

        xhr.onreadystatechange = function () {
            if ( xhr.readyState == 4){
                if( xhr.status == 200){
                    let data = JSON.parse(xhr.responseText);
                    for (let item of data.data) {
                        channels.push(item.nombre_canal_digital);
                    }
                    for (let i in channels) {
                        document.getElementById("dllChannel").innerHTML += "<option value='" + channels[i] + "'>" + channels[i] + "</option>";
        
                    }
                }
            }
        };
        xhr.open('GET', cnxn, true);
        xhr.timeout = 2000;
        xhr.send();
        /*
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
        */
    };

    getMultiProducts() {
        //let cnxn = 'https://bac-id-new.azurewebsites.net/public/option/multiproducto/';
        let cnxn = 'http://localhost/API_BACKEND_BACID/public/option/multiproducto/'; //cambiarCAMBIAR
        
        const xhr = new XMLHttpRequest();

        xhr.ontimeout = () => {
            console.error('The request for /consultas_para_dropdownlist/obtener_multiproducto.php timed out. Retrying...');
            this.getDigitalChannels();
        };

        xhr.onreadystatechange = function () {
            if ( xhr.readyState == 4){
                if( xhr.status == 200){
                    let datos = JSON.parse(xhr.responseText);

                    for (let item of datos.data) {
                        let nombre = item.nombre_campana;
                        let valor = item.codigo;
                        document.getElementById("selectMultiProductos").innerHTML += "<option value='" + valor + "'>" + nombre + "</option>";
                    }
                } 
            }
        };
        xhr.open('GET', cnxn, true);
        xhr.timeout = 2000;
        xhr.send();
        /*
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

        }*/
    }
    

}
