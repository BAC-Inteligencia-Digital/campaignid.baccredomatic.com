<?php
   	include '../archivo_conexion_db/conexion_base_datos.php';

        $nombre_grupo = $_GET['nombre_grupo'];
        $codigo_anuncio = $_GET['codigo_anuncio'];
        $nombre_anuncio = $_GET['nombre_anuncio'];
        $sub_codigo = $_GET['sub_codigo'];
	
        $return_arr = array();
	
	// creación de la conexión a la base de datos con mysql_connect()
	$conexion = mysqli_connect( $servidor, $usuario, $password ) or die ("No se ha podido conectar al servidor de Base de datos");
	
	// Selección del a base de datos a utilizar
	$db = mysqli_select_db( $conexion, $basededatos ) or die ( "Upps! Pues va a ser que no se ha podido conectar a la base de datos" );
	// establecer y realizar consulta. guardamos en variable.
	
        $consulta_sub = "select distinct a.nombre_categoria, a.descripcion, b.nombre_tipo_anuncio, '$nombre_anuncio' as nombre_anuncio, '$sub_codigo' as sub_codigo from 
        grupos_anuncios as a
        join tipo_anuncio as b
        where a.codigo_grupo = '$nombre_grupo'
        and b.codigo = '$codigo_anuncio'";

	$resultado = mysqli_query( $conexion, $consulta_sub ) or die ( "Algo ha ido mal en la consulta a la base de datos");

   if ($conexion)
   {
       while($row = mysqli_fetch_array($resultado)){
          $row_array['nombre_categoria'] = $row['nombre_categoria'];
	       $row_array['descripcion'] = $row['descripcion'];
          $row_array['nombre_tipo_anuncio'] = $row['nombre_tipo_anuncio'];
          $row_array['nombre_anuncio'] = $row['nombre_anuncio'];
          $row_array['sub_codigo'] = $row['sub_codigo'];
          array_push($return_arr,$row_array);
       }  
   }

mysqli_close($conexion);

echo json_encode($return_arr);

?>