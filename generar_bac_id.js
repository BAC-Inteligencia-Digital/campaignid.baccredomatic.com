

document.querySelector('#botonGenerarBACID').addEventListener('click', funcionesDatosSeleccionados);

//var conexion_capa_datos = "https://bac-id-new.azurewebsites.net/";

var capa_datos2 = "https://bac-id-new.azurewebsites.net/consultas_generar_bac_id/";

var abreviatura_pais;
var codigo_origen_clientes;
var codigo_categoria;
var codigo_producto;
var codigo_portafolio;
var codigo_tipo_campana;
var codigo_objetivo;
var codigo_canal_digital;
var codigo_tipo_anuncio;
var codigo_grupo_anuncio;
var bac_id_final;


function obtenerPaisSeleccionado(paisSeleccionado){

        var dato;



        const xhttp = new XMLHttpRequest();

        xhttp.open('GET',capa_datos2+'obtener_pais_seleccionado.php?pais_seleccionado='+paisSeleccionado,true);

        xhttp.send();

        xhttp.onreadystatechange = function(){

                if(this.readyState == 4 && this.status == 200){
     
                        var datos = JSON.parse(this.responseText);
                        console.log(datos);

                        for(let item of datos){
                            abreviatura_pais = item.abreviatura;
                        }
                        construirBacId();
                }
               
        }
         
}

function obtenerOrigenClientesSeleccionado(origenSeleccionado){

    var dato;

   

    const xhttp = new XMLHttpRequest();

    xhttp.open('GET',capa_datos2+'obtener_origen_clientes_seleccionado.php?origen_seleccionado='+origenSeleccionado,true);

    xhttp.send();

    xhttp.onreadystatechange = function(){

            if(this.readyState == 4 && this.status == 200){
 
                    var datos = JSON.parse(this.responseText);
                  

                    for(let item of datos){
                        codigo_origen_clientes = item.codigo;
                    }
                    construirBacId();
            }
           
    }
     
}

function obtenerCategoriaSeleccionada(categoriaSeleccionada){

    var dato;


    const xhttp = new XMLHttpRequest();

    xhttp.open('GET',capa_datos2+'obtener_categoria_seleccionada.php?categoria_seleccionada='+categoriaSeleccionada,true);

    xhttp.send();

    xhttp.onreadystatechange = function(){

            if(this.readyState == 4 && this.status == 200){
 
                    var datos = JSON.parse(this.responseText);
               

                    for(let item of datos){
                        codigo_categoria = item.codigo;
                    }
                    construirBacId();
            }
           
    }
     
}

function obtenerProductoSeleccionado(productoSeleccionado){

    var dato;

    const xhttp = new XMLHttpRequest();

    xhttp.open('GET',capa_datos2+'obtener_producto_seleccionado.php?producto_seleccionado='+productoSeleccionado,true);

    xhttp.send();

    xhttp.onreadystatechange = function(){

            if(this.readyState == 4 && this.status == 200){
 
                    var datos = JSON.parse(this.responseText);
          

                    for(let item of datos){
                        codigo_producto = item.codigo;
                    }
                    construirBacId();
            }
           
    }
     
}

function obtenerMultiProductosSeleccionados(){

    var codigo_multiproductos = "";
    var multiseleccion =  document.getElementById("selectMultiProductos");
    var multiproductos = [];

    for(var i = 0; i < multiseleccion.selectedOptions.length; i++) {
        multiproductos.push(multiseleccion.selectedOptions[i].value);
    }

    const xhttp = new XMLHttpRequest();

    xhttp.open('GET',capa_datos2+'obtener_multiproductos_seleccionados.php?producto1_seleccionado='+multiproductos[0]+
    "&producto2_seleccionado="+multiproductos[1]+"&producto3_seleccionado="+multiproductos[2],true);

    xhttp.send();

    xhttp.onreadystatechange = function(){

            if(this.readyState == 4 && this.status == 200){
 
                    var datos = JSON.parse(this.responseText);
          
                    for(let item of datos){
                        codigo_multiproductos = codigo_multiproductos + item.codigo;
                    }
                    
            }
            alert(codigo_multiproductos); // este sería el valor de tres dígitos que representa a multiproducto
    }
     
}

function obtenerPortafolioSeleccionado(portafolioSeleccionado){

    var dato;

    const xhttp = new XMLHttpRequest();

    xhttp.open('GET',capa_datos2+'obtener_portafolio_seleccionado.php?portafolio_seleccionado='+portafolioSeleccionado,true);

    xhttp.send();

    xhttp.onreadystatechange = function(){

            if(this.readyState == 4 && this.status == 200){
 
                    var datos = JSON.parse(this.responseText);
            

                    for(let item of datos){
                        codigo_portafolio = item.codigo;
                    }
                    construirBacId();
            }
           
    }
     
}

function obtenerTipoCampanaSeleccionada(tipoSeleccionado){

    var dato;

    const xhttp = new XMLHttpRequest();

    xhttp.open('GET',capa_datos2+'obtener_tipo_campana_seleccionado.php?tipo_seleccionado='+tipoSeleccionado,true);

    xhttp.send();

    xhttp.onreadystatechange = function(){

            if(this.readyState == 4 && this.status == 200){
 
                    var datos = JSON.parse(this.responseText);
            

                    for(let item of datos){
                        codigo_tipo_campana = item.codigo;
                    }
                    construirBacId();
            }
           
    }
     
}

function obtenerObjetivoSeleccionado(objetivoSeleccionado){

    var dato;



    const xhttp = new XMLHttpRequest();

    xhttp.open('GET',capa_datos2+'obtener_objetivo_seleccionado.php?objetivo_seleccionado='+objetivoSeleccionado,true);

    xhttp.send();

    xhttp.onreadystatechange = function(){

            if(this.readyState == 4 && this.status == 200){
 
                    var datos = JSON.parse(this.responseText);
            

                    for(let item of datos){
                        codigo_objetivo = item.codigo;
                    }
                    construirBacId();
            }
           
    }
     
}

function obtenerCanalDigitalSeleccionado(digitalSeleccionado){

    var dato;



    const xhttp = new XMLHttpRequest();

    xhttp.open('GET',capa_datos2+'obtener_canal_digital_seleccionado.php?canal_digital_seleccionado='+digitalSeleccionado,true);

    xhttp.send();

    xhttp.onreadystatechange = function(){

            if(this.readyState == 4 && this.status == 200){
 
                    var datos = JSON.parse(this.responseText);
            

                    for(let item of datos){
                        codigo_canal_digital = item.codigo;
                    }
                    construirBacId();
            }
           
    }
     
}

function obtenerAnuncioSeleccionado(anuncioSeleccionado){

    var dato;



    const xhttp = new XMLHttpRequest();

    xhttp.open('GET',capa_datos2+'obtener_tipo_anuncio_seleccionado.php?tipo_anuncio_seleccionado='+anuncioSeleccionado,true);

    xhttp.send();

    xhttp.onreadystatechange = function(){

            if(this.readyState == 4 && this.status == 200){
 
                    var datos = JSON.parse(this.responseText);
            

                    for(let item of datos){
                        codigo_tipo_anuncio = item.codigo;
                    }
                    construirBacId();
            }
           
    }
     
}

function obtenerGrupoAnuncioSeleccionado(anuncioSeleccionado){

    var dato;

    const xhttp = new XMLHttpRequest();

    xhttp.open('GET',capa_datos2+'obtener_grupo_anuncio_seleccionado.php?grupo_anuncio_seleccionado='+anuncioSeleccionado,true);

    xhttp.send();

    xhttp.onreadystatechange = function(){

            if(this.readyState == 4 && this.status == 200){
 
                    var datos = JSON.parse(this.responseText);
            

                    for(let item of datos){
                        codigo_grupo_anuncio = item.codigo;
                    }
                    construirBacId();
            }
           
    }
     
}


function construirBacId(){
    
    
    bac_id_final = abreviatura_pais+codigo_origen_clientes+"-"+codigo_categoria+"-"+codigo_producto+"-000000-"+codigo_portafolio+"-"+codigo_tipo_campana+"-"+codigo_objetivo+"-"+codigo_canal_digital+"-"+codigo_grupo_anuncio+"-"+codigo_tipo_anuncio; 
    
    console.log("BAC ID:"+bac_id_final);
    document.getElementById("campo_bac_id").value = bac_id_final;

}

function funcionesDatosSeleccionados(){

    obtenerPaisSeleccionado(document.getElementById("selectPaises").value);

    obtenerOrigenClientesSeleccionado(document.getElementById("selectOrigenClientes").value);

    obtenerCategoriaSeleccionada(document.getElementById("selectCategorias").value)

    obtenerProductoSeleccionado(document.getElementById("selectProductos").value);

    obtenerPortafolioSeleccionado(document.getElementById("selectPortafolios").value);

    obtenerTipoCampanaSeleccionada(document.getElementById("selectTiposCampana").value);

    obtenerObjetivoSeleccionado(document.getElementById("selectObjetivos").value);

    obtenerCanalDigitalSeleccionado(document.getElementById("selectCanalDigital").value);

    obtenerAnuncioSeleccionado(document.getElementById("selectTipoAnuncio").value);

    obtenerGrupoAnuncioSeleccionado(document.getElementById("selectGrupoAnuncio").value);

    obtenerMultiProductosSeleccionados();
}


