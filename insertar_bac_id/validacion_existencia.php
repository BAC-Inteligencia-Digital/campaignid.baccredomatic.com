<?php
    include '../archivo_conexion_db/conexion_base_datos.php';
    
    $bac_id = $_GET['bac_id'];
    $nombre_campana = $_GET['nombre_campana'];
    
    $return_arr = array();

    // Create connection
    $conn = new mysqli( $servidor, $usuario, $password , $basededatos);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "select id from bac_id_generados where nombre_bac_id='$bac_id' and nombre_campana='$nombre_campana'";

    if ($conexion)
   {
       while($row = mysqli_fetch_array($sql)){

	      $row_array['resultado'] = $row['id'];
	      array_push($return_arr,$row_array);
       }  
   }

    $conn->close();
    echo json_encode($return_arr);
?>