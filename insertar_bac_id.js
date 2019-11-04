
document.querySelector('#insertar_bac_id').addEventListener('click', insertarBACID);

var capa_datos3 = "https://bac-id-new.azurewebsites.net/insertar_bac_id/";

function insertarBACID(){

    var bac_id = 'campo'; //aqui te traes el valor del campo de bac_id
    //var id_usuario = 2; //aqui nos traemos el id del usuario para asociarlo con los bac id creados

    const xhttp = new XMLHttpRequest();

    xhttp.open('GET',capa_datos3+'insertar_bac_id.php?bac_id='+bac_id+'&id_usuario='+id_usuario,true);

    xhttp.send();
    
    xhttp.onreadystatechange = function(){

            if(this.readyState == 4 && this.status == 200){

                    
            }
            
    }
}
