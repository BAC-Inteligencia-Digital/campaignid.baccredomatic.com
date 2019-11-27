 <?php
   	include '../archivo_conexion_db/conexion_base_datos.php';

        $nombre_categoria_elejido = $_GET['categoria'];
	
        $return_arr = array();
	
	// creación de la conexión a la base de datos con mysql_connect()
	$conexion = mysqli_connect( $servidor, $usuario, $password ) or die ("No se ha podido conectar al servidor de Base de datos");
	
	// Selección del a base de datos a utilizar
	$db = mysqli_select_db( $conexion, $basededatos ) or die ( "Upps! Pues va a ser que no se ha podido conectar a la base de datos" );
	// establecer y realizar consulta. guardamos en variable.

        $consulta_codigo_categoria = "SELECT indice FROM categoria where nombre_categoria = '$nombre_categoria_elejido'";

	$resultado_codigo = mysqli_query($conexion,$consulta_codigo_categoria);

        while ($dato = mysqli_fetch_array($resultado_codigo)){
              $codigo_obtenido = $dato['indice'];
        }
	
        $consulta_productos = "SELECT 0 as indice, null as codigo, 'Seleccione un producto' as nombre_producto union SELECT indice,codigo,nombre_producto FROM producto where codigo_categoria = $codigo_obtenido";

	$resultado = mysqli_query( $conexion, $consulta_productos ) or die ( "Algo ha ido mal en la consulta a la base de datos");

   if ($conexion)
   {
       while($row = mysqli_fetch_array($resultado)){
          $row_array['indice'] = $row['indice'];
	  $row_array['codigo'] = $row['codigo'];
	  $row_array['nombre_producto'] = $row['nombre_producto'];
          array_push($return_arr,$row_array);
       }  
   }

mysqli_close($conexion);

echo json_encode($return_arr);

?>


