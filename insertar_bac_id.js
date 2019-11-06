
document.querySelector('#insertar_bac_id').addEventListener('click', insertarBACID);

var capa_datos3 = "https://bac-id-new.azurewebsites.net/insertar_bac_id/";

function insertarBACID(){

    var bac_id = 'GUAB-COMP-AML-123456-AA-aw-pr-wa-D4-zp'; //aqui te traes el valor del campo de bac_id
    var id_usuario = 2; //aqui nos traemos el id del usuario para asociarlo con los bac id creados

    const xhttp = new XMLHttpRequest();

    xhttp.open('GET',capa_datos3+'insertar_bac_id.php?bac_id='+bac_id+'&id_usuario='+id_usuario,true);

    xhttp.send();
    
    xhttp.onreadystatechange = function(){

            if(this.readyState == 4 && this.status == 200){

                    
            }
            
    }

    var lista_sub_bacids = ["sub1","sub2","sub3","sub4"]; //almacena cada uno de los sub_id asociado al bac_id padre

    for (var i = 0; i < lista_sub_bacids.length; i++) {
        insertarSUBBACID(bac_id,lista_sub_bacids[i]); //se inserta uno por uno los sub_bac_id
    }

    consultarBACIDCreado(bac_id); //llamamos esta función para mostrar los datos correspondientes al BAC ID Creado
    
}

function insertarSUBBACID(bac_id_padre,sub_bacid){

    const xhttp = new XMLHttpRequest();

    xhttp.open('GET',capa_datos3+'insertar_sub_bacid.php?bac_id_padre='+bac_id_padre+'&sub_bac_id='+sub_bacid,true);

    xhttp.send();
    
    xhttp.onreadystatechange = function(){

            if(this.readyState == 4 && this.status == 200){

                    
            }
            
    }

   
}

function consultarBACIDCreado(bac_id_registrado ){

    const xhttp = new XMLHttpRequest();

    xhttp.open('GET',capa_datos3+'consulta_bac_id_postinsercion.php?pais_bacid='+bac_id_registrado.substring(0,3)+
    '&origen_bacid='+bac_id_registrado.substring(3,4)+'&categoria_bacid='+bac_id_registrado.substring(5,9)+
    '&producto_bacid='+bac_id_registrado.substring(10,13)+'&portafolio_bacid='+bac_id_registrado.substring(21,23)+'&tipo_campana_bacid='+bac_id_registrado.substring(24,26)+
    '&objetivo_bacid='+bac_id_registrado.substring(27,29)+'&canal_digital_bacid='+bac_id_registrado.substring(30,32),true);

    xhttp.send();
    
    xhttp.onreadystatechange = function(){

        if(this.readyState == 4 && this.status == 200){
     
            let datos = JSON.parse(this.responseText);

            console.log("Pais: "+datos[0].nombre_pais);
            console.log("Origen Clientes: "+datos[1].nombre_origen);
            console.log("Categoria: "+datos[2].nombre_categoria);
            console.log("Producto: "+datos[3].nombre_producto);
            console.log("Portafolio: "+datos[4].nombre_portafolio);
            console.log("Tipo Campaña: "+datos[5].nombre_campana);
            console.log("Objetivo: "+datos[6].nombre_objetivo);
            console.log("Canal Digital: "+datos[7].nombre_canal_digital);
            obtenerCanalesInsertados(bac_id_registrado.substring(14,20));//la función siguiente
        }
            
    }
}

function obtenerCanalesInsertados(codigo_canales){ //esta función es para obtener los nombres de los canales según el siguiente valor: Ejemplo:001236
    
    console.log(codigo_canales.substring(1,1));

    var resultado;

    const xhttp = new XMLHttpRequest();

    xhttp.open('GET',capa_datos3+'consulta_canales_insertados.php?canal1_seleccionado='+codigo_canales.substring(0,1)+
    '&canal2_seleccionado='+codigo_canales.substring(1,2)+'&canal3_seleccionado='+codigo_canales.substring(2,3)+
    '&canal4_seleccionado='+codigo_canales.substring(3,4)+'&canal5_seleccionado='+codigo_canales.substring(4,5)+
    '&canal6_seleccionado='+codigo_canales.substring(5,6),true);

    xhttp.send();
    
    xhttp.onreadystatechange = function(){

            if(this.readyState == 4 && this.status == 200){

                  let datos = JSON.parse(this.responseText);

                  resultado = datos[0].nombre_canal1;  
                  resultado = resultado +", "+datos[1].nombre_canal2;
                  resultado = resultado +", "+ datos[2].nombre_canal3;
                  resultado = resultado +", "+ datos[3].nombre_canal4; 
                  resultado = resultado +", "+ datos[4].nombre_canal5; 
                  resultado = resultado +" y "+ datos[5].nombre_canal6;    
            }
            console.log("Canales Tradicionales: "+resultado); //resultado devuele los canales seleccionados por los clientes
    }
    

}
