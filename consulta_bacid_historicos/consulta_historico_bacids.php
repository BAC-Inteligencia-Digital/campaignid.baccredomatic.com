<?php
   	include 'conexion_base_datos.php';

        $return_arr = array();
	
	// creación de la conexión a la base de datos con mysql_connect()
	$conexion = mysqli_connect( $servidor, $usuario, $password ) or die ("No se ha podido conectar al servidor de Base de datos");
	
	// Selección del a base de datos a utilizar
	$db = mysqli_select_db( $conexion, $basededatos ) or die ( "Upps! Pues va a ser que no se ha podido conectar a la base de datos" );
	// establecer y realizar consulta. guardamos en variable.
	$consulta = "select a.id,a.nombre_bac_id, a.nombre_campana, b.nombre as nombre_pais, c.nombre_origen, d.nombre_categoria, e.nombre_producto from bac_id_generados as a
    join pais as b
    on b.abreviatura = substring(a.nombre_bac_id,1,3)
    join origen_clientes as c
    on c.codigo = substring(a.nombre_bac_id,4,1)
    join categoria as d
    on d.codigo = substring(a.nombre_bac_id,6,4)
    join producto as e
    on e.codigo = substring(nombre_bac_id,11,3)";
	$resultado = mysqli_query( $conexion, $consulta ) or die ( "Algo ha ido mal en la consulta a la base de datos");

   if ($conexion)
   {
       while($row = mysqli_fetch_array($resultado)){
        $row_array['id'] = $row['id'];
          $row_array['nombre_bac_id'] = $row['nombre_bac_id'];
	      $row_array['nombre_campana'] = $row['nombre_campana'];
          $row_array['nombre_pais'] = $row['nombre_pais'];
          $row_array['nombre_origen'] = $row['nombre_origen'];
	      $row_array['nombre_categoria'] = $row['nombre_categoria'];
	      $row_array['nombre_producto'] = $row['nombre_producto'];
          array_push($return_arr,$row_array);
       }  
   }

mysqli_close($conexion);

echo json_encode($return_arr);

?>
