<?php
    include 'conexion_base_datos.php';
    
    $bac_id = $_GET['bac_id'];
    $id_usuario = $_GET['id_usuario'];
    $nombre_campana = $_GET['nombre_campana'];
    $fecha_creacion = $_GET['fecha_creacion'];

    // Create connection
    $conn = new mysqli( $servidor, $usuario, $password , $basededatos);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "INSERT INTO bac_id_generados (nombre_bac_id,id_usuario,nombre_campana,fecha_creacion)
    VALUES ('$bac_id', $id_usuario,'$nombre_campana','$fecha_creacion')";

    if ($conn->query($sql) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();
?>