<?php
   	include '../archivo_conexion_db/conexion_base_datos.php';

    $bac_id_padre = $_GET['bac_id_padre'];
    $sub_bac_id = $_GET['sub_bac_id'];

    $codigo_bac_id_padre = '';
	
	// creación de la conexión a la base de datos con mysql_connect()
	$conexion = new mysqli( $servidor, $usuario, $password , $basededatos); //or die ("No se ha podido conectar al servidor de Base de datos");
	
	// Selección del a base de datos a utilizar
	$db = mysqli_select_db( $conexion, $basededatos ) or die ( "Upps! Pues va a ser que no se ha podido conectar a la base de datos" );
	// establecer y realizar consulta. guardamos en variable.
	$consulta = "SELECT id FROM bac_id_generados where nombre_bac_id='$bac_id_padre'";
	$resultado = mysqli_query( $conexion, $consulta ) or die ( "Algo ha ido mal en la consulta a la base de datos");

   if ($conexion)
   {
       while($row = mysqli_fetch_array($resultado)){
        $codigo_bac_id_padre = $row['id'];

       }  
   }

    $sql = "INSERT INTO sub_bacid_generados (nombre_subbacid,id_bacid_padre)
    VALUES ('$sub_bac_id', $codigo_bac_id_padre )";

    if ($conexion->query($sql) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conexion->error;
    }

mysqli_close($conexion);

?>