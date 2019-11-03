
document.querySelector('#selectCanalDigital').addEventListener('click', cargarAunciosSegunCanalDigital);

document.querySelector('#selectCategorias').addEventListener('click', cargarProductosSegunCategoria);


//var conexion_capa_datos = "https://bac-id-new.azurewebsites.net/";

var capa_datos1 = "https://bac-id-new.azurewebsites.net/consultas_para_dropdownlist/";


function obtenerPaises(){

        var paises = [];

        const xhttp = new XMLHttpRequest();

        xhttp.open('GET',capa_datos1+'obtener_paises.php',true);

        xhttp.send();

        
        xhttp.onreadystatechange = function(){

                if(this.readyState == 4 && this.status == 200){
     
                        let datos = JSON.parse(this.responseText);
               

                        for(let item of datos){
                             paises.push(item.nombre);
                        }
                      
                        for(var i in paises)
                        { 
                        document.getElementById("selectPaises").innerHTML += "<option value='"+paises[i]+"'>"+paises[i]+"</option>"; 

                        } 
                        
                }
                
        }
}

function obtenerOrigenClientes(){

        var origen_clientes = [];

        const xhttp = new XMLHttpRequest();

        xhttp.open('GET',capa_datos1+'obtener_origen_clientes.php',true);

        xhttp.send();

        xhttp.onreadystatechange = function(){

                if(this.readyState == 4 && this.status == 200){
     
                        let datos = JSON.parse(this.responseText);
             

                        for(let item of datos){
                             origen_clientes.push(item.nombre_origen);
                        }
                        for(var i in origen_clientes)
                        { 
                        document.getElementById("selectOrigenClientes").innerHTML += "<option value='"+origen_clientes[i]+"'>"+origen_clientes[i]+"</option>"; 

                        } 
                }
                

        }
}

function obtenerCategorias(){

        var categorias = [];


        const xhttp = new XMLHttpRequest();

        xhttp.open('GET',capa_datos1+'obtener_categoria.php',true);

        xhttp.send();

        xhttp.onreadystatechange = function(){

                if(this.readyState == 4 && this.status == 200){
     
                        let datos = JSON.parse(this.responseText);
                 

                        for(let item of datos){
                             categorias.push(item.nombre_categoria);
                        }
                       
                }
                for(var i in categorias)
                { 
                   document.getElementById("selectCategorias").innerHTML += "<option value='"+categorias[i]+"'>"+categorias[i]+"</option>"; 

                }

        }
}

function obtenerProductos(categoriaSeleccionada){

        var productos = [];

        const xhttp = new XMLHttpRequest();

   
        xhttp.open('GET',capa_datos1+'obtener_producto.php?categoria='+categoriaSeleccionada,true);

        xhttp.send();

        xhttp.onreadystatechange = function(){

                if(this.readyState == 4 && this.status == 200){
     
                        let datos = JSON.parse(this.responseText);


                        for(let item of datos){
                                productos.push(item.nombre_producto);
                        }
                       
                }
                for(var i in productos)
                { 
                   document.getElementById("selectProductos").innerHTML += "<option value='"+productos[i]+"'>"+productos[i]+"</option>"; 

                }

        }
}

function obtenerCanales(){

        var indice_canales = [];
        var nombre_canales = [];

        const xhttp = new XMLHttpRequest();

        xhttp.open('GET',capa_datos1+'obtener_canales.php',true);

        xhttp.send();

        xhttp.onreadystatechange = function(){

                if(this.readyState == 4 && this.status == 200){
     
                        let datos = JSON.parse(this.responseText);


                        for(let item of datos){
                             indice_canales.push(item.indice);
                             nombre_canales.push(item.nombre_canal);
                        }
                       
                }
                console.log(indice_canales);
                console.log(nombre_canales);
        }
}

function obtenerPortafolios(){

        var portafolios = [];

        const xhttp = new XMLHttpRequest();

        xhttp.open('GET',capa_datos1+'obtener_portafolio.php',true);

        xhttp.send();

        xhttp.onreadystatechange = function(){

                if(this.readyState == 4 && this.status == 200){
     
                        let datos = JSON.parse(this.responseText);

                        for(let item of datos){
                             portafolios.push(item.nombre_portafolio);
                        }
                       
                }
                for(var i in portafolios)
                { 
                   document.getElementById("selectPortafolios").innerHTML += "<option value='"+portafolios[i]+"'>"+portafolios[i]+"</option>"; 

                }

        }
}

function obtenerTiposCampana(){

        var tipos = [];

        const xhttp = new XMLHttpRequest();

        xhttp.open('GET',capa_datos1+'obtener_tipo_campana.php',true);

        xhttp.send();

        xhttp.onreadystatechange = function(){

                if(this.readyState == 4 && this.status == 200){
     
                        let datos = JSON.parse(this.responseText);

                        for(let item of datos){
                            tipos.push(item.nombre);
                        }
                       
                }
                for(var i in tipos)
                { 
                   document.getElementById("selectTiposCampana").innerHTML += "<option value='"+tipos[i]+"'>"+tipos[i]+"</option>"; 

                }

        }
}

function obtenerObjetivos(){

        var objetivos = [];

        const xhttp = new XMLHttpRequest();

        xhttp.open('GET',capa_datos1+'obtener_objetivos.php',true);

        xhttp.send();

        xhttp.onreadystatechange = function(){

                if(this.readyState == 4 && this.status == 200){
     
                        let datos = JSON.parse(this.responseText);

                        for(let item of datos){
                           objetivos.push(item.nombre_objetivo);
                        }
                       
                }
                for(var i in objetivos)
                { 
                   document.getElementById("selectObjetivos").innerHTML += "<option value='"+objetivos[i]+"'>"+objetivos[i]+"</option>"; 

                }

        }
}

function obtenerCanalesDigitales(){

        var canales = [];

        const xhttp = new XMLHttpRequest();

        xhttp.open('GET',capa_datos1+'obtener_canal_digital.php',true);

        xhttp.send();

        xhttp.onreadystatechange = function(){

                if(this.readyState == 4 && this.status == 200){
     
                        let datos = JSON.parse(this.responseText);

                        for(let item of datos){
                            canales.push(item.nombre);
                        }
                       
                }
                for(var i in canales)
                { 
                   document.getElementById("selectCanalDigital").innerHTML += "<option value='"+canales[i]+"'>"+canales[i]+"</option>"; 

                }


        }
}

function obtenerTipoAnuncio(canalDigitalSeleccionado){

        var anuncios = [];

        const xhttp = new XMLHttpRequest();

        xhttp.open('GET',capa_datos1+'obtener_tipo_anuncio.php?canal_digital='+canalDigitalSeleccionado,true);

        xhttp.send();

        xhttp.onreadystatechange = function(){

                if(this.readyState == 4 && this.status == 200){
     
                        let datos = JSON.parse(this.responseText);

                        for(let item of datos){
                            anuncios.push(item.nombre);
                        }
                       
                }
                for(var i in anuncios)
                { 
                   document.getElementById("selectTipoAnuncio").innerHTML += "<option value='"+anuncios[i]+"'>"+anuncios[i]+"</option>"; 

                }

        }
}

function cargarSelects(){
        
        limpiarSelects();

        obtenerPaises(); 
        obtenerOrigenClientes();
        obtenerCategorias();
        obtenerPortafolios();
        obtenerTiposCampana();
        obtenerObjetivos();
        obtenerCanalesDigitales();

        obtenerCanales();
}

function limpiarSelects(){

        document.getElementById("selectPaises").length=0;
        document.getElementById("selectOrigenClientes").length=0;
        document.getElementById("selectCategorias").length=0;
        document.getElementById("selectPortafolios").length=0;
        document.getElementById("selectTiposCampana").length=0;
        document.getElementById("selectObjetivos").length=0;
        document.getElementById("selectCanalDigital").length=0;
}

function cargarProductosSegunCategoria(){

        document.getElementById("selectProductos").length=0;
        obtenerProductos(document.getElementById("selectCategorias").value);
}

function cargarAunciosSegunCanalDigital(){

        document.getElementById("selectTipoAnuncio").length=0;
        obtenerTipoAnuncio(document.getElementById("selectCanalDigital").value);
}

