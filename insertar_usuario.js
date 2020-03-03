
document.querySelector('#insercionBoton').addEventListener('click', insertarUsuario);

var capa_datos_insertaruser = "https://bac-id-new.azurewebsites.net/insertar_usuario/"

function insertarUsuario(){

    var usuario_red = document.getElementById("id_usuariored").value;
    var contrasena = document.getElementById("id_contrasena").value;
    var correo = document.getElementById("id_correo").value;
    var tipo_usuario = document.getElementById("id_tipousuario").value;
    var pais = document.getElementById("id_pais").value;
    var nombre = document.getElementById("id_nombre").value;
    var apellidos = document.getElementById("id_apellidos").value;

    const xhttp = new XMLHttpRequest();

    xhttp.open('GET',capa_datos_insertaruser+'insertar_usuario.php?usuario_red='+usuario_red+'&contrasena='+contrasena
    +'&correo='+correo+'&tipo_usuario='+tipo_usuario+'&pais='+pais+'&nombre='+nombre+'&apellidos='+apellidos,true);

    xhttp.send();
    
    xhttp.onreadystatechange = function(){

            if(this.readyState == 4 && this.status == 200){

                    
            }
            
    }
}