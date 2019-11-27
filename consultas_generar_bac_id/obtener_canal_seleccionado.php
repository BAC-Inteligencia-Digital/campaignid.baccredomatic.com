 <?php
   	include '../archivo_conexion_db/conexion_base_datos.php';

	$canal_seleccionado = $_GET['canal_seleccionado'];

    $return_arr = array();
	
	// creación de la conexión a la base de datos con mysql_connect()
	$conexion = mysqli_connect( $servidor, $usuario, $password ) or die ("No se ha podido conectar al servidor de Base de datos");
	
	// Selección del a base de datos a utilizar
	$db = mysqli_select_db( $conexion, $basededatos ) or die ( "Upps! Pues va a ser que no se ha podido conectar a la base de datos" );
	// establecer y realizar consulta. guardamos en variable.
	$consulta = "SELECT codigo FROM canales where nombre_canal='$canal_seleccionado'";
	$resultado = mysqli_query( $conexion, $consulta ) or die ( "Algo ha ido mal en la consulta a la base de datos");

   if ($conexion)
   {
       while($row = mysqli_fetch_array($resultado)){
	  $row_array['codigo'] = $row['codigo'];

          array_push($return_arr,$row_array);
       }  
   }

mysqli_close($conexion);

echo json_encode($return_arr);

?>


