<?php

$fecha  = $_GET['fecha_desde'];
list($dia) = explode("/", $fecha);
echo $dia; 
echo strlen($dia);

?>