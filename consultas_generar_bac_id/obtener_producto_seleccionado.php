<?php
   	
           include '../archivo_conexion_db/conexion_base_datos.php';
   
           $producto_seleccionado = $_GET['producto_seleccionado'];
           
           $conn = new mysqli($servidor, $usuario, $password ,$basededatos); 
           $result = $conn->query("select codigo from producto where nombre_producto = '$producto_seleccionado'"); 
     
           $output = array(); 
   
           if ($conn)
              {
                  while($row = mysqli_fetch_array($result)){
                     $row_array['codigo'] = $row['codigo'];
                     array_push($output,$row_array);
                  }  
              }
           
           $sresult = json_encode($output); 
           echo $sresult; 
           $conn->close(); 
   ?>
   