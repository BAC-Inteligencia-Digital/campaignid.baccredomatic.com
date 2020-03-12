<?php

    include '../archivo_conexion_db/conexion_base_datos.php';

    $return_arr = array();

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
    SELECT * FROM (SELECT '$usuario_red', '$contrasena', '$correo','$tipo_usuario','$pais','$nombre','$apellidos','$estado') AS tmp
    WHERE NOT EXISTS (
        SELECT usuario_red,correo FROM usuarios WHERE usuario_red = '$usuario_red' or correo = '$correo'
    ) LIMIT 1;";

    if ($conn->query($sql) === TRUE) {
        echo "New record created successfully";
        $row_array['mensaje'] = "New record created successfully" ;
        array_push($return_arr,$row_array);
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
        $row_array['mensaje'] = "Error: " . $sql . "<br>" . $conn->error;;
        array_push($return_arr,$row_array);
    }
    $conn->close();

    echo json_encode($return_arr);

?>