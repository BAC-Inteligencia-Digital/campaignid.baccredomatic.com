<?php

    use App\Config\ErrorLog;
    use App\Config\ResponseHttp;

    require dirname(__DIR__) . '/vendor/autoload.php';

    ErrorLog::activateErrorLog();

    if (isset($_SERVER['REQUEST_URI'])) {
        
        $params = explode('/',$_SERVER['REQUEST_URI']);
        $list = ['auth','user','option','select','bacid'];
        $file = dirname(__DIR__) . '/src/Routes/' .$params[1]. '.php';

        if (!in_array($params[1],$list)) {          
            echo json_encode(ResponseHttp::status400());             
            exit;
        }      

        if (is_readable($file)) {
           require $file;
           exit;
        } else {
           echo json_encode(ResponseHttp::status500('El archivo de la ruta no esta creado')); 
        }

    } else {
        echo json_encode(ResponseHttp::status500());
      exit;
    }
    
   
