 <?php
   	
	include 'conexion_base_datos.php';

	$pais_seleccionado = $_GET['pais_seleccionado'];
	
	$conn = new mysqli($servidor, $usuario, $password ,$basededatos); 
        $result = $conn->query("select abreviatura from pais where nombre = '$pais_seleccionado'"); 
  
        $output = array(); 

	if ($conn)
	   {
	       while($row = mysqli_fetch_array($result)){
		  $row_array['abreviatura'] = $row['abreviatura'];
		  array_push($output,$row_array);
	       }  
	   }
        
        $sresult = json_encode($output); 
        echo $sresult; 
        $conn->close(); 
?>


