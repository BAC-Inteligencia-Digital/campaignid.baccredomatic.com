
document.querySelector('#actualizarBoton').addEventListener('click', actualizarBACID);
document.querySelector('#actualizar2Boton').addEventListener('click', actualizarSUBACID);


var capa_datos7 = "actualizar_bac_id/";

function actualizarBACID(){

    //las siguientes variables contienen la información a actualizar

    var ide = 31;

    var nombre_campana = 'ejemplo2campa'; 
    var pais = 'Nicaragua';
    var origen = 'Banco';
    var categoria = 'Complementaria';
    var producto = 'Remesas';
    var canales = '000123';
    var portafolio = 'AAdvantage';
    var tipo_campana = 'always on';
    var objetivo = 'descargas';
    var canal_digital = 'facebook';

    const xhttp = new XMLHttpRequest();

    xhttp.open('GET',capa_datos7+'actualizar_bac_id.php?identificador='+ide+'&nombre_campana='+nombre_campana+'&pais='+pais+'&origen='+origen+'&categoria='+categoria+'&producto='+producto+'&canales='+canales+'&portafolio='+portafolio+'&tipo_campana='+tipo_campana+'&objetivo='+objetivo+'&canal_digital='+canal_digital,true);

    xhttp.send();
    
    xhttp.onreadystatechange = function(){

            if(this.readyState == 4 && this.status == 200){

                    
            }
            
    }
}

function actualizarSUBACID(){

    //las siguientes variables contienen la información a actualizar

    var ide_padre = 31;
    var ide_subacid = 85;
 
    var grupo_anuncio = 'Seguros';
    var tipo_anuncio = 'GIF';
    var nombre_anuncio = 'test';

    const xhttp = new XMLHttpRequest();

    xhttp.open('GET',capa_datos7+'actualizar_subac_id.php?identificador_bacid_padre='+ide_padre+'&identificador_subac_id='+ide_subacid+'&grupo_anuncio='+grupo_anuncio+'&tipo_anuncio='+tipo_anuncio+'&nombre_anuncio='+nombre_anuncio,true);

    xhttp.send();
    
    xhttp.onreadystatechange = function(){

            if(this.readyState == 4 && this.status == 200){

                    
            }
            
    }
}