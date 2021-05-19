<?php
	include '../archivo_conexion_db/conexion_base_datos.php';
       
    $identificador   = $_GET['identificador'];
    $nombre_subacid = $_GET['nombre_subacid'];

    $conexion = mysqli_connect( $servidor, $usuario, $password, $basededatos ) or die ("No se ha podido conectar al servidor de Base de datos");

    $actualizar = "UPDATE sub_bacid_generados 
    SET nombre_subbacid = '$nombre_subacid' WHERE id_sub_bacid='$identificador'";

    if ($conexion->query($actualizar) === TRUE) {

    } else {
        echo "Error updating record: " . $conexion->error;
    }

    mysqli_close($conexion);

?>
    