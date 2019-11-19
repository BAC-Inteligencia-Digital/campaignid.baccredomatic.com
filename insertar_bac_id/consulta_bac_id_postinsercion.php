<?php
	   include 'conexion_base_datos.php';
	   
       $pais_bacid = $_GET['pais_bacid'];
       $origen_bacid = $_GET['origen_bacid'];
       $categoria_bacid = $_GET['categoria_bacid'];
       $producto_bacid = $_GET['producto_bacid'];
       $portafolio_bacid = $_GET['portafolio_bacid'];
       $tipo_campana_bacid = $_GET['tipo_campana_bacid'];
       $objetivo_bacid = $_GET['objetivo_bacid'];
       $canal_digital_bacid = $_GET['canal_digital_bacid'];

        $return_arr = array();
	
	// creación de la conexión a la base de datos con mysql_connect()
	$conexion = mysqli_connect( $servidor, $usuario, $password ) or die ("No se ha podido conectar al servidor de Base de datos");
	
	// Selección del a base de datos a utilizar
	$db = mysqli_select_db( $conexion, $basededatos ) or die ( "Upps! Pues va a ser que no se ha podido conectar a la base de datos" );
	// establecer y realizar consulta. guardamos en variable.
	$consulta_pais = "SELECT nombre FROM pais where abreviatura='$pais_bacid'";
	$resultado_pais = mysqli_query( $conexion, $consulta_pais ) or die ( "Algo ha ido mal en la consulta a la base de datos de pais");

   if ($conexion)
   {
       while($row = mysqli_fetch_array($resultado_pais)){

	      $row_array['nombre_pais'] = $row['nombre'];
	
          array_push($return_arr,$row_array);
       }  
   }

   $consulta_origen = "SELECT nombre_origen FROM origen_clientes where codigo='$origen_bacid '";
	$resultado_origen = mysqli_query( $conexion, $consulta_origen ) or die ( "Algo ha ido mal en la consulta a la base de datos");

   if ($conexion)
   {
       while($row = mysqli_fetch_array($resultado_origen)){

	      $row_array['nombre_origen'] = $row['nombre_origen'];
	
          array_push($return_arr,$row_array);
       }  
   }

   $consulta_categoria = "SELECT nombre_categoria FROM categoria where codigo='$categoria_bacid '";
   $resultado_categoria = mysqli_query( $conexion, $consulta_categoria ) or die ( "Algo ha ido mal en la consulta a la base de datos");

  if ($conexion)
  {
      while($row = mysqli_fetch_array($resultado_categoria)){

         $row_array['nombre_categoria'] = $row['nombre_categoria'];
   
         array_push($return_arr,$row_array);
      }  
  }

   $consulta_producto = "SELECT codigo,nombre_producto FROM producto where codigo='$producto_bacid'";
   $resultado_producto = mysqli_query( $conexion, $consulta_producto ) or die ( "Algo ha ido mal en la consulta a la base de datos");

   $consulta_multiproducto = "SELECT GROUP_CONCAT('[',(select nombre_campana from multiproducto where codigo = SUBSTRING('$producto_bacid', 1, 1)),']-[',(select nombre_campana from multiproducto where codigo = SUBSTRING('$producto_bacid', 2, 1)),']-[',(select nombre_campana from multiproducto where codigo = SUBSTRING('$producto_bacid', 3, 1)),']')
   as nombre_producto";
   $resultado_multiproducto = mysqli_query( $conexion, $consulta_multiproducto ) or die ( "Algo ha ido mal en la consulta a la base de datos");

   if ($conexion)
  {
      if ("MULT" == $categoria_bacid){

         while($row2 = mysqli_fetch_array($resultado_multiproducto)){
            
            $row_array['nombre_producto'] = $row2['nombre_producto'];
                        
            array_push($return_arr,$row_array);
         }
      }
      else{
         while($row = mysqli_fetch_array($resultado_producto)){
            
            $row_array['nombre_producto'] = $row['nombre_producto'];
                        
            array_push($return_arr,$row_array);
         }
      }
  }
  
   $consulta_portafolio = "SELECT nombre_portafolio FROM portafolio where codigo='$portafolio_bacid '";
   $resultado_portafolio = mysqli_query( $conexion, $consulta_portafolio ) or die ( "Algo ha ido mal en la consulta a la base de datos");

  if ($conexion)
  {
      while($row = mysqli_fetch_array($resultado_portafolio)){

         $row_array['nombre_portafolio'] = $row['nombre_portafolio'];
   
         array_push($return_arr,$row_array);
      }  
  }

  $consulta_tipocampana = "SELECT nombre_campaña FROM tipo_campaña where codigo='$tipo_campana_bacid'";
   $resultado_tipocampana = mysqli_query( $conexion, $consulta_tipocampana ) or die ( "Algo ha ido mal en la consulta a la base de datos");

  if ($conexion)
  {
      while($row = mysqli_fetch_array($resultado_tipocampana)){

         $row_array['nombre_campana'] = $row['nombre_campaña'];
   
         array_push($return_arr,$row_array);
      }  
  }

  $consulta_objetivo = "SELECT nombre_objetivo FROM objetivos where codigo='$objetivo_bacid'";
   $resultado_objetivo = mysqli_query( $conexion, $consulta_objetivo) or die ( "Algo ha ido mal en la consulta a la base de datos");

  if ($conexion)
  {
      while($row = mysqli_fetch_array($resultado_objetivo)){

         $row_array['nombre_objetivo'] = $row['nombre_objetivo'];
   
         array_push($return_arr,$row_array);
      }  
  }

  $consulta_canal_digital = "SELECT nombre_canal_digital FROM canal_digital where codigo='$canal_digital_bacid'";
   $resultado_canal_digital = mysqli_query( $conexion, $consulta_canal_digital) or die ( "Algo ha ido mal en la consulta a la base de datos");

  if ($conexion)
  {
      while($row = mysqli_fetch_array($resultado_canal_digital)){

         $row_array['nombre_canal_digital'] = $row['nombre_canal_digital'];
   
         array_push($return_arr,$row_array);
      }  
  }

mysqli_close($conexion);

echo json_encode($return_arr);

?>
