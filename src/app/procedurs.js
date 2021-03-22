
var cont = [];

const procedurs = (() => {

    const getUser = () => {
        const getUserNameInput = document.getElementById("userName");
        let userInfo = localStorage.getItem('name');
        let userData = JSON.parse(userInfo);
        let userName = userData[1];
        let getFirstName = userData[2];
        let setFirstName = getFirstName; //aquí se pasa el valor del bac id seleccionado
        getUserNameInput.innerText = userName + " " + setFirstName;
    }

    const consultaHistoricoBACID = (funcionalidad) => {
        let userInfo = localStorage.getItem('name');
        let userData = JSON.parse(userInfo);
        let countryCode = userData[3];
        let table = document.getElementById("t03");
        const xhttp = new XMLHttpRequest();
        xhttp.open('GET', 'https://bac-id-new.azurewebsites.net/consulta_bacid_historicos/consulta_historico_bacids.php?nombre_pais=' + countryCode, true);
        xhttp.send();
        xhttp.onreadystatechange = function () {

            if (this.readyState == 4 && this.status == 200) {
                let datos = JSON.parse(this.responseText);

                for (let item of datos) {

                    {
                        let row = table.insertRow(0);
                        let cell1 = row.insertCell(0);
                        let cell2 = row.insertCell(1);
                        let cell3 = row.insertCell(2);
                        let cell4 = row.insertCell(3);
                        let cell5 = row.insertCell(4);
                        let cell6 = row.insertCell(5);
                        let cell7 = row.insertCell(6);
                        let cell8 = row.insertCell(7);

                        //cell1.innerHTML = "<input type='hidden' value='"+item.id+"'>";
                        //cell1.innerHTML = item.id;
                        cell1.innerHTML = item.nombre_bac_id + "<input type='hidden' value='" + item.id + "'>";
                        cell2.innerHTML = item.nombre_campana;
                        cell3.innerHTML = item.nombre_pais;
                        cell4.innerHTML = item.nombre_origen;
                        cell5.innerHTML = item.nombre_categoria;
                        cell6.innerHTML = item.nombre_producto;
                        //cell7.classList.add('text-center');
                        //cell7.innerHTML = "<button onclick='editConfirmation(this);' class='btn btn-outline-primary' value='ver' type='button' id='" + item.nombre_bac_id + "' name='" + item.nombre_bac_id + "'/><i class='far fa-edit'></i></button>";
                        cell7.classList.add('text-center');
                        
                        if(funcionalidad == 'consultar'){
                            cell7.innerHTML = "<button onclick='getConfirmation(this);' class='btn btn-outline-primary' value='ver' type='button' id='" + item.nombre_bac_id + "' name='" + item.nombre_bac_id + "'/><i class='fas fa-eye'></i></button>";
                        }
                        
                        if(funcionalidad == 'eliminar'){
                            cell7.innerHTML = "<button onclick='deleteConfirmation(this);' class='btn btn-outline-primary' value='ver' type='button' id='" + item.nombre_bac_id + "' name='" + item.nombre_bac_id + "'/><i class='fas fa-trash'></i></button>";
                        }
                        
                    }
                }

            }

        }

    }

    const seeCode = (ele) => {
        let retVal = confirm("Esta seguro que desea visualizar este Código?");
        if (retVal == true) {

            let row = ele.closest('tr');
            let getBacId = row.cells[0].textContent;
            let getInput = row.cells[0].childNodes;
            let getValue = getInput[1].value.toString();

            let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
            const data = JSON.parse(localStorage.getItem('items'))

            itemsArray.push(getBacId, getValue);

            localStorage.setItem('items', JSON.stringify(itemsArray))
            window.top.location.href = 'codigo.html';
            return true;
        } else {
            return false;
        }
    }

    const editCode = (ele) => {
        let retVal = confirm("Esta seguro que desea editar este Código?");
        if (retVal == true) {

            let row = ele.closest('tr');
            let getBacId = row.cells[0].textContent;
            let getInput = row.cells[0].childNodes;
            let getValue = getInput[1].value.toString();

            let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
            const data = JSON.parse(localStorage.getItem('items'))

            itemsArray.push(getBacId, getValue);

            localStorage.setItem('items', JSON.stringify(itemsArray))
            window.top.location.href = 'editar.html';
            return true;
        } else {
            return false;
        }
    }

    const deleteCode = (ele) => {
        let retVal = prompt("Está seguro que desea eliminar este Código? ", "Contraseña...");
        let userData = localStorage.getItem('name');
        let userId = JSON.parse(userData).toString().split(",")[0];

        if (retVal == cont) {

            let row = ele.closest('tr');
            let getInput = row.cells[0].childNodes;
            let getValue = getInput[1].value.toString();

            eliminarBACID(userId,getValue);/// llamamos la función de eliminar bac id
            
            return true;
        } else {
            
            return false;
        }
    }

    const filters = (nombre_campana, nombre_pais, fecha_inicial, fecha_final,funcionalidad) => {
        let table = document.getElementById("t03");
        let nameC = nombre_campana;
        let nameCountry = nombre_pais;
        let startD = fecha_inicial;
        let endD = fecha_final //el formato de la fecha ay que acomodarlo así ejemplo dia/mes/año

        const xhttp = new XMLHttpRequest();
        xhttp.open('GET', 'https://bac-id-new.azurewebsites.net/consulta_bacid_historicos/consulta_bac_id_filtros.php?nombre_campana=' + nameC +
            "&nombre_pais=" + nameCountry + "&fecha_desde=" + startD + "&fecha_hasta=" + endD, true);
        xhttp.send();
        xhttp.onreadystatechange = function () {

            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("t03").innerHTML = "";
                let datos = JSON.parse(this.responseText);

                for (let item of datos) {

                    {
                        var row = table.insertRow(0);
                        var cell1 = row.insertCell(0);
                        var cell2 = row.insertCell(1);
                        var cell3 = row.insertCell(2);
                        var cell4 = row.insertCell(3);
                        var cell5 = row.insertCell(4);
                        var cell6 = row.insertCell(5);
                        var cell7 = row.insertCell(6);

                        //cell1.innerHTML = "<input type='hidden' value='"+item.id+"'>";
                        //cell1.innerHTML = item.id;
                        cell1.innerHTML = item.nombre_bac_id + "<input type='hidden' value='" + item.id + "'>";
                        cell2.innerHTML = item.nombre_campana;
                        cell3.innerHTML = item.nombre_pais;
                        cell4.innerHTML = item.nombre_origen;
                        cell5.innerHTML = item.nombre_categoria;
                        cell6.innerHTML = item.nombre_producto;
                        cell7.classList.add('text-center');
                        
                        if(funcionalidad == 'consultar'){
                            cell7.innerHTML = "<button onclick='getConfirmation(this);' class='btn btn-outline-primary' value='ver' type='button' id='" + item.nombre_bac_id + "' name='" + item.nombre_bac_id + "'/><i class='fas fa-eye'></i></button>";
                        }
                        
                        if(funcionalidad == 'eliminar'){
                            cell7.innerHTML = "<button onclick='deleteConfirmation(this);' class='btn btn-outline-primary' value='ver' type='button' id='" + item.nombre_bac_id + "' name='" + item.nombre_bac_id + "'/><i class='fas fa-trash'></i></button>";
                        }
                    }
                }

            }

        }
    }

    const validatePassUser = () => { 

        let userData = localStorage.getItem('name');
        let userId = JSON.parse(userData).toString().split(",")[0];
        const xhttp = new XMLHttpRequest();
        xhttp.open('GET','https://bac-id-new.azurewebsites.net/consultas_usuario/validar_contrasena.php?id_usuario='+userId, true);
        xhttp.send();
        xhttp.onreadystatechange = function () {

            if (this.readyState == 4 && this.status == 200) {
                
                let datos = JSON.parse(this.responseText);

                for (let item of datos) {
                                        
                    cont.push(item.contrasena);
                    
                }
                
            }
                       
        }

    }

    const consularBACIDcreado = (bacId) => {

        let myData = localStorage.getItem('items');
        let newData = JSON.parse(myData);
        let getCode = newData.shift();
        let index = newData.pop();
        let indexA = parseInt(index);

        var bac_id = getCode; //aquí se pasa el valor del bac id seleccionado
        var indice = indexA;
        console.log(indice);

        const xhttp = new XMLHttpRequest();

        xhttp.open('GET', 'https://bac-id-new.azurewebsites.net/consulta_bacid_historicos/consulta_detalle_bacid.php?id=' + indice, true);

        xhttp.send();

        xhttp.onreadystatechange = function () {

            if (this.readyState == 4 && this.status == 200) {
                let datos = JSON.parse(this.responseText);

                for (let item of datos) {

                    document.getElementById("detalle_raiz_codigo").innerHTML = item.nombre_bac_id + "-00-000-00-00000" + "/" + item.nombre_campana.toUpperCase() + "<div class='col-12 text-center'><button onclick='getCopyCode(this);'  class='btn btn-outline-primary w-100 mt-2 copiar' value='' type='button' id='' name=''/><i class='far fa-copy'></i></button></div>";
                    document.getElementById("detalle_nombre_campana").innerHTML = item.nombre_campana;
                    document.getElementById("detalle_creacion").innerHTML = item.fecha_creacion;
                    document.getElementById("detalle_pais").innerHTML = item.nombre_pais;
                    document.getElementById("detalle_origen").innerHTML = item.nombre_origen;
                    document.getElementById("detalle_categoria").innerHTML = item.nombre_categoria;
                    document.getElementById("detalle_producto").innerHTML = item.nombre_producto;
                    document.getElementById("detalle_portafolio").innerHTML = item.nombre_portafolio;
                    document.getElementById("detalle_tipocampana").innerHTML = item.nombre_tipo;
                    document.getElementById("detalle_objetivos").innerHTML = item.nombre_objetivo;
                    document.getElementById("detalle_canaldigital").innerHTML = item.nombre_canal_digital;
                    bacId = item.nombre_bac_id;

                }
                obtenerCanalesBACID(bac_id.substring(14, 20));//la función siguiente 
                consultaDetalleSUBACID(indice); //llamar esta función para obtener los sub bac ids       
            }

        }

        function obtenerCanalesBACID(codigo_canales) { //esta función es para obtener los nombres de los canales según el siguiente valor: Ejemplo:001236

            var resultado = [];

            const xhttp = new XMLHttpRequest();

            xhttp.open('GET', 'https://bac-id-new.azurewebsites.net/insertar_bac_id/consulta_canales_insertados.php?canal1_seleccionado=' + codigo_canales.substring(0, 1) +
                '&canal2_seleccionado=' + codigo_canales.substring(1, 2) + '&canal3_seleccionado=' + codigo_canales.substring(2, 3) +
                '&canal4_seleccionado=' + codigo_canales.substring(3, 4) + '&canal5_seleccionado=' + codigo_canales.substring(4, 5) +
                '&canal6_seleccionado=' + codigo_canales.substring(5, 6), true);

            xhttp.send();

            xhttp.onreadystatechange = function () {

                if (this.readyState == 4 && this.status == 200) {

                    let datos = JSON.parse(this.responseText);

                    if (!datos[0].nombre_canal1 == "") {
                        resultado.push(datos[0].nombre_canal1);
                    }
                    if (!datos[1].nombre_canal2 == "") {
                        resultado.push(datos[1].nombre_canal2);
                    }
                    if (!datos[2].nombre_canal3 == "") {
                        resultado.push(datos[2].nombre_canal3);
                    }
                    if (!datos[3].nombre_canal4 == "") {
                        resultado.push(datos[3].nombre_canal4);
                    }
                    if (!datos[4].nombre_canal5 == "") {
                        resultado.push(datos[4].nombre_canal5);
                    }
                    if (!datos[5].nombre_canal6 == "") {
                        resultado.push(datos[5].nombre_canal6);
                    }

                }
                document.getElementById("detalle_canales").innerHTML = resultado;
            }


        }

        function consultaDetalleSUBACID(id_padre) {

            var lista_sub_bacids = [];

            const xhttp = new XMLHttpRequest();

            xhttp.open('GET', 'https://bac-id-new.azurewebsites.net/consulta_bacid_historicos/consulta_detalle_subacid.php?id=' + id_padre, true);

            xhttp.send();

            xhttp.onreadystatechange = function () {

                if (this.readyState == 4 && this.status == 200) {

                    let datos = JSON.parse(this.responseText);

                    for (let item of datos) {
                        lista_sub_bacids.push(item.nombre_subbacid);

                    }

                }
                consultarSUBACIDUnicos(lista_sub_bacids);
            }

        }

        function consultarSUBACIDUnicos(lista_sub_bacids) {


            for (var i = 0; i < lista_sub_bacids.length; i++) {

                const xhttp = new XMLHttpRequest();
                xhttp.open('GET', 'https://bac-id-new.azurewebsites.net/insertar_bac_id/consulta_sub_bacids_postinsercion.php?nombre_grupo=' + lista_sub_bacids[i].split("-")[0] + '&codigo_anuncio=' + lista_sub_bacids[i].split("-")[1]
                    + '&nombre_anuncio=' + lista_sub_bacids[i].split("-")[2] + '&sub_codigo=' + lista_sub_bacids[i], true);

                xhttp.send();
                xhttp.onreadystatechange = function () {

                    if (this.readyState == 4 && this.status == 200) {
                        let datos = JSON.parse(this.responseText);

                        for (let item of datos) {

                            var table = document.getElementById("t06");
                            {
                                var row = table.insertRow(1);
                                var cell1 = row.insertCell(0);
                                var cell2 = row.insertCell(1);
                                var cell3 = row.insertCell(2);
                                var cell4 = row.insertCell(3);
                                var cell5 = row.insertCell(4);
                                var cell6 = row.insertCell(5);

                                cell1.innerHTML = item.nombre_categoria;
                                cell2.innerHTML = item.descripcion;
                                cell3.innerHTML = item.nombre_tipo_anuncio;
                                cell4.innerHTML = item.nombre_anuncio;
                                cell5.innerHTML = bacId.toUpperCase() + "-" + item.sub_codigo.toUpperCase();
                                cell6.innerHTML = "<button onclick='getCopy(this);'  class='btn btn-outline-primary copiar' value='' type='button' id='' name=''/><i class='far fa-copy'></i></button>";
                            }
                        }

                    }

                }

            }
        }
    }

    const editBACIDcreado = (bacId) => {
        let getGroup = "";
        let myData = localStorage.getItem('items');
        let newData = JSON.parse(myData);
        let getCode = newData.shift();
        let index = newData.pop();
        let indexA = parseInt(index);
        let channel = "";
        let gettingChannel = "";
        let getDllCategory = "";
        let getCategorySelected = "";
        let getProductSele = "";
        let getPortfolio = "";
        let getDllPortfolio = "";
        let getDllCampaignType = "";
        let getCampaignType = "";
        let getDllObject = "";
        let getObjectiveSelected = "";
        let bac_id = getCode; //aquí se pasa el valor del bac id seleccionado
        let getBacId = getCode.split("-");
        let getBacIdProduct = getBacId[2];
        console.log(getBacIdProduct);
        let indice = indexA;
        console.log(indice);
        setTimeout(function(){
            const xhttp = new XMLHttpRequest();
            xhttp.open('GET', 'https://bac-id-new.azurewebsites.net/consulta_bacid_historicos/consulta_detalle_bacid.php?id=' + indice, true);
            xhttp.send();
            xhttp.onreadystatechange = function () {

                if (this.readyState == 4 && this.status == 200) {
                    let datos = JSON.parse(this.responseText);
                    console.log(datos);
                    for (let item of datos) {
                        let getBaicItems = item.nombre_bac_id.split("-");
                        console.log(getBaicItems);
                        channel = getBaicItems[7];
                        getCategorySelected = getBaicItems[1];
                        getProductSele = getBaicItems[2];
                        getPortfolio = getBaicItems[4];
                        getCampaignType = getBaicItems[5];
                        getObjectiveSelected = getBaicItems[6];
                        
                        gettingChannel = document.getElementById("dllChannel");
                        getDllCategory = document.getElementById("dllCategory");
                        getDllPortfolio = document.getElementById("dllportfolio");
                        getDllCampaignType = document.getElementById("dllgetCampaignType");
                        getDllObject = document.getElementById("dllObjective");
                        document.getElementById("txtCampaignCode").value = item.nombre_bac_id.toUpperCase();
                        document.getElementById("txtCampaignName").value = item.nombre_campana.toUpperCase();
                        document.getElementById("datepicker").value = item.fecha_creacion;
                        switch(item.nombre_pais){
                            case "Guatemala":
                                document.getElementById("Guatemala").selected = "true";
                                break;
                            case "Costa Rica":
                                document.getElementById("Costa Rica").selected = "true";
                                break;
                            case "El Salvador":
                                document.getElementById("Salvador").selected = "true";
                                break;
                            case "Honduras":
                                document.getElementById("Honduras").selected = "true";
                                break;
                            case "Panamá":
                                document.getElementById("Panama").selected = "true";
                            case "Nicaragua":
                                document.getElementById("Nicaragua").selected = "true";
                                break;
                            default:
                                document.getElementById("Seleccion").selected = "true";
                        };
    
                       switch(item.nombre_origen){
                            case "Banco":
                            document.getElementById("Banco").selected = "true";
                            break;
                            case "Tarjeta Crédito":
                            document.getElementById("Tarjeta Crédito").selected = "true";
                            break;
                            case "BAC Credomatic":
                            document.getElementById("BAC Credomatic").selected = "true";
                            break;
                            case "No cliente":
                            document.getElementById("No cliente").selected = "true";
                            break;
                       }

                       for(let i = 0; i < getDllCategory.options.length; i++){
                        if(getDllCategory[i].id == getCategorySelected){
                            document.getElementById(getCategorySelected).selected = "true";
                            console.log(getDllCategory[i].value);
                            setTimeout(function(){
                                getProducts(getDllCategory[i].value);
                            },450);
                          
                           }
                       }

                       doSelectLoop(getDllPortfolio, getPortfolio);
                       doSelectLoop(getDllCampaignType, getCampaignType);
                       doSelectLoop(getDllObject, getObjectiveSelected);

                       
                       for(let i = 0; i < gettingChannel.options.length; i++){
                           if(gettingChannel[i].id == channel){
                            //document.querySelector(".dllAdsGroup").innerHTML = "";
                            document.getElementById(channel).selected = "true";
                           }else{
        
                           }
                       }
    
                        bacId = item.nombre_bac_id;
    
                    }
                    obtenerCanalesBACID(bac_id.substring(14, 20));//la función siguiente 
                    consultaDetalleSUBACID(indice); //llamar esta función para obtener los sub bac ids       
                }
    
            }
            function obtenerCanalesBACID(codigo_canales) { //esta función es para obtener los nombres de los canales según el siguiente valor: Ejemplo:001236

                var resultado = [];
    
                const xhttp = new XMLHttpRequest();
    
                xhttp.open('GET', 'https://bac-id-new.azurewebsites.net/insertar_bac_id/consulta_canales_insertados.php?canal1_seleccionado=' + codigo_canales.substring(0, 1) +
                    '&canal2_seleccionado=' + codigo_canales.substring(1, 2) + '&canal3_seleccionado=' + codigo_canales.substring(2, 3) +
                    '&canal4_seleccionado=' + codigo_canales.substring(3, 4) + '&canal5_seleccionado=' + codigo_canales.substring(4, 5) +
                    '&canal6_seleccionado=' + codigo_canales.substring(5, 6), true);
    
                xhttp.send();
    
                xhttp.onreadystatechange = function () {
    
                    if (this.readyState == 4 && this.status == 200) {
    
                        let datos = JSON.parse(this.responseText);
    
                        if (!datos[0].nombre_canal1 == "") {
                            resultado.push(datos[0].nombre_canal1);
                        }
                        if (!datos[1].nombre_canal2 == "") {
                            resultado.push(datos[1].nombre_canal2);
                        }
                        if (!datos[2].nombre_canal3 == "") {
                            resultado.push(datos[2].nombre_canal3);
                        }
                        if (!datos[3].nombre_canal4 == "") {
                            resultado.push(datos[3].nombre_canal4);
                        }
                        if (!datos[4].nombre_canal5 == "") {
                            resultado.push(datos[4].nombre_canal5);
                        }
                        if (!datos[5].nombre_canal6 == "") {
                            resultado.push(datos[5].nombre_canal6);
                        }
    
                    }
                    for(let i = 0; i < resultado.length; i++){
                        switch(resultado[i]){
                            case "CANALES DIGITALES":
                            document.getElementById("canal_dig").checked = true;
                            document.getElementById('nextBtnThird').classList.add('d-inline');
                            document.getElementById('nextBtnThird').disabled = false;
                            document.getElementById('firstSubmit').classList.add('d-none');
                            document.getElementById("dllChannel").disabled = false;
                            break;
                            case "CALL CENTER":
                            document.getElementById("call_center").checked = true;
                            document.getElementById('nextBtnThird').classList.remove('d-inline');
                            document.getElementById('nextBtnThird').classList.add('d-none');
                            document.getElementById("firstSubmit").classList.remove("d-none");
                            break;
                            case "BEL":
                            document.getElementById("bel").checked = true;
                            document.getElementById('nextBtnThird').classList.remove('d-inline');
                            document.getElementById('nextBtnThird').classList.add('d-none');
                            document.getElementById("firstSubmit").classList.remove("d-none");
                            break;
                            case "EMAIL":
                            document.getElementById("email").checked = true;
                            document.getElementById('nextBtnThird').classList.remove('d-inline');
                            document.getElementById('nextBtnThird').classList.add('d-none');
                            document.getElementById("firstSubmit").classList.remove("d-none");
                            break;
                            case "SMS":
                            document.getElementById("sms").checked = true;
                            document.getElementById('nextBtnThird').classList.remove('d-inline');
                            document.getElementById('nextBtnThird').classList.add('d-none');
                            document.getElementById("firstSubmit").classList.remove("d-none");
                            break;
                            case "PAGINA WEB":
                            document.getElementById("pag_web").checked = true;
                            document.getElementById('nextBtnThird').classList.remove('d-inline');
                            document.getElementById('nextBtnThird').classList.add('d-none');
                            document.getElementById("firstSubmit").classList.remove("d-none");
                            break;
                            case "OTRO":
                            document.getElementById("otro").checked = true;
                            document.getElementById('nextBtnThird').classList.remove('d-inline');
                            document.getElementById('nextBtnThird').classList.add('d-none');
                            document.getElementById("firstSubmit").classList.remove("d-none");
                            break;
                            case "ATM":
                            document.getElementById("atm").checked = true;
                            document.getElementById('nextBtnThird').classList.remove('d-inline');
                            document.getElementById('nextBtnThird').classList.add('d-none');
                            document.getElementById("firstSubmit").classList.remove("d-none");
                            break;
                            case "NOTIFICACIONES PUSH":
                            document.getElementById("not_push").checked = true;
                            document.getElementById('nextBtnThird').classList.remove('d-inline');
                            document.getElementById('nextBtnThird').classList.add('d-none');
                            document.getElementById("firstSubmit").classList.remove("d-none");
                            break;
                        }
                    } 
                    getProduct();
                }
    
    
            }
    
            function consultaDetalleSUBACID(id_padre) {

                var lista_sub_bacids = [];
                let group = "";
                let ids = "";
                let selectOpt = "";
                
                const xhttp = new XMLHttpRequest();
    
                xhttp.open('GET', 'https://bac-id-new.azurewebsites.net/consulta_bacid_historicos/consulta_detalle_subacid.php?id=' + id_padre, true);
    
                xhttp.send();
    
                xhttp.onreadystatechange = function () {
    
                    if (this.readyState == 4 && this.status == 200) {
    
                        let datos = JSON.parse(this.responseText);
    
                        for (let item of datos) {
                            lista_sub_bacids.push(item.nombre_subbacid);
                        
                            //element.push({lista_sub_bacids: item.nombre_subbacid});
                            
                        }
                        for(let i in lista_sub_bacids){
                            let codeName = lista_sub_bacids[i].split("/");
                            console.log(codeName);
                            let tipoAd = codeName.shift().split("-");
                            console.log(tipoAd);
                            let nombreaAd = codeName.pop();
                            console.log(nombreaAd);
                            group = document.createElement('SELECT');
                            group.classList.add("test");
                            group.id = "testing"+i;
                            ids =  group.id;
                            group.id = "testing"+i;
                            getGroup = tipoAd[0].toUpperCase();
                            document.getElementById('adsWrapper').append(group);
                            loadsAdsGroupsByChannel();
                            selectOpt = document.getElementById(ids);
                            console.log(gettingChannel);
                            getAd(gettingChannel.value);
                        }
  
                    }
                    var getEle = document.getElementById(getGroup);
                    if(getEle == getGroup){
                        document.getElementById(getGroup).selected = "true";
                    }
                    //consultarSUBACIDUnicos(lista_sub_bacids);
                }
               
    
            }
    
            function consultarSUBACIDUnicos(lista_sub_bacids) {
    
    
                for (var i = 0; i < lista_sub_bacids.length; i++) {
    
                    const xhttp = new XMLHttpRequest();
                    xhttp.open('GET', 'https://bac-id-new.azurewebsites.net/insertar_bac_id/consulta_sub_bacids_postinsercion.php?nombre_grupo=' + lista_sub_bacids[i].split("-")[0] + '&codigo_anuncio=' + lista_sub_bacids[i].split("-")[1]
                        + '&nombre_anuncio=' + lista_sub_bacids[i].split("-")[2] + '&sub_codigo=' + lista_sub_bacids[i], true);
    
                    xhttp.send();
                    xhttp.onreadystatechange = function () {
    
                        if (this.readyState == 4 && this.status == 200) {
                            let datos = JSON.parse(this.responseText);
    
                            for (let item of datos) {
    
                                var table = document.getElementById("t06");
                                {
                                    var row = table.insertRow(1);
                                    var cell1 = row.insertCell(0);
                                    var cell2 = row.insertCell(1);
                                    var cell3 = row.insertCell(2);
                                    var cell4 = row.insertCell(3);
                                    var cell5 = row.insertCell(4);
                                    var cell6 = row.insertCell(5);
    
                                    cell1.innerHTML = item.nombre_categoria;
                                    cell2.innerHTML = item.descripcion;
                                    cell3.innerHTML = item.nombre_tipo_anuncio;
                                    cell4.innerHTML = item.nombre_anuncio;
                                    cell5.innerHTML = bacId.toUpperCase() + "-" + item.sub_codigo.toUpperCase();
                                    cell6.innerHTML = "<button onclick='getCopy(this);'  class='btn btn-outline-primary copiar' value='' type='button' id='' name=''/><i class='far fa-copy'></i></button>";
                                }
                            }
    
                        }
    
                    }
    
                }
            }
            

            function getProduct(){
                let prod = document.getElementById("dllProducts");
                setTimeout(function(){
                    for(let i = 0; i < prod.options.length; i++){
                        if(prod[i].id == getProductSele){
                            document.getElementById(getProductSele).selected = "true";
                        }
                    }
                },500);
                    
            }

            const loadsAdsGroupsByChannel = () => {
                //document.querySelector(".dllAdsGroup").length = 0;
               getGroups(gettingChannel.value);
            }

            function getGroups(chanelSelected) {

                let iindex = "";
                //let group = document.createElement('DIV');
                //group.classList.add("test");
                let getIt = document.getElementsByClassName('test');
               
                const xhttp = new XMLHttpRequest();
                xhttp.open('GET', 'https://bac-id-new.azurewebsites.net/consultas_para_dropdownlist/obtener_grupos_anuncios.php?canal_digital=' + chanelSelected, true);
                xhttp.send();
                xhttp.onreadystatechange = function () {
            
                    if (this.readyState == 4 && this.status == 200) {
                        let datos = JSON.parse(this.responseText);
                        for (let item of datos) {
                            //let getit = document.getElementsByClassName('test');
                            for(let i = 0; i < getIt.length; i++){
                                iindex = i;
                                let groupCode = item.codigo_grupo;
                                let groups = item.nombre_categoria;
                                // grupos.push(item.nombre_categoria);
                                getIt[i].innerHTML += "<option value='" + groupCode + "' id='" + groupCode +"'>" + groups + "</option>";
                                console.log(getGroup);
                            }
                            
                            
                        }
                        //document.getElementById('adsWrapper').append(group);
                       
            
                    }

                    
                }
            }

            const getAd = (chanelSelected) => {
                let index = "";
                let gedCont = document.getElementsByClassName("dllAd");
                xhttp.open('GET', 'https://bac-id-new.azurewebsites.net/consultas_para_dropdownlist/obtener_tipo_anuncio.php?canal_digital=' + chanelSelected, true);
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
                                document.getElementsByClassName("dllAd")[index].innerHTML += "<div class='row mt-2'>" + "<div class='col-12 col-md-4'>" + "<label class='w-100' for=''>Seleccione tipo</label>" + "<label><input disabled class='custom-checkbox adCheck " + ids + "'" + "type='checkbox'" + "value='" + codeAd + "'" + "name='" + ids + "'>" + ads + "</label>" + "</div>" + "<div class='col-12 col-md-4'>" + "<label class='col-12' for=''>Nombre de Anuncio</label>" + "<input disabled type='text' class='form-control adName' id='' maxlength='5' name='nombre-anuncio' />" + "</div>" + "<div class='col-12 col-md-4'>" + "<label class='col-12' for=''>Código creado</label>" + "<input type='text' class='form-control txtTipoCanal txt" + ids + "'" + "maxlength='5' name='codigo' />" + "</div>" + "</div>" + "<hr>";
                            }


                        }
                    }
                    /*for (let i in ad) {
                        document.getElementById("dllAd").innerHTML += "<option value='" + ad[i] + "'>" + ad[i] + "</option>";

                    }*/

                }
            };

            function getProducts(selectedCate){
                xhttp.open('GET', 'https://bac-id-new.azurewebsites.net/consultas_para_dropdownlist/obtener_producto.php?categoria=' + selectedCate, true);
                xhttp.send();
                xhttp.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        let data = JSON.parse(this.responseText);
                        for (let item of data) {
                            let products = item.nombre_producto;
                            let productCode = item.codigo;
                            document.getElementById("dllProducts").innerHTML += "<option value='" + products + "' id='" + productCode + "'>" + products + "</option>";
                        }
        
                    }
        
                }
            };
        }, 800);

        function doSelectLoop(htmlElemet, bacIdSection){
            for(let i = 0; i < htmlElemet.options.length; i++){
                if(htmlElemet[i].id == bacIdSection){
                    document.getElementById(bacIdSection).selected = "true";
                   }
               }
        }


        
    }

    const getCountries = () => {
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

    const insertarUsuario = (netUserName, pass, email, userType, country, name, firstName, userState) => {
        var capa_datos_insertaruser = "https://bac-id-new.azurewebsites.net/consultas_usuario/";
        var usuario_red = netUserName;
        var contrasena = pass;
        var correo = email;
        var tipo_usuario = userType;
        var pais = country;
        var nombre = name;
        var apellidos = firstName;
        var estado = userState; 

        const xhttp = new XMLHttpRequest();

        xhttp.open('GET', capa_datos_insertaruser + 'insertar_usuario.php?usuario_red=' + usuario_red + '&contrasena=' + contrasena
            + '&correo=' + correo + '&tipo_usuario=' + tipo_usuario + '&pais=' + pais + '&nombre=' + nombre + '&apellidos=' + apellidos + '&estado' + estado, true);

        xhttp.send();

        xhttp.onreadystatechange = function () {

            if (this.readyState == 4 && this.status == 200) {


            }

        }
    }

    const setCountryValue = (setCountry) => {
        switch(setCountry){
            case "GUA":
            document.getElementById("Guatemala").selected = "true";
            document.getElementById("Guatemala").value = "GUA";
            break;
        case "CRI":
            document.getElementById("Costa Rica").selected = "true";
            document.getElementById("Costa Rica").value = "CRI";
            break;
        case "ESA":
            document.getElementById("Salvador").selected = "true";
            document.getElementById("Salvador").value = "ESA";
            break;
        case "HON":
            document.getElementById("Honduras").selected = "true";
            document.getElementById("Honduras").value = "HON";
            break;
        case "PAN":
            document.getElementById("Panama").selected = "true";
            document.getElementById("Panama").value = "PAN";
        case "NIC":
            document.getElementById("Nicaragua").selected = "true";
            document.getElementById("Nicaragua").value = "NIC";
            break;
        case "REG":
            document.getElementById("Regional").selected = "true";
            document.getElementById("Regional").value = "REG";
            break;
        }
    }

    const buscarUsuario = (user) => {
        var capa_datos_insertaruser = "https://bac-id-new.azurewebsites.net/consultas_usuario/";
        var usuario_ingresado = user; //aquí se manda el campo que corresponde al usuario de red o al correo 
        var showCountry = "";
        const xhttp = new XMLHttpRequest();
    
        xhttp.open('GET',capa_datos_insertaruser+'buscar_usuario.php?usuario_ingresado='+usuario_ingresado,true);
    
        xhttp.send();
        
        xhttp.onreadystatechange = function(){
    
                if(this.readyState == 4 && this.status == 200){
    
                    let datos = JSON.parse(this.responseText);
                    
                    for(let item of datos){
                        document.getElementById("txtUserId").value = item.id;
                        document.getElementById("txtNombre").value = item.nombre_usuario;
                        document.getElementById("txtApellido").value = item.apellidos_usuario;
                        document.getElementById("txtUsuarioRed").value = item.usuario_red;
                        document.getElementById("txtEmail").value = item.correo;
                        document.getElementById("txtPassword").value = item.contrasena;
                        setCountryValue(item.pais);

                        switch(item.tipo_usuario){
                            case "1":
                            document.getElementById("admin").selected = "true";
                            break;
                            default:
                            document.getElementById("edit").selected = "true";
                            break;
                        }

                        switch(item.estado){
                            case "1":
                            document.getElementById('dllActive').selected = "true";
                            break;
                            default:
                            document.getElementById('dllInactive').selected = "true";
                            break;
                        }
                   }   
                }
                
        }
    }

    const actualizarUsuario = (idUser,netUserName, pass, email, userType, country, name, firstName, userState) => {
        var capa_datos_insertaruser = "https://bac-id-new.azurewebsites.net/consultas_usuario/";
        var id_usuario = idUser; //Este id sería ideal que lo guarde en un local storage luego de llamar la función buscar_usuario
        
        var usuario_red = netUserName;
        var contrasena = pass;
        var correo = email;
        var tipo_usuario = userType; //1 si es administrador 2 si es usuario normal
        var pais = country;// CRI, GUA, NIC, etc
        var nombre = name;
        var apellidos = firstName;
        var estado = userState;// 1 si está activo ; 0 si no está activo
    
        const xhttp = new XMLHttpRequest();
    
        xhttp.open('GET',capa_datos_insertaruser+'actualizar_usuario.php?id_usuario='+id_usuario+'&usuario_red='+usuario_red+'&contrasena='+contrasena
        +'&correo='+correo+'&tipo_usuario='+tipo_usuario+'&pais='+pais+'&nombre='+nombre+'&apellidos='+apellidos+'&estado='+estado,true);
    
        xhttp.send();
        
        xhttp.onreadystatechange = function(){
    
                if(this.readyState == 4 && this.status == 200){
    
                        
                }
                
        }
    }

    const eliminarBACID = (id_usuario, cod_bacid) => {
                
        const xhttp = new XMLHttpRequest();
    
        xhttp.open('GET', 'https://bac-id-new.azurewebsites.net/eliminar_bac_id/eliminar_bacid.php?cod_bacid=' + cod_bacid + '&id_usuario=' + id_usuario, true);
    
        xhttp.send();
    
        xhttp.onreadystatechange = function () {
    
            if (this.readyState == 4 && this.status == 200) {
    
    
            }
    
        }
    
    
    }

    const showUserAdminBtn = () => {
        let userRol = localStorage.getItem('country');
        let userData = JSON.parse(userRol);
        let countryCode = userData[0];
        if(countryCode !== "REG"){
           
        }else{
            document.getElementById("btnUserAdmin").classList.remove("d-none");
        }
    }

    return {
        getUser,
        seeCode,
        deleteCode,
        consultaHistoricoBACID,
        filters,
        validatePassUser,
        consularBACIDcreado,
        editBACIDcreado,
        getCountries,
        insertarUsuario,
        buscarUsuario,
        setCountryValue,
        actualizarUsuario,
        showUserAdminBtn,
        name: "procedurs"
    }
})();

export { procedurs };
