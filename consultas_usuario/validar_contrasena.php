<?php
   	
   include '../archivo_conexion_db/conexion_base_datos.php';

   $dominioPermitido = "https://campaignid.baccredomatic.com";
   header("Access-Control-Allow-Origin: $dominioPermitido");
   header("Access-Control-Allow-Headers: content-type");
   header("Access-Control-Allow-Methods: OPTIONS,GET,PUT,POST,DELETE");

   $id_usuario = $_GET['id_usuario'];
 
   $return_arr = array();
	
	// creación de la conexión a la base de datos con mysql_connect()
	$conexion = mysqli_connect( $servidor, $usuario, $password ) or die ("No se ha podido conectar al servidor de Base de datos");
	
	// Selección del a base de datos a utilizar
	$db = mysqli_select_db( $conexion, $basededatos ) or die ( "Upps! Pues va a ser que no se ha podido conectar a la base de datos" );
	// establecer y realizar consulta. guardamos en variable.
	$consulta = "SELECT * FROM usuarios where id = '$id_usuario'";
	$resultado = mysqli_query( $conexion, $consulta ) or die ( "Algo ha ido mal en la consulta a la base de datos");

    if ($conexion)
    {
       while($row = mysqli_fetch_array($resultado)){
          $row_array['contrasena'] = $row['contraseña'];
          array_push($return_arr,$row_array);
       }  
    }

    mysqli_close($conexion);

    echo json_encode($return_arr);

?>