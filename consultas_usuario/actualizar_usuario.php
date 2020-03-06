<?php

    include '../archivo_conexion_db/conexion_base_datos.php';

    $id_usuario = $_GET['id_usuario'];
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
    $sql = "update usuarios set usuario_red = '$usuario_red' , contraseña = '$contrasena', correo = '$correo', tipo_usuario = '$tipo_usuario' , pais = '$pais', nombre = '$nombre', apellidos= '$apellidos', estado = '$estado' 
    where id = '$id_usuario'";
    if ($conn->query($sql) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
    $conn->close();

?>