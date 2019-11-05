<?php
	   include 'conexion_base_datos.php';
	   
       $canal1_seleccionado = $_GET['canal1_seleccionado'];
       $canal2_seleccionado = $_GET['canal2_seleccionado'];
       $canal3_seleccionado = $_GET['canal3_seleccionado'];
       $canal4_seleccionado = $_GET['canal4_seleccionado'];
       $canal5_seleccionado = $_GET['canal5_seleccionado'];
       $canal6_seleccionado = $_GET['canal6_seleccionado'];

        $return_arr = array();
	
	// creación de la conexión a la base de datos con mysql_connect()
	$conexion = mysqli_connect( $servidor, $usuario, $password ) or die ("No se ha podido conectar al servidor de Base de datos");
	
	// Selección del a base de datos a utilizar
	$db = mysqli_select_db( $conexion, $basededatos ) or die ( "Upps! Pues va a ser que no se ha podido conectar a la base de datos" );
	// establecer y realizar consulta. guardamos en variable.
	$consulta1 = "SELECT nombre_canal FROM canales where codigo='$canal1_seleccionado '";
	$resultado1 = mysqli_query( $conexion, $consulta1 ) or die ( "Algo ha ido mal en la consulta a la base de datos");

   if ($conexion)
   {
       while($row = mysqli_fetch_array($resultado1)){

	  $row_array['nombre_canal1'] = $row['nombre_canal'];
	
          array_push($return_arr,$row_array);
       }  
   }

   $consulta2 = "SELECT nombre_canal FROM canales where codigo='$canal2_seleccionado '";
	$resultado2 = mysqli_query( $conexion, $consulta2 ) or die ( "Algo ha ido mal en la consulta a la base de datos");

   if ($conexion)
   {
       while($row = mysqli_fetch_array($resultado2)){

	  $row_array['nombre_canal2'] = $row['nombre_canal'];
	
          array_push($return_arr,$row_array);
       }  
   }

   $consulta3 = "SELECT nombre_canal FROM canales where codigo='$canal3_seleccionado '";
	$resultado3 = mysqli_query( $conexion, $consulta3 ) or die ( "Algo ha ido mal en la consulta a la base de datos");

   if ($conexion)
   {
       while($row = mysqli_fetch_array($resultado3)){

	  $row_array['nombre_canal3'] = $row['nombre_canal'];
	
          array_push($return_arr,$row_array);
       }  
   }

   $consulta4 = "SELECT nombre_canal FROM canales where codigo='$canal4_seleccionado '";
	$resultado4 = mysqli_query( $conexion, $consulta4 ) or die ( "Algo ha ido mal en la consulta a la base de datos");

   if ($conexion)
   {
       while($row = mysqli_fetch_array($resultado4)){

	  $row_array['nombre_canal4'] = $row['nombre_canal'];
	
          array_push($return_arr,$row_array);
       }  
   }

   $consulta5 = "SELECT nombre_canal FROM canales where codigo='$canal5_seleccionado '";
	$resultado5 = mysqli_query( $conexion, $consulta5 ) or die ( "Algo ha ido mal en la consulta a la base de datos");

   if ($conexion)
   {
       while($row = mysqli_fetch_array($resultado5)){

	  $row_array['nombre_canal5'] = $row['nombre_canal'];
	
          array_push($return_arr,$row_array);
       }  
   }

   $consulta6 = "SELECT nombre_canal FROM canales where codigo='$canal6_seleccionado '";
	$resultado6 = mysqli_query( $conexion, $consulta6 ) or die ( "Algo ha ido mal en la consulta a la base de datos");

   if ($conexion)
   {
       while($row = mysqli_fetch_array($resultado6)){

	  $row_array['nombre_canal6'] = $row['nombre_canal'];
	
          array_push($return_arr,$row_array);
       }  
   }
mysqli_close($conexion);

echo json_encode($return_arr);

?>


