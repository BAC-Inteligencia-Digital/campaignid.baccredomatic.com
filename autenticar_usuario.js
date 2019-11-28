
document.querySelector('#autenticacionBoton').addEventListener('click', autenticarUsuario);

//var conexion_capa_datos = "https://bac-id-new.azurewebsites.net/";

var capa_datos4 = "consulta_login/";

function autenticarUsuario(){

    var id;

    var usuario = 'jmurillo@baccredomatic.com' ; //aquí se captura el usuario de red o el correo 
    var contrasena = 'jorge45' ; //aquí se captura la contraseña ingresada
    
    const xhttp = new XMLHttpRequest();

    xhttp.open('GET',capa_datos4+'autenticar_usuario.php?usuario_ingresado='+usuario+'&contrasena_ingresada='+contrasena,true);

    xhttp.send();

    
    xhttp.onreadystatechange = function(){

            if(this.readyState == 4 && this.status == 200){
 
                    let datos = JSON.parse(this.responseText);
           
                    for(let item of datos){
                         id = item.id; // si este ID es mayor a cero es por que el usuario está registrado
                         if(id>0){
                            alert(item.nombre_usuario+" "+item.apellidos_usuario); //se obtiene el nombre y apellidos del usuario
                            console.log('registrado');
                         }
                         else{
                            console.log('no registrado'); 
                         }
                         
                    }
                  
                    
            }
            
    }

}