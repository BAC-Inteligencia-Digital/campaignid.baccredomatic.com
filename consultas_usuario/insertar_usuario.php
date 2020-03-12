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
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    $sql = "INSERT INTO usuarios (usuario_red, contraseña, correo,tipo_usuario,pais,nombre,apellidos,estado)
    SELECT * FROM (SELECT '$usuario_red' as usuario, '$contrasena' as contrasena, '$correo' as correo,'$tipo_usuario' as tipo,'$pais' as pais,'$nombre' as nombre,'$apellidos' as apellido,'$estado' as estado) AS tmp
    WHERE NOT EXISTS (
        SELECT usuario_red,correo FROM usuarios WHERE usuario_red = '$usuario_red' or correo = '$correo'
    ) LIMIT 1;";

    if ($conn->query($sql) === TRUE) {
       echo  "Affected rows: " . mysqli_affected_rows($conn);
        
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
       
    }
    $conn->close();

   

?>