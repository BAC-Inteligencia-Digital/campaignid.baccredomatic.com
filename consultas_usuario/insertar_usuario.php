<?php

    include '../archivo_conexion_db/conexion_base_datos.php';



    $usuario_red = $_GET['usuario_red'];
    $contrasena = $_GET['contrasena'];
    $correo = $_GET['correo'];
    $tipo_usuario = $_GET['tipo_usuario'];
    $pais = $_GET['pais'];
    $nombre = $_GET['nombre'];
    $apellidos = $_GET['apellidos'];
    $estado = $_GET['estado'];
    
     
    $conn = new mysqli( $servidor, $usuario, $password , $basededatos);

    // Check connection for insert user
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        $sql = "INSERT INTO usuarios (usuario_red,contraseña,correo,tipo_usuario,pais,nombre,apellidos,estado)
        VALUES ('$usuario_red', '$contrasena','$correo','$tipo_usuario','$pais','$nombre','$apellidos','$estado')";
        if ($conn->query($sql) === TRUE) {
            $row_array['error'] = "El usuario ha sido registrado con éxito!";
            array_push($return_arr,$row_array);
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    }

   
    $conn->close();


?>