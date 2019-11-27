<?php
   	include '../archivo_conexion_db/conexion_base_datos.php';

    $canal_digital_elejido = $_GET['canal_digital'];
	
    $return_arr = array();
	
	// creación de la conexión a la base de datos con mysql_connect()
	$conexion = mysqli_connect( $servidor, $usuario, $password ) or die ("No se ha podido conectar al servidor de Base de datos");
	
	// Selección del a base de datos a utilizar
	$db = mysqli_select_db( $conexion, $basededatos ) or die ( "Upps! Pues va a ser que no se ha podido conectar a la base de datos" );
	// establecer y realizar consulta. guardamos en variable.

    $consulta = "SELECT grupo_anuncios FROM canal_digital where nombre_canal_digital = '$canal_digital_elejido'";

	$resultado_codigo = mysqli_query($conexion,$consulta);

        while ($dato = mysqli_fetch_array($resultado_codigo)){
              $grupo_obtenido = $dato['grupo_anuncios'];
        }

        $consulta_grupos = "SELECT 0 as indice, null as codigo_grupo, 'Seleccione un grupo' as nombre_categoria union select indice,codigo_grupo,nombre_categoria from grupos_anuncios where numero_grupo = $grupo_obtenido";;
	$resultado = mysqli_query( $conexion, $consulta_grupos ) or die ( "Algo ha ido mal en la consulta a la base de datos");

   if ($conexion)
   {
       while($row = mysqli_fetch_array($resultado)){
          $row_array['indice'] = $row['indice'];
	      $row_array['codigo_grupo'] = $row['codigo_grupo'];
	      $row_array['nombre_categoria'] = $row['nombre_categoria'];
          array_push($return_arr,$row_array);
       }  
   }

mysqli_close($conexion);

echo json_encode($return_arr);

?>
