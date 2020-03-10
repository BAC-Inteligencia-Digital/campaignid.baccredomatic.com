<?php

    include '../archivo_conexion_db/conexion_base_datos.php';

    $return_arr = array();

    $usuario_red = $_GET['usuario_red'];
    $contrasena = $_GET['contrasena'];
    $correo = $_GET['correo'];
    $tipo_usuario = $_GET['tipo_usuario'];
    $pais = $_GET['pais'];
    $nombre = $_GET['nombre'];
    $apellidos = $_GET['apellidos'];
    $estado = $_GET['estado'];
    
    
    $validar; //esta variable se encarga de validar si un correo o usuario de red existe

    $conn = new mysqli( $servidor, $usuario, $password , $basededatos);

    $consulta_validar = "SELECT * FROM usuarios where usuario_red = '$usuario_ingresado' or correo = '$correo'";
    $resultado_validar = mysqli_query( $conn, $consulta_validar) or die ( "Algo ha ido mal en la consulta a la base de datos");
    
    if ($conn)
    {
        while($row1 = mysqli_fetch_array($resultado_validar)){
              $validar = $row1['usuario_red'];
        }  
    }

    if (empty($validar)  || is_null($validar)){
        // Check connection for insert user
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        $sql = "INSERT INTO usuarios (usuario_red,contraseña,correo,tipo_usuario,pais,nombre,apellidos,estado)
        VALUES ('$usuario_red', '$contrasena','$correo','$tipo_usuario','$pais','$nombre','$apellidos','$estado')";
        if ($conn->query($sql) === TRUE) {
            $row_array['error'] = "El usuario ha sido registrado con éxito!";
            array_push($return_arr,$row_array);
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    }

    else{
        $row_array['error'] = "El usuario o correo electrónico ya se encuentran registrados!";
        array_push($return_arr,$row_array);
    }
    $conn->close();

    echo json_encode($return_arr);

?>