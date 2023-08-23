<?php
	include '../archivo_conexion_db/conexion_base_datos.php';
       
    $identificador   = $_GET['identificador'];

    $nombre_campana = $_GET['nombre_campana'];
    $pais = $_GET['pais'];
    $origen = $_GET['origen'];
    $categoria = $_GET['categoria'];
    $producto = $_GET['producto'];
    $canales = $_GET['canales'];
    $portafolio = $_GET['portafolio'];
    $tipo_campana = $_GET['tipo_campana'];
    $objetivo = $_GET['objetivo'];
    $canal_digital = $_GET['canal_digital'];

    $ab_pais;
    $ab_origen;
    $ab_categoria;
    $ab_producto;
    $ab_portafolio;
    $ab_tipo_campana;
    $ab_objetivo;
    $ab_canal_digital;
    
    $return_arr = array();
	
	// creación de la conexión a la base de datos con mysql_connect()
	$conexion = mysqli_connect( $servidor, $usuario, $password, $basededatos ) or die ("No se ha podido conectar al servidor de Base de datos");

    $consulta_pais = "SELECT abreviatura FROM pais where nombre='$pais'";
	$resultado_pais = mysqli_query( $conexion, $consulta_pais ) or die ( "Algo ha ido mal en la consulta a la base de datos de pais");

    if ($conexion)
    {
       while($row = mysqli_fetch_array($resultado_pais)){

        $ab_pais = $row['abreviatura'];

       }  
    }
    
    $consulta_origen = "SELECT codigo FROM origen_clientes where nombre_origen='$origen'";
	$resultado_origen = mysqli_query( $conexion, $consulta_origen ) or die ( "Algo ha ido mal en la consulta a la base de datos de pais");

    if ($conexion)
    {
       while($row = mysqli_fetch_array($resultado_origen)){

        $ab_origen = $row['codigo'];

       }  
    }

    $consulta_categoria = "SELECT codigo FROM categoria where nombre_categoria='$categoria'";
	$resultado_categoria = mysqli_query( $conexion, $consulta_categoria ) or die ( "Algo ha ido mal en la consulta a la base de datos de pais");

    if ($conexion)
    {
       while($row = mysqli_fetch_array($resultado_categoria)){

        $ab_categoria = $row['codigo'];

       }  
    }

    $consulta_producto = "SELECT codigo FROM producto where nombre_producto='$producto'";
	$resultado_producto = mysqli_query( $conexion, $consulta_producto) or die ( "Algo ha ido mal en la consulta a la base de datos de pais");

    if ($conexion)
    {
       while($row = mysqli_fetch_array($resultado_producto)){

        $ab_producto = $row['codigo'];

       }  
    }

    $consulta_portafolio = "SELECT codigo FROM portafolio where nombre_portafolio='$portafolio'";
	$resultado_portafolio = mysqli_query( $conexion, $consulta_portafolio) or die ( "Algo ha ido mal en la consulta a la base de datos de pais");

    if ($conexion)
    {
       while($row = mysqli_fetch_array($resultado_portafolio)){

        $ab_portafolio = $row['codigo'];

       }  
    }

    $consulta_tipo_campana = "SELECT codigo FROM tipo_campaña where nombre_campaña ='$tipo_campana'";
	$resultado_tipo_campana = mysqli_query( $conexion, $consulta_tipo_campana) or die ( "Algo ha ido mal en la consulta a la base de datos de pais");

    if ($conexion)
    {
       while($row = mysqli_fetch_array($resultado_tipo_campana)){

        $ab_tipo_campana = $row['codigo'];

       }  
    }

    $consulta_objetivo = "SELECT codigo FROM objetivos where nombre_objetivo ='$objetivo'";
	$resultado_objetivo = mysqli_query( $conexion, $consulta_objetivo) or die ( "Algo ha ido mal en la consulta a la base de datos de pais");

    if ($conexion)
    {
       while($row = mysqli_fetch_array($resultado_objetivo)){

        $ab_objetivo = $row['codigo'];

       }  
    }

    $consulta_canal_digital = "SELECT codigo FROM canal_digital where nombre_canal_digital ='$canal_digital'";
	$resultado_canala_digital = mysqli_query( $conexion, $consulta_canal_digital) or die ( "Algo ha ido mal en la consulta a la base de datos de pais");

    if ($conexion)
    {
       while($row = mysqli_fetch_array($resultado_canala_digital)){

        $ab_canal_digital = $row['codigo'];

       }  
    }
    
    $consulta_subid = "SELECT * FROM sub_bacid_generados where id_bacid_padre='$identificador'";
	$resultado_subid = mysqli_query($conexion, $consulta_subid ) or die ( "Algo ha ido mal en la consulta a la base de datos");

    if ($conexion)
    {
       while($row = mysqli_fetch_array($resultado_subid)){
          $row_array['id_subacid'] = $row['id_sub_bacid'];
          $row_array['nombre_subbacid'] = $row['nombre_subbacid'];
          array_push($return_arr,$row_array);
        }  
    }
    echo json_encode($return_arr);

    //sección para realizar la actualización del BAC_ID

    $bac_id_actualizado = $ab_pais.$ab_origen."-".$ab_categoria."-".$ab_producto."-".$canales."-".$ab_portafolio."-".$ab_tipo_campana."-".$ab_objetivo."-".$ab_canal_digital;

    $actualizar = "UPDATE bac_id_generados 
    SET nombre_bac_id = '$bac_id_actualizado', nombre_campana = '$nombre_campana', fecha_modificacion = DATE_SUB(NOW(),INTERVAL 6 HOUR)
    WHERE id='$identificador'";

    if ($conexion->query($actualizar) === TRUE) {

    } else {
        echo "Error updating record: " . $conexion->error;
    }

  
    mysqli_close($conexion);

    

?>
