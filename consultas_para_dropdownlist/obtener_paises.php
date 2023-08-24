 <?php
   	
	include '../archivo_conexion_db/conexion_base_datos.php';
	
	$conn = new mysqli($servidor, $usuario, $password ,$basededatos); 
        $result = $conn->query("select nombre from pais"); 
  
        $output = array(); 
      
        //$output = $result->fetch_all(MYSQLI_ASSOC); 
    

	if ($conn)
	   {
	       while($row = mysqli_fetch_array($result)){
		  $row_array['nombre'] = $row['nombre'];
		  array_push($output,$row_array);
	       }  
	   }
        
        $sresult = json_encode($output); 
        echo $sresult; 
        $conn->close(); 
?>


