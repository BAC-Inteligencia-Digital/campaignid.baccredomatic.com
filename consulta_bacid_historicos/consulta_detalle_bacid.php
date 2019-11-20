<?php
    include 'conexion_base_datos.php';
       
    $id = $_GET['id'];
    
    $return_arr = array();
	
	// creación de la conexión a la base de datos con mysql_connect()
	$conexion = mysqli_connect( $servidor, $usuario, $password ) or die ("No se ha podido conectar al servidor de Base de datos");
	
	// Selección del a base de datos a utilizar
	$db = mysqli_select_db( $conexion, $basededatos ) or die ( "Upps! Pues va a ser que no se ha podido conectar a la base de datos" );
	// establecer y realizar consulta. guardamos en variable.
	$consulta = "select a.nombre_bac_id, a.nombre_campana, a.fecha_creacion,b.nombre as nombre_pais, c.nombre_origen, d.nombre_categoria, e.nombre_producto,
    f.nombre_portafolio, g.nombre_campaña, h.nombre_objetivo, i.nombre_canal_digital from bac_id_generados as a
        join pais as b
        on b.abreviatura = substring(a.nombre_bac_id,1,3)
        join origen_clientes as c
        on c.codigo = substring(a.nombre_bac_id,4,1)
        join categoria as d
        on d.codigo = substring(a.nombre_bac_id,6,4)
        join producto as e
        on e.codigo = substring(nombre_bac_id,11,3)
        join portafolio as f
        on f.codigo = substring(nombre_bac_id,22,2)
        join tipo_campaña as g
        on g.codigo = substring(nombre_bac_id,25,2)
        join objetivos as h
        on h.codigo = substring(nombre_bac_id,28,2)
        join canal_digital as i
        on i.codigo = substring(nombre_bac_id,31,2)
        where a.id = '$id'
    union all
    select a.nombre_bac_id, a.nombre_campana, a.fecha_creacion,b.nombre as nombre_pais, c.nombre_origen, d.nombre_categoria, GROUP_CONCAT('[',e.nombre_campana,']') as nombre_producto,
        f.nombre_portafolio, g.nombre_campaña, h.nombre_objetivo, i.nombre_canal_digital from bac_id_generados as a
            join pais as b
            on b.abreviatura = substring(a.nombre_bac_id,1,3)
            join origen_clientes as c
            on c.codigo = substring(a.nombre_bac_id,4,1)
            join categoria as d
            on d.codigo = substring(a.nombre_bac_id,6,4)
            join multiproducto as e
            on e.codigo = substring(nombre_bac_id,11,1) or e.codigo = substring(nombre_bac_id,12,1) or e.codigo = substring(nombre_bac_id,13,1)
            join portafolio as f
            on f.codigo = substring(nombre_bac_id,22,2)
            join tipo_campaña as g
            on g.codigo = substring(nombre_bac_id,25,2)
            join objetivos as h
            on h.codigo = substring(nombre_bac_id,28,2)
            join canal_digital as i
            on i.codigo = substring(nombre_bac_id,31,2)
            where a.id = '$id'
            group by a.id";
	$resultado = mysqli_query( $conexion, $consulta ) or die ( "Algo ha ido mal en la consulta a la base de datos");

   if ($conexion)
   {
       while($row = mysqli_fetch_array($resultado)){
          $row_array['nombre_bac_id'] = $row['nombre_bac_id'];
          $row_array['nombre_campana'] = $row['nombre_campana'];
          $row_array['fecha_creacion'] = $row['fecha_creacion'];
          $row_array['nombre_pais'] = $row['nombre_pais'];
          $row_array['nombre_origen'] = $row['nombre_origen'];
	      $row_array['nombre_categoria'] = $row['nombre_categoria'];
          $row_array['nombre_producto'] = $row['nombre_producto'];
          $row_array['nombre_portafolio'] = $row['nombre_portafolio'];
          $row_array['nombre_tipo'] = $row['nombre_campaña'];
          $row_array['nombre_objetivo'] = $row['nombre_objetivo'];
          $row_array['nombre_canal_digital'] = $row['nombre_canal_digital'];
          array_push($return_arr,$row_array);
       }  
   }

mysqli_close($conexion);

echo json_encode($return_arr);

?>
