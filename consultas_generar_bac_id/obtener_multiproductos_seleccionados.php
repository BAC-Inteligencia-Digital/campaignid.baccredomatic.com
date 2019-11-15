<?php
   	
           include 'conexion_base_datos.php';
   
           $producto1_seleccionado = $_GET['producto1_seleccionado'];
           $producto2_seleccionado = $_GET['producto2_seleccionado'];
           $producto3_seleccionado = $_GET['producto3_seleccionado'];
           
           $conn = new mysqli($servidor, $usuario, $password ,$basededatos); 
           $result = $conn->query("select codigo from multiproducto where nombre_campana in ('$producto1_seleccionado','$producto2_seleccionado','$producto3_seleccionado') order by codigo asc"); 
     
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