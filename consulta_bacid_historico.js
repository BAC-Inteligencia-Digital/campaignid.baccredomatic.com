document.querySelector('#botonProbarBACID').addEventListener('click', consultaHistoricoBACID);

document.querySelector('#botonDetalleBACID').addEventListener('click', consultaDetalleBACID);

var capa_datos4 = "consulta_bacid_historicos/";
var capa_datos5 = "insertar_bac_id/";

function consultaHistoricoBACID(){

        
        const xhttp = new XMLHttpRequest();

        xhttp.open('GET',capa_datos4+'consulta_historico_bacids.php',true);

        xhttp.send();
        
        xhttp.onreadystatechange = function(){

                if(this.readyState == 4 && this.status == 200){
                    let datos = JSON.parse(this.responseText);

                    for(let item of datos){

                        var table = document.getElementById("t03");
                        {
                            var row = table.insertRow(1);
                            var cell1 = row.insertCell(0);
                            var cell2 = row.insertCell(1);
                            var cell3 = row.insertCell(2);
                            var cell4 = row.insertCell(3);
                            var cell5 = row.insertCell(4);
                            var cell6 = row.insertCell(5);
                            var cell7 = row.insertCell(6);
                            var cell8 = row.insertCell(7);

                            cell1.innerHTML = "<input type='hidden' value='"+item.id+"'>";
                            //cell1.innerHTML = item.id;
                            cell2.innerHTML = item.nombre_bac_id;
                            cell3.innerHTML = item.nombre_campana;
                            cell4.innerHTML = item.nombre_pais;
                            cell5.innerHTML = item.nombre_origen;
                            cell6.innerHTML = item.nombre_categoria;
                            cell7.innerHTML = item.nombre_producto;
                            cell8.innerHTML = "<input value='Presione' text='nano' type='button' id='"+item.nombre_bac_id+"' name='"+item.nombre_bac_id+"'/></Input>";
                        }                        
                    }
                        
                }
                            
        
       
     }

}

function consultaDetalleBACID(){

    var bac_id = 'CRIC-CORE-TJC-123456-GL-AW-PR-GG'; //aquí se pasa el valor del bac id seleccionado
    var indice =  19;

    const xhttp = new XMLHttpRequest();

    xhttp.open('GET',capa_datos4+'consulta_detalle_bacid.php?id='+indice,true);

    xhttp.send();
    
    xhttp.onreadystatechange = function(){

            if(this.readyState == 4 && this.status == 200){
                let datos = JSON.parse(this.responseText);

                for(let item of datos){

                    document.getElementById("detalle_raiz_codigo").innerHTML  = item.nombre_bac_id;
                    document.getElementById("detalle_nombre_campana").innerHTML  = item.nombre_campana;
                    document.getElementById("detalle_creacion").innerHTML  = item.fecha_creacion;
                    document.getElementById("detalle_pais").innerHTML  = item.nombre_pais;
                    document.getElementById("detalle_origen").innerHTML  = item.nombre_origen;
                    document.getElementById("detalle_categoria").innerHTML  = item.nombre_categoria;
                    document.getElementById("detalle_producto").innerHTML  = item.nombre_producto;
                    document.getElementById("detalle_portafolio").innerHTML  = item.nombre_portafolio;
                    document.getElementById("detalle_tipocampana").innerHTML  = item.nombre_tipo;
                    document.getElementById("detalle_objetivos").innerHTML  = item.nombre_objetivo;
                    document.getElementById("detalle_canaldigital").innerHTML  = item.nombre_canal_digital;
                    
                }
                obtenerCanalesBACID(bac_id.substring(14,20));//la función siguiente 
                consultaDetalleSUBACID(indice); //llamar esta función para obtener los sub bac ids       
            }
                                       
 }
}

function obtenerCanalesBACID(codigo_canales){ //esta función es para obtener los nombres de los canales según el siguiente valor: Ejemplo:001236
    
    var resultado = [];
    
    const xhttp = new XMLHttpRequest();

    xhttp.open('GET',capa_datos5+'consulta_canales_insertados.php?canal1_seleccionado='+codigo_canales.substring(0,1)+
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
            document.getElementById("detalle_canales").innerHTML  = resultado;                
    }
    

}

function consultaDetalleSUBACID(id_padre){

     var lista_sub_bacids = [];

     const xhttp = new XMLHttpRequest();

        xhttp.open('GET',capa_datos4+'consulta_detalle_subacid.php?id='+id_padre,true);

        xhttp.send();

        xhttp.onreadystatechange = function(){

                if(this.readyState == 4 && this.status == 200){
     
                        let datos = JSON.parse(this.responseText);

                        for(let item of datos){
                            lista_sub_bacids.push(item.nombre_subbacid);
         
                        }
                       
                }
                console.log(lista_sub_bacids);
                consultarSUBACIDUnicos(lista_sub_bacids);                
        }
        
}

function consultarSUBACIDUnicos(lista_sub_bacids){

    
    for (var i = 0; i < lista_sub_bacids.length; i++) {
    
    const xhttp = new XMLHttpRequest();

    xhttp.open('GET',capa_datos5+'consulta_sub_bacids_postinsercion.php?nombre_grupo='+lista_sub_bacids[i].split("-")[0]+'&codigo_anuncio='+lista_sub_bacids[i].split("-")[1]
    +'&nombre_anuncio='+lista_sub_bacids[i].split("-")[2]+'&sub_codigo='+lista_sub_bacids[i],true);

    xhttp.send();
    
    xhttp.onreadystatechange = function(){

            if(this.readyState == 4 && this.status == 200){
                let datos = JSON.parse(this.responseText);

                for(let item of datos){

                    var table = document.getElementById("t06");
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