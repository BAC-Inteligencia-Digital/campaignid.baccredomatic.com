<?php
   	include '../archivo_conexion_db/conexion_base_datos.php';

    $cod_bacid = $_GET['cod_bacid'];
    $id_usuario = $_GET['id_usuario'];
	
	// creación de la conexión a la base de datos con mysql_connect()
	$conn = new mysqli( $servidor, $usuario, $password , $basededatos); //or die ("No se ha podido conectar al servidor de Base de datos");
	
	// Selección del a base de datos a utilizar
	$db = mysqli_select_db( $conn, $basededatos ) or die ( "Upps! Pues va a ser que no se ha podido conectar a la base de datos" );
	
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    // INSERTAR BITACORA DE ELIMINACION

    $sql0 = "INSERT INTO bitacora_eliminacion (id_bacid,nombre_bacid,nombre_campana,fecha,tipo,responsable)
    VALUES ('$cod_bacid', SELECT nombre_bac_id from bac_id_generados where id = '$cod_bacid',SELECT nombre_campana from bac_id_generados where id = '$cod_bacid',CURDATE(),'bacid','$id_usuario')";

    if ($conn->query($sql0) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    // ELIMINAR PRIMERO LOS SUBBACIDS ASOCIADOS AL BAC ID
    $sql = "DELETE FROM sub_bacid_generados WHERE id_bacid_padre='$cod_bacid'";
      
    if ($conn->query($sql) === TRUE) {
        echo "Record deleted successfully";
    } else {
        echo "Error deleting record: " . $conn->error;
    }

    // ELIMINAR FINALMENTE EL BAC ID PADRE
    $sql2 = "DELETE FROM bac_id_generados WHERE id='$cod_bacid'";
      
    if ($conn->query($sql2) === TRUE) {
        echo "Record deleted successfully";
    } else {
        echo "Error deleting record: " . $conn->error;
    }

    mysqli_close($conn);

?>