
document.querySelector('#insertar_bac_id').addEventListener('click', insertarBACID);

var capa_datos3 = "insertar_bac_id/";

function insertarBACID(){

    var bac_id = 'GUAB-COMP-AML-000126-AA-AW-PR-WA'; //aqui te traes el valor del campo de bac_id
    var id_usuario = 2; //aqui nos traemos el id del usuario para asociarlo con los bac id creados
    var nombre_campana = 'ejemplo'; // aquí va el nombre de la campaña que digita el usuario
    var fecha_creacion = '2019-01-01'; //se ingresa la fecha de creación

    const xhttp = new XMLHttpRequest();

    xhttp.open('GET',capa_datos3+'insertar_bac_id.php?bac_id='+bac_id+'&id_usuario='+id_usuario
    +'&nombre_campana='+nombre_campana+'&fecha_creacion='+fecha_creacion,true);

    xhttp.send();
    
    xhttp.onreadystatechange = function(){

            if(this.readyState == 4 && this.status == 200){

                    
            }
            
    }

    var lista_sub_bacids = ["b8-la-nombre1/"+nombre_campana,"c1-si-nombre2/"+nombre_campana,"c1-if-nombre3/"+nombre_campana]; //almacena cada uno de los sub_id asociado al bac_id padre

    for (var i = 0; i < lista_sub_bacids.length; i++) {
        insertarSUBBACID(bac_id,lista_sub_bacids[i]); //se inserta uno por uno los sub_bac_id
    }

    consultarBACIDCreado(bac_id,nombre_campana,fecha_creacion); //llamamos esta función para mostrar los datos correspondientes al BAC ID Creado
    consultarSUBACIDCreados(lista_sub_bacids);
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

function consultarBACIDCreado(bac_id_registrado,nombre_campana,fecha_creacion){

    document.getElementById("result_raiz_codigo").innerHTML  = bac_id_registrado; //mostrar el codigo raiz en la tabla

    const xhttp = new XMLHttpRequest();

    xhttp.open('GET',capa_datos3+'consulta_bac_id_postinsercion.php?pais_bacid='+bac_id_registrado.substring(0,3)+
    '&origen_bacid='+bac_id_registrado.substring(3,4)+'&categoria_bacid='+bac_id_registrado.substring(5,9)+
    '&producto_bacid='+bac_id_registrado.substring(10,13)+'&portafolio_bacid='+bac_id_registrado.substring(21,23)+'&tipo_campana_bacid='+bac_id_registrado.substring(24,26)+
    '&objetivo_bacid='+bac_id_registrado.substring(27,29)+'&canal_digital_bacid='+bac_id_registrado.substring(30,32),true);

    xhttp.send();
    
    xhttp.onreadystatechange = function(){

        if(this.readyState == 4 && this.status == 200){
     
            let datos = JSON.parse(this.responseText);

            document.getElementById("result_nombre_campana").innerHTML  = nombre_campana;
            document.getElementById("result_creacion").innerHTML  = fecha_creacion;
            document.getElementById("result_pais").innerHTML  = datos[0].nombre_pais;
            document.getElementById("result_origen").innerHTML  = datos[1].nombre_origen;
            document.getElementById("result_categoria").innerHTML  = datos[2].nombre_categoria;
            document.getElementById("result_producto").innerHTML  = datos[3].nombre_producto;
            obtenerCanalesInsertados(bac_id_registrado.substring(14,20));//la función siguiente
            document.getElementById("result_portafolio").innerHTML  = datos[4].nombre_portafolio;
            document.getElementById("result_tipocampana").innerHTML  = datos[5].nombre_campana;
            document.getElementById("result_objetivos").innerHTML  = datos[6].nombre_objetivo;
            document.getElementById("result_canaldigital").innerHTML  = datos[7].nombre_canal_digital;
                        
        }
            
    }
    
}

function obtenerCanalesInsertados(codigo_canales){ //esta función es para obtener los nombres de los canales según el siguiente valor: Ejemplo:001236
    
    console.log(codigo_canales.substring(1,1));

    var resultado = [];

    const xhttp = new XMLHttpRequest();

    xhttp.open('GET',capa_datos3+'consulta_canales_insertados.php?canal1_seleccionado='+codigo_canales.substring(0,1)+
    '&canal2_seleccionado='+codigo_canales.substring(1,2)+'&canal3_seleccionado='+codigo_canales.substring(2,3)+
    '&canal4_seleccionado='+codigo_canales.substring(3,4)+'&canal5_seleccionado='+codigo_canales.substring(4,5)+
    '&canal6_seleccionado='+codigo_canales.substring(5,6),true);

    xhttp.send();
    
    xhttp.onreadystatechange = function(){

            if(this.readyState == 4 && this.status == 200){

                  let datos = JSON.parse(this.responseText);

                  if(!datos[0].nombre_canal1==""){
                    resultado.push(datos[0].nombre_canal1); 
                  }
                  if(!datos[1].nombre_canal2==""){
                    resultado.push(datos[1].nombre_canal2); 
                  }
                  if(!datos[2].nombre_canal3==""){
                    resultado.push(datos[2].nombre_canal3);  
                  }
                  if(!datos[3].nombre_canal4==""){
                    resultado.push(datos[3].nombre_canal4); 
                  }
                  if(!datos[4].nombre_canal5==""){
                    resultado.push(datos[4].nombre_canal5);  
                  }
                  if(!datos[5].nombre_canal6==""){
                    resultado.push(datos[5].nombre_canal6); 
                  }   
            }
            document.getElementById("result_canales").innerHTML  = resultado;
    }
    

}

function consultarSUBACIDCreados(lista_sub_bacids){

        console.log(lista_sub_bacids[0].split("-")[0]);

        for (var i = 0; i < lista_sub_bacids.length; i++) {
        
        const xhttp = new XMLHttpRequest();

        xhttp.open('GET',capa_datos3+'consulta_sub_bacids_postinsercion.php?nombre_grupo='+lista_sub_bacids[i].split("-")[0]+'&codigo_anuncio='+lista_sub_bacids[i].split("-")[1]
        +'&nombre_anuncio='+lista_sub_bacids[i].split("-")[2]+'&sub_codigo='+lista_sub_bacids[i],true);

        xhttp.send();
        
        xhttp.onreadystatechange = function(){

                if(this.readyState == 4 && this.status == 200){
                    let datos = JSON.parse(this.responseText);

                    for(let item of datos){

                        var table = document.getElementById("t02");
                        {
                            var row = table.insertRow(1);
                            var cell1 = row.insertCell(0);
                            var cell2 = row.insertCell(1);
                            var cell3 = row.insertCell(2);
                            var cell4 = row.insertCell(3);
                            var cell5 = row.insertCell(4);
                
                            cell1.innerHTML = item.nombre_categoria;
                            cell2.innerHTML = item.descripcion;
                            cell3.innerHTML = item.nombre_tipo_anuncio;
                            cell4.innerHTML = item.nombre_anuncio;
                            cell5.innerHTML = item.sub_codigo;
                        }                        
                    }
                        
                }
                            
        }
       
     }
}
