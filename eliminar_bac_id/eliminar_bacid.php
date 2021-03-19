<?php
   	include '../archivo_conexion_db/conexion_base_datos.php';

    $cod_bacid = $_GET['cod_bacid'];
	
	// creación de la conexión a la base de datos con mysql_connect()
	$conn = new mysqli( $servidor, $usuario, $password , $basededatos); //or die ("No se ha podido conectar al servidor de Base de datos");
	
	// Selección del a base de datos a utilizar
	$db = mysqli_select_db( $conexion, $basededatos ) or die ( "Upps! Pues va a ser que no se ha podido conectar a la base de datos" );
	
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
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

    mysqli_close($conexion);

?>