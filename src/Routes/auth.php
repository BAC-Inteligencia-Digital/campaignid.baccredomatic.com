<?php

    use App\Config\ResponseHttp;
    use App\Controllers\UserController;

    /*************Parametros enviados por la URL*******************/
    $params  = explode('/' , $_SERVER['REQUEST_URI']);
  
    $app = new UserController();
    /***********************Rutas*********************/
    $app->getLogin("auth/{$params[2]}/{$params[3]}/");

    /****************Error 404*****************/
    echo json_encode(ResponseHttp::status404());