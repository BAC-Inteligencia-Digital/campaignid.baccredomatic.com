<?php
    include 'conexion_base_datos.php';

    $identificador_bacid_padre  = $_GET['identificador_bacid_padre'];
    $identificador_subac_id     = $_GET['identificador_subac_id'];

    
    $grupo_anuncio = $_GET['grupo_anuncio'];
    $tipo_anuncio = $_GET['tipo_anuncio'];
    $nombre_anuncio = $_GET['nombre_anuncio'];

    $ab_grupo_anuncio;
    $ab_tipo_anuncio;
    $ab_nombre_campana;

    $conexion = mysqli_connect( $servidor, $usuario, $password, $basededatos );

    $consulta_grupo = "SELECT codigo_grupo FROM grupos_anuncios where nombre_categoria='$grupo_anuncio'";
	$resultado_grupo = mysqli_query( $conexion, $consulta_grupo ) or die ( "Algo ha ido mal en la consulta a la base de datos de pais");

    if ($conexion)
    {
       while($row = mysqli_fetch_array($resultado_grupo)){

        $ab_grupo_anuncio = $row['codigo_grupo'];

       }  
    }

    $consulta_tipo = "SELECT codigo FROM tipo_anuncio where nombre_tipo_anuncio='$tipo_anuncio'";
	$resultado_tipo = mysqli_query( $conexion, $consulta_tipo ) or die ( "Algo ha ido mal en la consulta a la base de datos de pais");

    if ($conexion)
    {
       while($row = mysqli_fetch_array($resultado_tipo)){

        $ab_tipo_anuncio = $row['codigo'];

       }  
    }

    $consulta_campana = "SELECT a.nombre_campana from bac_id_generados as a join sub_bacid_generados as b on b.id_bacid_padre = a.id where b.id_sub_bacid='$identificador_subac_id'";
	$resultado_campana = mysqli_query( $conexion, $consulta_campana ) or die ( "Algo ha ido mal en la consulta a la base de datos de pais");

    if ($conexion)
    {
       while($row = mysqli_fetch_array($resultado_campana)){

        $ab_nombre_campana = $row['nombre_campana'];

       }  
    }

    //sección para realizar la actualización del BAC_ID

    $subac_id_actualizado = $ab_grupo_anuncio."-".$ab_tipo_anuncio."-".$nombre_anuncio."/".$ab_nombre_campana;

    $actualizar = "UPDATE sub_bacid_generados 
    SET nombre_subbacid = '$subac_id_actualizado', fecha_modificacion = DATE_SUB(NOW(),INTERVAL 6 HOUR)
    WHERE id_sub_bacid='$identificador_subac_id' and id_bacid_padre='$identificador_bacid_padre'";

    if ($conexion->query($actualizar) === TRUE) {
        echo "Record updated successfully";
    } else {
        echo "Error updating record: " . $conexion->error;
    }

    mysqli_close($conexion);
?>