
document.querySelector('#insercionBoton').addEventListener('click', insertarUsuario);
document.querySelector('#buscarBoton').addEventListener('click', buscarUsuario);

var capa_datos_insertaruser = "https://bac-id-new.azurewebsites.net/consultas_usuario/"


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

function buscarUsuario(){

    var usuario_ingresado = "jose.navarror"; //aquí se manda el campo que corresponde al usuario de red o al correo 

    const xhttp = new XMLHttpRequest();

    xhttp.open('GET',capa_datos_insertaruser+'buscar_usuario.php?usuario_ingresado='+usuario_ingresado,true);

    xhttp.send();
    
    xhttp.onreadystatechange = function(){

            if(this.readyState == 4 && this.status == 200){

                let datos = JSON.parse(this.responseText);
                
                for(let item of datos){
                     console.log(item.id);
                     console.log(item.usuario_red);
                     console.log(item.contrasena);
                     console.log(item.correo);
                     console.log(item.nombre_usuario);
                     console.log(item.apellidos_usuario);
                     console.log(item.pais);
                     console.log(item.tipo_usuario);
               }   
            }
            
    }
}